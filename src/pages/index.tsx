import { getFirestore } from 'firebase/firestore';
import { Inter } from 'next/font/google';

import { FirestoreProvider, useFirebaseApp } from 'reactfire';

import SEO from '@/components/base/Head';
import User from '@/components/user';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const firestooreInstance = getFirestore(useFirebaseApp());

  return (
    <>
      <SEO />
      <FirestoreProvider sdk={firestooreInstance}>
        <main className={`${styles.main} ${inter.className}`}>
          <User />
        </main>
      </FirestoreProvider>
    </>
  );
}
