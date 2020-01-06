import styled from 'styled-components';
import { Box } from '../';

export const Item = styled(Box)`
  font-family: system-ui, sans-serif;
  box-sizing: border-box;
  padding: 1rem 0.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  background: #e1e9fa;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0px rgba(0, 0, 0, 0.14), 0 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
