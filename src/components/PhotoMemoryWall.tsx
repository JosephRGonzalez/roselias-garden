
import { PhotoCard } from "./PhotoCard";
import { memoriesData } from "../data/memories";

export default function PhotoMemoryWall() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "5rem 1.25rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(130,35,60,0.12), transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c8973a",
              marginBottom: "0.75rem",
            }}
          >
            A few moments worth keeping
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#fff5f0",
              marginBottom: "1rem",
            }}
          >
            Our Little Memories ♡
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
              fontStyle: "italic",
              color: "rgba(255,245,240,0.65)",
              maxWidth: "550px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Every picture reminds me of another reason
            I'm so happy the universe brought me to you,
            mi amor.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "3rem 2rem",
            alignItems: "start",
            padding: "1rem",
          }}
        >
          {memoriesData.map((memory) => (
            <PhotoCard key={memory.id} memory={memory} />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "4rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.3rem",
            color: "#d5a7ad",
          }}
        >
          And my favorite memories are still the ones
          we haven't made yet. ❤️
        </p>
      </div>
    </section>
  );
}
