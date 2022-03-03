const crypto = require('crypto');

//REF: https://gist.github.com/kitek/1579117
const cryptograph = (password) => {
  const result = crypto.createHash('md5').update(password).digest('hex');
  return result;
};

module.exports = cryptograph;