
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const titleText = "For My Beautiful Princess";

  useEffect(() => {
    const title = titleRef.current;
    const emoji = emojiRef.current;
    const subtitle = subtitleRef.current;
    const caption = captionRef.current;

    if (!title) return;

    const titleAnim = animate(title.querySelectorAll("span"), {
      opacity: [0, 1],
      translateY: [40, 0],
      delay: stagger(60),
      ease: "outExpo",
      duration: 800,
    });

    const emojiAnim = emoji
      ? animate(emoji, {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: 1700,
          ease: "outExpo",
          duration: 800,
        })
      : null;

    const subtitleAnim = subtitle
      ? animate(subtitle, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 2000,
          ease: "outExpo",
          duration: 900,
        })
      : null;

    const captionAnim = caption
      ? animate(caption, {
          opacity: [0, 1],
          translateY: [15, 0],
          delay: 2600,
          ease: "outExpo",
          duration: 900,
        })
      : null;

    return () => {
      titleAnim.pause();
      emojiAnim?.pause();
      subtitleAnim?.pause();
      captionAnim?.pause();
    };
  }, []);

  return (
    <section
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1.5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Animated title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          maxWidth: "950px",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 5.5vw, 4.5rem)",
            color: "#fff5f0",
            lineHeight: 1.25,
            fontWeight: 600,
            margin: 0,
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
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </h1>

        {/* Animated rose */}
        <span
          ref={emojiRef}
          aria-label="Rose"
          role="img"
          style={{
            fontSize: "clamp(2rem, 4vw, 4rem)",
            opacity: 0,
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          🌹
        </span>
      </div>

      {/* Personalized message */}
      <p
        ref={subtitleRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)",
          color: "#fff5f0",
          marginTop: "2rem",
          fontStyle: "italic",
          opacity: 0,
          maxWidth: "600px",
          lineHeight: 1.8,
        }}
      >
        i made you a little something, mi amor.
        <br />
        i hope you like it, pretty girl. ❤️
      </p>

      {/* Small closing caption */}
      <p
        ref={captionRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          color: "#c8973a",
          marginTop: "1.2rem",
          fontStyle: "italic",
          opacity: 0,
          letterSpacing: "0.02em",
        }}
      >
        just a little reminder of how much you mean to me ♡
      </p>
    </section>
  );
}
