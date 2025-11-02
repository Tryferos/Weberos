'use client';
import {WeberosIcon} from '@components/atoms/WeberosIcon';
import usePopupStore from '@store/popup-store';

export const SearchBarComponent = () => {
  const setPopup = usePopupStore(s => s.setPopup);
  const handleClick = () => {
    setPopup('browse', {data: {startingString: '@yahoo.gr'}});
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-2 outline-blue-light hover:bg-blue-light/20 bg-blue-light/10 font-medium outline-1 cursor-pointer rounded-xl p-2 px-4">
      <WeberosIcon name="search" className="" />
      <p className="text-gray-light text-sm font-heading">Start Searching</p>
    </div>
  );
};
