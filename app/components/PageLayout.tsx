import React from "react";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      <main>{children}</main>
    </div>
  );
}
