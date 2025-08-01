import {useEffect, useRef, useState} from 'react';
import {twMerge} from 'tailwind-merge';

type Props = {
  text: string[];
  speed?: number;
  stopOnLimit?: boolean;
  className?: string;
};
export const ChangingText = ({
  text,
  speed = 500,
  className,
  stopOnLimit = true,
}: Props) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (stopOnLimit && index >= text.length) {
      timerRef.current && clearInterval(timerRef.current);
      return;
    }
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, speed);
    timerRef.current = interval;
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [text, speed, index, stopOnLimit]);
  return (
    <p className={twMerge('', className)}>
      {text?.[Math.max(0, Math.min(index % text.length, text.length - 1))] ??
        ''}
    </p>
  );
};
