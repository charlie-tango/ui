import React from 'react';
import { Interpolation, jsx as emotion } from '@emotion/react';
import css, { SystemStyleObject, Theme } from '@styled-system/css';

/**
 * This is a custom JSX pragma that transforms `sx` props on all elements into Emotion styles.
 *
 * You can use it by adding the `@charlietango/babel-preset-sx-prop`, or adding a custom JSX handler to files that need it.
 **/
type Props = {
  css?: Interpolation<Theme>;
  sx?: SystemStyleObject;
} & Record<string, any>;

/***
 * Extract the `css` prop classes by combining the `sx` and `css` values.
 * @param props
 */
const getCSS = (props: Props) => {
  return (theme: Theme) => {
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css;
    if (props.sx) {
      return [raw, css(props.sx)(theme)];
    }
    return raw;
  };
};

/**
 * ParseProps is used to modify the props of all React elements.
 * */
const parseProps = (props: Props) => {
  // We only need to modify the props if it includes the `sx` prop - That's when the user wants to modify the styling.
  if (!props || (!props.sx && !props.css)) return props;
  const next: Props = {};

  // Clone the props
  for (let key in props) {
    if (key === 'sx') continue;
    next[key] = props[key];
  }

  // @ts-ignore
  next.css = getCSS(props);
  return next;
};

// @ts-ignore no point trying to fix the types going in here.
export const jsx: typeof React.createElement = (type, props, ...children) =>
  // @ts-ignore Forward all the values to Emotion, so it creates the new React element. This enables the normal support for `css`
  emotion.apply(undefined, [type, parseProps(props), ...children]);
