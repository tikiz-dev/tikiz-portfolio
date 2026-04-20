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
          background: "linear-gradient(135deg, #131419 0%, #05060a 100%)",
          position: "relative",
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dot" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#48c5ff" />
              <stop offset="100%" stopColor="#ff9a46" />
            </linearGradient>
          </defs>
          <path
            d="M18 22h28M32 22v26"
            stroke="#f5f5f6"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="47" cy="45" r="5" fill="url(#dot)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
