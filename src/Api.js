import "whatwg-fetch";
export default class Api {
  /**
   * Given a URI GETs the associated resource from the VUE_APP_API_BASE_URL specified in .env.[mode]
   * @param {String} uri - the resource location
   * @returns {Promise} a promise object representing the deserialized JSON of the response body
   */
  get = uri => {
    return fetch(uri, {
      method: "GET"
    }).then(response => response.json());
  };

  /**
   * Given a URI POSTs the associated resource from the VUE_APP_API_BASE_URL specified in .env.[mode]
   * @param {String} uri - the resource location
   * @param {Object} [body={}] - request body submitted with the POST request
   * @returns {Promise} a promise object representing the deserialized JSON of the response body
   */
  put = (uri, body = {}) => {
    return fetch(uri, {
      method: "PUT",
      body: JSON.stringify(body)
    }).then(response => response.json());
  };
}
