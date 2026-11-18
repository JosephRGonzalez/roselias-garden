
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import HeartScene from "../components/HeartScene";
import LoveTimer from "./LoveTimer";
import LoveBook from "../components/LoveBook";
import PhotoMemoryWall from "../components/PhotoMemoryWall";

export default function YesPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  const titleText = "My Beautiful Roselia";

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const emoji = emojiRef.current;
    const intro = introRef.current;

    if (!title) return;

    const titleAnim = animate(title.querySelectorAll("span"), {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: stagger(60),
      ease: "outExpo",
      duration: 800,
    });

    const subtitleAnim = subtitle
      ? animate(subtitle, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 1700,
          duration: 800,
          ease: "outExpo",
        })
      : null;

    const emojiAnim = emoji
      ? animate(emoji, {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: 1500,
          duration: 800,
          ease: "outExpo",
        })
      : null;

    const introAnim = intro
      ? animate(intro, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 2300,
          duration: 900,
          ease: "outExpo",
        })
      : null;

    return () => {
      titleAnim.pause();
      subtitleAnim?.pause();
      emojiAnim?.pause();
      introAnim?.pause();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Floating 3D hearts */}
      <HeartScene />

      {/* Soft background overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(8,2,5,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 1.5rem 8rem",
          gap: "2rem",
        }}
      >
        {/* Romantic introduction */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "850px",
          }}
        >
          {/* Small heading */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.25em",
              color: "#c8973a",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            — for the girl who has my heart —
          </p>

          {/* Animated title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <h1
              ref={titleRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
                color: "#fff5f0",
                lineHeight: 1.2,
                margin: 0,
                fontWeight: 600,
              }}
            >
              {titleText.split("").map((character, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                  }}
                >
                  {character === " "
                    ? "\u00A0"
                    : character}
                </span>
              ))}
            </h1>

            {/* Animated heart */}
            <span
              ref={emojiRef}
              role="img"
              aria-label="Heart"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                opacity: 0,
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              ❤️
            </span>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              color: "#ff6b8a",
              fontStyle: "italic",
              opacity: 0,
              marginTop: "1.5rem",
              lineHeight: 1.7,
            }}
          >
            My princess, my peace, my happiness. ❤️
          </p>

          {/* Introductory message */}
          <p
            ref={introRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255,245,240,0.85)",
              fontStyle: "italic",
              opacity: 0,
              marginTop: "1rem",
              lineHeight: 1.8,
              maxWidth: "580px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            I wish I could be holding you in my arms right now,
            mi amor. Until I can, here's a little piece of my
            heart for you to keep.
          </p>
        </div>

{/* Relationship timer */}
<LoveTimer />

{/* Interactive love book */}
<LoveBook />

{/* Our photo memories */}
<PhotoMemoryWall />

{/* Closing message */}
<div
          style={{
            maxWidth: "600px",
            textAlign: "center",
            padding: "1.5rem 1rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "#c8973a",
              margin: "0 auto 1.5rem",
              opacity: 0.65,
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              fontStyle: "italic",
              color: "#fff5f0",
              lineHeight: 1.8,
            }}
          >
            Out of everyone in this world, somehow the universe
            brought me to you.
            <br />
            <br />
            And if I could choose all over again,
            I'd still choose you, pretty girl.
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              color: "#c8973a",
              fontStyle: "italic",
              marginTop: "1.5rem",
            }}
          >
            Te amo, mi princesa hermosa. ❤️
          </p>
        </div>
      </main>
    </div>
  );
}
