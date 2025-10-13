import {ComponentType, ReactNode, useMemo} from 'react';
import cn from '../../util/cn';
import dynamic from 'next/dynamic';
export type WeberosIconNames = 'cancel' | 'cancel-circle' | 'google' | 'search';
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
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'p-2 cursor-pointer group hover:bg-icon-hover rounded-full self-start flex-none',
          containerClassName,
        )}>
        <Icon className={className} />
      </div>
    );
  } else if (Icon) {
    return <Icon className={className} />;
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
};
