import * as isGlob from 'is-glob';
import * as path from 'path';

const extractParent = (str: string) => {
  // flip windows path separators
  if (process.platform === 'win32' && str.indexOf('/') < 0) {
    str = str.split('\\').join('/');
  }

  // special case for strings ending in enclosure containing path separator
  if (/[\{\[].*[\/]*.*[\}\]]$/.test(str)) {
    str += '/';
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  do {
    str = path.posix.dirname(str);
  } while (isGlob(str) || /(^|[^\\])([\{\[]|\([^\)]+$)/.test(str));

  return str.replace(/\\([\*\?\|\[\]\(\)\{\}])/g, '$1');
};

export default extractParent;
