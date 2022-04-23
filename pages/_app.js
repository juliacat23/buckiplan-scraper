import { SessionProvider } from 'next-auth/react';

import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
// expose session context at top level
export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>

            <Component {...pageProps} />
        </>
    );
}
