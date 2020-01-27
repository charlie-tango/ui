import { css, Global } from '@emotion/core';
import React from 'react';

export const sanitize = css`
  /* Document
 * ========================================================================== */

  body {
    margin: 0;
    width: 100%;
  }

  /**
 * Add border box sizing in all browsers (opinionated).
 */

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  /**
 * 1. Add text decoration inheritance in all browsers (opinionated).
 * 2. Add vertical alignment inheritance in all browsers (opinionated).
 */

  ::before,
  ::after {
    text-decoration: inherit; /* 1 */
    vertical-align: inherit; /* 2 */
  }

  /* Sections
 * ========================================================================== */

  /* Grouping content
 * ========================================================================== */
  /**
 * Remove the margin on nested lists in Chrome, Edge, IE, and Safari.
 */

  dl dl,
  dl ol,
  dl ul,
  ol dl,
  ul dl {
    margin: 0;
  }

  /**
 * Remove the margin on nested lists in Edge 18- and IE.
 */

  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin: 0;
  }

  /**
 * 1. Add the correct sizing in Firefox.
 * 2. Show the overflow in Edge 18- and IE.
 */

  hr {
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
 * Add the correct display in IE.
 */

  main {
    display: block;
  }

  /**
 * 1. Add the correct sizing in Firefox.
 * 2. Show the overflow in Edge 18- and IE.
 */

  hr {
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
 * ========================================================================== */

  /**
 * Remove the gray background on active links in IE 10.
 */

  a {
    background-color: transparent;
  }

  /**
 * Add the correct text decoration in Edge 18-, IE, and Safari.
 */

  abbr[title] {
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  /**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

  b,
  strong {
    font-weight: bolder;
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
 * Add the correct font size in all browsers.
 */

  small {
    font-size: 80%;
  }

  /* Embedded content
 * ========================================================================== */

  /*
 * Change the alignment on media elements in all browsers (opinionated).
 */

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  /**
 * Remove the border on iframes in all browsers (opinionated).
 */

  iframe {
    border-style: none;
  }

  /**
 * Remove the border on images within links in IE 10-.
 */

  img {
    border-style: none;
  }

  /**
 * Change the fill color to match the text color in all browsers (opinionated).
 */

  svg:not([fill]) {
    fill: currentColor;
  }

  /**
 * Hide the overflow in IE.
 */

  svg:not(:root) {
    overflow: hidden;
  }

  /* Tabular data
 * ========================================================================== */

  /**
 * Collapse border spacing in all browsers (opinionated).
 */

  table {
    border-collapse: collapse;
  }

  /* Forms
 * ========================================================================== */

  /**
 * Remove the margin on controls in Safari.
 */

  button,
  input,
  select {
    margin: 0;
  }

  /**
 * 1. Show the overflow in IE.
 * 2. Remove the inheritance of text transform in Edge 18-, Firefox, and IE.
 */

  button {
    overflow: visible; /* 1 */
    text-transform: none; /* 2 */
  }

  /**
 * Correct the inability to style buttons in iOS and Safari.
 */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
 * 1. Change the inconsistent appearance in all browsers (opinionated).
 * 2. Correct the padding in Firefox.
 */

  fieldset {
    border: 1px solid #a0a0a0; /* 1 */
    padding: 0.35em 0.75em 0.625em; /* 2 */
  }

  /**
 * Show the overflow in Edge 18- and IE.
 */

  input {
    overflow: visible;
  }

  /**
 * 1. Correct the text wrapping in Edge 18- and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 */

  legend {
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    white-space: normal; /* 1 */
  }

  /**
 * 1. Add the correct display in Edge 18- and IE.
 * 2. Add the correct vertical alignment in Chrome, Edge, and Firefox.
 */

  progress {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
  }

  /**
 * Remove the inheritance of text transform in Firefox.
 */

  select {
    text-transform: none;
  }

  /**
 * 1. Remove the margin in Firefox and Safari.
 * 2. Remove the default vertical scrollbar in IE.
 * 3. Change the resize direction in all browsers (opinionated).
 */

  textarea {
    margin: 0; /* 1 */
    overflow: auto; /* 2 */
    resize: vertical; /* 3 */
  }

  /**
 * Remove the padding in IE 10-.
 */

  [type='checkbox'],
  [type='radio'] {
    padding: 0;
  }

  /**
 * 1. Correct the odd appearance in Chrome, Edge, and Safari.
 * 2. Correct the outline style in Safari.
 */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
 * Correct the cursor style of increment and decrement buttons in Safari.
 */

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  /**
 * Correct the text style of placeholders in Chrome, Edge, and Safari.
 */

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  /**
 * Remove the inner padding in Chrome, Edge, and Safari on macOS.
 */

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
 * 1. Correct the inability to style upload buttons in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /**
 * Remove the inner border and padding of focus outlines in Firefox.
 */

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
 * Restore the focus outline styles unset by the previous rule in Firefox.
 */

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
 * Remove the additional :invalid styles in Firefox.
 */

  :-moz-ui-invalid {
    box-shadow: none;
  }

  /* Interactive
 * ========================================================================== */

  /*
 * Add the correct display in Edge 18- and IE.
 */

  details {
    display: block;
  }

  /*
 * Add the correct display in all browsers.
 */

  summary {
    display: list-item;
  }

  /* User interaction
 * ========================================================================== */

  /*
 * 1. Remove the tapping delay in IE 10.
 * 2. Remove the tapping delay on clickable elements
      in all browsers (opinionated).
 */

  a,
  area,
  button,
  input,
  label,
  select,
  summary,
  textarea,
  [tabindex] {
    -ms-touch-action: manipulation; /* 1 */
    touch-action: manipulation; /* 2 */
  }

  /**
 * Add the correct display in IE 10-.
 */

  [hidden] {
    display: none;
  }

  /* Accessibility
 * ========================================================================== */

  /**
 * Change the cursor on busy elements in all browsers (opinionated).
 */

  [aria-busy='true'] {
    cursor: progress;
  }

  /*
 * Change the cursor on control elements in all browsers (opinionated).
 */

  [aria-controls] {
    cursor: pointer;
  }

  /*
 * Change the cursor on disabled, not-editable, or otherwise
 * inoperable elements in all browsers (opinionated).
 */

  [aria-disabled='true'],
  [disabled] {
    cursor: not-allowed;
  }

  /*
 * Change the display on visually hidden accessible elements
 * in all browsers (opinionated).
 */

  [aria-hidden='false'][hidden] {
    display: initial;
  }

  [aria-hidden='false'][hidden]:not(:focus) {
    clip: rect(0, 0, 0, 0);
    position: absolute;
  }

  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  :focus:not([data-focus-visible-added]) {
    outline: none;
  }
`;

export const BaseCss = () => (
  <Global
    styles={theme => [
      sanitize,
      {
        html: {
          height: '100%',
          width: '100%',
          lineHeight: 1.15,
          backgroundColor: theme && theme.colors && theme.colors.background,
          color: theme && theme.colors && theme.colors.text,
          fontFamily: theme && theme.fonts && theme.fonts.body,
          WebkitFontSmoothing: 'antialiased',
          WebkitTextSizeAdjust: '100%',
          MozOsxFontSmoothing: 'grayscale',
          MsOverflowStyle: 'scrollbar',
          overflowY: 'scroll',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
        body: {
          backgroundColor: theme && theme.colors && theme.colors.background,
        },
      },
    ]}
  />
);
