import { Flex, Text } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import NavLink from './nav-link';
import { FREE_ESTIMATE, PHONE_NUMBER } from '@/app/constants';

export interface CallToActionButtonsProps {
  /** Custom margin top value, defaults to 8 */
  mt?: number | string;
}

export default function CallToActionButtons({ 
  mt = 8,
}: CallToActionButtonsProps) {
  return (
    <Flex gap={4} justifyContent="center" alignItems="center" mt={mt} direction={{ base: 'column', md: 'row' }}>
      <NavLink
        href="/contact"
        buttonProps={{
          size: 'lg',
          variant: 'solid',
          colorScheme: 'brand',
          maxW: '20em',
        }}
      >
        {FREE_ESTIMATE}
      </NavLink>
      <NavLink
        href="tel:6416919999"
        buttonProps={{
          size: 'lg',
          variant: 'outline',
          colorScheme: 'brand',
          maxW: '20em',
        }}
      >
        <FaPhone />
        <Text fontSize="sm">{PHONE_NUMBER}</Text>
      </NavLink>
    </Flex>
  );
} 