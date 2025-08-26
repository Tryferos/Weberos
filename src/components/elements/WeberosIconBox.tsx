import {WeberosIcon} from '../atoms/WeberosIcon';
import cn from '../../util/cn';

type Props = {
  name: Parameters<typeof WeberosIcon>[0]['name'];
  iconClassName?: string;
  className?: string;
  onClick?: () => void;
};
export default function WeberosIconBox({
  name,
  className,
  iconClassName,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn('p-2 rounded-md', onClick && 'cursor-pointer', className)}>
      <WeberosIcon name={name} className={iconClassName} />
    </div>
  );
}
