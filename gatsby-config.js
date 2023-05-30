module.exports = {
  siteMetadata: {
    title:
      'Speaker Gender Diversity in Australian and New Zealand Tech Conferences',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-transformer-json',
  ],
}
