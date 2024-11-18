import { FC } from "react";

import { Box, Text } from "@chakra-ui/react";

interface Props {
  id?: string;
  label: string;
}
export const PageHeader: FC<Props> = ({ id, label }) => {
  return (
    <Box id={id} pb="4" fontSize="3xl">
      <Text as="span" color="black" fontWeight="800">
        {label}
      </Text>
    </Box>
  );
};
