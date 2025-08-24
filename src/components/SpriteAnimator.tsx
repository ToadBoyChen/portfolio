import React, { useState, useEffect } from 'react';

interface SpriteAnimatorProps {
  images: string[];      // An array of image paths
  fps?: number;          // Animation speed in frames per second
  className?: string;    // To pass through styling
}

function SpriteAnimator({ images, fps = 10, className }: SpriteAnimatorProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Calculate the interval delay based on the desired FPS
    const interval = 1000 / fps;

    // Set up an interval to update the frame
    const animationInterval = setInterval(() => {
      // Move to the next frame, looping back to 0 if at the end
      setFrame(prevFrame => (prevFrame + 1) % images.length);
    }, interval);

    // IMPORTANT: Clean up the interval when the component unmounts
    // to prevent memory leaks.
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