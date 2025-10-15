import {useEffect, useRef, useState} from 'react';
import cn from '../../util/cn';
import {useInView} from 'motion/react';
type Props = {
  value: number;
  duration?: number;
  className?: string;
};
export default function AnimateNumber({
  value,
  className,
  duration = 100,
}: Props) {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useInView(elementRef);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showingNumber, setShowingNumber] = useState(0);
  const showingNumberRef = useRef(showingNumber);

  const easeOut = (number: number) => {
    const progress = number / value;
    const normalizedProgress = progress * 2 - 1;
    const easedProgress = Math.max(0, Math.pow(normalizedProgress, 3) * 1.5);
    return easedProgress * duration;
  };

  useEffect(() => {
    const tick = () => {
      if (showingNumberRef.current >= value) {
        return;
      }
      showingNumberRef.current = showingNumberRef.current + 1;
      setShowingNumber(showingNumberRef.current);

      timeoutRef.current = setTimeout(tick, easeOut(showingNumberRef.current));
    };
    if (isVisible) {
      tick();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, duration, isVisible]);

  return (
    <span
      ref={elementRef}
      className={cn('text-white font-heading text-3xl', className)}>
      {showingNumber}
    </span>
  );
}
