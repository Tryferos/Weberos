import cn from '../../util/cn';

type Props = {
  className?: string;
  isLoading: boolean;
};
export default function Loader({className, isLoading}: Props) {
  return (
    <div
      className={cn(
        'size-5 border-[3px] absolute left-[50%] -translate-x-[50%] border-gray-300 rounded-[50%] animate-spin',
        className,
        'border-t-[transparent]',
        !isLoading && 'opacity-0 pointer-events-none',
      )}></div>
  );
}
