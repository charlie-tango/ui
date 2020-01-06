import React, { forwardRef } from 'react';
import {
  space,
  layout,
  typography,
  color,
  flexbox,
  system,
  compose,
} from 'styled-system';
import css, { get } from '@styled-system/css';
import styled from 'styled-components';
import { BoxProps } from '../types';
import { isNumber } from '../utils';

interface Props extends BoxProps {
  theme: any;
}

const sx = (props: Props) => css(props.sx)(props.theme);
const base = (props: Props) => css(props.__css)(props.theme);

// This is the Rebass way of defining a variants lookup area.
// Default to look inside `variants` for Box components, but this can be changed to something else (like "buttons"), if you set the the `tx` value on a `<Box />`.
const variant = ({ theme, variant, tx = 'variants' }: Props) => {
  return css(
    get(theme, tx + '.' + variant, get(theme, variant as string | string[])),
  )(theme);
};

const extraConfig = system({
  c: {
    property: 'color',
  },
  w: {
    property: 'width',
    scale: 'sizes',
    transform: (n, scale) => {
      return get(scale as any, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
    },
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  h: {
    property: 'height',
    scale: 'sizes',
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  shadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
});

/**
 * The Box component allows you to specify CSS props directly on the component
 * Be aware that native HTML props (like width, height) will be not be removed by styled-components.
 * It shouldn't be a problem, but they will be included in the output.
 * */
export const Box: React.FC<BoxProps> = styled.div(
  { boxSizing: 'border-box', margin: 0, minWidth: 0 },
  base,
  variant,
  sx,
  compose(
    space,
    layout,
    typography,
    color,
    flexbox,
    extraConfig,
  ),
);

/**
 * The Flex component is the same as the Box component, but with `display: flex` set as the default.
 * */
export const Flex: React.FC<BoxProps> = styled(Box)({
  display: 'flex',
});

export const Text: React.FC<BoxProps> = forwardRef((props, ref) => (
  <Box ref={ref} as="p" tx="text" {...props} />
));
