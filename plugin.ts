import type { BetterAuthPlugin } from "better-auth";

export const customUserFields = () => {
  return {
    id: "custom-user-fields",
    schema: {
      user: {
        fields: {
          fullName: { type: "string", required: true },
          universityId: { type: "number", required: true },
          universityCard: { type: "string", required: true },
          status: { type: "string", defaultValue: "PENDING" },
          role: { type: "string", defaultValue: "USER" },

          lastActivityDate: { type: "string", required: false },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};
