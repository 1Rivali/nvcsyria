
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/styled-system';


const colors = {
  primary: {
    50: '#e6e6e6', // Light variant for accessibility
    100: '#cccccc',
    200: '#b3b3b3',
    300: '#999999',
    400: '#808080',
    500: '#5442a5', // Main color
    600: '#4c3b91',
    700: '#423073',
    800: '#392765',
    900: '#2f1e58',
  },
  secondary: {
    50: '#e0f2f1', // Light variant for accessibility
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#72b7b2', // Accent color
    600: '#64a69a',
    700: '#4f8b81',
    800: '#3b6d65',
    900: '#274a4a',
  },
  white: '#ffffff', // 60% color
};


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,

};

const theme = extendTheme({
  colors,
  config,
  fonts: {
    heading: `'Noto Sans Arabic', sans-serif`,
    body: `'Noto Sans Arabic', sans-serif`,
    mono: `'Noto Sans Arabic', monospace`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: 'white',
        color: 'primary.500',
      },
    }),
  },
  components: {
    // Customize components if needed
  },
});

export default theme;
