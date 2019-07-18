export default Object.freeze({
  appKey: process.env.APP_KEY,
  environment: process.env.NODE_ENV,
  services: {
    yelp: process.env.YELP_API_KEY,
  },
  jwt: {
    expiration: '1 day',
  },
})
