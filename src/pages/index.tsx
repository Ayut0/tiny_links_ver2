import { Inter } from 'next/font/google';

import SEO from '@/components/base/Head';

import LoginForm from '@/components/page/form/authForm/loginForm/LoginForm';
import Top from '@/components/page/top/Top';
import useUserStatus from '@/components/page/top/hooks/useUser';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { userStatus, signedInUser } = useUserStatus();

  return (
    <>
      <SEO />
      <main className={`${styles.main} ${inter.className}`}>
        {userStatus !== 'loading' && typeof signedInUser === 'undefined' ? (
          <LoginForm />
        ) : (
          <Top />
        )}
      </main>
    </>
  );
}
