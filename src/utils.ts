import css, { get } from '@styled-system/css';
import { default as StyledSystem } from 'styled-system';

export const isNumber = (n: string | number) => typeof n === 'number' && !isNaN(n);

type VariantProps = {
  theme: any;
  variant?: StyledSystem.ResponsiveValue<string>;
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

/*
 *Get a variant from the theme, and prepare and output it directly to CSS
 **/
export const cssVariant = (props: VariantProps) => css(getVariant(props))(props.theme);

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
