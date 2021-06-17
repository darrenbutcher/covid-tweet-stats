module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyDwHgrIuwqXAQKPz3eQ4g2W6aeLByATCAk",
          authDomain: "shoppin-all.firebaseapp.com",
          databaseURL: "https://shoppin-all.firebaseio.com",
          projectId: "shoppin-all",
          storageBucket: "shoppin-all.appspot.com",
          messagingSenderId: "42443155341",
          appId: "1:42443155341:web:52a13f13614d4109757fc4",
          measurementId: "G-VM9GGN1T8H",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `Balh Bleh`,
        start_url: `/app`,
        background_color: `#181818`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

