'use client';
import WeberosIconBox from '@components/elements/WeberosIconBox';
import usePopupStore, {PopupState} from '@store/popup-store';
import {twMerge} from 'tailwind-merge';

export const PopupHeader = ({description, icon, title}: PopupState) => {
  const setPopup = usePopupStore(s => s.setPopup);
  return (
    <header className="flex justify-between gap-x-4 bg-gray-200/20 shadow-b-sm items-center w-full px-4 pt-4 pb-2">
      <div className="flex gap-x-2 items-center">
        {icon && (
          <WeberosIconBox
            name={icon}
            className="bg-blue-light/10 min-w-10"
            iconClassName="text-blue-light"
          />
        )}
        <div className="flex flex-col">
          {title && (
            <p
              className={twMerge(
                'font-medium font-heading',
                !description && 'text-lg',
              )}>
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-focus truncate">{description}</p>
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
