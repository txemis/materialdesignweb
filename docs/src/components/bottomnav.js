import setupImageTargets from '../targetHandler';
import { Bottomnav } from '../../../components/bottomnav/index';
import { setupMenuOptions } from '../menuoptions';

/** @return {void} */
function initializeMdwComponents() {
  const bottomnavs = document.querySelectorAll('.js .mdw-bottomnav');
  for (let i = 0; i < bottomnavs.length; i += 1) {
    Bottomnav.attach(bottomnavs.item(i));
  }
}

initializeMdwComponents();
setupMenuOptions();
setupImageTargets();

