import './carousel';
import './cardLinks';
import './lazyLoad';
import './utils/scroll.js';

import { initStickyScroll } from './utils/sticky.js';
import mobileSubmenuToggle from './mobileSubmenuToggle';
import preventMenuClose from './preventMenuClose.js';

initStickyScroll('#site-header', { animate: true });

document.addEventListener('DOMContentLoaded', () => {
	mobileSubmenuToggle();
    preventMenuClose();
});

