import { FC } from "react";

import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Content } from "../../shared/content/Content";

import JL from "./jonludvig.png";
import Maud from "./maud.png";

export const About: FC = () => {
  return (
    <Box>
      <Flex
        pt="8"
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
      >
        <Box flex="0.5">
          <picture>
            <Image borderRadius="xl" src={JL} w="100%" alt="JL" />
          </picture>
        </Box>
        <Box flex="0.5">
          <Heading>Jon Ludvig Hammer</Heading>

          <Box pt="4">
            <Content fontSize="m">
              Jon Ludvig har dedikert livet sitt til sjakk. Som spiller har det
              blitt stormester-utmerkelse og drøssevis av Norgesmester-titler,
              inkludert tre kongepokaler. Som trener bidro han i teamet da
              Magnus Carlsen ble verdensmester for første gang. Og i senere tid
              som kommentator, der hans lidenskap for sjakken kommer tydelig
              frem på TV 2s sjakksendinger. Den lidenskapen tar han med seg inn
              i foredrag og andre tilstelninger, og det har en tendens til å
              smitte over på publikum også. Jon Ludvig startet
              sjakk-konkurreringen i USA, en erfaring som har hjulpet med
              språkferdigheter til å bli en etterspurt kommentator også
              internasjonalt, hos Chess.com, pluss Twitch-profilene gmhikaru og
              BotezLive. Sjakkunderholdning har blitt stor business, og det blir
              best med Jon Ludvigs smittende entusiasme.
            </Content>
          </Box>
        </Box>
      </Flex>
      <Flex
        pt="8"
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
      >
        <Box flex="0.5">
          <picture>
            <Image borderRadius="xl" src={Maud} w="100%" alt="Maud" />
          </picture>
        </Box>
        <Box flex="0.5">
          <Heading>Maud Rødsmoen</Heading>

          <Box pt="4">
            <Content fontSize="m">
              Maud arrangerer, sånn er det bare. Uansett om det er jobbens
              julebord, NTNU-studentens temafester eller bare samle store
              venneflokker til 17. mai-frokost og nyttårsfeiring: Maud får det
              gjort. Sjakk-karrieren startet i New York, der hun bodde med
              familien til hun var 12 år gammel, og etter returen til
              gamlelandet har det blitt både Norgesmester-titler og
              landslagsplass. I tillegg engasjerer hun seg utenfor
              konkurransesetting også, og har trent den nye generasjonen
              sjakkjenter, vært redaktør i Norsk Sjakkblad, og kommenterer sjakk
              hos TV 2. Maud er utdannet sivilingeniør fra NTNU og skrev
              masteroppgave om hvordan kunstig intelligens kan lage nye
              sjakkverktøy, både for å spille bedre så vel som å presentere
              sjakken mer engasjerende til publikum. Et gøyalt sjakkarrangement
              blir bedre med Maud som hjernen bak.
            </Content>
          </Box>
        </Box>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 16, md: 6, lg: 12 }}
        mt="16"
        justifyContent="space-between"
      ></Flex>
    </Box>
  );
};
