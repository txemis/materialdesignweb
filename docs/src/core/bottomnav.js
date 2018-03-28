import setupImageTargets from '../targetHandler';
import { Bottomnav, BottomnavAction } from '../../../components/index';

const componentMap = new WeakMap();

/** @return {void} */
function initializeMdwComponents() {
  let components;
  components = document.querySelectorAll('.js .mdw-bottomnav');
  for (let i = 0; i < components.length; i += 1) {
    componentMap.set(components[i], new Bottomnav(components[i]));
  }

  components = document.querySelectorAll('.js .mdw-bottomnav__action');
  for (let i = 0; i < components.length; i += 1) {
    componentMap.set(components[i], new BottomnavAction(components[i]));
  }
}

initializeMdwComponents();
setupImageTargets();
