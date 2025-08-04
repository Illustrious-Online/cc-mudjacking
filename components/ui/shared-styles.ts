// Shared button styles for consistent UI across the application

export const buttonStyles = {
  // Base button styles
  base: {
    transition: 'all 0.2s ease-in-out',
    _hover: {
      transform: 'translateY(-2px)',
    },
    _active: {
      transform: 'translateY(0px)',
    },
  },

  // Primary button styles
  primary: {
    variant: 'solid' as const,
    colorScheme: 'brand' as const,
    boxShadow: 'elevation2',
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'elevation4',
    },
    _active: {
      transform: 'translateY(0px)',
      boxShadow: 'elevation1',
    },
  },

  // Secondary button styles
  secondary: {
    variant: 'outline' as const,
    colorScheme: 'brand' as const,
    borderWidth: '2px',
    boxShadow: 'elevation1',
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'elevation3',
      bg: '#fff8f6',
      color: '#e12f01',
      borderColor: '#e12f01',
    },
    _active: {
      transform: 'translateY(0px)',
      boxShadow: 'elevation1',
    },
  },

  // Large button styles
  large: {
    size: 'lg' as const,
    borderRadius: 'full' as const,
    px: 10,
    py: 7,
    fontSize: 'labelLarge' as const,
    fontWeight: 'bold' as const,
    letterSpacing: 'labelLarge' as const,
  },

  // Navigation button styles
  nav: {
    variant: 'ghost' as const,
    fontSize: 'labelLarge' as const,
    fontWeight: 'medium' as const,
    letterSpacing: 'labelLarge' as const,
    position: 'relative' as const,
    borderRadius: 'full' as const,
    px: 4,
    py: 2,
    transition: 'all 0.2s ease-in-out',
    _after: {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      right: 0,
      height: '2px',
      bg: '#e12f01',
      transform: 'scaleX(0)',
      transition: 'transform 0.2s ease-in-out',
    },
    _hover: {
      bg: 'primaryContainer',
      color: '#e12f01',
      transform: 'translateY(-1px)',
      _after: {
        transform: 'scaleX(1)',
      },
    },
    _active: {
      transform: 'translateY(0px)',
    },
  },
};

// Card styles
export const cardStyles = {
  service: {
    shadow: 'elevation1',
    _hover: { 
      shadow: 'elevation3',
      transform: 'translateY(-4px)',
    },
    transition: 'all 0.3s ease-in-out',
    borderRadius: 'large',
    overflow: 'hidden',
  },

  gallery: {
    overflow: 'hidden',
    borderRadius: 'large',
    shadow: 'elevation1',
    _hover: {
      shadow: 'elevation3',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease-in-out',
  },
};

// Icon box styles
export const iconBoxStyles = {
  service: {
    w: 20,
    h: 20,
    bgGradient: 'linear(to-br, #e12f01, #ff6b3d)',
    color: 'onSurface',
    borderRadius: 'large',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'elevation2',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    _before: {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      bgGradient: 'linear(to-br, #e12f01, #ff6b3d, #e12f01)',
      borderRadius: 'large',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
    _hover: {
      transform: 'scale(1.05) rotate(5deg)',
      boxShadow: 'elevation4',
      _before: {
        opacity: 1,
      },
    },
  },
};

// Typography styles
export const typographyStyles = {
  heading: {
    fontWeight: 'bold' as const,
  },
  
  body: {
    lineHeight: 'bodyLarge' as const,
    letterSpacing: 'bodyLarge' as const,
  },
  
  label: {
    fontSize: 'labelLarge' as const,
    fontWeight: 'medium' as const,
    letterSpacing: 'labelLarge' as const,
  },
}; 