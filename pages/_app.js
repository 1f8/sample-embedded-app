/* eslint-disable react/jsx-no-undef */
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import ClientRouter from '../components/ClientRouter'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from '@shopify/app-bridge-react'
import '@shopify/polaris/dist/styles.css'
import translations from '@shopify/polaris/locales/en.json'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
})

class MyApp extends App {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { Component, pageProps, shopOrigin } = this.props
    // eslint-disable-next-line no-undef
    const config = { apiKey: API_KEY, shopOrigin, forceRedirect: true }

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
}

MyApp.getInitialProps = async ({ ctx }) => ({ shopOrigin: ctx.query.shop })

export default MyApp