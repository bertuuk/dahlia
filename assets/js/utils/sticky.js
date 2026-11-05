export function initStickyScroll(selector, options = {}) {
	const element = document.querySelector(selector);
	if (!element) return;

	const animate = options.animate !== false;
	const offset = options.offset || 20;
	// Reserve the header's space on its immediate container (the template part),
	// not on <body>: padding on <body> shifts all of .wp-site-blocks and counts as CLS.
	const container = element.parentElement;

	let threshold = element.offsetHeight + offset;
	let isSticky = false;
    let isFixed = getComputedStyle(element).position == 'fixed';

	function reserveHeaderSpace() {
		if (!container) return;
		if (getComputedStyle(element).position !== 'fixed') {
			container.style.minHeight = '';
			return;
		}
		container.style.minHeight = `${element.offsetHeight}px`;
	}

	function releaseHeaderSpace() {
		if (container) container.style.minHeight = '';
	}

	function handleScroll() {
        if (window.scrollY > threshold && !isSticky) {
            element.classList.add('is-sticky-desktop');
            element.classList.remove('has-animated-dropup');
            if(isFixed){
                if (animate) element.classList.add('has-animated-sticky');
            }
            reserveHeaderSpace();
            isSticky = true;
        } else if (window.scrollY <= threshold && isSticky) {
            element.classList.remove('has-animated-sticky');
            if (animate) {
                if(isFixed){
                    element.classList.add('has-animated-dropup');
                }
                setTimeout(() => {
                    element.classList.remove('is-sticky-desktop');
                    element.classList.remove('has-animated-dropup');
                    releaseHeaderSpace();
                    isSticky = false;
                }, 200);
            } else {
                element.classList.remove('is-sticky-desktop');
                releaseHeaderSpace();
                isSticky = false;
            }
        }
    }
	window.addEventListener('resize', () => {
		threshold = element.offsetHeight + offset;
		// Keeps the reservation in sync with the header height, and clears it
		// if the header is no longer fixed (e.g. window narrowed below $screen-lg).
		if (isSticky) reserveHeaderSpace();
	});

	window.addEventListener('scroll', handleScroll);
}
