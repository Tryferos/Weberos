import {Provider} from 'next-auth/providers/index';
import GoogleProvider from 'next-auth/providers/google';
import {ServerEnvironment} from '@constants/env-server';

const AuthProviders: Provider[] = [];
if (
  ServerEnvironment.GOOGLE_CLIENT_ID &&
  ServerEnvironment.GOOGLE_CLIENT_SECRET
) {
  AuthProviders.push(
    GoogleProvider({
      clientId: ServerEnvironment.GOOGLE_CLIENT_ID,
      clientSecret: ServerEnvironment.GOOGLE_CLIENT_SECRET,
    }),
  );
}

export default AuthProviders;
