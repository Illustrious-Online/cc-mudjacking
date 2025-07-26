import { Flex, Text } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import NavLink from './nav-link';
import { FREE_ESTIMATE, CALL_US_TODAY, PHONE_NUMBER } from '@/app/constants';

export interface CallToActionButtonsProps {
  /** Custom margin top value, defaults to 8 */
  mt?: number | string;
  /** Whether to use white color scheme for the phone button, defaults to false */
  whitePhoneButton?: boolean;
}

export default function CallToActionButtons({ 
  mt = 8,
  whitePhoneButton = false 
}: CallToActionButtonsProps) {
  return (
    <Flex gap={4} justifyContent="center" mt={mt} direction={{ base: 'column', md: 'row' }}>
      <NavLink
        href="/contact"
        buttonProps={{
          size: 'lg',
          variant: 'solid',
          colorScheme: 'brand',
        }}
      >
        {FREE_ESTIMATE}
      </NavLink>
      <NavLink
        href="tel:6416919999"
        buttonProps={{
          size: 'lg',
          variant: 'outline',
          colorScheme: whitePhoneButton ? 'white' : 'brand',
        }}
      >
        <FaPhone />
        <Text fontSize="xs" color={whitePhoneButton ? 'brand.200' : 'current'}>
          {CALL_US_TODAY}
        </Text>
        <Text fontSize="sm">{PHONE_NUMBER}</Text>
      </NavLink>
    </Flex>
  );
} 