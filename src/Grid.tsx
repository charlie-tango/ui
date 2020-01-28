import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { system, ResponsiveValue, Scale, MarginProps, PaddingProps } from 'styled-system';
import { BaseProps, Box } from './Box';
import { isNumber } from './utils';
import { useTheme } from 'emotion-theming';
import { UITheme } from './theme';

export type GridCols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null | undefined;

export interface GridProps extends BaseProps, PaddingProps {
  /** The gap between each item */
  gridGap?: ResponsiveValue<string | number>;
  /** The total amount of columns in the grid. */
  gridColumns?: GridCols | GridCols[];
  /** Force the flexbox fallback rendering - Useful to debug layout issues with the Flexbox implementation */
  forceFlexBox?: boolean;
  variant?: string;
}

interface GridWrapperProps {
  forceFlexBox?: boolean;
  flexGap?: ResponsiveValue<string | number>;
  gridGap?: ResponsiveValue<string | number>;
  gridColumns?: GridCols | GridCols[];
  flexWidthOffset?: ResponsiveValue<string | number>;
}

export interface GridItemProps extends BaseProps, MarginProps {
  /** Number of columns this item should span.
   *
   * Setting the value as `0` or `undefined` will set `display: none`, removing the item from they layout.
   * */
  col: GridCols | GridCols[];
  /** @internal */
  gridColumns?: GridCols | GridCols[];
}

interface GridItemInternalProps {
  forceFlexBox?: boolean;
  flexCol?: string | (string | null | undefined)[] | null;
  gridCol?: GridCols | GridCols[];
  hideCol?: GridCols | GridCols[];
  flexGap?: ResponsiveValue<string | number>;
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

const StyledGrid = styled(Box)<GridWrapperProps>(
  {
    display: 'flex',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
  },
  flexGridConfig,
  props =>
    !props.forceFlexBox
      ? {
          '@supports (display: grid)': {
            display: 'grid',
            margin: 0,
            width: '100%',
          },
        }
      : undefined,
);

export const Grid: React.FC<GridProps> = forwardRef<HTMLDivElement, GridProps>(
  ({ children, gridGap, gridColumns, forceFlexBox, variant = 'grid', ...rest }, ref) => {
    const theme = useTheme<UITheme>();

    // Override the default variant lookup method here.
    // Do this because we need to ensure that gridGap is split out into different values, and passed correctly to the children
    const gridVariant =
      theme && theme.grids && variant
        ? (theme.grids[variant] as { gridGap: ResponsiveValue<number | string> })
        : undefined;

    gridGap = gridGap || (gridVariant && gridVariant.gridGap) || 0;

    return (
      <StyledGrid
        ref={ref}
        variant={variant}
        {...rest}
        __themeKey="grids"
        forceFlexBox={forceFlexBox}
        flexWidthOffset={gridGap}
        flexGap={gridGap}
        gridGap={gridGap}
        gridColumns={gridColumns}
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
      </StyledGrid>
    );
  },
);

Grid.defaultProps = {
  gridColumns: 12,
};

Grid.displayName = 'Grid';

const StyledGridItem = styled(Box)<GridItemInternalProps>(
  { boxSizing: 'border-box', minWidth: 0, flexGrow: 0 },
  flexGridItemConfig,
  props =>
    !props.forceFlexBox && {
      '@supports (display: grid)': {
        maxWidth: 'none',
        padding: 0,
        flex: 0,
      },
    },
);

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
    return col.map((val, index) =>
      val ? (val / mapGridColumn(index, gridColumns)) * 100 + '%' : undefined,
    );
  }
  if (col) {
    return (col / mapGridColumn(0, gridColumns)) * 100 + '%';
  }

  return undefined;
};

export const GridItem: React.FC<GridItemProps> = forwardRef<HTMLDivElement, GridItemProps>(
  ({ col, gridColumns, ...rest }, ref) => {
    return (
      <StyledGridItem
        ref={ref}
        __themeKey="grids"
        variant="gridItem"
        flexCol={calculateFlexCols(col, gridColumns)}
        gridCol={col}
        hideCol={col}
        {...rest}
      />
    );
  },
);

GridItem.defaultProps = {
  col: 1,
};

GridItem.displayName = 'GridItem';
