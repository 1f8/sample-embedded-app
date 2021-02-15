/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
// const React = require('react')
import { EmptyState, Layout } from '@shopify/polaris'
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

const Index = () => (
  <div>
    <Layout>
      <EmptyState heading='Discount your products temporarily'
          action={{
            content : 'Select products',
            onAction: () => console.log('clicked'),
          }}
          image={img}>
        <p>Select products to change their price temporarily.</p>
      </EmptyState>
    </Layout>
  </div>
)
  
  export default Index