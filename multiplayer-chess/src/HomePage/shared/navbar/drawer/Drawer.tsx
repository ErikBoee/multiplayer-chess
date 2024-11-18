import { FC, useRef } from "react";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  StyleProps,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { AboutPageId, WorkPageId, TilbudId } from "../../../utils/useScroll";
import { MenuIcon } from "../../../utils/Icons";
import { Socials } from "../../socials/Socials";

interface Props extends StyleProps {
  onSectionClick: (section: string) => void;
  currentPage: string;
}

export const MenuDrawer: FC<Props> = ({
  onSectionClick,
  currentPage,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>(null);
  const navItemColor = useColorModeValue("gray.800", "white");

  return (
    <Box {...props}>
      <Button
        as={IconButton}
        variant="icon"
        ref={btnRef}
        onClick={onOpen}
        aria-label="open drawer"
        fontSize="lg"
        color="primary.500"
        icon={<MenuIcon />}
        px="0"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader px="4">
            <Flex justifyContent="space-between">
              <DrawerCloseButton position="relative" top="0" right="0" />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing="6" my="16">
              <Button
                variant="link"
                color={navItemColor}
                textDecoration="underline"
                textDecorationThickness="2px"
                textDecorationColor={
                  currentPage === TilbudId ? "primary.500" : "transparent"
                }
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onSectionClick(TilbudId);
                  }, 250);
                }}
                data-aos="fade"
                data-aos-delay="200"
                fontWeight="600"
                fontSize="2xl"
              >
                Tilbud
              </Button>
              <Button
                variant="link"
                color={navItemColor}
                textDecoration="underline"
                textDecorationThickness="2px"
                textDecorationColor={
                  currentPage === WorkPageId ? "primary.500" : "transparent"
                }
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onSectionClick(WorkPageId);
                  }, 250);
                }}
                data-aos="fade"
                data-aos-delay="200"
                fontWeight="600"
                fontSize="2xl"
              >
                Omtaler
              </Button>
              <Button
                variant="link"
                color={navItemColor}
                textDecoration={
                  currentPage === AboutPageId ? "underline" : "none"
                }
                textDecorationThickness="2px"
                textDecorationColor="primary.500"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onSectionClick(AboutPageId);
                  }, 250);
                }}
                data-aos="fade"
                data-aos-delay="300"
                fontWeight="600"
                fontSize="2xl"
              >
                Om oss
              </Button>
            </VStack>
            <Flex justifyContent="center" mt="16">
              <Socials delay={100} resume={false} />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
