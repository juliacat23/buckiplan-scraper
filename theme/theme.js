import { extendTheme } from '@chakra-ui/react';

// add color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMde: 'true',
};

// extend the theme

const theme = extendTheme({ config });
