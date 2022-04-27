import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/colors';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    );
}

export default MyApp;
