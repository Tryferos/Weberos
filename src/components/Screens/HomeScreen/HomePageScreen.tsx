'use client';
import GridMask from '@components/masks/GridMask';
import {SignedInComponent} from './components/SignInComponent';
import {SignedOutComponent} from './components/SignOutComponent';
import {SearchBarComponent} from './components/SearchBarComponent';
import Spacer from '@components/atoms/Spacer';
import Loader from '@components/atoms/Loader';
import LoadingButton from '@components/elements/LoadingButton';
import AnimateNumber from '@components/elements/AnimateNumber';
import ScrollView from '@components/elements/ScollView';
import NoiseMask from '@components/masks/NoiseMask';
import ImageCarousel from './components/ImageCarousel';

type Props = {
  hasEnvVariables: boolean;
};
export const HomePageScreen = ({hasEnvVariables}: Props) => {
  const onPress = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  return (
    <>
      <NoiseMask />
      <Spacer className="h-400" />
      <div className="absolute items-center left-[50%] translate-x-[-50%] gap-y-1 translate-y-[-50%] top-[40%] flex flex-col">
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
        <Spacer className="h-2" />
        <SearchBarComponent />
        <Spacer className="h-4" />
        <LoadingButton onPress={onPress} className="">
          <h1 className="font-heading text-sm">i like to load, a lot.</h1>
        </LoadingButton>
        <Spacer className="h-4" />
        <ImageCarousel />
      </div>
      <GridMask />
    </>
  );
};
