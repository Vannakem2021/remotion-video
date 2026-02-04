import React from 'react';
import {AbsoluteFill, Sequence, Img, Audio, useCurrentFrame, interpolate, useVideoConfig, spring} from 'remotion';
import {staticFile} from 'remotion';

// Voiceover timing (in seconds) - sync captions to audio
const VOICE_TIMES = {
  hook: { start: 0, end: 3 },
  fact1: { start: 3, end: 8 },
  fact2: { start: 8, end: 13 },
  superpower: { start: 13, end: 23 },
  conclusion: { start: 23, end: 30 }
};

export const DogStoryVideo: React.FC = () => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Convert to seconds
  const currentTime = frame / fps;

  // Pexels images
  const images = {
    hook: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
    fact1: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg",
    fact2: "https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg",
    superpower: "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg",
    conclusion: "https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg"
  };

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {/* Load Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@600;800&display=swap" rel="stylesheet" />
      {/* Background Music */}
      <Audio
        src={staticFile("music.mp3")}
        volume={0.12}
        startFrom={0}
      />

      {/* Voiceover */}
      <Audio
        src={staticFile("voiceover.mp3")}
        volume={1.0}
      />

      {/* Scene 1: Hook (0-3s) - Dog nose close-up */}
      <Sequence from={0} durationInFrames={3 * fps}>
        <AnimatedImage 
          src={images.hook} 
          effect="zoomIn"
          startTime={0}
          currentTime={currentTime}
        />
        <CaptionBox 
          lines={["Your dog knows when you're stressed", "before you do"]}
          isActive={currentTime >= VOICE_TIMES.hook.start && currentTime < VOICE_TIMES.hook.end}
        />
      </Sequence>

      {/* Scene 2: Fact 1 (3-8s) - Dog with big numbers */}
      <Sequence from={3 * fps} durationInFrames={5 * fps}>
        <AnimatedImage 
          src={images.fact1} 
          effect="panRight"
          startTime={3}
          currentTime={currentTime}
        />
        <CaptionBox 
          lines={["Dogs have", "300 MILLION scent receptors"]}
          highlightLine={1}
          isActive={currentTime >= VOICE_TIMES.fact1.start && currentTime < VOICE_TIMES.fact1.end}
        />
      </Sequence>

      {/* Scene 3: Fact 2 (8-13s) - Comparison */}
      <Sequence from={8 * fps} durationInFrames={5 * fps}>
        <AnimatedImage 
          src={images.fact2} 
          effect="zoomSlow"
          startTime={8}
          currentTime={currentTime}
        />
        <CaptionBox 
          lines={["Humans?", "Only 6 MILLION"]}
          highlightLine={1}
          isActive={currentTime >= VOICE_TIMES.fact2.start && currentTime < VOICE_TIMES.fact2.end}
        />
      </Sequence>

      {/* Scene 4: Superpower (13-23s) - Multiple items */}
      <Sequence from={13 * fps} durationInFrames={10 * fps}>
        <AnimatedImage 
          src={images.superpower} 
          effect="panUp"
          startTime={13}
          currentTime={currentTime}
        />
        <CaptionBox 
          lines={[
            "They can smell fear, anxiety,",
            "and even diseases like",
            "cancer and diabetes"
          ]}
          isActive={currentTime >= VOICE_TIMES.superpower.start && currentTime < VOICE_TIMES.superpower.end}
        />
      </Sequence>

      {/* Scene 5: Conclusion (23-30s) */}
      <Sequence from={23 * fps} durationInFrames={7 * fps}>
        <AnimatedImage 
          src={images.conclusion} 
          effect="zoomInSlow"
          startTime={23}
          currentTime={currentTime}
        />
        <CaptionBox 
          lines={["They're not just pets.", "They're biological sensors"]}
          highlightLine={1}
          isActive={currentTime >= VOICE_TIMES.conclusion.start && currentTime < VOICE_TIMES.conclusion.end}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// Animated image with various Ken Burns effects
const AnimatedImage: React.FC<{
  src: string;
  effect: 'zoomIn' | 'panRight' | 'zoomSlow' | 'panUp' | 'zoomInSlow';
  startTime: number;
  currentTime: number;
}> = ({src, effect, startTime, currentTime}) => {
  const relativeTime = Math.max(0, currentTime - startTime);
  const progress = Math.min(relativeTime / 5, 1); // 5 seconds max animation
  
  let transform = '';
  let transformOrigin = 'center center';
  
  switch(effect) {
    case 'zoomIn':
      transform = `scale(${1 + progress * 0.15})`;
      break;
    case 'zoomSlow':
      transform = `scale(${1 + progress * 0.1})`;
      break;
    case 'zoomInSlow':
      transform = `scale(${1.05 + progress * 0.1})`;
      break;
    case 'panRight':
      transform = `scale(1.2) translateX(${-progress * 5}%)`;
      break;
    case 'panUp':
      transform = `scale(1.15) translateY(${progress * 3}%)`;
      break;
  }
  
  return (
    <div style={{
      position: 'absolute', 
      width: '100%', 
      height: '100%',
      overflow: 'hidden'
    }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.5)',
          transform,
          transformOrigin,
          transition: 'none'
        }}
      />
    </div>
  );
};



// Avant-Garde Kinetic Caption System
const CaptionBox: React.FC<{
  lines: string[];
  highlightLine?: number;
  isActive: boolean;
}> = ({lines, highlightLine, isActive}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  if (!isActive) return null;

  return (
    <div style={{
      position: 'absolute',
      // Center vertically and horizontally by default, then push down slightly
      // to avoid covering the main subject (dog's face usually in center-top)
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', // Push to bottom third
      alignItems: 'center',
      paddingBottom: '12%', // Give it some breathing room from the absolute bottom
      zIndex: 10,
    }}>
        {lines.map((line, lineIndex) => {
          const isHighlight = lineIndex === highlightLine;
          const words = line.split(' ');
          
          return (
            <div 
              key={lineIndex} 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0 16px', // Tighter tracking for that poster look
                marginBottom: lineIndex < lines.length - 1 ? 0 : 0, // No margin, stack tight
                // Rotate slightly for a dynamic feel on highlighted lines
                transform: isHighlight ? 'rotate(-1deg)' : 'none',
              }}
            >
              {words.map((word, wordIndex) => {
                // Snappier, more aggressive stagger
                const wordDelay = lineIndex * 4 + wordIndex * 2;
                const wordSpring = spring({
                  frame: frame - wordDelay,
                  fps,
                  config: { damping: 12, stiffness: 200, mass: 0.8 },
                });

                return (
                  <span
                    key={wordIndex}
                    style={{
                      display: 'inline-block',
                      // MASSIVE typography
                      fontSize: isHighlight ? 120 : 85, 
                      // 'Bebas Neue' is the core of this look
                      fontFamily: "'Bebas Neue', sans-serif", 
                      lineHeight: 0.85, // Ultra tight leading
                      color: isHighlight ? '#ccff00' : '#ffffff', // Neon Lime vs White
                      
                      // Aggressive kinetic entrance
                      opacity: wordSpring,
                      transform: `
                        translateY(${(1 - wordSpring) * 60}px) 
                        scale(${0.5 + wordSpring * 0.5})
                        rotate(${(1 - wordSpring) * 10}deg)
                      `,
                      
                      // Critical for legibility without a box
                      textShadow: isHighlight 
                        ? '0 0 20px rgba(204, 255, 0, 0.4)' 
                        : '4px 4px 0 #000000', // Hard retro drop shadow
                      
                      // Just a touch of tracking
                      letterSpacing: '1px',
                    }}>
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default DogStoryVideo;
