/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { FirebaseAppProvider } from 'reactfire';
import { ThemeProvider, createTheme } from '@mui/material';

import { firebaseConfig } from '@/lib/firebase';
import FirebaseSDKProvider from '@/components/provider/firebaseProvider';
import Header from '@/components/base/Header/Header';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: ['Merriweather Sans', 'sans-serif'].join(','),
    },
  });
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseSDKProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />;
        </ThemeProvider>
      </FirebaseSDKProvider>
    </FirebaseAppProvider>
  );
}
