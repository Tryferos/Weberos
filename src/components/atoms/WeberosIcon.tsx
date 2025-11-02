import {ComponentType, Suspense, SVGProps, useMemo} from 'react';
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
  animate?: boolean;
} & SVGIconProps;

export const WeberosIcon = ({
  name,
  animate,
  className,
  ...props
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

  if (animate && Icon) {
    return (
      <Suspense fallback={SuspenseSkeleton}>
        <Icon className={className} {...props} />
      </Suspense>
    );
  } else {
    return (
      <svg
        {...props}
        className={cn('size-5 stroke-white fill-transparent', className)}>
        <use href={`/sprite.svg#${name}`}></use>
      </svg>
    );
  }
};

export type SVGIconProps = {
  className?: string;
} & SVGProps<SVGSVGElement>;
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
