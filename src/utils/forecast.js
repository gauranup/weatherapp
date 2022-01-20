const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=850bfe023712ed6830ef2320652c2cd1&query=" +
    lat +
    "," +
    long;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location.Try again!!!", undefined);
    } else {
      callback(
        undefined,

        "It is  currently " +
          response.body.current.temperature +
          " degrees out. It feels like " + 
          response.body.current.feelslike
      );
    }
  });};

module.exports = forecast;
