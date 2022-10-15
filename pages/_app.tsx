import type { AppProps } from 'next/app';
import '@styles/global.scss';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import 'antd/dist/antd.css';

import WithLayout from '@utils/withLayout/WithLayout';

import Layout from '@utils/withLayout/Layout1';

const cache = createCache({
    key: 'css',
    prepend: true,
});

function MyApp({ Component, pageProps }: AppProps) {
    return ( 
        <CacheProvider value={cache}>
            <WithLayout>
            {/* <Layout> */}

            
                <Component {...pageProps} />
            {/* </Layout> */}
            </WithLayout>
        </CacheProvider>
   
    
    );
}

export default MyApp;