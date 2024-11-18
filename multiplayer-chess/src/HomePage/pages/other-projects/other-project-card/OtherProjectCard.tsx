import { FC } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface Props {
  id: string;
  title: string;
  description: string;
  image: string;
  jpg: string;
}

export const OtherProjectCard: FC<Props> = ({
  id,
  title,
  description,
}) => {
  return (
    <Flex
      alignItems={{ base: "flex-start", lg: "center" }}
      gap="3"
      id={`other-project-card-${id}`}
      py={{ base: "3", md: "3" }}
    >
      <Flex w="100%" direction="column" alignContent="center" flex={1}>
        <Box>
          <Heading fontSize="2xl" data-aos-offset="200">
            {title}
          </Heading>
          <Text pt="2" fontSize="sm" fontWeight="600" opacity="0.6">
            {id}
          </Text>
          <Text py="2">"{description}"</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
