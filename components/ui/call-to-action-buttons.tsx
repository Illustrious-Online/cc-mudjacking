import { Flex, Text } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import NavLink from './nav-link';
import { FREE_ESTIMATE, PHONE_NUMBER } from '@/app/constants';
import { buttonStyles } from './shared-styles';

export interface CallToActionButtonsProps {
  /** Custom margin top value, defaults to 8 */
  mt?: number | string;
}

export default function CallToActionButtons({ 
  mt = 8,
}: CallToActionButtonsProps) {
  const primaryButtonStyles = {
    ...buttonStyles.large,
    ...buttonStyles.primary,
  };

  const secondaryButtonStyles = {
    ...buttonStyles.large,
    ...buttonStyles.secondary,
  };

  return (
    <Flex 
      gap={8} 
      justifyContent="center" 
      alignItems="center" 
      mt={mt} 
      direction={{ base: 'column', md: 'row' }}
      flexWrap="wrap"
    >
      <NavLink
        href="/contact"
        buttonProps={primaryButtonStyles}
      >
        {FREE_ESTIMATE}
      </NavLink>
      <NavLink
        href="tel:6416919999"
        buttonProps={secondaryButtonStyles}
      >
        <FaPhone />
        <span style={{ fontSize: '14px', marginLeft: '12px', fontWeight: '700' }}>{PHONE_NUMBER}</span>
      </NavLink>
    </Flex>
  );
} 