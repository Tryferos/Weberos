'use client';
import GridMask from '@components/masks/GridMask';
import {SignedInComponent} from './components/SignInComponent';
import {SignedOutComponent} from './components/SignOutComponent';
import {SearchBarComponent} from './components/SearchBarComponent';
import Spacer from '@components/atoms/Spacer';

type Props = {
  hasEnvVariables: boolean;
};
export const HomePageScreen = ({hasEnvVariables}: Props) => {
  return (
    <>
      <div className="absolute left-[50%] translate-x-[-50%] gap-y-1 translate-y-[-50%] top-[40%] flex flex-col">
        <p className="text-center text-3xl font-fantasy text-white">Weberos</p>
        <p className="text-center text-xl font-heading text-gray-light">
          Next.js Template
        </p>
        {hasEnvVariables ? (
          <>
            <SignedInComponent />
            <SignedOutComponent />
          </>
        ) : (
          <p className="text-red-300 py-2 text-sm font-gray-light">
            Please set the environment variables.
          </p>
        )}
      </div>
      <GridMask />
    </>
  );
};
