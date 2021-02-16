/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react'
import { EmptyState, Layout, Page } from '@shopify/polaris'
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

const Index = () => {
  const [ open, setOpen ] = useState(false)

  const handleSelection = (resources) => {
    setOpen(false)
    console.log(resources)
  }

  return (
    <Page>
      <TitleBar title='Sample App'
        primaryAction={{
          content: 'Select products',
        }} />
      <ResourcePicker resourceType='Product'
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setOpen(false)} />
      <Layout>
        <EmptyState heading='Discount your products temporarily'
            action={{
              content : 'Select productss',
              onAction: () => {
                setOpen(true)
              },
            }}
            image={img}>
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
      </Layout>
    </Page>
  )
}

export default Index