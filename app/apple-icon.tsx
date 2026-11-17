import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% -20%, #0c4a6e 0%, #020617 70%)",
          color: "#38BDF8",
          fontSize: 88,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        FJ
      </div>
    ),
    size,
  );
}
