# 🌸 Dahlia – A WordPress FSE Theme for Storytelling

**A clean, accessible, and block-first WordPress theme designed for storytelling, education, and content-rich websites.**  
Built with Full Site Editing (FSE) and designed to work seamlessly with [Dahlia Blocks](https://github.com/bertuuk/dahlia-blocks) and [Dahlia Features](https://github.com/bertuuk/dahlia-features).

Stable version: 1.0.3

![WordPress version](https://img.shields.io/badge/WordPress-6.0%2B-blue)
![FSE](https://img.shields.io/badge/FSE-Enabled-success)
![License](https://img.shields.io/badge/license-GPLv2-orange)

---

## ✨ Overview

Dahlia is a modern WordPress block theme crafted with a focus on clarity, accessibility, and flexibility.  
It's ideal for long-form content, educational sites, or any project that values structure and simplicity.

This theme uses WordPress Full Site Editing features to give you full control over templates, layouts, and global styles — without writing code.

It integrates perfectly with:

- 🔌 [Dahlia Blocks](https://github.com/bertuuk/dahlia-blocks) – a plugin that adds custom Gutenberg blocks
- ⚙️ [Dahlia Features](https://github.com/bertuuk/dahlia-features) – a plugin for accessibility and extra enhancements

---

## 📁 Features

- ✅ Full Site Editing (FSE) support
- 🎨 Multiple style variations (`styles/`)
- 🧩 Custom block patterns (`block-patterns/`)
- 🧱 Integrated with custom blocks via plugin
- 🌐 Accessibility-first markup
- 💡 Lightweight and performance-conscious

---

## 🧩 Included Patterns

Located in `/block-patterns/`:

- `page-cover` – Visual cover for a page or section
- *(More coming soon as the theme evolves)*

---

## ⚙️ Installation

### Manual Installation

1. Download or clone this repository:
    ```bash
    git clone https://github.com/bertuuk/dahlia.git
    ```
2. Copy the `dahlia` folder into your `wp-content/themes/` directory.
3. In the WordPress admin, go to Appearance → Themes and activate *Dahlia*.

---

## 🔗 Recommended Plugins

To unlock the full potential of the theme:

- [**Dahlia Blocks**](https://github.com/bertuuk/dahlia-blocks)  
  Provides custom blocks like `Reading Time`, `Post Grid`, `Story Container`, etc.

- [**Dahlia Features**](https://github.com/bertuuk/dahlia-features)  
  Adds accessibility enhancements and extra frontend functionality.

---

## ✅ Compatibility

- WordPress 6.0+
- Block Editor (Gutenberg)
- Full Site Editing (Site Editor)
- Works with WP-CLI, wp-env, and standard development setups

---

## 📸 Screenshots

*(You can add preview images to the `/assets/` or `/screenshot.png` for GitHub and WP visibility.)*

---

## 📄 License

This theme is licensed under the [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👤 Author

Developed and maintained by [@bertuuk](https://github.com/bertuuk)

---

## 🚧 Roadmap

- [ ] Add more block patterns
- [ ] Document template structure
- [ ] Add accessibility statement
- [ ] Optimize for performance scores (Lighthouse/Core Web Vitals)

---

## Available Classes for blocks.
- .change-flex-order-mobile: Used to change the order established on block columns. Works better on block with two columns.
- .no-image-mobile: Used on image guttenberg blocks. Prevents image to show on mobile