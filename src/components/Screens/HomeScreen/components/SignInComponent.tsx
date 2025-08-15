'use client';
import {WeberosIcon} from '@components/atoms/WeberosIcon';
import {signIn, useSession} from 'next-auth/react';

export const SignedInComponent = () => {
  const {data: session} = useSession();
  if (!session) {
    return (
      <>
        <aside className="h-4"></aside>
        <div
          onClick={() => signIn('google')}
          className="flex items-center gap-x-2 font-heading bg-blue-light/30 hover:bg-blue-light/40 cursor-pointer p-2 px-4">
          <WeberosIcon name="google" className="fill-blue-light" />
          <p className="text-white">Log in With Google</p>
        </div>
      </>
    );
  }
};
