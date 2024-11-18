import { FC } from "react";

import { Box, Flex, Heading, Image } from "@chakra-ui/react";

import Tilbud3 from "./ignitesummit.jpeg";
import Tilbud2 from "./sjakkevents.jpeg";
import Tilbud1 from "./tilbud1.jpg";
export const Tilbud: FC = () => {
  return (
    <Box>
      <Flex
        pt="8"
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
      >
        <Box flex="0.28">
          <picture>
            <Image
              borderRadius="xl"
              src={Tilbud2}
              w="100%"
              alt="Alle mot Jon Ludvig"
            />
          </picture>
        </Box>
        <Box flex="0.5">
          <picture>
            <Image borderRadius="xl" src={Tilbud1} w="100%" alt="Kurs" />
          </picture>
        </Box>
        <Box flex="0.28">
          <picture>
            <Image borderRadius="xl" src={Tilbud3} w="100%" alt="Blindsjakk" />
          </picture>
        </Box>
      </Flex>
      <Flex
        pt="8"
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
        pb="10"
      >
        <Box flex="0.5" justifyContent="center">
          <Heading>Simultanoppvisning</Heading>
          <Box pt="4">
            Lyst til å prøve dere på en giganti≠sk sjakkutfordring? Jon Ludvig
            Hammer spiller mot opptil 30 personer samtidig, mens Maud Rødsmoen
            kommer med tips og triks til de som står fast.
          </Box>
        </Box>
        <Box flex="0.5" justifyContent="center">
          <Heading>Alle mot Jon Ludvig!</Heading>

          <Box pt="4">
            Er dere uforutsigbart mange deltakere, er dette midt i blinken. Her
            skal alle spille mot Jon Ludvig samtidig, ved å gjøre sine trekk på
            mobilen! Det mest populære trekket spilles, og man kan følge med på
            avstemmingen på storskjermen samtidig. Maud er konferansier og
            kommer med tips og triks underveis.
          </Box>
        </Box>
        <Box flex="0.5" justifyContent="center">
          <Heading>Internturnering</Heading>

          <Box pt="4">
            Hvem er det ukjente sjakkgeniet i bedriften? Finn ut med et
            fullkveldsopplegg inkludert undervisning fra Jon Ludvig Hammer. Vi
            står for alt av utstyr og arrangerer en turnering for bedriftens
            ansatte - en flott måte å samles på tvers av avdelinger og hierarki.
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
