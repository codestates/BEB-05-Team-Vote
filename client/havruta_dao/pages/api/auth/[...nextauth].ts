import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as Sentry from '@sentry/react';
import axios from 'axios';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      id: 'kaikas-credential',
      name: 'kaikas',
      type: 'credentials',
      credentials: {
        address: { label: 'address', type: 'text', placeholder: 'jsmith' },
        network: { label: 'network', type: 'number' },
      },
      async authorize(credentials: any, req) {
        let { address, network } = credentials;
        if (!address || !network) throw new Error('Missing address or network');
        return (
          axios
            .post(`http://localhost:8000/user/login`, {
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
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user.user_id = token.user_id;
      session.user.user_address = token.user_address;
      session.user.user_network = token.user_network;
      session.user.user_nickname = token.user_nickname;
      session.user.user_introduction = token.user_introduction;
      return session;
    },
  },
});
