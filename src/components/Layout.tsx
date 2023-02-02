import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import UserContextProvider from "@/context/UserContext";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <html lang="en">
      <Head>
        <title>Checkpoint4</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserContextProvider>
        <body className="w-screen h-screen flex flex-col">
          <NavBar />
          <main className="h-[calc(100%_-_8vh)] w-full flex fixed top-[8vh] bg-slate-50">
            {children}
          </main>
        </body>
      </UserContextProvider>
    </html>
  );
}

export default Layout;
