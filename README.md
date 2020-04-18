### Made by [@kilianvalkhof](https://twitter.com/kilianvalkhof)

#### Other projects:

- 💻 [Polypane](https://polypane.app) - Develop responsive websites and apps twice as fast on multiple screens at once
- 🖌️ [Superposition](https://superposition.design) - Kickstart your design system by extracting design tokens from your website
- 🗒️ [FromScratch](https://fromscratch.rocks) - A smart but simple autosaving scratchpad

---

# mailto-clipboard [![npm](https://img.shields.io/npm/v/mailto-clipboard.svg)](https://www.npmjs.com/package/mailto-clipboard) [![npm-downloads](https://img.shields.io/npm/dm/mailto-clipboard.svg)](https://www.npmjs.com/package/mailto-clipboard)

Automatically rewrites all mailto: links on a page to copy the email address on click.

Inspired by [I hate mailto](https://ihatemailto.com/) (**which you should BUY**) by [@tkmadeit](https://twitter.com/tkmadeit) and made with his blessing.

## Installation

Install using `npm install mailto-clipboard`.

### Build from source

checkout the repository then run

```bash
yarn
yarn build
```

and the builds will be in the `dist` folder.

## Usage

The module is provided in two formats: an ECMAScript (ES) module in dist/index.esm.js, and a Universal Module Definition (UMD) in dist/index.umd.js. This enables support for the following runtime environments:

es6:

```js
import MailtoClipboard from 'mailto-clipboard';

// after document has loaded
MailtoClipboard();
```

Browser as directly loaded module

```html
<script type="module">
  import MailtoClipboard from './mailto-clipboard/dist/index.esm.js';

  MailtoClipboard();
</script>
```

Browser as global variable

```html
<script src="./mailto-clipboard/dist/index.umd.js"></script>

<script>
  MailtoClipboard();
</script>
```

## Configuration

MailtoClipboard can be configured by passing it a configuration object. Any undefined values will use the default values below.

```js
MailtoClipboard({
  // if true, injects CSS to style. If set to false, bring your own design.
  defaultStyle: true,

  // Show tooltips on hover
  showTooltip: true,
  // Text to show on hover. HTML supported, {email} will be replaced with the email value
  tooltipText: `Copy "{email}" to clipboard`,
  // Position of the tooltip. Can be "top" or "bottom"
  position: 'bottom',

  // show a confirmation message after click
  showConfirmation: true,
  // Text to show on click. HTML supported, {email} will be replaced with the email value
  confirmationText: `"{email}" copied to clipboard`,
  // Timeout for when the tooltip should disappear automatically. Set to false to only hide on mouse out.
  confirmationTimeout: 1000
});
```

## Styling

If you set defaultStyle to false, no styling will be supplied to the tooltip. Positioning of the tooltip will be done automatically,
centered horizontally above or below the element.

To style the tooltip, use these classes:

```css
/* tooltip element */
.MailtoClipboard-tooltip {
}

/* tooltip nib */
.MailtoClipboard-tooltip::before {
}

/* active (visible) tooltip */
.MailtoClipboard-tooltip-active

/* tooltip should be shown above element */
.MailtoClipboard-tooltip-top {
}

/* tooltip should be shown below element */
.MailtoClipboard-tooltip-active {
}
```

## License

mailto-clipboard is ISC licensed.
