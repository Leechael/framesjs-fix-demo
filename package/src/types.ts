type FrameVersion = "vNext" | `${number}-${number}-${number}`;

/** A developer friendly representation of a Frame */
export type Frame = {
  /** A valid frame version string. The string must be a release date (e.g. 2020-01-01 ) or vNext. Apps must ignore versions they do not understand. Currently, the only valid version is vNext.  */
  version: FrameVersion;
  /** A 256-byte string which contains a valid URL to send the Signature Packet to. If this prop is not present, apps must POST to the frame URL. */
  postUrl: string;
  /** A page may contain 0 to 4 buttons. If more than 1 button is present, the idx values must be in sequence starting from 1 (e.g. 1, 2 3). If a broken sequence is present (e.g 1, 2, 4), apps must not render the frame and instead render an OG embed. */
  buttons?: FrameButtonsType;
  /** An image which must be smaller than 10MB and should have an aspect ratio of 1.91:1 */
  image: string;
  /** An image which must be smaller than 10MB and should have an aspect ratio of 1.91:1. Fallback for clients that do not support frames. */
  ogImage?: string;
  /** Adding this property enables the text field. The content is a 32-byte label that is shown to the user (e.g. Enter a message). */
  inputText?: string;
};

/** A Frame represented as an object with keys and values corresponding to the Frames spec: https://docs.farcaster.xyz/reference/frames/spec */
export type FrameFlattened = {
  "fc:frame": FrameVersion;
  "fc:frame:image": string;
  "fc:frame:post_url": string;
  "fc:frame:button:1"?: string;
  "fc:frame:button:1:action"?: "post" | "post_redirect";
  "fc:frame:button:2"?: string;
  "fc:frame:button:2:action"?: "post" | "post_redirect";
  "fc:frame:button:3"?: string;
  "fc:frame:button:3:action"?: "post" | "post_redirect";
  "fc:frame:button:4"?: string;
  "fc:frame:button:4:action"?: "post" | "post_redirect";
  "fc:frame:input:text"?: string;
};

export type FrameButton = {
  /** A 256-byte string which is label of the button */
  label: string;
  /** Must be post or  post_redirect. Defaults to post if no value was specified.
   * If set to post, app must make the POST request and frame server must respond with a 200 OK, which may contain another frame.
   * If set to post_redirect, app must make the POST request, and the frame server must respond with a 302 OK with a location property set on the header. */
  action?: "post" | "post_redirect";
};

/** The permitted types of `buttonIndex` in a Frame POST payload response */
export type ActionIndex = 1 | 2 | 3 | 4;

export type FrameButtonsType =
  | []
  | [FrameButton]
  | [FrameButton, FrameButton]
  | [FrameButton, FrameButton, FrameButton]
  | [FrameButton, FrameButton, FrameButton, FrameButton];

export type AddressReturnType<
  Options extends { fallbackToCustodyAddress?: boolean } | undefined,
> = Options extends { fallbackToCustodyAddress: true }
  ? `0x${string}`
  : `0x${string}` | null;

/**
 * The body of valid `POST` requests triggered by Frame Buttons in other apps, when formatted as json, conforming to the Frames spec
 */
export type FrameActionPayload = {
  /** once validated, should be the only trusted source for accessing frame data */
  trustedData: { messageBytes: string };
  /**
   * untrustedData can be faked by anyone by hitting your frame with a POST with an arbitrary payload. We recommend only using
   * trustedData to do actions.
   */
  untrustedData: {
    /** the fid of the user who did the message. */
    fid: number;
    /** the url of the original frame, must be under 256 bytes */
    url: string;
    /** the hash of the `Farcaster` `AddFrameActionMessage` */
    messageHash: string;
    /** A Farcaster epoch timestamp (not UNIX timestamp) */
    timestamp: number;
    /** The Farcaster network is on network = 1 */
    network: number;
    /** the button index, starting from 1 that the user pressed to invoke this POST */
    buttonIndex: ActionIndex;
    /** the unique identifiers of the Farcaster cast, via the user who casted's `fid` and the cast `hash`, which is a unique identifier */
    castId: { fid: number; hash: string };
    /** text input by the user into any input provided, "" if requested and no input, undefined if input not requested */
    inputText?: string;
  };
};
