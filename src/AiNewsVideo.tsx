import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  staticFile,
  Audio,
} from "remotion";

export interface AiNewsVideoProps {
  headline?: string;
  company?: string;
  mainBenefit?: string;
  bulletPoints?: string[];
  impact?: string;
  hashtags?: string;
}

// Background particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.sin(frame * 0.015 + i * 0.7) * 40 + 50,
    y: ((frame * 0.25 + i * 60) % 130) - 15,
    size: 3 + Math.sin(i * 0.8) * 2,
    opacity: 0.25 + Math.sin(frame * 0.04 + i) * 0.15,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "white",
            borderRadius: "50%",
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

// Glowing orb
const GlowingOrb: React.FC<{ color: string; delay: number; position: { x: string; y: string }; size?: number }> = ({
  color,
  delay,
  position,
  size = 500,
}) => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin(frame * 0.025 + delay) * 0.15;
  const opacity = 0.35 + Math.sin(frame * 0.018 + delay) * 0.15;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        filter: "blur(80px)",
        pointerEvents: "none",
      }}
    />
  );
};

export const AiNewsVideo = ({
  headline = '',
  company = '',
  mainBenefit = '',
  bulletPoints = [],
  impact = '',
  hashtags = '',
}: AiNewsVideoProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const primaryColor = "#ff3366";
  const accentColor = "#7c3aed";

  // Animations (controlled by frame delays instead of Sequence)
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const bulletSprings = bulletPoints.map((_, i) =>
    spring({
      frame: frame - 60 - i * 10,
      fps,
      config: { damping: 14, stiffness: 70 },
    })
  );

  const impactSpring = spring({
    frame: frame - 340,
    fps,
    config: { damping: 12, stiffness: 50 },
  });

  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0a14 0%, #141428 40%, #1a1a3e 100%)",
        fontFamily: "'Noto Sans Khmer', 'Battambang', sans-serif",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Load Google Fonts directly */}
      <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Noto+Sans+Khmer:wght@400;600;800&display=swap" rel="stylesheet" />

      {/* Audio */}
      <Audio src={staticFile("music/background.mp3")} volume={0.25} />

      {/* Background effects */}
      <GlowingOrb color="#ff3366" delay={0} position={{ x: "15%", y: "25%" }} size={600} />
      <GlowingOrb color="#7c3aed" delay={3} position={{ x: "85%", y: "55%" }} size={550} />
      <GlowingOrb color="#3b82f6" delay={5} position={{ x: "50%", y: "85%" }} size={500} />
      <Particles />

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "rgba(255,255,255,0.08)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
            boxShadow: `0 0 30px ${primaryColor}60`,
          }}
        />
      </div>

      {/* AI Hunter Brand */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 24px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 30,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700 }}>AI Hunter</span>
        <span style={{ fontSize: 28 }}>🤖</span>
      </div>

      {/* MAIN CONTAINER: Flexbox layout without Sequence wrappers */}
      <AbsoluteFill
        style={{
          padding: "160px 40px 40px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 40, // Proper spacing
        }}
      >
        {/* HEADER SECTION */}
        <div style={{ textAlign: "center", width: "100%" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 36px",
                background: `linear-gradient(135deg, ${primaryColor}40, ${accentColor}40)`,
                borderRadius: 50,
                border: `2px solid ${primaryColor}80`,
                marginBottom: 20,
                opacity: badgeSpring,
                transform: `scale(${0.8 + badgeSpring * 0.2})`,
                boxShadow: `0 0 50px ${primaryColor}50`,
              }}
            >
              <span style={{ fontSize: 32 }}>🔥</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>AI NEWS</span>
              <span style={{ fontSize: 32 }}>🔥</span>
            </div>

            <h1
              style={{
                fontSize: 92,
                fontWeight: 900,
                margin: 0,
                background: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 80px ${primaryColor}50`,
                lineHeight: 1.1,
                opacity: titleSpring,
                transform: `translateY(${(1 - titleSpring) * 60}px)`,
                paddingBottom: 20,
              }}
            >
              {headline}
            </h1>
        </div>

        {/* SUBHEADER SECTION */}
        <div style={{ textAlign: "center", width: "100%" }}>
            <div
              style={{
                opacity: subtitleSpring,
                transform: `translateY(${(1 - subtitleSpring) * 40}px)`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "20px 40px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 20,
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 52, fontWeight: 800, color: primaryColor, display: "block" }}>
                  {company}
                </span>
                <span style={{ fontSize: 44, opacity: 0.9, fontWeight: 600 }}>ទើបបញ្ចេញមុខងារថ្មី! 🚀</span>
              </div>
              
              <p style={{ 
                fontSize: 42,
                color: "#d0d0e0", 
                margin: 0,
                lineHeight: 1.4
              }}>
                {mainBenefit}
              </p>
            </div>
        </div>

        {/* BULLET POINTS SECTION - Vertical Stack */}
        <div style={{ 
          width: "100%", 
          maxWidth: 960, 
          display: "flex", 
          flexDirection: "column", 
          gap: 24, 
          flex: 1,
          alignItems: "center", 
        }}>
            {bulletPoints.map((point, i) => (
              <div
                key={i}
                style={{
                  width: "100%", 
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 30,
                  padding: "25px 35px",
                  background: `linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`, 
                  borderRadius: 20,
                  backdropFilter: "blur(30px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  opacity: bulletSprings[i],
                  transform: `translateY(${(1 - bulletSprings[i]) * 20}px)`, 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: 60, 
                    height: 60,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${primaryColor}50`,
                  }}
                >
                  <span style={{ fontSize: 32, fontWeight: 900, color: "white" }}>✓</span>
                </div>
                <span
                  style={{
                    fontSize: 42, 
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: "#ffffff",
                    textAlign: "left", 
                    flex: 1, 
                  }}
                >
                  {point}
                </span>
              </div>
            ))}
        </div>

        {/* FOOTER SECTION - IMPACT */}
        <div style={{ paddingBottom: 60, textAlign: "center" }}>
            <div
              style={{
                opacity: impactSpring,
                transform: `scale(${0.6 + impactSpring * 0.4})`,
              }}
            >
              <div
                style={{
                  padding: "30px 60px",
                  background: `linear-gradient(135deg, ${primaryColor}40, ${accentColor}40)`,
                  borderRadius: 30,
                  border: `3px solid ${primaryColor}`,
                  boxShadow: `0 0 100px ${primaryColor}60`,
                }}
              >
                <h2
                  style={{
                    fontSize: 64, 
                    fontWeight: 900,
                    margin: 0,
                    color: "white",
                    textShadow: `0 0 40px ${primaryColor}`,
                  }}
                >
                  {impact}! 🚀
                </h2>
              </div>
            </div>
        </div>
      </AbsoluteFill>

      {/* Hashtags (Absolute at bottom, safe from flex flow) */}
      <div
          style={{
            position: "absolute",
            bottom: 35,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: spring({ frame: frame - 400, fps, config: { damping: 20 } }),
          }}
        >
          <p
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 2,
              fontWeight: 500,
            }}
          >
            {hashtags}
          </p>
      </div>
    </AbsoluteFill>
  );
};
