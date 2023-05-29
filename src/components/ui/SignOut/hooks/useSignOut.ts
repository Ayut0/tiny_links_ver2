import { useRouter } from 'next/router';
import { useAuth } from 'reactfire';

const useSignOut = () => {
  const router = useRouter();
  const auth = useAuth();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {
    handleSignOut,
  };
};

export default useSignOut;
