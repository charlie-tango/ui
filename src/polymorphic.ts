import React, { ElementType, WeakValidationMap } from 'react';
import { PropsOf } from '@emotion/react';

export interface PolymorphicProps<Element extends ElementType = ElementType> {
  /** The React.Element to use for this component - This is using the generic, so we can set a default value */
  as?: Element;
}

type PolymorphicOmitProps<Props, As extends ElementType> = PolymorphicProps<As> &
  Omit<PropsOf<As>, keyof Props>;

type PolymorphicComponentProps<Element extends React.ElementType, Props> = Props &
  PolymorphicOmitProps<Props, Element>;

/**
 * @example
 * ```tsx
 * export const Box = forwardRef<HTMLDivElement, ThemeProps<'div'>>(
 *  ({ as: Element = 'div', variant, themeKey, ...restProps }, ref) => (
 *    <Element
 *      ref={ref}
 *      sx={variant ? { variant: sxVariant(variant, themeKey) } : undefined}
 *      {...restProps}
 *    />
 *  ),
 * ) as PolymorphicComponent<ThemeProps>;
 * ```
 *
 * This is based on react-polymorphic-box
 * See https://github.com/kripod/react-polymorphic-box
 */
export interface PolymorphicComponent<Props, DefaultElement extends React.ElementType = 'div'> {
  <Element extends React.ElementType = DefaultElement>(
    // Configures the props with the current Element (From `as`, falling back to the default value)
    props: PolymorphicComponentProps<Element, Props>,
  ): JSX.Element;

  // Ensure we support the other default types of a React component.
  displayName?: string;
  defaultProps?: Partial<PolymorphicComponentProps<DefaultElement, Props>>;
  propTypes?: WeakValidationMap<PolymorphicComponentProps<DefaultElement, Props>>;
  readonly $$typeof: symbol;
}
