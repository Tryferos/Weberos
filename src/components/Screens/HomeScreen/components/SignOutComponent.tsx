'use client';
import {signOut, useSession} from 'next-auth/react';

export const SignedOutComponent = () => {
  const {data: session} = useSession();
  if (session && session.user) {
    return (
      <div className="text-gray-light font-heading py-4 flex items-end">
        <p>{'Welcome\u00A0'}</p>
        <p
          title="Sign Out"
          onClick={() => signOut()}
          className="underline cursor-pointer font-heading  decoration-alert underline-offset-7 bg-gradient-to-b from-alert/30 to-alert/70 py-1 pl-[0.5px]">
          {'\u00A0'}
          {session.user.name}
          {'\u00A0'}
        </p>
      </div>
    );
  }
};
