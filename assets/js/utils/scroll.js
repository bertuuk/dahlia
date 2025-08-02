/**
 * Smooth scroll for internal anchor links with dynamic duration
 * Applies only to valid hrefs (e.g. #section) and avoids plain "#"
 */

document.addEventListener('DOMContentLoaded', () => {
	// Select all anchor links starting with "#"
	const anchorLinks = document.querySelectorAll('a[href^="#"]');

	anchorLinks.forEach(anchor => {
		anchor.addEventListener('click', event => {
			const href = anchor.getAttribute('href');

			// Skip if href is exactly "#" or invalid
			if (!/^#[^\s]+$/.test(href)) return;

			const targetId = href.slice(1);
			const target = document.getElementById(targetId);

			if (!target) return;

			event.preventDefault();

			// Optional: subtract sticky header height if needed
			const header = document.querySelector('header');
			const headerHeight = header ? header.offsetHeight : 0;

			const startPosition = window.scrollY;
			const targetOffset = target.getBoundingClientRect().top;
			const scrollToPosition = targetOffset + startPosition - headerHeight;

			const distance = Math.abs(scrollToPosition - startPosition);
			const baseSpeed = 0.5; // milliseconds per pixel
			let duration = distance * baseSpeed;

			// Clamp scroll duration between min and max values
			duration = Math.max(300, Math.min(duration, 1200));

			window.scrollTo({
				top: scrollToPosition,
				behavior: 'smooth',
			});
		});
	});
});
