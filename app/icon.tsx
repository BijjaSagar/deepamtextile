import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  const imagePath = path.join(process.cwd(), "public", "images", "logo-circle-only.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={base64Image}
          alt="Deepam Textiles"
          width="64"
          height="64"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
