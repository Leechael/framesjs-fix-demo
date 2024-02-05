import { validateFrameMessage } from "framesjs-fix/dist/validateFrameMessage"

export async function main(input: any) {
  const result = validateFrameMessage(input)
  return result
}
