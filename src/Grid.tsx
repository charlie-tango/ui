import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { system, ResponsiveValue, Scale } from 'styled-system';
import { Box, BoxProps } from './Box';
import { isNumber } from './utils';

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps extends BoxProps {
  gridGap?: ResponsiveValue<string | number>;
  gridColumns?: GridCols | GridCols[];
  forceFlexBox?: boolean;
}

interface GridItemProps extends BoxProps {
  /** Number of columns this item should span */
  col: GridCols | GridCols[];
  /** @internal Grid columns is injected by the containing Grid - you should not attempt to set it manually. */
  gridColumns?: GridCols | GridCols[];
}

interface GridItemInternalProps {
  forceFlexBox?: boolean;
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
});

interface GridWrapperProps extends GridProps {
  flexGap?: ResponsiveValue<string | number>;
  flexWidthOffset?: ResponsiveValue<string | number>;
}

const GridWrapper = styled(Box)<GridWrapperProps>(
  {
    display: 'flex',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
    margin: 0,
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
  ({ children, gridGap, gridColumns, forceFlexBox, ...rest }, ref) => {
    return (
      <GridWrapper
        ref={ref}
        forceFlexBox={forceFlexBox}
        flexWidthOffset={gridGap}
        flexGap={gridGap}
        gridGap={gridGap}
        gridColumns={gridColumns}
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
      </GridWrapper>
    );
  },
);

Grid.defaultProps = {
  gridColumns: 12,
  gridGap: 0,
};

Grid.displayName = 'Grid';

const StyledGridItem = styled(Box)<GridItemProps & GridItemInternalProps>(
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
 * We need to take into account that the user can supply repsponsive values.
 * */
const calculateFlexCols = (col: GridCols | GridCols[], gridColumns: GridCols | GridCols[] = 12) => {
  if (Array.isArray(col)) {
    return col.map((val, index) =>
      val ? (val / mapGridColumn(index, gridColumns)) * 100 + '%' : val,
    );
  }
  if (col) {
    return (col / mapGridColumn(0, gridColumns)) * 100 + '%';
  }
};

export const GridItem: React.FC<GridItemProps> = forwardRef<HTMLDivElement, GridItemProps>(
  ({ col, gridColumns, ...rest }, ref) => {
    return (
      <StyledGridItem
        ref={ref}
        flexCol={calculateFlexCols(col, gridColumns)}
        gridCol={col}
        {...rest}
      />
    );
  },
);

GridItem.defaultProps = {
  col: 1,
};

GridItem.displayName = 'GridItem';
