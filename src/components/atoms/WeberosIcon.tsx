import {ComponentType, Suspense, useMemo} from 'react';
import cn from '../../util/cn';
import dynamic from 'next/dynamic';
export type WeberosIconNames =
  | 'cancel'
  | 'cancel-circle'
  | 'google'
  | 'search'
  | 'react'
  | 'golang'
  | 'javascript';
type WeberosIconProps = {
  name: WeberosIconNames;
  className?: string;
  // ** onClick needs a client component to use it.
  onClick?: () => void;
  containerClassName?: string;
};
export const WeberosIcon = ({
  name,
  className,
  onClick,
  containerClassName,
}: WeberosIconProps) => {
  const Icon = useMemo(() => Icons[name], [name]);
  const SuspenseSkeleton = useMemo(() => {
    return (
      <figure
        aria-hidden="true"
        className={cn(
          'size-6 rounded-full bg-gray-200/50 animate-pulse',
          className,
        )}></figure>
    );
  }, [className]);
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'p-2 cursor-pointer group hover:bg-icon-hover rounded-full self-start flex-none',
          containerClassName,
        )}>
        <Suspense fallback={SuspenseSkeleton}>
          <Icon className={className} />
        </Suspense>
      </div>
    );
  } else if (Icon) {
    return (
      <Suspense fallback={SuspenseSkeleton}>
        <Icon className={className} />
      </Suspense>
    );
  } else {
    return null;
  }
};

export type SVGIconProps = {
  className?: string;
};
const Icons: {
  [key in WeberosIconNames]: ComponentType<SVGIconProps>;
} = {
  cancel: dynamic(() => import('@icons/svg/icon-cancel')),
  'cancel-circle': dynamic(() => import('@icons/svg/icon-cancel-circle')),
  google: dynamic(() => import('@icons/svg/icon-google')),
  search: dynamic(() => import('@icons/svg/icon-search')),
  react: dynamic(() => import('@icons/svg/icon-react')),
  javascript: dynamic(() => import('@icons/svg/icon-javascript')),
  golang: dynamic(() => import('@icons/svg/icon-golang')),
};
