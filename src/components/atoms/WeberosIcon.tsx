import {ComponentType, Suspense, SVGProps, useMemo} from 'react';
import cn from '../../util/cn';
import dynamic from 'next/dynamic';

type CommonIconNames =
  | 'cancel'
  | 'cancel-circle'
  | 'google'
  | 'search'
  | 'react'
  | 'golang'
  | 'javascript';
export type WeberosIconNamesAnimated = CommonIconNames;
export type WeberosIconNames = CommonIconNames | 'flower';

type WeberosIconProps = SVGIconProps &
  (
    | {animatable: true; name: WeberosIconNamesAnimated}
    | {name: WeberosIconNames}
  );

export const WeberosIcon = ({name, className, ...props}: WeberosIconProps) => {
  const Icon = useMemo(() => Icons[name as WeberosIconNamesAnimated], [name]);
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

  if ('animatable' in props && props.animatable && Icon) {
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
  [key in WeberosIconNamesAnimated]: ComponentType<SVGIconProps>;
} = {
  cancel: dynamic(() => import('@icons/svg/icon-cancel')),
  'cancel-circle': dynamic(() => import('@icons/svg/icon-cancel-circle')),
  google: dynamic(() => import('@icons/svg/icon-google')),
  search: dynamic(() => import('@icons/svg/icon-search')),
  react: dynamic(() => import('@icons/svg/icon-react')),
  javascript: dynamic(() => import('@icons/svg/icon-javascript')),
  golang: dynamic(() => import('@icons/svg/icon-golang')),
};
