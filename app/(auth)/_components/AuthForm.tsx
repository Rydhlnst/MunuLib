/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  Path,
} from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { ZodType } from "zod";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";

  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const router = useRouter();

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await onSubmit(data);

      if (!response.success) {
        toast.error(isSignIn ? "Sign In Failed" : "Sign Up Failed", {
          description: response.error ?? "Something went wrong",
        });

        setServerError(response.error ?? "Something went wrong");
        return;
      }

      toast.success(isSignIn ? "Signed In Successfully" : "Account Created!", {
        description: isSignIn
          ? "You're now logged in — welcome back!"
          : "Your account has been created successfully.",
      });

      // OPTIONAL redirect here:
      router.push("/");

    } catch (error: any) {
      console.error("AuthForm Error:", error);

      toast.error("Unexpected Error", {
        description: error.message ?? "Something went wrong",
      });

      setServerError(error.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <Card className="w-full max-w-md border-none shadow-xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-base">
            {isSignIn
              ? "Enter your credentials to access MunuLib."
              : "Please fill in your details to join the library."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              {Object.keys(defaultValues).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as Path<T>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground/80 capitalize">
                        {FIELD_NAMES[key as keyof typeof FIELD_NAMES] ??
                          key.replace(/([A-Z])/g, " $1")}
                      </FormLabel>

                      <FormControl>
                        {key === "universityCard" ? (
                          <FileUpload
                            type="image"
                            accept="image/*"
                            placeholder="Upload your University ID"
                            folder="imageUpload"
                            variant="light"
                            onUploaded={(url) => field.onChange(url)}
                            value={field.value ?? null}
                          />

                        ) : (
                          <Input
                            required
                            disabled={loading}
                            type={
                              FIELD_TYPES[key as keyof typeof FIELD_TYPES] ??
                              "text"
                            }
                            className="h-11 px-4 bg-background shadow-sm transition-all"
                            placeholder={`Enter your ${key
                              .toLowerCase()
                              .replace(/([a-z])([A-Z])/g, "$1 $2")}`}
                            {...field}
                          />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {serverError && (
                <p className="text-red-500 text-center text-sm -mt-2">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-4 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                {loading
                  ? isSignIn
                    ? "Signing In..."
                    : "Creating Account..."
                  : isSignIn
                    ? "Sign In"
                    : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? (
              <>
                Don’t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
