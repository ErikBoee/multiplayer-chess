import { FC } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { OtherProjectCard } from "./other-project-card/OtherProjectCard";

export const OtherProjects: FC = () => {
  const elem1 = {
    id: "Leder for forretningsutvikling og marked, Simonsen Vogt Wiig",
    title: "Alexander Høiland Thoresen",
    year: "Leder for forretningsutvikling og marked, Simonsen Vogt Wiig",
    location: "",
    github: "",
    tags: [""],
    description:
      "Vi hadde Jon Ludvig som konferansier på et av våre sjakkarrangementer med Magnus Carlsen. Jon Ludvig er en profesjonell konferansier med en lun humor og som har god kontakt med publikum. Den gode kjemien mellom han og Magnus gjorde opplevelsen enda bedre. Vi kan på det varmeste anbefale Jon Ludvig til tilsvarende arrangementer, og kommer til å benytte oss av hans tjenester i fremtiden.",
    image: "",
    jpg: "",
  };

  const elem2 = {
    id: "Senior Manager, Deloitte",
    title: "Leik Isdal",
    year: "",
    location: "",
    github: "",
    tags: [""],
    description:
      "I år leverer Jon Ludvig, nok en gang, en braksuksess av en sjakkturnering. Han åpner arrangementet med en introduksjon - et stykke faglig sjakkpåfyll ispedd en god dæsj humor og sjarm. Deretter loser han oss mesterlig gjennom en turnering der han tar på seg rollen som både logistikkansvarlig, dommer og kommentator. Både deltakere og arrangør kan lene seg tilbake mens Jon Ludvig styrer showet. Vi i Deloitte vil på det varmeste anbefale alle bedrifter med en gruppe smått-, moderat- og svært sjakkinteresserte å arrangere sjakkturnering i regi Jon Ludvig.",
    image: "",
    jpg: "",
  };

  const elem3 = {
    id: "Sjakkansvarlig ved Lier Bibliotek",
    title: "Tanja Olander",
    year: "",
    location: "",
    github:
      "https://www.lierposten.no/har-ikke-opplevd-maken-storste-kick-offet-noen-gang/s/5-65-249777",
    tags: [""],
    description:
      "Takket være Maud Rødsmoen ble sjakk kick-offen vår legendarisk, og bidro til en tydelig oppstart av bibliotekets sjakktilbud. Fra start til slutt var kommunikasjonen, samarbeidet og gjennomføringen av arrangementet suverent. Engasjementet og sjakklidenskapen til Maud smitter over og er med å skaper et sjakkarrangement man sent vil glemme!",
    image: "",
    jpg: "",
  };

  const elem4 = {
    id: "Bibliotekar ved Fredrikstad Bibliotek",
    title: "Thorbjørn Helin",
    year: "",
    location: "",
    github: "",
    tags: [""],
    description:
      "Vi opplevde Jon Ludvig som en stormester med fremragende formidlingsevner, og som lyktes godt i å tilpasse formidlingen til publikums interesser og kunnskapsnivå. Det ble et svært vellykket arrangement som trakk mange flere enn vanlig til sjakk-kveld på biblioteket, og vi fikk flere gode tilbakemeldinger fra fornøyde publikummere.",
    image: "",
    jpg: "",
  };

  return (
    <Box>
      <Flex
        pt="8"
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
      >
        <Box flex="0.5" justifyContent="center">
          <OtherProjectCard key={1} {...elem1} />
        </Box>
        <Box flex="0.5" justifyContent="center">
          <OtherProjectCard key={2} {...elem2} />
        </Box>
      </Flex>
      <Flex
        gap={{ base: 6, md: 6, lg: 12 }}
        direction={{ base: "column", md: "row" }}
        pb="10"
      >
        <Box flex="0.5" justifyContent="center">
          <OtherProjectCard key={3} {...elem3} />
        </Box>
        <Box flex="0.5" justifyContent="center">
          <OtherProjectCard key={4} {...elem4} />
        </Box>
      </Flex>
    </Box>
  );
};
