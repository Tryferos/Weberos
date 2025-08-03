'use client';
import {WeberosIcon} from '@components/atoms/WeberosIcon';
import {useSession, signIn, signOut} from 'next-auth/react';

export const HomePageScreen = () => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] gap-y-1 translate-y-[-50%] top-[40%] flex flex-col">
      <p className="text-center text-3xl font-fantasy text-white">Weberos</p>
      <p className="text-center text-xl font-heading text-gray-light">
        Next.js Template
      </p>
      <SignedInComponent />
      <SignedOutComponent />
    </div>
  );
};

const SignedOutComponent = () => {
  const {data: session} = useSession();
  if (!session) {
    return (
      <>
        <aside className="h-4"></aside>
        <div
          onClick={() => signIn('google')}
          className="flex items-center gap-x-2 bg-blue-light/30 hover:bg-blue-light/40 cursor-pointer p-2 px-4">
          <WeberosIcon name="google" className="fill-blue-light" />
          <p className="text-white">Log in With Google</p>
        </div>
      </>
    );
  }
};

const SignedInComponent = () => {
  const {data: session} = useSession();
  if (session && session.user) {
    return (
      <div className="text-gray-light font-heading py-4 flex items-end">
        <p>{'Welcome\u00A0'}</p>
        <p
          title="Sign Out"
          onClick={() => signOut()}
          className="underline cursor-pointer  decoration-alert underline-offset-7 bg-gradient-to-b from-alert/30 to-alert/70 py-1 pl-[0.5px]">
          {'\u00A0'}
          {session.user.name}
          {'\u00A0'}
        </p>
      </div>
    );
  }
};
