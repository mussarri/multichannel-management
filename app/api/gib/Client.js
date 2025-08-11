// Client.js
import axios from "axios";

export default class Client {
  static headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  constructor(url, parameters = null, post = true, cookieJar = "") {
    this.response = {};
    this.cookie = cookieJar;

    return (async () => {
      try {
        const options = {
          method: post ? "POST" : "GET",
          url,
          headers: {
            ...Client.headers,
            ...(cookieJar ? { Cookie: cookieJar } : {}),
          },
        };

        if (post && parameters) {
          const payload = new URLSearchParams(parameters);
          options.data = payload;
        }

        const res = await axios(options);

        // Cookie yakalama
        const setCookie = res.headers["set-cookie"];
        if (setCookie && setCookie.length > 0) {
          this.cookie = setCookie.join("; ");
        }

        if (res.data && typeof res.data === "object") {
          this.response = res.data;
        }

        if (
          !this.response ||
          this.response.error ||
          (this.response.data && this.response.data.hata)
        ) {
          throw {
            name: "ApiException",
            message: "İstek başarısız oldu.",
            parameters,
            response: this.response,
            statusCode: res.status,
          };
        }
      } catch (err) {
        if (err.name === "ApiException") throw err;

        throw {
          name: "BadResponseException",
          message: err.message,
          parameters,
          response: null,
          statusCode: err.response?.status || 0,
        };
      }
      return this;
    })();
  }

  get(element = null) {
    return element === null ? this.response : this.response[element];
  }

  object(element = null) {
    const jsonStr = JSON.stringify(this.response);
    const jsonObj = JSON.parse(jsonStr);
    return element === null ? jsonObj : jsonObj[element];
  }

  getCookie() {
    return this.cookie;
  }
}
