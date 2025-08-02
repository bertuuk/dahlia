/**
 * Initializes Tiny Slider for carousels on the site.
 *
 * This script ensures that any container with the `post-grid-carousel` class
 * is initialized as a Tiny Slider carousel.
 *
 * @see https://github.com/ganlanyuan/tiny-slider
 */

// Import Tiny Slider CSS
import 'tiny-slider/src/tiny-slider.scss';

// Import Tiny Slider JS
import { tns } from 'tiny-slider';


// Export Tiny Slider globally si otros scripts necesitan acceder
window.tns = tns;