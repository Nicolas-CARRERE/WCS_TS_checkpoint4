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
        <body className="w-screen fixed flex flex-col h-screen">
          <NavBar />
          <main className="flex-grow flex">{children}</main>
        </body>
      </UserContextProvider>
    </html>
  );
}

export default Layout;
