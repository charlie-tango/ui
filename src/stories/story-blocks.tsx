import React from 'react';
import { Box, BoxProps } from '../';

export const Item = (props: BoxProps) => {
  return (
    <Box
      sx={{
        fontFamily: 'system-ui, sans-serif',
        boxSizing: 'border-box',
        padding: '1rem 0.25rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
        color: '#1e084a',
        background: '#b7a0e3',
        height: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow:
          '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0px rgba(0, 0, 0, 0.14), 0 1px 3px 0px rgba(0, 0, 0, 0.12)',
      }}
      {...props}
    />
  );
};

export const Warning = (props: BoxProps) => {
  return <Box sx={{}} {...props} />;
};
