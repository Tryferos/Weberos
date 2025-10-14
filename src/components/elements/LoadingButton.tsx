'use client';
import {ReactNode, useState} from 'react';
import cn from '../../util/cn';
import Loader from '@components/atoms/Loader';

type Props<T> = {
  className?: string;
  onPress: () => Promise<T>;
  children: ReactNode;
};
export default function LoadingButton<T = void>({
  className,
  onPress,
  children,
}: Props<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const res = await onPress();
      setIsLoading(false);
      return res;
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center relative px-4 text-white group py-2 justify-between outline-blue-light hover:bg-blue-light/20 bg-blue-light/10 outline rounded-xl',
        isLoading
          ? 'bg-blue-light/20 cursor-default *:nth-[1]:opacity-75 *:nth-[1]:brightness-85'
          : 'cursor-pointer',
        className,
      )}>
      {children}
      <Loader className="border-blue-light" isLoading={isLoading} />
    </button>
  );
}
