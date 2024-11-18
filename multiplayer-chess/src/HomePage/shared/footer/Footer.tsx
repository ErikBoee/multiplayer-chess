import { FC } from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { PageHeader } from "../../shared/page-header/PageHeader";

const headerStyles = {
  cursor: "pointer",
  transition: "color 0.2s ease-in-out",
  isTruncated: true,
  fontSize: { base: "2xl", md: "3xl" },
  _hover: { color: "primary.500" },
  _active: { color: "primary.500" },
};

export const Footer: FC = () => {
  return (
    <>
      <PageHeader label="Kontakt oss" />
      <Flex pb="2" gap="7" overflow="hidden" alignItems="center">
        <Heading {...headerStyles} fontSize="2xl">
          jlh@live.com
        </Heading>
        <Heading {...headerStyles} fontSize="2xl">
          maudrodsmoen@gmail.com
        </Heading>
      </Flex>
      <Flex
        pt="4"
        pb="2"
        fontSize="sm"
        color="gray.500"
        justifyContent={{ base: "center", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
      >
        <Text></Text>
        <Text>&copy; {new Date().getFullYear()} Helt konge</Text>
      </Flex>
    </>
  );
};
