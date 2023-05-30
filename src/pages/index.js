import React from 'react'
import { AppHelper } from '../components/AppHelper'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Callouts from '../components/Callouts'
import Charts from '../components/Charts'
import ConfList from '../components/ConfList'
import Legend from '../components/Legend'

export const query = graphql`
  {
    allConfsJson {
      edges {
        node {
          name
          location
          year
          totalSpeakers
          numberOfWomen
          source
          dateAdded
          confDate
          status
        }
      }
    }
  }
`

const Page = ({ data }) => {
  const augmentedConfData = new AppHelper().augmentConfData(
    data.allConfsJson.edges
  )

  return (
    <Layout>
      <div>
        <Charts confData={augmentedConfData.slice()} />
        <Legend />
        <br />
        <Callouts confData={augmentedConfData.slice()} />
        <ConfList confData={augmentedConfData.slice()} />
      </div>
    </Layout>
  )
}

export default Page
