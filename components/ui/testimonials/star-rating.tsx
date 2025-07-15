import { HStack, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  'data-testid'?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 4,
  activeColor = 'yellow.400',
  inactiveColor = 'gray.300',
  'data-testid': testId = 'star-rating',
}: StarRatingProps) {
  return (
    <HStack data-testid={testId} gap={1}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starId = `${testId}-star-${i + 1}`;
        return (
          <Icon
            key={starId}
            as={FaStar}
            color={i < rating ? activeColor : inactiveColor}
            boxSize={size}
            data-testid={starId}
          />
        );
      })}
    </HStack>
  );
} 