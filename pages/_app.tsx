import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import NavBar from "../component/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
