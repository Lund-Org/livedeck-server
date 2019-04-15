class FakeResponse {
  constructor () {
    this.response = null
    this.headers = {}
  }

  json (data, headers = { statusCode: 200 }) {
    this.response = data
    this.headers = headers
  }
}

module.exports = FakeResponse
