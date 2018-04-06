module.exports = {
  siteMetadata: {
    title: 'Speaker Gender Diversity in Australian and New Zealand Tech Conferences',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },  
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet', 
  ],
};
