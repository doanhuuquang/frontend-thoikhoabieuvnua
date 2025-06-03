import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <h1>this is authlayout</h1>
      {children}
    </main>
  );
}
