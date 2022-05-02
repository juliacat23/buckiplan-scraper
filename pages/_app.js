import { supabaseClient } from '../lib/client';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import theme from '../theme/colors';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const user = supabaseClient.auth.user();

    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                handleAuthSession(event, session);
                if (event === 'SIGNED_IN') {
                    const signedInUser = supabaseClient.auth.user();
                    const userId = signedInUser.id;
                    supabaseClient
                        .from('profiles')
                        .upsert({ id: userId })
                        .then((_data, error) => {
                            if (!error) {
                                router.push('/');
                            }
                        });
                }
                if (event === 'SIGNED_OUT') {
                    router.push('/signin');
                }
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, [router]);

    useEffect(() => {
        if (user) {
            if (router.pathname === '/signin') {
                router.push('/');
            }
        }
    }, [router.pathname, user, router]);

    const handleAuthSession = async (event, session) => {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
        });
    };

    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
