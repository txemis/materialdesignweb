import { Ripple } from '../ripple/index';
import { findElementParentByClassName, dispatchDomEvent } from '../common/dom';

class ListItem {
  /**
   * @param {Element} listItemElement
   * @return {void}
   */
  static attach(listItemElement) {
    Ripple.attach(listItemElement);
    listItemElement.addEventListener('click', ListItem.onClick);
  }

  /**
   * @param {Element} listItemElement
   * @return {void}
   */
  static detach(listItemElement) {
    listItemElement.removeEventListener('click', ListItem.onClick);
    Ripple.detach(listItemElement);
  }

  /**
   * @param {MouseEvent|KeyboardEvent|PointerEvent} event
   * @return {void}
   */
  static onClick(event) {
    const el = event.currentTarget;
    dispatchDomEvent(el, 'mdw:itemactivated');
  }
}

class ListExpander {
  /**
   * @param {Element} listExpanderElement
   * @return {void}
   */
  static attach(listExpanderElement) {
    if (!listExpanderElement.firstElementChild) {
      return;
    }
    listExpanderElement.firstElementChild.addEventListener('click', ListExpander.onItemClicked);
  }

  static detach(listExpanderElement) {
    if (!listExpanderElement.firstElementChild) {
      return;
    }
    listExpanderElement.firstElementChild.removeEventListener('click', ListExpander.onItemClicked);
  }

  /**
   * @param {Event} event
   * @return {void}
   */
  static onItemClicked(event) {
    const listExpanderElement = findElementParentByClassName(event.target, 'mdw-list__expander');
    if (!listExpanderElement) {
      return;
    }
    if (listExpanderElement.hasAttribute('mdw-expanded')) {
      listExpanderElement.removeAttribute('mdw-expanded');
    } else {
      listExpanderElement.setAttribute('mdw-expanded', '');
    }
  }
}

class List {
  /**
   * @param {Element} listElement
   * @return {void}
   */
  static attach(listElement) {
    const items = listElement.getElementsByClassName('mdw-list__item');
    const expanders = listElement.getElementsByClassName('mdw-list__expander');
    for (let i = 0; i < items.length; i += 1) {
      ListItem.attach(items.item(i));
    }
    for (let i = 0; i < expanders.length; i += 1) {
      ListExpander.attach(expanders.item(i));
    }
  }

  static detach(listElement) {
    const items = listElement.getElementsByClassName('mdw-list__item');
    const expanders = listElement.getElementsByClassName('mdw-list__expander');
    for (let i = 0; i < items.length; i += 1) {
      ListItem.detach(items.item(i));
    }
    for (let i = 0; i < expanders.length; i += 1) {
      ListExpander.detach(expanders.item(i));
    }
  }
}

export {
  List,
  ListItem,
  ListExpander,
};
