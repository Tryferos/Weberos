'use client';
import WeberosIconBox from '@components/elements/WeberosIconBox';
import usePopupStore, {PopupState} from '@store/popup-store';
import cn from '../../util/cn';

export const PopupHeader = ({
  description,
  icon,
  title,
}: Pick<PopupState, 'description' | 'icon' | 'title'>) => {
  const setPopup = usePopupStore(s => s.setPopup);
  return (
    <header className="flex justify-between gap-x-4 rounded-t-xl bg-gray-200/20 shadow-b-sm items-center w-full max-sm:px-2 px-4 pt-4 pb-2">
      <div className="flex gap-x-2 items-center w-[70%]">
        {icon && (
          <WeberosIconBox
            name={icon}
            className="bg-font-sec/10 min-w-10"
            iconClassName="text-font-sec"
          />
        )}
        <div className="flex flex-col w-[100%]">
          {title && (
            <p
              className={cn(
                'font-medium font-body max-sm:text-base',
                !description && 'text-lg',
              )}>
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-focus truncate relative -top-1 max-sm:text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
      <WeberosIconBox
        name="cancel"
        className="bg-error/10 hover:bg-error/20 min-w-10"
        iconClassName="text-error"
        onClick={() => setPopup(null)}
      />
    </header>
  );
};
