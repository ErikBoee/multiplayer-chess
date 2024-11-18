import { FC } from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { LogoType } from "./logo-type/LogoType";
import { bgDark, bgLight } from "../../theme";
import {
  AboutPageId,
  TilbudId,
  useScroll,
  WorkPageId,
} from "../../utils/useScroll";
import { configs } from "../content/Content";
import { MenuDrawer } from "./drawer/Drawer";

export const Navbar: FC = () => {
  const bg = useColorModeValue(bgLight, bgDark);
  const navItemColor = useColorModeValue("gray.800", "white");
  const currentPage = useScroll();

  const toSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      bg={bg}
      position="fixed"
      top="0"
      w="100%"
      left="50%"
      transform="translate(-50%)"
      zIndex="10"
    >
      <Container py="4" px="4" data-aos-duration="500" data-aos-delay="100">
        <Flex justifyContent="space-between" alignItems="center">
          <LogoType text={configs.common.logoType} />
          <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
            <HStack spacing="8" mr="6">
              <Button
                variant="link"
                color={navItemColor}
                textDecoration="underline"
                textDecorationThickness="2px"
                textDecorationColor={
                  currentPage === WorkPageId ? "primary.500" : "transparent"
                }
                onClick={() => toSection(WorkPageId)}
                data-aos="fade"
                data-aos-delay="200"
              >
                Omtaler
              </Button>
              <Button
                variant="link"
                color={navItemColor}
                textDecoration="underline"
                textDecorationThickness="2px"
                textDecorationColor={
                  currentPage === TilbudId ? "primary.500" : "transparent"
                }
                onClick={() => toSection(TilbudId)}
                data-aos="fade"
                data-aos-delay="200"
              >
                Tilbud
              </Button>
              <Button
                variant="link"
                color={navItemColor}
                textDecoration={
                  currentPage === AboutPageId ? "underline" : "none"
                }
                textDecorationThickness="2px"
                textDecorationColor="primary.500"
                onClick={() => toSection(AboutPageId)}
                data-aos="fade"
                data-aos-delay="300"
              >
                Om oss
              </Button>
              <Button
                variant="link"
                onClick={() =>
                  (window.location.href = "mailto:maudrodsmoen@gmail.com")
                }
                data-aos="fade"
                data-aos-delay="400"
              >
                Kontakt
              </Button>
            </HStack>
            {/*<ColorModeButton />*/}
          </Flex>

          <MenuDrawer
            currentPage={currentPage}
            onSectionClick={toSection}
            display={{ base: "block", md: "none" }}
          />
        </Flex>
      </Container>
    </Box>
  );
};
