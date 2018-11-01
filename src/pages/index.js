import React from 'react'
import AppHelper from '../components/AppHelper'
import Layout from '../components/layout'
import Callouts from '../components/Callouts'
import Charts from '../components/Charts'
import ConfList from '../components/ConfList'
import { graphql } from 'gatsby'

/* eslint-disable no-undef */
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
        }
      }
    }
  }
`
/* eslint react/prop-types: 0 */
/* eslint-disable react/display-name */
export default ({ data }) => {
  const augmentedConfData = new AppHelper().augmentConfData(
    data.allConfsJson.edges
  )

  return (
    <Layout>
      <div>
        <Charts confData={augmentedConfData.slice()} />
        <Callouts confData={augmentedConfData.slice()} />
        <ConfList confData={augmentedConfData.slice()} />
      </div>
    </Layout>
  )
}
