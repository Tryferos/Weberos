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
  duration = 20,
}: Props) {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useInView(elementRef);

  const invervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showingNumber, setShowingNumber] = useState(0);
  const showingNumberRef = useRef(showingNumber);

  useEffect(() => {
    if (isVisible) {
      invervalRef.current = setInterval(() => {
        if (showingNumberRef.current >= value) {
          clearInterval(invervalRef.current!);
          return;
        }
        showingNumberRef.current = showingNumberRef.current + 1;
        setShowingNumber(prev => prev + 1);
      }, duration);
    } else if (invervalRef.current) {
      clearInterval(invervalRef.current);
    }
    return () => {
      clearInterval(invervalRef.current!);
    };
  }, [value, duration, isVisible]);

  return (
    <h2
      ref={elementRef}
      className={cn('text-white font-heading text-3xl', className)}>
      {showingNumber}
    </h2>
  );
}
