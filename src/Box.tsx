import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import css, { SystemStyleObject } from '@styled-system/css';
import { default as StyledSystem, space } from 'styled-system';

import { cssVariant } from './utils';

export type SXStyleProp = SystemStyleObject;

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SXStyleProp;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: StyledSystem.ResponsiveValue<string>;
}

interface BoxKnownProps extends BaseProps, StyledSystem.SpaceProps {}

export interface BoxProps
  extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

export interface BoxPrivateProps extends BoxProps {
  /**
   * Use the __css prop to configure the base styling for a component that can be extended further.
   * These styles will have the lowest priority.
   */
  __css?: SXStyleProp;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `variants`.
   */
  themeKey?: string | undefined;
}

interface Props extends BoxPrivateProps {
  theme: any;
}

const base = (props: Props) => css(props.__css)(props.theme);
const sx = (props: Props) => css(props.sx)(props.theme);

/**
 * The Box hooks into some of the features from styled-system
 */
export const Box: React.FC<BoxPrivateProps> = styled('div', {
  shouldForwardProp: isPropValid,
})<BoxProps>(base, cssVariant, sx, space);
