import React, { FC } from "react";
import { Box } from "@material-ui/core";

const MenuSection: FC = ({ children }) => {
  return (
    <Box mx={2} my={1} display="flex" flexDirection="column">
      { children}
    </Box>
  );
};

export default MenuSection;
