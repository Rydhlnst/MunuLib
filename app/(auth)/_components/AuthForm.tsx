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

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
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
                          // Placeholder UI untuk Upload yang lebih cantik
                          <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {/* Icon Upload Sederhana */}
                              <svg
                                className="w-8 h-8 mb-2 text-muted-foreground group-hover:text-primary transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="text-xs text-muted-foreground font-medium">
                                Click to upload ID Card
                              </p>
                            </div>
                            {/* <ImageUpload {...field} /> <-- Pasang komponen aslimu disini nanti */}
                          </div>
                        ) : (
                          <Input
                            required
                            type={
                              FIELD_TYPES[key as keyof typeof FIELD_TYPES] ??
                              "text"
                            }
                            // Style input diperbarui: lebih tinggi, transisi halus, dan shadow tipis
                            className="h-11 px-4 bg-background shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                            placeholder={`Enter your ${key.toLowerCase().replace(/([a-z])([A-Z])/g, '$1 $2')}`}
                            {...field}
                          />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="submit"
                className="w-full h-11 mt-4 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
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
                  className="text-primary font-semibold hover:text-primary/80 transition-colors hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors hover:underline"
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