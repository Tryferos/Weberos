import {twMerge} from 'tailwind-merge';

type Props = {
  className?: string;
  round?: boolean;
  repeat?: number;
  children?: React.ReactNode;
  isLoading?: boolean;
};
export const Skeleton = ({
  className,
  round,
  repeat = 1,
  children,
  isLoading,
}: Props) => {
  if (!isLoading) {
    return children;
  }
  if (repeat === 1) {
    return <SingleSkeleton className={className} round={round} />;
  } else {
    return (
      <div aria-hidden="true" className="flex flex-col gap-1">
        {new Array(repeat).fill(1).map((_, i) => (
          <SingleSkeleton className={className} round={round} key={i} />
        ))}
      </div>
    );
  }
};

const SingleSkeleton = ({className, round}: Props) => {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        'h-2 w-full bg-gray-300 animate-pulse',
        round && 'rounded-full size-12',
        className,
      )}></div>
  );
};
