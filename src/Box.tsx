import * as React from 'react';
import styled from '@emotion/styled';
import { space, default as StyledSystem } from 'styled-system';
import css, { get, SystemStyleObject } from '@styled-system/css';
import { InterpolationWithTheme } from '@emotion/core';

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  css?: InterpolationWithTheme<any>;
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SystemStyleObject;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: StyledSystem.ResponsiveValue<string>;
}

interface BoxKnownProps extends BaseProps, StyledSystem.SpaceProps {
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `variants`.
   */
  themeKey?: string | undefined;
}

export interface BoxProps
  extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

interface Props extends BoxProps {
  theme: any;
}

const sx = (props: Props) => css(props.sx)(props.theme);

const variant = ({ theme, variant, themeKey = 'variants' }: Props) =>
  css(get(theme, themeKey + '.' + variant, get(theme, variant as string | string[])))(theme);

/**
 * The Box hooks into some of the features from styled-system
 */
export const Box: React.FC<BoxProps> = styled.div<BoxProps>(sx, variant, space);
