import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationMenuDemo from "@/components/menu";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import StoreContent from "@/components/storecontent";
import InitialContent from "@/components/initialcontent";

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

export default function Home({country}: any) {
  // TODO: This gets the country from the edge function, but it overwrites the manually set country
  // TODO: Move country logic to global context
  //   const ldclient = useLDClient();
  // const context: any = ldclient?.getContext();
  // context.location.country = country;
  // ldclient?.identify(context);

  //import flag values
  const { storeEnabled } = useFlags();

  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <title>Toggle Outfitters</title>
        </Head>
        <header className={styles.header}>
          <NavigationMenuDemo country={country} />
        </header>
        {storeEnabled ? <StoreContent /> : <InitialContent />}
      </ApolloProvider>
    </>
  );
}

export const getServerSideProps = ({ query }:any) => ({
  props: query
});
