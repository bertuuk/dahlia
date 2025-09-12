/**
 *
 * Description: Handles the toggle functionality for submenus in the mobile navigation overlay.
 * Adds accessible buttons to parent menu items to allow users to expand/collapse nested submenus.
 */

import { createDahliaIcon, changeDahliaIcon } from './utils/sharedFunctions.js';

const mobileSubmenuToggle = () => {
    const mobileMenuButton = document.querySelector('.wp-block-navigation__responsive-container-open');
    if (!mobileMenuButton || window.getComputedStyle(mobileMenuButton).display === 'none') {
        return; // Exit if we are on desktop view.
    }

    // Select all navigation items that have a submenu within the mobile overlay.
    const parentMenuItems = document.querySelectorAll(
        '.wp-block-navigation__responsive-container .wp-block-navigation-item.has-child'
    );

    if (!parentMenuItems.length) {
        return; // Exit if no parent menu items are found.
    }

    parentMenuItems.forEach((item) => {
        const link = item.querySelector('a.wp-block-navigation-item__content');
        const submenu = item.querySelector('.wp-block-navigation__submenu-container');


        if (!link || !submenu || item.querySelector('.c-menu-item-wrapper')) {
            return;
        }

        // Prevent adding duplicate buttons on hot-reloads
        if (item.querySelector('.c-submenu-toggle')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'c-menu-item-wrapper';

        item.insertBefore(wrapper, link);

        wrapper.appendChild(link);


        const toggleButton = document.createElement('button');
        const labelSpan = link.querySelector('.wp-block-navigation-item__label');
        const labelText = labelSpan ? labelSpan.textContent.trim() : link.textContent.trim();

        toggleButton.className = 'c-submenu-toggle wp-block-button button-ghostv';

        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', `Show submenu for ${labelText}`);

        const icon = createDahliaIcon({ name: 'angle-small-down' });
        toggleButton.appendChild(icon);



        wrapper.appendChild(toggleButton);

        toggleButton.addEventListener('click', (event) => {
            event.preventDefault();
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            const newIconName = !isExpanded ? 'angle-small-up' : 'angle-small-down';
            changeDahliaIcon(icon, { name: newIconName });
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            item.classList.toggle('is-submenu-open');
        });
    });
};

export default mobileSubmenuToggle;