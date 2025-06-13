export function initStickyScroll(selector, options = {}) {
	const element = document.querySelector(selector);
	if (!element) return;

	const animate = options.animate !== false;
	const offset = options.offset || 20;

	let threshold = element.offsetHeight + offset;
	let originalBodyPadding = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
	let isSticky = false;
    let isFixed = getComputedStyle(element).position == 'fixed';

	function applyBodyPadding() {
        if (getComputedStyle(element).position !== 'fixed') return;
		const stickyHeight = element.offsetHeight;
		document.body.style.paddingTop = `${stickyHeight}px`;
	}

	function resetBodyPadding() {
		document.body.style.paddingTop = '0px';
	}

	function handleScroll() {
        if (window.scrollY > threshold && !isSticky) {
            element.classList.add('is-sticky-desktop');
            element.classList.remove('has-animated-dropup');
            if(isFixed){
                if (animate) element.classList.add('has-animated-sticky');
            }
            applyBodyPadding();
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
                    resetBodyPadding();
                    isSticky = false;
                }, 200);
            } else {
                element.classList.remove('is-sticky-desktop');
                resetBodyPadding();
                isSticky = false;
            }
        }
    }
	window.addEventListener('resize', () => {
		threshold = element.offsetHeight + offset;
		originalBodyPadding = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
		if (isSticky) applyBodyPadding();
	});

	window.addEventListener('scroll', handleScroll);
}
