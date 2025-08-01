'use client';

import {WeberosIcon} from '@components/atoms/WeberosIcon';
import {useWeberosQuery} from '@hooks/useWeberosQuery';
import Network from '@network/index';

export const HomePageScreen = () => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] gap-y-1 translate-y-[-50%] top-[40%] flex flex-col">
      <p className="text-center text-3xl font-fantasy text-white">Weberos</p>
      <p className="text-center text-xl font-heading text-gray-light">
        Next.js Template
      </p>
      <WeberosIcon name="cancel" className="text-white" onClick={() => {}} />
    </div>
  );
};
