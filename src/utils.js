const timer = (ms) => { return new Promise(res => setTimeout(res, ms)); }

module.exports = {
  timer
}
