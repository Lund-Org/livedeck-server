module.exports = {
  /**
   * Concat a bunch of arrays with infinite arguments
   * @return {Array<mixed>} A single array with all the values in it
   */
  chainConcat () {
    return Array.from(arguments).reduce((carry, item) => {
      return carry.concat(item)
    })
  }
}
