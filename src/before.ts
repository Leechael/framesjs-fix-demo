import { Frame, getFrameFlattened } from "frames.js"

export async function main() {
  const initialFrame: Frame = {
  image: "https://picsum.photos/seed/frames.js/1146/600",
  version: "vNext",
  buttons: [
    {
      label: "Random image",
    },
  ],
    postUrl: `https://framesjs-homeframe.vercel.app/frames?p=&amp;s=%7B%22page%22%3A1%7D&amp;r=%7B%7D`,
  };
  const result = getFrameFlattened(initialFrame);
  return result
}
