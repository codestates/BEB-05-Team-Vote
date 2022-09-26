import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as Sentry from '@sentry/react';
import axios from 'axios';

const createOptions: any = (req: any) => ({
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 3 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: 'kaikas-credential',
      name: 'kaikas',
      type: 'credentials',

      credentials: {},
      async authorize(credentials: any, req) {
        let { address, network } = credentials;
        if (!address || !network) throw new Error('Missing address or network');
        return (
          axios
            .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/login`, {
              user_address: address,
              user_network: network,
            })
            .then((response) => {
              return response.data.data[0];
            })
            .catch((error) => {
              Sentry.captureException(error);
              throw new Error(error.response.data.message);
            }) || null
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (req.url === '/api/auth/session?update') {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userinfo?user_id=${token.user_id}`
        );
        token = res.data[0];
      }
      return { ...token, ...user };
    },

    async session({ session, user, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token;
      return session;
    },
  },
});

export default async (req: any, res: any) => {
  return NextAuth(req, res, createOptions(req));
};
