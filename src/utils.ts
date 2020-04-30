import React, { ReactElement } from 'react';
import { get } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

export const isNumber = (n: string | number) => typeof n === 'number' && !isNaN(n);

export type As<BaseProps = any> = React.ElementType<BaseProps>;

export type PropsWithAs<ComponentType extends As, ComponentProps> = ComponentProps &
  Omit<React.ComponentPropsWithRef<ComponentType>, 'as' | keyof ComponentProps> & {
    as?: ComponentType;
  };

export type PropsFromAs<ComponentType extends As, ComponentProps> = (PropsWithAs<
  ComponentType,
  ComponentProps
> & { as: ComponentType }) &
  PropsWithAs<ComponentType, ComponentProps>;

export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
  // These types are a bit of a hack, but cover us in cases where the `as` prop
  // is not a JSX string type. Makes the compiler happy so 🤷‍♂️
  <TT extends As>(props: PropsWithAs<TT, ComponentProps>): ReactElement | null;
  (props: PropsWithAs<ComponentType, ComponentProps>): ReactElement | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<PropsWithAs<ComponentType, ComponentProps>>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>;
}

/**
 * This is a hack for sure. The thing is, getting a component to intelligently
 * infer props based on a component or JSX string passed into an `as` prop is
 * kind of a huge pain. Getting it to work and satisfy the constraints of
 * `forwardRef` seems dang near impossible. To avoid needing to do this awkward
 * type song-and-dance every time we want to forward a ref into a component
 * that accepts an `as` prop, we abstract all of that mess to this function for
 * the time time being.
 *
 * This does unfortunately seem to break `react-docgen`, preventing us from
 * extracting the props from a component and showcasing them in the Storybook.
 */
export function forwardRefWithAs<Props, ComponentType extends As = 'div'>(
  comp: (
    props: PropsFromAs<ComponentType, Props>,
    ref: React.RefObject<any>,
  ) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<ComponentType, Props>;
}

type VariantProps = {
  theme: any;
  variant?: ResponsiveValue<string>;
  themeKey?: string;
};

/**
 * Lookup the values for a variant in the theme.
 * This returns the raw object from the theme.
 */
export const getVariant = <VariantType = any>({
  theme,
  variant,
  themeKey = 'variants',
}: VariantProps): VariantType =>
  get(theme, themeKey + '.' + variant, get(theme, variant as string | string[])) || {};

export const sxVariant = (
  variant?: ResponsiveValue<string>,
  themeKey: string = 'variants',
): string => {
  if (!variant || !themeKey) return variant as string;
  if (Array.isArray(variant)) {
    // To fix the invalid type of "VariantProperty", we force Typescript to think we are returning a string.
    return (variant.map((item) => (!!item ? `${themeKey}.${item}` : item)) as unknown) as string;
  }
  return `${themeKey}.${variant}`;
};

/**
 * Ensure an element has a valid aria-label set, by marking the component propTypes.
 * This will throw a warning when rendered during development.
 * Taken from: https://github.com/reach/reach-ui/blob/master/packages/dialog - Thanks!
 * */
export function ariaLabelPropType(
  props: { [key: string]: any },
  propName: string,
  compName: string,
  location: string,
  propFullName: string,
) {
  if (process.env.NODE_ENV === 'development') {
    const details = '\nSee https://www.w3.org/TR/wai-aria/#aria-label for details.';
    if (!props['aria-label'] && !props['aria-labelledby']) {
      return new Error(
        `A <${compName}> must have either an \`aria-label\` or \`aria-labelledby\` prop.
      ${details}`,
      );
    }
    if (props['aria-label'] && props['aria-labelledby']) {
      return new Error(
        'You provided both `aria-label` and `aria-labelledby` props to a <' +
          compName +
          ">. If the a label for this component is visible on the screen, that label's component should be given a unique ID prop, and that ID should be passed as the `aria-labelledby` prop into <" +
          compName +
          '>. If the label cannot be determined programmatically from the content of the element, an alternative label should be provided as the `aria-label` prop, which will be used as an `aria-label` on the HTML tag.' +
          details,
      );
    } else if (props[propName] != null && typeof props[propName] !== 'string') {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${compName}\`. Expected \`string\`, received \`${
          Array.isArray(propFullName) ? 'array' : typeof propFullName
        }\`.`,
      );
    }
  }
  return null;
}
