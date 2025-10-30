import { ImageResponse } from "next/og";

export const runtime = "edge";

const width = 1200;
const height = 630;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Yasar Kocyigit").slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0a0a, #1f2933)",
          color: "#f5f5f5",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "999px",
                border: "2px solid rgba(245,245,245,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                fontWeight: 700,
                letterSpacing: "12px",
              }}
            >
              YK
            </div>
            <div style={{ fontSize: "26px", letterSpacing: "6px" }}>YASAR KOCYIGIT</div>
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "820px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            opacity: 0.8,
            letterSpacing: "8px",
          }}
        >
          <span>DATAPLATFORM NOTES</span>
          <span>yasarkocyigit.com</span>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
