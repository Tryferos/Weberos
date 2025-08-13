import {PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';

type Props = {
  className?: string;
} & PropsWithChildren &
  React.ComponentPropsWithRef<'div'>;

export default function ScrollView({className, children, ref}: Props) {
  return (
    <div
      ref={ref}
      className={twMerge('overflow-y-auto h-full custom-scrollbar', className)}>
      {children}
    </div>
  );
}
