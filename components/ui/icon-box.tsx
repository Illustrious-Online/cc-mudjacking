"use client";

import { Box, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { iconBoxStyles } from './shared-styles';

interface IconBoxProps {
  icon: IconType;
  size?: number;
  color?: string;
}

export default function IconBox({ 
  icon, 
  size = 10, 
  color = "primary.80" 
}: IconBoxProps) {
  return (
    <Box {...iconBoxStyles.service}>
      <Icon color={color} as={icon} boxSize={size} />
    </Box>
  );
} 