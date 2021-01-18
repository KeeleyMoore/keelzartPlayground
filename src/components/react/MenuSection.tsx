import React, { FC } from "react";
import { Box } from "@material-ui/core";

const MenuSection: FC = ({ children }) => {
  return (
    <Box mx={2} mt={1} mb={2} display="flex" flexDirection="column">
      {children}
    </Box>
  );
};

export default MenuSection;
