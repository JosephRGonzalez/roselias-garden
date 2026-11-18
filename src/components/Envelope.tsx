
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#e8375a",
  "#c8973a",
  "#ff6b8a",
  "#fff5f0",
  "#f48fb1",
  "#ffcc00",
];

const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  width: `${8 + Math.random() * 8}px`,
  height: `${8 + Math.random() * 8}px`,
  bg: COLORS[Math.floor(Math.random() * COLORS.length)],
  delay: `${Math.random() * 2}s`,
  duration: `${2 + Math.random() * 3}s`,
  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
}));

const BALLOONS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  emoji: ["🎈", "🎀", "💕", "🌹", "✨", "🎊", "💝", "🎉"][i],
  left: `${10 + i * 12}%`,
  duration: `${3 + Math.random() * 2}s`,
  delay: `${Math.random() * 1.5}s`,
}));

function CountdownRedirect() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/yes");
      return;
    }

    const timer = window.setTimeout(() => {
      setCount((current) => current - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [count, navigate]);

  return (
    <p
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1rem",
        color: "rgba(255,245,240,0.6)",
        fontStyle: "italic",
        zIndex: 1,
      }}
    >
      Your surprise continues in {count}...
    </p>
  );
}

export default function Envelope() {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<SVGGElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  // Floating envelope animation
  useEffect(() => {
    const element = envelopeRef.current;

    if (!element) return;

    const animation = animate(element, {
      translateY: [-6, 6],
      duration: 2200,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    return () => {
      animation.pause();
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    if (hintRef.current) {
      animate(hintRef.current, {
        opacity: [0.8, 0],
        duration: 300,
        ease: "outExpo",
      });
    }

    if (flapRef.current) {
      animate(flapRef.current, {
        rotateX: [0, -180],
        duration: 700,
        ease: "outCubic",
      });
    }

    if (letterRef.current) {
      animate(letterRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 700,
        delay: 600,
        ease: "outExpo",
      });
    }
  };

  const handleHover = () => {
    if (!isOpen && envelopeRef.current) {
      animate(envelopeRef.current, {
        rotate: [-2, 2, -2, 2, 0],
        duration: 500,
        ease: "inOutSine",
      });
    }
  };

  return (
    <>
      {/* Celebration */}
      {isContinuing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 2, 8, 0.97)",
            zIndex: 1040,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1.5rem",
            overflow: "hidden",
            padding: "1.5rem",
          }}
        >
          {/* Confetti */}
          {CONFETTI_PIECES.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: "absolute",
                left: piece.left,
                width: piece.width,
                height: piece.height,
                background: piece.bg,
                animation: `floatUp ${piece.duration} ease-in ${piece.delay} infinite`,
                bottom: "-20px",
                borderRadius: piece.borderRadius,
                opacity: 0,
              }}
            />
          ))}

          {/* Balloons */}
          {BALLOONS.map((balloon) => (
            <div
              key={balloon.id}
              style={{
                position: "absolute",
                bottom: "-100px",
                left: balloon.left,
                fontSize: "3rem",
                animation: `floatUp ${balloon.duration} ease-in ${balloon.delay} infinite`,
                opacity: 0,
              }}
            >
              {balloon.emoji}
            </div>
          ))}

          <p style={{ fontSize: "4rem", zIndex: 1 }}>
            💕🌹✨
          </p>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#fff5f0",
              zIndex: 1,
            }}
          >
            I love you more, pretty girl. ❤️
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "#c8973a",
              fontStyle: "italic",
              zIndex: 1,
            }}
          >
            And yes, I'm always going to win that argument, mi amor.
          </p>

          <CountdownRedirect />
        </div>
      )}

      {/* Letter popup */}
      <div
        ref={letterRef}
        role="dialog"
        aria-label="A letter for Roselia"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(360px, 90vw)",
          maxHeight: "85dvh",
          overflowY: "auto",
          background: "#fff5f0",
          borderRadius: "6px",
          padding: "2rem 1.75rem",
          opacity: 0,
          zIndex: 1020,
          boxShadow: "0 16px 60px rgba(232, 55, 90, 0.3)",
          textAlign: "center",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Top gold divider */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "#c8973a",
            margin: "0 auto 1.25rem",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: "#5a2030",
            fontStyle: "italic",
            lineHeight: 1.8,
            marginBottom: "1.25rem",
          }}
        >
          A little something for you, mi amor.
        </p>

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            color: "#e8375a",
            fontWeight: 700,
            marginBottom: "1.25rem",
            lineHeight: 1.65,
          }}
        >
          I wish I could be there to give you a kiss right now,
          but for now, I made you this instead. ❤️
        </p>

        <button
          type="button"
          onClick={() => setIsContinuing(true)}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#e8375a",
            border: "none",
            borderRadius: "3px",
            color: "#fff5f0",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Open your surprise ♡
        </button>

        {/* Bottom gold divider */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "#c8973a",
            margin: "1.25rem auto 0",
          }}
        />
      </div>

      {/* Background blur */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 2, 8, 0.6)",
            zIndex: 1010,
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* Envelope container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          ref={hintRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            color: "#c8973a",
            marginBottom: "1.5rem",
            fontStyle: "italic",
            opacity: 0.8,
            letterSpacing: "0.15em",
            pointerEvents: "none",
          }}
        >
          — a letter for you, tap to open —
        </p>

        <div ref={envelopeRef} style={{ width: "280px" }}>
          <svg
            viewBox="0 0 280 180"
            xmlns="http://www.w3.org/2000/svg"
            role="button"
            aria-label="Open your letter"
            tabIndex={isOpen ? -1 : 0}
            style={{
              cursor: isOpen ? "default" : "pointer",
              filter:
                "drop-shadow(0 8px 20px rgba(232,55,90,0.2))",
            }}
            onClick={handleOpen}
            onMouseEnter={handleHover}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Envelope body */}
            <rect
              x="0"
              y="40"
              width="280"
              height="140"
              rx="6"
              fill="#fff5f0"
            />

            <polygon
              points="0,180 140,108 280,180"
              fill="#f8bbd0"
            />

            <polygon
              points="0,42 0,180 108,111"
              fill="#fce4ec"
            />

            <polygon
              points="280,42 280,180 172,111"
              fill="#fce4ec"
            />

            <polygon
              points="0,42 140,128 280,42"
              fill="#fce4ec"
            />

            {/* Animated flap */}
            <g
              ref={flapRef}
              style={{
                transformOrigin: "50% 0%",
                transformBox: "fill-box",
              }}
            >
              <polygon
                points="0,42 140,130 280,42"
                fill="#f48fb1"
              />
            </g>

            {/* Heart seal */}
            <circle cx="140" cy="120" r="24" fill="#8b0000" />
            <circle cx="140" cy="120" r="20" fill="#b01840" />
            <circle cx="140" cy="120" r="16" fill="#e8375a" />

            <g transform="translate(140, 123)">
              <path
                d="M0 6 C0 6 -10 0 -10 -5 C-10 -9 -7 -11 -4 -11 C-2 -11 0 -9.5 0 -9.5 C0 -9.5 2 -11 4 -11 C7 -11 10 -9 10 -5 C10 0 0 6 0 6Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
