import styled from '@emotion/styled';

/**
 * VisuallyHidden renders content hidden for everything but the screen reader.
 * */
export const VisuallyHidden = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  word-wrap: normal;
`;
