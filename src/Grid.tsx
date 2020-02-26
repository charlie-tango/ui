/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import React, { forwardRef } from 'react';
import { ResponsiveValue, Scale, Theme, system } from 'styled-system';

import { sx } from './index';
import { cssVariant, getVariant, isNumber } from './utils';

export type GridCols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null | undefined;

export interface GridProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as'> {
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
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `grids`.
   */
  themeKey?: string | undefined;
}

export interface GridItemProps {
  /** Number of columns this item should span.
   *
   * Setting the value as `0` or `undefined` will set `display: none`, removing the item from they layout.
   * */
  col: GridCols | GridCols[];
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `grids`.
   */
  themeKey?: string | undefined;
}

interface GridItemInternalProps {
  forceFlexBox?: boolean;
  flexCol?: string | (string | null | undefined)[] | null;
  gridCol?: GridCols | GridCols[];
  hideCol?: GridCols | GridCols[];
  flexGap?: ResponsiveValue<string | number>;
  gridColumns?: GridCols | GridCols[];
}

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
  gridColumns: {
    property: 'gridTemplateColumns',
    transform: value => {
      return `repeat(${value}, 1fr)`;
    },
  },
  gridGap: { scale: 'space', property: 'gridGap' },
});

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, gridGap, gridColumns, forceFlexBox, variant, themeKey, ...rest }, ref) => {
    const theme = useTheme();
    // Override the default variant lookup method here.
    // Do this because we need to ensure that gridGap is split out into different values, and passed correctly to the children
    const { gridGap: variantGridGap, gridColumns: variantGridColumns, ...gridVariant } = getVariant(
      {
        theme,
        variant,
        themeKey,
      },
    );

    gridGap = gridGap || (variantGridGap as number) || 0;
    gridColumns = gridColumns || (variantGridColumns as GridCols | GridCols[]) || 12;

    return (
      <div
        ref={ref}
        css={theme => [
          {
            display: 'flex',
            boxSizing: 'border-box',
            flexWrap: 'wrap',
          },
          flexGridConfig({
            flexWidthOffset: gridGap,
            flexGap: gridGap,
            gridGap,
            gridColumns,
          }),
          !forceFlexBox
            ? {
                '@supports (display: grid)': {
                  display: 'grid',
                  margin: 0,
                  width: '100%',
                },
              }
            : undefined,
          sx(gridVariant)(theme as any),
        ]}
        {...rest}
      >
        {React.Children.map(children, child =>
          // Clone the children so we can inject the correct `gridGap` value into it.
          React.isValidElement(child)
            ? React.cloneElement(child, {
                flexGap: gridGap,
                gridColumns,
                forceFlexBox,
              } as GridItemInternalProps)
            : null,
        )}
      </div>
    );
  },
);

Grid.defaultProps = {
  themeKey: 'grids',
  variant: 'grid',
};

Grid.displayName = 'Grid';

/*********************
 * GridItem
 *********************/

const flexGridItemConfig = system({
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
    transform: value => {
      if (!value) return undefined;
      return `span ${value}`;
    },
  },
  hideCol: {
    property: 'display',
    transform: value => (!value ? 'none' : 'block'),
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
 * Need to convert the cols to a percentage value so they can be used by the Flexbox fallback.
 * We need to take into account that the user can supply responsive values.
 * */
const calculateFlexCols = (col: GridCols | GridCols[], gridColumns: GridCols | GridCols[] = 12) => {
  if (Array.isArray(col)) {
    return col.map((val, index) => {
      if (!val) return undefined;
      const gridColumnSize = mapGridColumn(index, gridColumns);
      if (process.env.NODE_ENV !== 'production' && val > gridColumnSize) {
        console.warn(
          `[grid] Trying to render a column with size ${val} inside a grid with ${gridColumnSize} columns at breakpoint index ${index}.`,
        );
      }
      return (val / gridColumnSize) * 100 + '%';
    });
  }
  if (col) {
    const gridColumnSize = mapGridColumn(0, gridColumns);
    if (process.env.NODE_ENV !== 'production' && col > gridColumnSize) {
      console.warn(
        `[grid] Trying to render a column with size ${col} inside a grid with ${gridColumnSize} columns.`,
      );
    }
    return (col / gridColumnSize) * 100 + '%';
  }

  return undefined;
};

export const GridItem: React.FC<GridItemProps> = forwardRef<
  HTMLDivElement,
  GridItemProps & GridItemInternalProps
>(({ col, gridColumns, themeKey, variant, flexGap, forceFlexBox, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      css={theme => [
        { boxSizing: 'border-box', minWidth: 0, flexGrow: 0 },
        flexGridItemConfig({
          gridCol: col,
          hideCol: col,
          flexCol: calculateFlexCols(col, gridColumns),
          flexGap,
        }),
        cssVariant({ themeKey, variant, theme }),
        !forceFlexBox
          ? {
              '@supports (display: grid)': {
                maxWidth: 'none',
                padding: 0,
                flex: 0,
              },
            }
          : undefined,
      ]}
      {...rest}
    />
  );
});

GridItem.defaultProps = {
  col: 1,
  themeKey: 'grids',
  variant: 'gridItem',
};

GridItem.displayName = 'GridItem';
