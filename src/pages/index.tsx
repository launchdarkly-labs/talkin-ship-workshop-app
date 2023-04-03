import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationMenuDemo from "@/components/menu";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useFlags } from "launchdarkly-react-client-sdk";
import APIMigrationState from "@/components/status-toast";
import StoreContent from "@/components/storecontent";
import InitialContent from "@/components/initialcontent";
import { useState } from "react";


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_DB_URL + "/graphql/v1",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      apiKey: process.env.NEXT_PUBLIC_DB_ANON_KEY,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Home() {
  //import flag values
  const { storeEnabled } = useFlags();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <title>The Toggle Store</title>
          {/* ...remaining head content... */}
        </Head>
        <header className={styles.header}>
          <NavigationMenuDemo />
        </header>
        {storeEnabled ? <StoreContent /> : <InitialContent />}  
      </ApolloProvider>
    </>
  );
}
