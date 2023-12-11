function randomInt(mn, mx) {
  const min = Math.ceil(mn);
  const max = Math.floor(mx);
  return Math.floor(Math.random() * (max - min) + min);
  //  The maximum is exclusive and the minimum is inclusive
}

module.exports = randomInt