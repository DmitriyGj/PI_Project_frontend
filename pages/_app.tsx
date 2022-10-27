import type { AppProps } from 'next/app';
import '@styles/global.scss';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import WithLayout from '@utils/withLayout/WithLayout';
import Layout1 from "@utils/withLayout/Layout1";

const cache = createCache({
    key: 'css',
    prepend: true,
});

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return ( <CacheProvider value={cache}>
        <Provider store={store}>
            <WithLayout>
                <Component {...props.pageProps} />
            </WithLayout>
        </Provider>
    </CacheProvider>);
}

export default MyApp;
