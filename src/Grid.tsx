/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { ResponsiveValue, Scale, system } from 'styled-system';

import { getVariant, isNumber, sxVariant } from './utils';

export type GridCols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridSize = number | null | undefined;

export type GridProps = {
  /** The gap between each item */
  gridGap?: ResponsiveValue<string | number>;
  /** The total amount of columns in the grid. */
  gridColumns?: GridCols | GridCols[];
  /** Force the flexbox fallback rendering - Useful to debug layout issues with the Flexbox implementation */
  forceFlexBox?: boolean;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  children?: React.ReactNode;
  className?: string;
};

export type GridItemProps = {
  /**
   * Size of the column, relative to the grid columns.
   * Example values could be: (1, 1/2, 1/4, 1/8 or 1/12)
   * Setting the value as `0` or `undefined` will set `display: none`, removing the item from they layout.
   * */
  size?: GridSize | GridSize[];
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  children?: React.ReactNode;
  className?: string;
};

type GridItemInternalProps = {
  forceFlexBox?: boolean;
  flexCol?: string | (string | null | undefined)[] | null;
  gridCol?: GridCols | GridCols[];
  hideCol?: GridCols | GridCols[];
  flexGap?: ResponsiveValue<string | number>;
  gridColumns?: GridCols | GridCols[];
};

const getGapValue = (value: any, scale?: Scale) => {
  if (!!scale && ((Array.isArray(scale) && value < scale.length) || scale.hasOwnProperty(value))) {
    // @ts-ignore
    return scale[value];
  }
  return value;
};

const valueToString = (value: any) => {
  return isNumber(value) ? value + 'px' : value;
};

const flexGridConfig = system({
  flexWidthOffset: {
    scale: 'space',
    property: 'width',
    transform: (value, scale) => {
      const gapValue = getGapValue(value, scale);
      return gapValue ? `calc(100% + ${valueToString(gapValue)});` : '100%';
    },
  },
  flexGap: {
    scale: 'space',
    property: 'margin',
    transform: (value, scale) => {
      if (!value) return undefined;
      let output = getGapValue(value, scale);
      if (isNaN(output)) {
        return `calc(${valueToString(output)} * -0.5)`;
      }
      return output * -0.5;
    },
  },
});

const gridConfig = system({
  gridGap: { scale: 'space', property: 'gridGap' },
  gridColumns: {
    property: 'gridTemplateColumns',
    transform: (value) => {
      return `repeat(${value}, 1fr)`;
    },
  },
});

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, gridGap, gridColumns, forceFlexBox, variant, ...rest }, ref) => {
    const theme = useTheme();
    // Override the default variant lookup method here.
    // Do this because we need to ensure that gridGap is split out into different values, and passed correctly to the children
    const { gridGap: variantGridGap, gridColumns: variantGridColumns, ...gridVariant } = getVariant(
      {
        theme,
        variant,
        themeKey: 'layout',
      },
    );

    gridGap = gridGap || (variantGridGap as number) || 0;
    gridColumns = gridColumns || (variantGridColumns as GridCols | GridCols[]) || 12;

    return (
      <div
        ref={ref}
        sx={gridVariant}
        css={[
          {
            display: 'flex',
            boxSizing: 'border-box',
            flexWrap: 'wrap',
          },
          flexGridConfig({
            flexWidthOffset: gridGap,
            flexGap: gridGap,
          }),
          !forceFlexBox
            ? {
                '@supports (display: grid)': {
                  display: 'grid',
                  margin: 0,
                  width: '100%',
                  ...gridConfig({ gridGap, gridColumns }),
                },
              }
            : undefined,
        ]}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          // Clone the children so we can inject the correct `gridGap`, `gridColumns` and `forceFlexBox` value into it.
          if (React.isValidElement(child)) {
            if (child.type === React.Fragment) {
              // If the child is a Fragment, we'll allow it and loop over the children of the fragment.
              return React.Children.map(child.props.children, (subChild) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(subChild, {
                    flexGap: gridGap,
                    gridColumns,
                    forceFlexBox,
                  } as GridItemInternalProps);
                }
                return null;
              });
            } else {
              return React.cloneElement(child, {
                flexGap: gridGap,
                gridColumns,
                forceFlexBox,
              } as GridItemInternalProps);
            }
          }

          return null;
        })}
      </div>
    );
  },
);

Grid.defaultProps = {
  variant: 'grid',
};

Grid.displayName = 'Grid';

/*********************
 * GridItem
 *********************/

const gridItemConfig = system({
  flexGap: {
    scale: 'space',
    property: 'padding',
    transform: (value, scale) => {
      let output = getGapValue(value, scale);
      if (!output) return undefined;

      if (isNaN(output)) {
        return `calc(${output} * 0.5)`;
      }
      return output * 0.5;
    },
  },
  flexCol: {
    properties: ['flexBasis', 'maxWidth'],
  },
  gridCol: {
    property: 'gridColumnEnd',
    transform: (value) => {
      if (value === undefined || value === null) return undefined;
      return `span ${value}`;
    },
  },
  hideCol: {
    property: 'display',
    transform: (value) => {
      return value === 0 || value === undefined ? 'none' : 'block';
    },
  },
});

const mapGridColumn = (key: number, gridColumns: GridCols | GridCols[]) => {
  if (typeof gridColumns === 'number') return gridColumns;
  if (Array.isArray(gridColumns)) {
    return gridColumns[key] || 12;
  }

  return 12;
};

/**
 * Need to convert the size to a grid columns span value.
 * We need to take into account that the user can supply responsive values.
 * */
const calculateGridSize = (
  size: GridSize | GridSize[],
  gridColumns: GridCols | GridCols[] = 12,
) => {
  if (Array.isArray(size) && size.length) {
    let lastValue = 0;
    if (Array.isArray(gridColumns)) {
      // If the grid columns is also an array, then we need to make sure to calculate the size for each grid item.
      // Otherwise we end up with the wrong column span size
      if (size.length < gridColumns.length) {
        let filledSize = size.concat();
        filledSize.length = gridColumns.length;
        size = filledSize.fill(size[size.length - 1], size.length - 1);
      }
      return size.map((val, index) => {
        if (val === null) val = lastValue; // If null, use the last valid grid size
        if (val === 0 || val === undefined) return 0;
        lastValue = val;
        const gridColumnSize = mapGridColumn(index, gridColumns);
        return Math.ceil(val * gridColumnSize);
      });
    } else {
      // We can rely on styled-system fallback values for null
      return size.map((val, index) => {
        if (val === null && lastValue !== 0) return null;
        if (!val) return 0;
        lastValue = val;
        return Math.ceil(val * gridColumns);
      });
    }
  }

  if (typeof size === 'number') {
    let gridSize: number = size;

    if (Array.isArray(gridColumns)) {
      // Map the size value to all grid column entries. This ensures we use the correct column span on each breakpoint
      return gridColumns.map((columns) =>
        columns && size ? Math.ceil(gridSize * columns) : columns,
      );
    }
    return Math.ceil(gridSize * gridColumns);
  }

  return size;
};

/**
 * Need to convert the size to a percentage value so they can be used by the Flexbox fallback.
 * We need to take into account that the user can supply responsive values.
 * */
const calculateFlexSize = (size: GridSize | GridSize[]) => {
  if (Array.isArray(size)) {
    return size.map((val) => {
      if (!val) return val;
      return Math.min(val * 100, 100) + '%';
    });
  }
  if (size) {
    return Math.min(size * 100, 100) + '%';
  }

  return size;
};

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      size,
      gridColumns,
      variant,
      flexGap,
      forceFlexBox,
      ...rest
    }: GridItemProps & GridItemInternalProps,
    ref,
  ) => {
    const gridSize = calculateGridSize(size, gridColumns);
    return (
      <div
        ref={ref}
        sx={{
          boxSizing: 'border-box',
          minWidth: 0,
          flexGrow: 0,
          // Calculate the styling
          ...gridItemConfig({
            gridCol: gridSize,
            hideCol: gridSize,
            flexCol: calculateFlexSize(size),
            flexGap,
          }),
          // If "grid" is supported (And we don't want to foreceFlexBox), reset the flexbox styling
          '@supports (display: grid)': !forceFlexBox
            ? {
                maxWidth: 'none',
                padding: 0,
                flex: 0,
              }
            : undefined,
          variant: sxVariant(variant, 'layout'),
        }}
        {...rest}
      />
    );
  },
);

GridItem.defaultProps = {
  size: 1,
  variant: 'gridItem',
};

if (process.env.NODE_ENV === 'development') {
  GridItem.propTypes = {
    // Ensure the size property is valid. Otherwise it can really screw up the layout :)
    size: (props, propName, compName, location, propFullName) => {
      const size = props['size'];
      if (Array.isArray(size)) {
        const hasInvalidSize = size.some((val) => (val ? val > 1 || val < 0 || isNaN(val) : false));
        if (hasInvalidSize) {
          return new Error(
            `A <${compName}> must have a valid \`size\` prop, with values between \`0\` and \`1\`. 
Found component with size: \`[${size.join(', ')}]\``,
          );
        }
      } else if (isNaN(size) || size > 1 || size < 0) {
        return new Error(`A <${compName}> must have a valid \`size\` prop, with a value between \`0\` and \`1\`. 
Found component with size: \`${size}\``);
      }

      return null;
    },
  };
}

GridItem.displayName = 'GridItem';
