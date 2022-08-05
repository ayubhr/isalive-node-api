/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */

const TokenGenerator = require('uuid-token-generator');

export const generateToken = () => {
  const tokengen = new TokenGenerator(256, TokenGenerator.BASE62);

  return tokengen.generate();
};

export const cleanHost = host => {
  return isEmpty(host) ? null : host.replace(/https|:|\/|http|www./g, '');
};

export const decorateResponse = data => {
  const suspended = new RegExp(/6,0,0,0,0,0,0/);
  const dangerous = new RegExp(/2,0,0,1|3,0,0,1/);

  if (dangerous.test(data)) {
    return 'flagged';
  } else if (suspended.test(data)) {
    return 'suspended';
  } else {
    return 'clean';
  }
};

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
