const ApiRome = {
  //url of request
  url: process.env.URLAPIROME,

  //data body of request
  data: {
    grant_type: process.env.ROMEGT,
    client_id: process.env.ROMECI,
    client_secret: process.env.ROMECS,
    scope: process.env.ROMES,
  },

  //headers config
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

module.exports = ApiRome;
