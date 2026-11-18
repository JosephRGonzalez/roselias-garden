
import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";

const PAGES = [
  {
    title: "A Little Letter to You",
    emoji: "💌",
    content: [
      "Hi, my beautiful princess. ❤️",
      "I know I tell you how much I love you all the time, but sometimes I wish you could see yourself through my eyes. Maybe then you'd understand just how special you are to me.",
      "I made you this little book because I wanted to give you something you could come back to whenever you miss me, or whenever you need a reminder of how loved you are.",
      "I love you so much, mi amor. More than you know.",
    ],
  },
  {
    title: "The Day I Met You",
    emoji: "🌹",
    content: [
      "October 16th. ❤️",
      "I don't think you realize how much that day means to me. It's crazy to think that one date could turn into something that means this much to me.",
      "I didn't know exactly what to expect when we first met, but I know I left wanting to see you again.",
    ],
  },
  {
    title: "Since Our Hands Let Go",
    emoji: "🥹",
    content: [
      "My pretty girl, I miss you.",
      "I've missed you since the moment our hands let go of each other last Saturday. I wish I could've held onto you just a little longer.",
      "Sometimes I wish I could skip all the time we spend apart and go straight to the moment I get to see you again.",
      "I can't wait to hold you in my arms, kiss you, and just be close to you again, mi amor.",
    ],
  },
  {
    title: "My Peace and Happiness",
    emoji: "🤍",
    content: [
      "You make me so happy, princess.",
      "There's something about you that brings me so much peace. Even on the days when everything else feels stressful, just talking to you can make my whole day better.",
      "I love your affection, the way you make me feel wanted, and how comfortable I feel being myself with you.",
      "I hope I make you feel even half as happy as you make me, because you deserve to be the happiest girl in the world. And I want to be the one who makes you feel that way.",
    ],
  },
  {
    title: "I Love You More",
    emoji: "💕",
    content: [
      "Okay, pretty girl, we need to settle something.",
      "I love you more. And before you start arguing with me, just know that I've already decided I'm right. 😌",
      "You can tell me you love me more a thousand times, and I'll still tell you the same thing.",
      "But seriously, mi amor, I hope you never have to question how much I love you. I want you to feel it in the way I treat you, the way I care for you, and all the little things I do just to make you smile.",
    ],
  },
  {
    title: "Our Invisible String",
    emoji: "✨",
    content: [
      "Remember when you told me about the invisible string theory?",
      "I keep thinking about that. The idea that two people can be connected long before they even know each other. That somehow, through everything life puts them through, they still end up finding one another.",
      "I don't know how the universe works, princess. But I know that out of all the people in the world, somehow I found you.",
      "And I genuinely believe we were made for one another. You're my soulmate, mi amor. If there's really an invisible string connecting us, I hope it never breaks.",
      "I love you, my beautiful princess. Always. ❤️",
    ],
  },
];

const BOOK_W = 320;
const BOOK_H = 420;

export default function LoveBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const candleFlameRef = useRef<HTMLDivElement>(null);
  const candleGlowRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const flipPageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flame = candleFlameRef.current;
    const glow = candleGlowRef.current;

    if (!flame || !glow) return;

    const flameAnim = animate(flame, {
      scaleX: [1, 0.88, 1.1, 0.92, 1],
      scaleY: [1, 1.06, 0.96, 1.04, 1],
      translateX: [0, -1, 1, -1, 0],
      duration: 1600,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    const glowAnim = animate(glow, {
      opacity: [0.5, 0.85, 0.6, 0.95, 0.55],
      scale: [1, 1.1, 0.95, 1.08, 1],
      duration: 1600,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    return () => {
      flameAnim.pause();
      glowAnim.pause();
    };
  }, []);

  const openBook = () => {
    if (isOpening || isOpen || !coverRef.current) return;

    setIsOpening(true);

    animate(coverRef.current, {
      rotateY: [0, -160],
      duration: 900,
      ease: "outExpo",
      onComplete: () => {
        setIsOpen(true);
        setIsOpening(false);
      },
    });
  };

  const flipPage = (direction: "next" | "prev") => {
    if (isFlipping) return;
    if (direction === "next" && currentPage >= PAGES.length - 1) return;
    if (direction === "prev" && currentPage <= 0) return;
    if (!flipPageRef.current) return;

    setIsFlipping(true);

    animate(flipPageRef.current, {
      opacity: [1, 0],
      translateX: direction === "next" ? [0, -40] : [0, 40],
      duration: 250,
      ease: "inCubic",
      onComplete: () => {
        setCurrentPage((page) =>
          direction === "next" ? page + 1 : page - 1
        );

        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }

        if (flipPageRef.current) {
          animate(flipPageRef.current, {
            opacity: [0, 1],
            translateX: direction === "next" ? [40, 0] : [-40, 0],
            duration: 350,
            ease: "outCubic",
            onComplete: () => {
              setIsFlipping(false);
            },
          });
        } else {
          setIsFlipping(false);
        }
      },
    });
  };

  const page = PAGES[currentPage];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "0 1rem 4rem",
        gap: "1.5rem",
      }}
    >
      {/* Animated candle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div
          ref={candleFlameRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            ref={candleGlowRef}
            style={{
              position: "absolute",
              width: "70px",
              height: "70px",
              background:
                "radial-gradient(circle, rgba(255,180,50,0.45) 0%, transparent 70%)",
              top: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              filter: "blur(10px)",
              borderRadius: "50%",
            }}
          />

          <svg width="26" height="42" viewBox="0 0 26 42" fill="none">
            <path
              d="M13 42C5.8 42 1 35.5 1 28C1 19.5 8 13.5 10 8C11 5 12 2 13 0C14 2 15 5 16 8C18 13.5 25 19.5 25 28C25 35.5 20.2 42 13 42Z"
              fill="url(#fg3)"
            />
            <path
              d="M13 37C9.5 37 7 33 7 28C7 23 10.5 19 12 15C13 18 16 22 16 28C16 33 14.5 37 13 37Z"
              fill="rgba(255,255,200,0.85)"
            />
            <defs>
              <linearGradient
                id="fg3"
                x1="13"
                y1="0"
                x2="13"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#fff9a0" />
                <stop offset="35%" stopColor="#ffaa00" />
                <stop offset="100%" stopColor="#ff3300" />
              </linearGradient>
            </defs>
          </svg>

          <div
            style={{
              width: "1px",
              height: "8px",
              background: "#555",
            }}
          />
        </div>

        <div
          style={{
            width: "26px",
            height: "72px",
            background:
              "linear-gradient(180deg,#fffbf0 0%,#fde68a 60%,#f5c842 100%)",
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.12)",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            width: "34px",
            height: "7px",
            background: "linear-gradient(180deg,#f5c842,#c8973a)",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            width: "50px",
            height: "6px",
            marginTop: "4px",
            background:
              "radial-gradient(ellipse,rgba(255,180,50,0.25) 0%,transparent 70%)",
            filter: "blur(3px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Section label */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(200,151,58,0.6)",
          textAlign: "center",
        }}
      >
        Our Little Story
      </p>

      {/* Book */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!isOpen && !isOpening && (
          <div
            style={{
              position: "absolute",
              top: "-77px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.4rem 2.1rem",
              borderRadius: "999px",
              background: "rgba(200,151,58,0.12)",
              border: "1px solid rgba(200,151,58,0.3)",
              color: "rgba(200,151,58,0.9)",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            ✨ Tap the book to open
          </div>
        )}

        <div
          style={{
            width: `${BOOK_W}px`,
            height: `${BOOK_H}px`,
            position: "relative",
            perspective: "1400px",
          }}
        >
          {/* Pages underneath the cover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg,#fdfaf4,#fef9ee)",
              borderRadius: "0 8px 8px 0",
              boxShadow: "4px 4px 24px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            {/* Ruled paper texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.08,
                backgroundImage:
                  "repeating-linear-gradient(transparent,transparent 31px,#c8973a 31px,#c8973a 32px)",
                backgroundPosition: "0 56px",
                pointerEvents: "none",
              }}
            />

            {/* Left margin */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "52px",
                width: "1px",
                background: "rgba(220,100,100,0.3)",
                pointerEvents: "none",
              }}
            />

            {isOpen && (
              <div
                ref={flipPageRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.25rem 1.25rem 1rem 3.75rem",
                }}
              >
                {/* Page number and emoji */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(146,64,14,0.5)",
                    }}
                  >
                    {currentPage + 1} / {PAGES.length}
                  </span>

                  <span style={{ fontSize: "1.4rem" }}>
                    {page.emoji}
                  </span>
                </div>

                {/* Chapter title */}
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1rem,3.5vw,1.3rem)",
                    color: "#7c2d12",
                    fontWeight: 700,
                    borderBottom: "1px solid rgba(200,151,58,0.3)",
                    paddingBottom: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {page.title}
                </h2>

                {/* Scrollable chapter content */}
                <div
                  ref={contentRef}
                  className="book-content"
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    paddingRight: "0.4rem",
                  }}
                >
                  {page.content.map((paragraph, index) => (
                    <p
                      key={index}
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(0.88rem,2vw,1rem)",
                        fontStyle: "italic",
                        color: "rgba(50,15,5,0.8)",
                        lineHeight: "1.85",
                        marginBottom:
                          index < page.content.length - 1
                            ? "0.75rem"
                            : 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Page navigation */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(200,151,58,0.2)",
                    paddingTop: "0.6rem",
                    marginTop: "0.5rem",
                    flexShrink: 0,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => flipPage("prev")}
                    disabled={currentPage === 0 || isFlipping}
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.9rem",
                      color: "#92400e",
                      background: "none",
                      border: "none",
                      cursor:
                        currentPage === 0 || isFlipping
                          ? "not-allowed"
                          : "pointer",
                      opacity: currentPage === 0 ? 0.25 : 1,
                      minWidth: "65px",
                      textAlign: "left",
                      padding: 0,
                    }}
                  >
                    ← Prev
                  </button>

                  {/* Page indicators */}
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    {PAGES.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          height: "5px",
                          borderRadius: "999px",
                          transition: "all 0.3s ease",
                          width:
                            index === currentPage ? "16px" : "5px",
                          background:
                            index === currentPage
                              ? "#7c2d12"
                              : "#d97706",
                          opacity:
                            index === currentPage ? 1 : 0.35,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => flipPage("next")}
                    disabled={
                      currentPage === PAGES.length - 1 || isFlipping
                    }
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.9rem",
                      color: "#92400e",
                      background: "none",
                      border: "none",
                      cursor:
                        currentPage === PAGES.length - 1 || isFlipping
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        currentPage === PAGES.length - 1
                          ? 0.25
                          : 1,
                      minWidth: "65px",
                      textAlign: "right",
                      padding: 0,
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Page curl */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "32px",
                height: "32px",
                background:
                  "linear-gradient(225deg,#e0c88a 45%,#fdf6e3 50%)",
                clipPath: "polygon(100% 0,100% 100%,0 100%)",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Book spine */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "20px",
              zIndex: 3,
              background:
                "linear-gradient(180deg,#5c1a1a,#7c2d12,#5c1a1a)",
              boxShadow:
                "inset -3px 0 6px rgba(0,0,0,0.35), 2px 0 8px rgba(0,0,0,0.3)",
              borderRadius: "4px 0 0 4px",
            }}
          />

          {/* Animated cover */}
          {!isOpen && (
            <div
              ref={coverRef}
              onClick={openBook}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  openBook();
                }
              }}
              role="button"
              tabIndex={isOpening ? -1 : 0}
              aria-label="Open our little story"
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex: 2,
                cursor: isOpening ? "default" : "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg,#5c1a1a 0%,#7c2d12 40%,#6b1f1f 100%)",
                  borderRadius: "0 8px 8px 0",
                  boxShadow:
                    "6px 6px 30px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.9rem",
                }}
              >
                {/* Cover texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.08,
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.05) 3px,rgba(255,255,255,0.05) 4px)",
                  }}
                />

                {/* Cover lettering */}
                <div
                  style={{
                    paddingLeft: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.7rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "1px",
                      background: "rgba(200,151,58,0.5)",
                    }}
                  />

                  <span style={{ fontSize: "2rem" }}>📖</span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "clamp(1.3rem,5vw,1.7rem)",
                      color: "rgba(255,245,220,0.95)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      padding: "0 1rem",
                    }}
                  >
                    Our Little Story
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.82rem",
                      fontStyle: "italic",
                      color: "rgba(200,151,58,0.7)",
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      padding: "0 1.5rem",
                    }}
                  >
                    For Roselia, with all my love. ❤️
                  </p>

                  <div
                    style={{
                      width: "56px",
                      height: "1px",
                      background: "rgba(200,151,58,0.5)",
                    }}
                  />
                </div>

                {/* Cover ornaments */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "28px",
                    color: "rgba(200,151,58,0.4)",
                    fontSize: "0.8rem",
                  }}
                >
                  ❧
                </span>

                <span
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    color: "rgba(200,151,58,0.4)",
                    fontSize: "0.8rem",
                    transform: "rotate(180deg)",
                  }}
                >
                  ❧
                </span>
              </div>
            </div>
          )}
        </div>

        {isOpen && (
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "0.78rem",
              fontStyle: "italic",
              color: "rgba(200,151,58,0.4)",
              letterSpacing: "0.08em",
              textAlign: "center",
            }}
          >
            tap the arrows to turn pages
          </p>
        )}
      </div>
    </div>
  );
}
