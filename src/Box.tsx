import * as React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { space, default as StyledSystem } from 'styled-system';
import css, { get, SystemStyleObject } from '@styled-system/css';

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SystemStyleObject;
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
  __css?: SystemStyleObject;
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

const variant = ({ theme, variant, themeKey = 'variants' }: Props) =>
  css(get(theme, themeKey + '.' + variant, get(theme, variant as string | string[])))(theme);

/**
 * The Box hooks into some of the features from styled-system
 */
export const Box: React.FC<BoxPrivateProps> = styled('div', {
  shouldForwardProp: isPropValid,
})<BoxProps>(base, variant, sx, space);
