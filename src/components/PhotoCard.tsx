
import type { CSSProperties } from "react";
import type { Memory } from "../data/memories";

interface PhotoCardProps {
  memory: Memory;
}

export function PhotoCard({ memory }: PhotoCardProps) {
  const rotation = (memory.caption.length % 7) - 3;

  const frameStyle: CSSProperties = {
    background: "#fff8f0",
    borderRadius: "4px",
    padding: "12px 12px 20px",
    boxShadow:
      "0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(200,151,58,0.08)",
    transform: `rotate(${rotation}deg)`,
    transition:
      "transform 450ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 450ms ease",
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    position: "relative",
  };

  return (
    <article
      className="romantic-photo-card"
      style={frameStyle}
    >
      {/* Photo */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#e8d8ce",
          aspectRatio: "4 / 5",
        }}
      >
        <img
          src={memory.imageUrl}
          alt={memory.caption}
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 600ms ease",
          }}
          className="romantic-photo-image"
        />

        {/* Soft photographic vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, transparent 65%, rgba(35,10,20,0.12))",
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          padding: "18px 8px 6px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
            fontStyle: "italic",
            fontWeight: 600,
            color: "#492d32",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {memory.caption}
        </p>

        {/* Decorative divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          <span
            style={{
              width: "30px",
              height: "1px",
              background: "rgba(200,151,58,0.5)",
            }}
          />

          <span
            style={{
              color: "#bc7e87",
              fontSize: "14px",
            }}
          >
            ♡
          </span>

          <span
            style={{
              width: "30px",
              height: "1px",
              background: "rgba(200,151,58,0.5)",
            }}
          />
        </div>

        {/* Date */}
        {memory.date && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              color: "#967b77",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            {new Date(
              `${memory.date.slice(0, 10)}T12:00:00`
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <style>{`
        .romantic-photo-card:hover {
          transform: rotate(0deg) translateY(-10px) scale(1.025) !important;
          box-shadow:
            0 25px 55px rgba(0,0,0,0.5),
            0 0 35px rgba(200,151,58,0.18) !important;
          z-index: 2;
        }

        .romantic-photo-card:hover .romantic-photo-image {
          transform: scale(1.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .romantic-photo-card,
          .romantic-photo-image {
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
}
