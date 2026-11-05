<?php
/**
 * Theme updates from GitHub Releases.
 *
 * Uses the native `update_themes_{hostname}` filter (WordPress 6.1+), driven by
 * the `Update URI` header in style.css. Exclude this file from any build meant
 * for WordPress.org: directory themes cannot ship their own updater.
 */

if (! defined('ABSPATH')) {
    exit;
}

if (! class_exists('Dahlia_Theme_Updater')) {

    class Dahlia_Theme_Updater
    {
        const CACHE_OK    = 12 * HOUR_IN_SECONDS;
        const CACHE_ERROR = HOUR_IN_SECONDS;

        private $slug;
        private $repo;
        private $cache_key;
        private $release = null; // Per-request cache.

        public function __construct($slug, $repo)
        {
            $this->slug      = $slug;
            $this->repo      = $repo;
            $this->cache_key = 'dahlia_updater_' . md5($slug . '|' . $repo);

            add_filter('update_themes_github.com', array($this, 'filter_update'), 10, 3);
            add_filter('auto_update_theme', array($this, 'filter_auto_update'), 20, 2);
        }

        /**
         * Always returns the latest release data: WordPress compares versions
         * itself, and this keeps the "Enable auto-updates" link visible.
         */
        public function filter_update($update, $theme_data, $stylesheet)
        {
            if ($stylesheet !== $this->slug || ! empty($update)) {
                return $update;
            }

            $release = $this->get_release();
            if (! $release) {
                return $update;
            }

            return array(
                'theme'   => $this->slug,
                'version' => $release['version'],
                'url'     => $release['url'],
                'package' => $release['package'],
            );
        }

        /**
         * Auto-update only within the same major version. A new major still
         * shows the notice, but someone has to click "Update".
         */
        public function filter_auto_update($update, $item)
        {
            if (! is_object($item) || empty($item->theme) || $item->theme !== $this->slug) {
                return $update;
            }
            if (empty($item->new_version)) {
                return $update;
            }

            $theme     = wp_get_theme($this->slug);
            $installed = $theme->exists() ? (string) $theme->get('Version') : '';

            if ($this->major($installed) === null || $this->major($installed) !== $this->major($item->new_version)) {
                return false;
            }

            return $update;
        }

        private function major($version)
        {
            return preg_match('/^(\d+)\./', (string) $version, $m) ? (int) $m[1] : null;
        }

        /**
         * @return array|false { version, url, package } or false.
         */
        private function get_release()
        {
            if (null !== $this->release) {
                return $this->release;
            }

            $force = is_admin() && isset($_GET['force-check']) && current_user_can('update_themes');

            if (! $force) {
                $cached = get_site_transient($this->cache_key);
                if ('none' === $cached) {
                    return $this->release = false;
                }
                if (is_array($cached)) {
                    return $this->release = $cached;
                }
            }

            $release = $this->fetch_release();
            set_site_transient($this->cache_key, $release ? $release : 'none', $release ? self::CACHE_OK : self::CACHE_ERROR);

            return $this->release = $release;
        }

        private function fetch_release()
        {
            $response = wp_remote_get(
                'https://api.github.com/repos/' . $this->repo . '/releases/latest',
                array(
                    'timeout' => 10,
                    'headers' => array(
                        'Accept'     => 'application/vnd.github+json',
                        'User-Agent' => 'WordPress; ' . home_url('/'),
                    ),
                )
            );

            if (is_wp_error($response) || 200 !== (int) wp_remote_retrieve_response_code($response)) {
                return false;
            }

            $data = json_decode(wp_remote_retrieve_body($response), true);
            if (! is_array($data) || ! empty($data['draft']) || ! empty($data['prerelease']) || empty($data['tag_name'])) {
                return false;
            }

            // Accepts "v1.2.3" and "v.1.2.3" (Dahlia's git flow tag prefix).
            $version = preg_replace('/^v\.?/i', '', (string) $data['tag_name']);
            if (! preg_match('/^\d+\.\d+\.\d+$/', $version)) {
                return false;
            }

            $package = '';
            if (! empty($data['assets']) && is_array($data['assets'])) {
                foreach ($data['assets'] as $asset) {
                    if (isset($asset['name'], $asset['browser_download_url']) && $asset['name'] === $this->slug . '.zip') {
                        $package = $asset['browser_download_url'];
                        break;
                    }
                }
            }
            if (! $package) {
                return false;
            }

            return array(
                'version' => $version,
                'url'     => esc_url_raw(isset($data['html_url']) ? $data['html_url'] : 'https://github.com/' . $this->repo),
                'package' => esc_url_raw($package),
            );
        }
    }
}
