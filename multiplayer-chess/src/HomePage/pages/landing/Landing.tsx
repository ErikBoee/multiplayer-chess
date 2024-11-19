import { FC } from "react";

import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";

import { Content } from "../../shared/content/Content";
import braathe from "./braathe.svg";
import deloitte from "./deloitte.png";
import ignite from "./ignite.svg";
import maudjl from "./maudjl.jpg";
import pareto from "./pareto.svg";
import servicenow from "./servicenow.svg";
import simonsen from "./simonsen.svg";
import tekna from "./tekna.svg";
import vkd from "./vkd.png";

export const Landing: FC = () => {
  return (
    <Box id="page-landing">
      <Center pb={{ base: 16, md: 12 }}>
        <HStack
          spacing="16"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack flex={{ base: "1", lg: "0.6" }} spacing="16">
            <Stack spacing="8">
              <Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                lineHeight="2"
                data-aos-delay="400"
              >
                Sjakk-events for din bedrift!
              </Heading>
              <Content data-aos-delay="500" fontSize="lg">
                Vi har arrangert simultaner og turneringer for
              </Content>
              <Stack direction="column" gap={2}>
                <Stack direction="row" gap={3} alignItems="center">
                  <picture>
                    <img src={pareto} width="140px" alt="Pareto" />
                  </picture>
                  <picture>
                    <img
                      src={simonsen}
                      width="140px"
                      alt="Simonsen Vogt Wiig"
                    />
                  </picture>
                  <picture>
                    <img src={tekna} width="140px" alt="Tekna" />
                  </picture>
                  <picture>
                    <img src={deloitte} width="140px" alt="Deloitte" />
                  </picture>
                </Stack>
                <Stack direction="row" gap={2} alignItems="center">
                  <picture>
                    <img src={ignite} width="140px" alt="Ignite" />
                  </picture>
                  <picture>
                    <img src={vkd} width="100px" alt="Verdens Kuleste Dag" />
                  </picture>
                  <picture>
                    <img src={servicenow} width="140px" alt="Servicenow" />
                  </picture>
                  <picture>
                    <img src={braathe} width="140px" alt="Braathe" />
                  </picture>
                </Stack>
                <Content data-aos-delay="500" fontSize="lg">
                  og mange fler! Vi ønsker å bistå enda flere med
                  sjakkunderholdning og kan tilpasse oss ethvert type
                  arrangement.
                </Content>
                <Content data-aos-delay="500" fontSize="lg">
                  Kontakt oss på mail, maudrodsmoen@gmail.com og jl.hammer@live.com.
                </Content>
              </Stack>
            </Stack>
          </Stack>
          <Container
            alignItems="center"
            flex="0.4"
            display={{ base: "none", lg: "block" }}
            data-aos-delay="400"
          >
            <picture>
              <Image borderRadius="xl" src={maudjl} alt={`maud+jl`} />
            </picture>
          </Container>
        </HStack>
      </Center>
    </Box>
  );
};
