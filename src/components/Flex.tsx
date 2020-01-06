import React from "react";
import { BoxProps } from "../types";
import styled from "styled-components";
import { Box } from "./Box";

/**
 * The Flex component is the same as the Box component, but with `display: flex` set as the default.
 * */
export const Flex: React.FC<BoxProps> = styled(Box)({
  display: 'flex',
});