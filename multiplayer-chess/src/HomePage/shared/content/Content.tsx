import { FC } from "react";

import { Text, Stack, StyleProps, Link, UnorderedList } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import common from "../../content/common/common.json";
import featuredProjects from "../../content/featured-projects/featured-projects-config.json";
import otherProjects from "../../content/other-projects/other-projects-config.json";

export const configs = {
  common,
  featuredProjects,
  otherProjects,
};

interface Props extends StyleProps {
  children?: string;
}

export const Content: FC<Props> = ({ children, ...rest }) => {
  return (
    <Stack spacing="4">
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <Text {...rest} {...props} />,
          a: ({ node, ...props }) => (
            <Link
              href={props.href}
              target="_blank"
              color="primary.200"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => {
            const { ordered, ...rest } = props;

            return (
              <UnorderedList
                {...rest}
                data-aos="fade"
                listStylePosition="inside"
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                listStyleType="'‣ '"
                fontWeight="600"
              />
            );
          },
          li: ({ node, ...props }) => {
            const { ordered, ...rest } = props;

            return (
              <li
                data-aos="flip-up"
                data-aos-delay={props.index * 100 + 400}
                {...rest}
              />
            );
          },
        }}
      >
        {children as string}
      </ReactMarkdown>
    </Stack>
  );
};
