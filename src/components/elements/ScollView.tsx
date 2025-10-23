'use client';
import {ComponentPropsWithRef, useMemo} from 'react';
import cn from '@util/cn';

type Props = {
  className?: string;
  direction?: 'horizontal' | 'vertical';
} & ComponentPropsWithRef<'div'>;

export default function ScrollView(props: Props) {
  const {className, direction, children, id, ...rest} = props;

  const ScrollViewComponent = useMemo(() => {
    return (
      <div
        {...rest}
        id={id}
        className={cn(
          'custom-scrollbar',
          direction === 'horizontal'
            ? 'overflow-x-auto w-full horizontal'
            : 'overflow-y-auto h-full',

          className,
        )}>
        {children}
      </div>
    );
  }, [id, direction, className, children]);

  return ScrollViewComponent;
}
