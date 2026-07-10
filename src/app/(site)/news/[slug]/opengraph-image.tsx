import { ImageResponse } from "next/og";
import { SCHOOL_CONFIG } from "@/shared/config";
import { NEWS_ARTICLES } from "@/domains/news/news.data";

export const alt = "News Article";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "edge";

/**
 * Dynamic Open Graph image for individual news articles
 * Uses article title and category from URL params
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the article by slug
  const article = NEWS_ARTICLES.find((a) => a.href === `/news/${slug}`);

  const title = article?.title || "News Article";
  const category = article?.category || "News";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#1B2A4A",
        backgroundImage: "linear-gradient(135deg, #1B2A4A 0%, #2E5090 100%)",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Category Badge */}
        <div
          style={{
            display: "inline-flex",
            fontSize: "24px",
            color: "#1B2A4A",
            backgroundColor: "#D4AF37",
            padding: "12px 24px",
            borderRadius: "8px",
            marginBottom: "32px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontWeight: "600",
          }}
        >
          {category}
        </div>

        {/* Article Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "56px" : "64px",
            fontWeight: "bold",
            color: "#fff",
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
      </div>

      {/* School Name & Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60px",
            height: "60px",
            borderRadius: "30px",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #D4AF37",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1B2A4A",
            }}
          >
            SE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            {SCHOOL_CONFIG.NAME}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            News & Updates
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
