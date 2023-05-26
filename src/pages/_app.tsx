/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { FirebaseAppProvider } from 'reactfire';

import { firebaseConfig } from '@/lib/firebase';
import FirebaseSDKProvider from '@/components/provider/firebaseProvider';

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseSDKProvider>
        <Component {...pageProps} />;
      </FirebaseSDKProvider>
    </FirebaseAppProvider>
  );
}
