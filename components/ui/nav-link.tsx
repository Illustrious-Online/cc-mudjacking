import {
  Button,
  type ButtonProps,
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef } from "react";

interface NavLinkProps extends ChakraLinkProps {
  href: string;
  asButton?: boolean;
  buttonProps?: ButtonProps;
  children: React.ReactNode;
}

/**
 * NavLink renders a Chakra <Link> or <Button> styled link using Next.js routing.
 *
 * - If asButton or buttonProps is provided, it renders an <a> styled as a button (not a <button>),
 *   due to Next.js <Link> always rendering an anchor.
 * - If neither is provided, it renders a standard <a>.
 *
 * If you need a true <button> for navigation, use a regular <Button> and handle navigation with router.push.
 */
const NavLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, NavLinkProps>(
  ({ href, asButton = false, buttonProps, children, ...rest }, ref) => {
    const shouldRenderAsButton = asButton || buttonProps;

    if (shouldRenderAsButton) {
      return (
        <Button
          as={NextLink}
          href={href}
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(buttonProps as any)}
          {...rest}
        >
          {children}
        </Button>
      );
    }

    return (
      <ChakraLink
        as={NextLink}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...rest}
      >
        {children}
      </ChakraLink>
    );
  },
);

NavLink.displayName = "NavLink";

export default NavLink;
