import {twMerge} from 'tailwind-merge';

export default function Spacer({className}: {className?: string}) {
  return <div className={twMerge('h-6', className)}></div>;
}
