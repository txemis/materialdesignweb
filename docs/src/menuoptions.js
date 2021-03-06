import { setCookie, removeCookie, getCookie } from './cookies';

const darkAttribute = 'black dark';
const lightAttribute = 'white light';

/**
 * @param {boolean} value
 * @param {Element=} button
 * @return {void}
 */
export function setRTLMode(value, button) {
  if (value) {
    document.documentElement.setAttribute('dir', 'rtl');
    if (button) {
      button.removeAttribute('mdw-inactive');
    }
    // element.setAttribute('mdw-active', '');
    // Poor visibility even though spec says 70% opacity
    setCookie('rtlmode', 'true', 365);
  } else {
    document.documentElement.removeAttribute('dir');
    if (button) {
      button.setAttribute('mdw-inactive', '');
    }
    // element.removeAttribute('mdw-active');
    removeCookie('rtlmode');
  }
}

/**
 * @param {boolean} value
 * @param {Element=} button
 * @return {void}
 */
export function setDarkMode(value, button) {
  if (value) {
    document.documentElement.setAttribute('mdw-theme-fill', darkAttribute);
    if (button) {
      button.removeAttribute('mdw-inactive');
    }
    // element.setAttribute('mdw-active', '');
    // Poor visibility even though spec says 70% opacity
  } else {
    document.documentElement.setAttribute('mdw-theme-fill', lightAttribute);
    if (button) {
      button.setAttribute('mdw-inactive', '');
    }
    // element.removeAttribute('mdw-active');
  }
  setCookie('darkmode', value ? 'true' : 'false', 365);
}

/**
 * @param {string} value
 * @param {Element=} button
 * @return {void}
 */
export function setFontSize(value, button) {
  if (value) {
    document.documentElement.style.setProperty('font-size', value);
    if (button) {
      button.removeAttribute('mdw-inactive');
    }
    // element.setAttribute('mdw-active', '');
    // Poor visibility even though spec says 70% opacity
    setCookie('fontsize', value, 365);
  } else {
    document.documentElement.style.removeProperty('font-size');
    if (button) {
      button.setAttribute('mdw-inactive', '');
    }
    // element.removeAttribute('mdw-active');
    removeCookie('fontsize');
  }
}

/**
 * @param {Element} element
 * @return {void}
 */
function setupRTLMode(element) {
  if (getCookie('rtlmode') === 'true') {
    setRTLMode(true, element);
  }
  element.addEventListener('click', () => {
    if (document.documentElement.getAttribute('dir') === 'rtl') {
      setRTLMode(false, element);
    } else {
      setRTLMode(true, element);
    }
  });
}

/**
 * @param {Element} element
 * @return {void}
 */
function setupDarkMode(element) {
  if (getCookie('darkmode') === 'true') {
    setDarkMode(true, element);
  }
  element.addEventListener('click', () => {
    if (document.documentElement.getAttribute('mdw-theme-fill') === darkAttribute) {
      setDarkMode(false, element);
    } else {
      setDarkMode(true, element);
    }
  });
}

/**
 * @param {Element} element
 * @return {void}
 */
function setupLargeFontMode(element) {
  const fontsize = getCookie('fontsize');
  setFontSize(fontsize, element);
  element.addEventListener('click', () => {
    if (document.documentElement.style.getPropertyValue('font-size')) {
      setFontSize(null, element);
    } else {
      setFontSize('125%', element);
    }
  });
}

/** @return {void} */
export function setupMenuOptions() {
  const buttons = document.getElementById('docs-menu-buttons').getElementsByClassName('mdw-button');
  const buttonRTLMode = buttons[0];
  const buttonDarkMode = buttons[1];
  const largeFontMode = buttons[2];
  setupRTLMode(buttonRTLMode);
  setupDarkMode(buttonDarkMode);
  setupLargeFontMode(largeFontMode);
}
