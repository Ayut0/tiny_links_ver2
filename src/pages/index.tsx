import { Inter } from 'next/font/google';

import SEO from '@/components/base/Head';
import User from '@/components/user';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SEO />
      <main className={`${styles.main} ${inter.className}`}>
        <User />
      </main>
    </>
  );
}
