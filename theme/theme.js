import { extendTheme } from '@chakra-ui/react';

// add color mode config
const config = {
    initialColorMode: 'system',
    useSystemColorMde: false,
};

// extend the theme

const theme = extendTheme({ config });
