import cn from '../../util/cn';

export default function Spacer({className}: {className?: string}) {
  return <div className={cn('h-6', className)}></div>;
}
