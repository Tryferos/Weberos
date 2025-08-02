import {MongoDBAdapter} from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import dbClient from './db';
import AuthProviders from './auth-providers';

export const AuthHandler = NextAuth({
  adapter: dbClient ? MongoDBAdapter(dbClient) : undefined,
  providers: AuthProviders,
  session: {strategy: 'jwt'},
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({token, account, trigger}) {
      if (trigger === 'signIn') {
        token.provider = account?.provider;
      }
      return token;
    },
    session({session, token}) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).userId = token.sub;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
});

/**
- GET /api/auth/signin – login page
- POST /api/auth/signin/google – start Google flow
- GET /api/auth/callback/google – callback
- GET /api/auth/session – current session (JSON)
- GET /api/auth/signout – logout
 */
