function createDahliaIcon({ name, size = 'small', ariaHidden = true }) {
	const span = document.createElement('span');
	span.classList.add('dahlia-icon', `di-${size}`, `dahlia-fi-rr-${name}`);
	if (ariaHidden) {
		span.setAttribute('aria-hidden', 'true');
	}
	return span;
}

/**
 * Change the icon type and size of an existing Dahlia icon element.
 *
 * @param {HTMLElement} el - The existing icon element (<span>).
 * @param {Object} options
 * @param {string} options.name - The new icon name (e.g. "angle-small-left").
 * @param {string} [options.size] - The new size (e.g. "extrasmall", "small", "large", "extralarge").
 */
function changeDahliaIcon(el, { name, size }) {
	if (!el || !el.classList.contains('dahlia-icon')) {
		console.warn('changeDahliaIcon: provided element is not a Dahlia icon');
		return;
	}

	// Remove existing size class (e.g. di-small)
	el.classList.forEach((cls) => {
		if (cls.startsWith('di-')) {
			el.classList.remove(cls);
		}
	});

	// Remove existing icon class (e.g. dahlia-fi-rr-...)
	el.classList.forEach((cls) => {
		if (cls.startsWith('dahlia-fi-rr-')) {
			el.classList.remove(cls);
		}
	});

	// Apply new size class if provided
	if (size) {
		el.classList.add(`di-${size}`);
	}

	// Apply new icon class
	el.classList.add(`dahlia-fi-rr-${name}`);
}
window.createDahliaIcon = createDahliaIcon;
window.changeDahliaIcon = changeDahliaIcon;