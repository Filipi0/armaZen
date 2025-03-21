import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token && router.pathname !== "/login") {
        router.replace("/login");
      }
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
