import {PropsWithChildren} from 'react';
import cn from '../../util/cn';

type Props = {
  className?: string;
} & PropsWithChildren &
  React.ComponentPropsWithRef<'div'>;

export default function ScrollView({className, children, ref}: Props) {
  return (
    <div
      ref={ref}
      className={cn('overflow-y-auto h-full custom-scrollbar', className)}>
      {children}
    </div>
  );
}
