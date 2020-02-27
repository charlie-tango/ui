/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { sx } from '../index';

export const Item = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      css={{
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

export const PortalBlock = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      css={sx({
        border: '1px solid black',
        position: 'absolute',
        p: 3,
        top: 3,
        right: 3,
        left: [3, '50%'],
        bg: '#f4f4f4',
      })}
      {...props}
    />
  );
};

export const Warning = (props: React.HTMLProps<HTMLDivElement>) => {
  return <div css={{}} {...props} />;
};
