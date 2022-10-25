import type { AppProps } from 'next/app';
import '@styles/global.scss';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';

const cache = createCache({
    key: 'css',
    prepend: true,
});

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return ( <CacheProvider value={cache}>
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    </CacheProvider>);
}

export default MyApp;
