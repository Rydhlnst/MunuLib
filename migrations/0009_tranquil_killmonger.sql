CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN', 'LIBRARIAN', 'SUPERADMIN');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('PENDING', 'VERIFIED', 'REJECTED');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"public"."user_status";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DATA TYPE "public"."user_status" USING "status"::"public"."user_status";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER'::"public"."user_role";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."user_role" USING "role"::"public"."user_role";