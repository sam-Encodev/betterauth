import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

const baseurl = import.meta.env.VITE_BASE_URL;

export const authClient = createAuthClient({
  baseURL: baseurl,
  basePath: "/api/auth",
  withCredentials: true,
  plugins: [adminClient()],
  trustedOrigins: [String(baseurl)],
});

export const {
 signIn,
 signUp,
 signOut,
 getSession,
 useSession,
 listSessions,
 revokeSession,
 changePassword,
 revokeSessions,
 getAccessToken,
} = authClient;