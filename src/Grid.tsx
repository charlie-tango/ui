import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { system, ResponsiveValue, Scale } from 'styled-system';
import { Box, BoxProps } from './Box';
import { isNumber } from './utils';

interface GridProps extends BoxProps {
  gridGap?: ResponsiveValue<string | number>;
  forceFlexBox?: boolean;
}

interface GridItemProps extends BoxProps {
  col?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
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
  gridGap: { scale: 'space', property: 'gridGap' },
});

const flexGridItemConfig = system({
  flexGap: {
    scale: 'space',
    property: 'padding',
    transform: (value, scale) => {
      let output = getGapValue(value, scale);
      if (isNaN(output)) {
        return `calc(${output} * 0.5)`;
      }
      return output * 0.5;
    },
  },
  flexCol: {
    properties: ['maxWidth', 'flexBasis'],
    transform: (value = 1) => {
      return (value / 12) * 100 + '%';
    },
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
            gridTemplateColumns: 'repeat(12, 1fr)',
            margin: 0,
            width: '100%',
          },
        }
      : undefined,
);

export const Grid: React.FC<GridProps> = forwardRef<HTMLDivElement, GridProps>(
  ({ children, gridGap, forceFlexBox, ...rest }, ref) => {
    return (
      <GridWrapper
        ref={ref}
        forceFlexBox={forceFlexBox}
        flexWidthOffset={gridGap}
        flexGap={gridGap}
        gridGap={gridGap}
        {...rest}
      >
        {React.Children.map(children, child =>
          // Clone the children so we can inject the correct `gridGap` value into it.
          React.isValidElement(child)
            ? React.cloneElement(child, {
                flexGap: gridGap,
                forceFlexBox,
              } as GridItemInternalProps)
            : null,
        )}
      </GridWrapper>
    );
  },
);

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

export const GridItem: React.FC<GridItemProps> = forwardRef<HTMLDivElement, GridItemProps>(
  ({ col, ...rest }, ref) => {
    return <StyledGridItem ref={ref} flexCol={col} gridCol={col} {...rest} />;
  },
);

GridItem.displayName = 'GridItem';
