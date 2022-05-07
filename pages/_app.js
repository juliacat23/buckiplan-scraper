import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme/colors';
import '../styles/Profile.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </SessionProvider>
    );
}

export default MyApp;
