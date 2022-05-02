import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme/colors';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
