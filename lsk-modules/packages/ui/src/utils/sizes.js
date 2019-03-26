const sizes = {
  extraSmall: 'extraSmall',
  small: 'small',
  default: 'medium',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extraLarge',
  xs: 'extraSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'extraLarge',
};

const is = (size1, size2) => sizes[size1] === sizes[size2];

export default {
  ...sizes,
  is,
};
