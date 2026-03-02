import { useEffect, useRef } from "react"
import * as QRCode from "qrcode"

type Props = {
  text: string,
}

export default function QrGenerator({ text }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: 256,
      margin: 2,
    })
  }, [text])
  return <canvas ref={canvasRef} />
}