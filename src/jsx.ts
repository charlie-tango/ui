import React from 'react';
import { Interpolation, jsx as emotion } from '@emotion/react';
import css, { SystemStyleObject, Theme } from '@styled-system/css';

/**
 * This is a custom JSX pragma that transforms `sx` props on all elements into Emotion styles.
 *
 * It's used by the `@charlietango/babel-preset-sx-prop`.
 **/
type Props = {
  css?: Interpolation<Theme>;
  sx?: SystemStyleObject;
} & Record<string, any>;

const getCSS = (props: Props) => {
  if (!props.sx && !props.css) return undefined;
  return (theme: Theme) => {
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css;
    if (props.sx) {
      return [raw, css(props.sx)(theme)];
    }
    return raw;
  };
};

const parseProps = (props: Props) => {
  if (!props || !props.sx) return props;
  const next: Props = {};

  for (let key in props) {
    if (key === 'sx') continue;
    next[key] = props[key];
  }
  const css = getCSS(props);
  if (css) next.css = css;
  return next;
};

// @ts-ignore
export const jsx: typeof React.createElement = (type, props, ...children) =>
  // @ts-ignore
  emotion.apply(undefined, [type, parseProps(props), ...children]);
