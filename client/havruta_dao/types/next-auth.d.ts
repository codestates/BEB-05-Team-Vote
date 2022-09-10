import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      user_id?: number | unknown;
      user_address?: string | unknown;
      user_network?: string | unknown;
      user_nickname?: string | unknown;
      user_introduction?: string | unknown;
    } & DefaultSession['user'];
  }
}
/**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
interface User {
  user_id?: number | unknown;
  user_address?: string | unknown;
  user_network?: string | unknown;
  user_nickname?: string | unknown;
  user_introduction?: string | unknown;
}
/**
 * Usually contains information about the provider being used
 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
 */
interface Account {
  user_id?: number | unknown;
  user_address?: string | unknown;
  user_network?: string | unknown;
  user_nickname?: string | unknown;
  user_introduction?: string | unknown;
}
/** The OAuth profile returned from your provider */
interface Profile {}
