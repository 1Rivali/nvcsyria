import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const colors = {
  primary: {
    50: '#e6e6e6',
    100: '#cccccc',
    200: '#b3b3b3',
    300: '#999999',
    400: '#808080',
    500: '#5442a5',
    600: '#4c3b91',
    700: '#423073',
    800: '#392765',
    900: '#2f1e58',
  },
  secondary: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#72b7b2',
    600: '#64a69a',
    700: '#4f8b81',
    800: '#3b6d65',
    900: '#274a4a',
  },
  white: '#ffffff',
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  config,
  fonts: {
    heading: "Calibri, Marhey, sans-serif",
    body: "Calibri, Marhey, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: 'white',
        color: 'primary.500',
      },
    }),
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 'bold',
          fontSize: '16px',
          _placeholder: {
            color: 'gray.500',
          },
        },
      },
      sizes: {
        md: {
          field: {
            borderRadius: '8px',
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'primary.500',
            _hover: {
              borderColor: 'primary.700',
            },
            _focus: {
              borderColor: 'primary.500',
              boxShadow: '0 0 0 1px #31639e',
            },
          },
        },
        filled: {
          field: {
            bg: 'secondary.200',
            color: "white",
            _hover: {
              bg: 'secondary.200',
            },
            _focus: {
              bg: 'primary.500',
              borderColor: 'secondary.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
        size: 'md',
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
      sizes: {
        md: {
          field: {
            borderRadius: '8px',
          },
        },
      },
      variants: {
        filled: {
          field: {
            bg: 'secondary.200',
            color: 'white',
            _hover: {
              bg: 'secondary.200',
            },
            _focus: {
              bg: 'primary.500',
              borderColor: 'secondary.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
        size: 'md',
      },
    },
  },
});

export default theme;
