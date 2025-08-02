<?php
/**
 * Title: Page Cover
 * Slug: dahlia/page-cover
 * Categories: banner, call-to-action, dahlia-patterns
 * Inserter: true
 */
?>
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--30)"><!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40"}}}} -->
    <div class="wp-block-columns alignwide"><!-- wp:column {"verticalAlignment":"center","width":"60%","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
        <div class="wp-block-column is-vertically-aligned-center" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);flex-basis:60%"><!-- wp:group {"className":"is-style-vertical-space","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical"}} -->
            <div class="wp-block-group is-style-vertical-space"><!-- wp:group {"style":{"spacing":{"padding":{"bottom":"var:preset|spacing|30"}}},"layout":{"type":"default"}} -->
                <div class="wp-block-group" style="padding-bottom:var(--wp--preset--spacing--30)"><!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"48px"}}} -->
                    <h1 class="wp-block-heading" style="font-size:48px;font-style:normal;font-weight:400">Title Heading</h1>
                    <!-- /wp:heading -->

                    <!-- wp:paragraph {"style":{"typography":{"fontSize":"24px"}}} -->
                    <p style="font-size:24px">Paragraph content</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"colorPrimary-06","textColor":"white","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"fontSize":"base"} -->
                <div class="wp-block-button has-custom-font-size has-base-font-size"><a class="wp-block-button__link has-white-color has-color-primary-06-background-color has-text-color has-background has-link-color wp-element-button">Button Primary</a></div>
                <!-- /wp:button -->

                <!-- wp:button {"className":"is-style-link","fontSize":"base"} -->
                <div class="wp-block-button has-custom-font-size is-style-link has-base-font-size"><a class="wp-block-button__link wp-element-button">Button Link</a></div>
                <!-- /wp:button -->
            </div>
            <!-- /wp:buttons -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"width":"40%"} -->
        <div class="wp-block-column" style="flex-basis:40%"><!-- wp:post-featured-image {"aspectRatio":"3/4","style":{"border":{"radius":"38px"},"spacing":{"padding":{"left":"var:preset|spacing|large","right":"var:preset|spacing|large"}}}} /--></div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->