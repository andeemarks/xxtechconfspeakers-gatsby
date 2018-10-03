import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Legend from '../components/Legend'

/* eslint-disable func-style */
const TemplateWrapper = ({ children }) => (
  <div
    style={{
      backgroundColor: '#000',
      color: '#fff',
      margin: '0 auto',
      maxWidth: 960,
      padding: '0px 1.0875rem 1.45rem',
      paddingTop: 0,
    }}
  >
    <Helmet
      title="Speaker Gender Diversity at Australian and New Zealand Tech Conferences"
      meta={[
        {
          name: 'description',
          content:
            'Speaker Gender Diversity at Australian and New Zealand Tech Conferences',
        },
        {
          name: 'keywords',
          content:
            'conference, conferences, diversity, technology, australia, new zealand, speakers',
        },
      ]}
    />
    <Header />
    <div>{children}</div>
    <Legend />
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
