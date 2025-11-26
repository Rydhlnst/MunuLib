import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import bcrypt from "bcryptjs";
import * as schema from "./database/schema";
import db from "./database/drizzle";
import { customUserFields } from "./plugin";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  plugins: [
    customUserFields(),
    nextCookies(),
  ],

  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,

    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,

    password: {
      hash: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      },
      verify: async ({ hash, password }) => {
        return bcrypt.compare(password, hash);
      },
    },
  },
});
