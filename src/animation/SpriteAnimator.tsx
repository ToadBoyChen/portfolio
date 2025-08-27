import { useState, useEffect } from 'react';

interface SpriteAnimatorProps {
  images: string[];      // An array of image paths
  fps?: number;          // Animation speed in frames per second
  className?: string;    // To pass through styling
}

function SpriteAnimator({ images, fps = 10, className }: SpriteAnimatorProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = 1000 / fps;
    const animationInterval = setInterval(() => {
      setFrame(prevFrame => (prevFrame + 1) % images.length);
    }, interval);

    return () => clearInterval(animationInterval);
  }, [images.length, fps]); // Rerun the effect if the images or speed change

  return (
    <img
      src={images[frame]}
      alt="Animated character sprite"
      className={className}
    />
  );
}

export default SpriteAnimator;