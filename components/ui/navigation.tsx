import { Flex } from "@chakra-ui/react";
import type { FC } from "react";
import NavLink from "./nav-link";

const Navigation: FC = () => {
  return (
    <Flex gap={8} align="center" ml={4}>
      <NavLink href="/">
        Home
      </NavLink>
      <NavLink href="/contact">
        Contact
      </NavLink>
      <NavLink href="/gallery">
        Gallery
      </NavLink>
    </Flex>
  );
};

export default Navigation; 