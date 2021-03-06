/**
 *
 *  :: cookies.js ::
 *
 *  A complete cookies reader/writer framework with full unicode support.
 *
 *  Revision #3 - July 13th, 2017
 *
 *  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 *  https://developer.mozilla.org/User:fusionchess
 *  https://github.com/madmurphy/cookies.js
 *
 *  This framework is released under the GNU Public License, version 3 or later.
 *  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 *  Syntaxes:
 *
 *  * setCookie(name, value[, end[, path[, domain[, secure]]]])
 *  * getCookie(name)
 *  * removeCookie(name[, path[, domain]])
 *  * hasCookie(name)
 *  * getCookies()
 *
 */

/**
 * @param {string} sKey
 * @return {string}
 */
export function getCookie(sKey) {
  if (!sKey) {
    return null;
  }
  return decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')) || null;
}

/**
 * @param {string} sKey
 * @param {string} sValue
 * @param {string|number|Date} vEnd
 * @param {string=} sPath
 * @param {string=} sDomain
 * @param {string=} bSecure
 * @return {boolean}
 */
export function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  let sExpires = '';
  if (vEnd) {
    if (typeof vEnd === 'string') {
      sExpires = `; expires=${vEnd}`;
    } else if (vEnd instanceof Date) {
      sExpires = `; expires=${vEnd.toUTCString()}`;
    } else {
      sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
      /*
      Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
      version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
      the end parameter might not work as expected. A possible solution might be to convert the the
      relative time to an absolute time. For instance, replacing the previous line with:
      */
      /*
      sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : ";
      expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
      */
    }
  }
  document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
  return true;
}

/**
 * @param {string} sKey
 * @return {boolean}
 */
export function hasCookie(sKey) {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  return (new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`)).test(document.cookie);
}

/**
 * @param {string} sKey
 * @param {string=} sPath
 * @param {string=} sDomain
 * @return {boolean}
 */
export function removeCookie(sKey, sPath, sDomain) {
  if (!hasCookie(sKey)) {
    return false;
  }
  document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}`;
  return true;
}

/** @return {string[]} */
export function getCookies() {
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/);
  for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx += 1) {
    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
  }
  return aKeys;
}
