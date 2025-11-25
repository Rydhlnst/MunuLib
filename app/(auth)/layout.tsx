import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel (onboarding) */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-muted/40 border-r border-border">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome to <span className="text-primary">Munulib</span>.
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            The smart way to access, borrow, and explore your library collection.
            Everything you need is just one click away.
          </p>

          {/* Optional image or illustration */}
          <div className="mt-6">
            <Image
                src="/illustration/authentication.svg"
                alt="Onboarding Illustration"
                width={600}         
                height={600}
                className="max-w-md w-full h-auto opacity-90"
                priority
                />
          </div>
        </div>
      </div>

      {/* Right panel = Auth form */}
      <div className="flex items-center justify-center px-6 py-10 lg:px-16">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
