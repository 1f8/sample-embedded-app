/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import ClientRouter from '../components/ClientRouter'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from '@shopify/app-bridge-react'
import '@shopify/polaris/dist/styles.css'
import translations from '@shopify/polaris/locales/en.json'
// import Cookies from 'js-cookie'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
})

function MyApp ({ Component, pageProps }) {
    // eslint-disable-next-line no-undef
    // shopOrigin should be set in cookies but not able to get it, so for testing purpose using process.env value
    const config = { apiKey: API_KEY, shopOrigin: SHOP, forceRedirect: true }

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet='utf-8' />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    )
}

export default MyApp