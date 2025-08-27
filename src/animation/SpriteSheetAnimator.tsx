import React, { useState, useEffect, useRef } from 'react';

interface SpriteSheetAnimatorProps {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
  className?: string;
}

function SpriteSheetAnimator({
  spriteSheet,
  frameCount,
  frameWidth,
  frameHeight,
  fps = 4,
  className
}: SpriteSheetAnimatorProps) {
  const [frame, setFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setFrame(0); 
      setIsLoaded(true);
    };
    img.src = spriteSheet;
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [spriteSheet]);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const frameInterval = 1000 / fps;
      if (deltaTime > frameInterval) {
        setFrame(prevFrame => (prevFrame + 1) % frameCount);
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isLoaded) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isLoaded, frameCount, fps]);

  const aspectRatio = frameWidth / frameHeight;
  const backgroundSize = `${frameCount * 100}% 100%`;
  const backgroundPosition = `-${frame * 100}% 0%`;
  
  if (!isLoaded) {
    return <div style={{ width: '100%', aspectRatio: aspectRatio }} className={className} />;
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        aspectRatio: aspectRatio,
        backgroundImage: `url(${spriteSheet})`,
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'repeat',
      }}
      role="img"
      aria-label="Animated character sprite"
    />
  );
}

export default SpriteSheetAnimator;