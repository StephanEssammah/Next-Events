import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import DesktopNav from "../components/DesktopNav";
import MobileNav from "../components/MobileNav";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex flex-col h-screen bg-gray-800 justify-between lg:justify-start">
        <DesktopNav />
        <Component {...pageProps} />
        <MobileNav />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
