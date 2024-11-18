import { FC } from "react";

import { Box, Flex, Text, Stack, Image, Heading } from "@chakra-ui/react";

import { FeaturedProjectCard, ImagePosition } from "pages/featured-projects/featured-project-card/FeaturedProjectCard";
import { configs } from "shared/content/Content";
import { title } from "process";
import Tilbud1 from "./tilbud1.jpg";

const ImagePositionLayoutMapper: Record<ImagePosition, "row" | "row-reverse"> = {
    [ImagePosition.Right]: "row",
    [ImagePosition.Left]: "row-reverse",
};

const ImagePositionPaddingRightMapper: Record<ImagePosition, string> = {
    [ImagePosition.Right]: "8",
    [ImagePosition.Left]: "0",
};

const ImagePositionPaddingLeftMapper: Record<ImagePosition, string> = {
    [ImagePosition.Right]: "0",
    [ImagePosition.Left]: "8",
};

export const TilbudGammel: FC = () => {
    return (
        <Box
            id="featured-projects"
            display={{ base: "block", md: "flex", lg: "block" }}
            flexDir="column"
            gap={{ base: "2", md: "2" }}
        >
            <Stack direction="row">
            <picture>
                        <Image borderRadius="xl" src={Tilbud1} w="90%" alt="undervisning" />
                        </picture>
                        <picture>
                        <Image borderRadius="xl" src={Tilbud1} w="90%" alt="undervisning" />
                        </picture>
            </Stack>
            <Stack direction="row">
                <>
                    <Flex
                        h="auto"
                        direction="column"
                        justifyContent="space-between"
                        flex={{ base: 1, lg: 0.6 }}
                    >
                        <Box>
                            <Heading data-aos-offset="200" fontSize="2xl" lineHeight="1">
                                Simultanoppvisning
                            </Heading>

                            <Text
                                fontSize="lg"
                                pt={{ base: 0, lg: "2" }}
                                data-aos-offset="200"
                                data-aos-delay="200"
                                borderRadius="xl"
                                pb="2"
                            >
                                Hvem er det ukjente sjakkgeniet i bedriften? Finn ut med et fullkveldsopplegg inkludert undervisning fra Jon Ludvig Hammer. Vi står for alt av utstyr og arrangerer en turnering for bedriftens ansatte - en flott måte å samles på tvers av avdelinger og hierarki.
                            </Text>

                        </Box>

                    </Flex>

                    <Box
                        display={{ base: "none", lg: "block" }}
                        flex={{ base: 1, lg: 0.6 }}
                    >
                        Hei?
                        
                    </Box>
                </>
            </Stack>
            
            <Box flexDir="row">
                <>
                    Maudi3
                </>
                <>
                    Maudi4
                </>
            </Box>
        </Box>
    );
};
