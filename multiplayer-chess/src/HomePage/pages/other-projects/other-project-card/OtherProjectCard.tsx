import { FC } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ProjectCardFooter } from "../../../shared/project-card-footer/ProjectCardFooter";

interface Props {
  id: string;
  title: string;
  demo?: string;
  github?: string;
  description: string;
  readMore?: string;
  image: string;
  jpg: string;
}

export const OtherProjectCard: FC<Props> = ({
  id,
  title,
  demo,
  github,
  description,
  readMore,
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
          <ProjectCardFooter readMore={readMore} github={github} demo={demo} />
        </Box>
      </Flex>
    </Flex>
  );
};
