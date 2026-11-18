
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import type { RefObject } from "react";

// October 16, 2026 — our very first date.
// Date-only constructor uses local time on the visitor's device.
const START_DATE = new Date(2026, 9, 16, 0, 0, 0);

function getElapsed() {
  const diff = Math.max(0, Date.now() - START_DATE.getTime());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function TimerUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const tensRef = useRef<HTMLSpanElement>(null);
  const onesRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(-1);

  useEffect(() => {
    if (prevValue.current === -1) {
      prevValue.current = value;

      if (tensRef.current) {
        tensRef.current.textContent = String(Math.floor(value / 10));
      }

      if (onesRef.current) {
        onesRef.current.textContent = String(value % 10);
      }

      return;
    }

    if (prevValue.current === value) return;

    const prevTens = Math.floor(prevValue.current / 10);
    const prevOnes = prevValue.current % 10;
    const newTens = Math.floor(value / 10);
    const newOnes = value % 10;

    prevValue.current = value;

    const animateDigit = (
      ref: RefObject<HTMLSpanElement | null>,
      newVal: number,
      changed: boolean
    ) => {
      if (!changed || !ref.current) return;

      const element = ref.current;

      animate(element, {
        translateY: [0, -20],
        opacity: [1, 0],
        duration: 200,
        ease: "inExpo",
        onComplete: () => {
          element.textContent = String(newVal);

          animate(element, {
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            ease: "outExpo",
          });
        },
      });
    };

    animateDigit(tensRef, newTens, newTens !== prevTens);
    animateDigit(onesRef, newOnes, newOnes !== prevOnes);
  }, [value]);

  const digitStyle = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    color: "#fff5f0",
    fontWeight: 700,
    lineHeight: 1,
    display: "inline-block",
  } as const;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          background: "rgba(26,10,15,0.8)",
          border: "1px solid rgba(200,151,58,0.3)",
          borderRadius: "12px",
          padding:
            "clamp(0.6rem, 2vw, 0.85rem) clamp(0.75rem, 2.5vw, 1.25rem)",
          minWidth: "clamp(60px, 15vw, 85px)",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 4px 20px rgba(232,55,90,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(200,151,58,0.4), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span ref={tensRef} style={digitStyle} />
          <span ref={onesRef} style={digitStyle} />
        </div>
      </div>

      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
          letterSpacing: "0.18em",
          color: "rgba(200,151,58,0.7)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function LoveTimer() {
  const [elapsed, setElapsed] = useState(getElapsed);

  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsed(getElapsed());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const label = labelRef.current;
    const date = dateRef.current;
    const wrap = wrapRef.current;
    const caption = captionRef.current;

    if (!wrap) return;

    const animations: ReturnType<typeof animate>[] = [];

    if (label) {
      animations.push(
        animate(label, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700,
          ease: "outExpo",
          delay: 200,
        })
      );
    }

    if (date) {
      animations.push(
        animate(date, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          ease: "outExpo",
          delay: 350,
        })
      );
    }

    animations.push(
      animate(wrap.querySelectorAll(".timer-unit"), {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.8, 1],
        delay: stagger(100, { start: 500 }),
        duration: 700,
        ease: "outExpo",
      })
    );

    if (caption) {
      animations.push(
        animate(caption, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700,
          ease: "outExpo",
          delay: 1000,
        })
      );
    }

    return () => {
      animations.forEach((animation) => {
        animation.pause();
      });
    };
  }, []);

  const units = [
    { label: "Days", value: elapsed.days },
    { label: "Hours", value: elapsed.hours },
    { label: "Minutes", value: elapsed.minutes },
    { label: "Seconds", value: elapsed.seconds },
  ];

  return (
    <section
      aria-label="Time since our first date"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        width: "100%",
        padding: "1.5rem 0 2rem",
      }}
    >
      <p
        ref={labelRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.8rem, 2vw, 1rem)",
          letterSpacing: "0.2em",
          color: "#c8973a",
          textTransform: "uppercase",
          opacity: 0,
          textAlign: "center",
        }}
      >
        — the day of our very first date —
      </p>

      <h2
        ref={dateRef}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 600,
          color: "#fff5f0",
          opacity: 0,
          textAlign: "center",
          margin: 0,
        }}
      >
        October 16, 2026 ❤️
      </h2>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          color: "rgba(255,245,240,0.65)",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Time since our first date
      </p>

      <div
        ref={wrapRef}
        style={{
          display: "flex",
          gap: "clamp(0.5rem, 3vw, 1.5rem)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="timer-unit"
            style={{ opacity: 0 }}
          >
            <TimerUnit value={value} label={label} />
          </div>
        ))}
      </div>

      <p
        ref={captionRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "#fff5f0",
          fontStyle: "italic",
          opacity: 0,
          textAlign: "center",
          maxWidth: "440px",
          lineHeight: 1.7,
          padding: "0 1rem",
        }}
      >
        And somehow, one date turned into someone I can't imagine
        not having in my life. 💕
      </p>
    </section>
  );
}
