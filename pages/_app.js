import { SessionProvider as AuthProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/colors';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <AuthProvider session={session}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </AuthProvider>
    );
}

export default MyApp;
