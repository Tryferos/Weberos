import {PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';

type Props = {
  className?: string;
} & PropsWithChildren;

export default function ScrollView({className, children}: Props) {
  return (
    <div
      className={twMerge(
        'overflow-y-auto h-full pt-6 custom-scrollbar',
        className,
      )}>
      {children}
    </div>
  );
}
