/**
 * File: preventMenuClose.js
 *
 * Description: Prevents the mobile navigation overlay from closing when clicking inside its content.
 */
const preventMenuClose = () => {
    const menuDialog = document.querySelector('.wp-block-navigation__responsive-dialog');

    if (menuDialog) {
        menuDialog.addEventListener('click', (event) => {
            event.stopPropagation();
        });

    menuDialog.addEventListener('focusout', (event) => {
            event.stopPropagation();
        });
    }
};

export default preventMenuClose;