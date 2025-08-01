import {lazy, LazyExoticComponent, ReactNode, useMemo} from 'react';
import {twMerge} from 'tailwind-merge';
type IconNames = 'cancel' | 'cancel-circle';
type WeberosIconProps = {
  name: IconNames;
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
        className={twMerge(
          'p-2 cursor-pointer group hover:bg-icon-hover rounded-full self-start flex-none',
          containerClassName,
        )}>
        <Icon className={className} />
      </div>
    );
  } else {
    return <Icon className={className} />;
  }
};

export type SVGIconProps = {
  className?: string;
};
const Icons: {
  [key in IconNames]: LazyExoticComponent<(_: SVGIconProps) => ReactNode>;
} = {
  cancel: lazy(() => import('../../icons/svg/cancel')),
  'cancel-circle': lazy(() => import('../../icons/svg/cancel-circle')),
};
