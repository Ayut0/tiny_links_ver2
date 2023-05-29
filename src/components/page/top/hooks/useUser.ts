import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useFirestoreCollectionData, useFirestore } from 'reactfire';

const useUserStatus = () => {
  const router = useRouter();
  const [uid, setUid] = useState<string>('');
  const firestore = useFirestore();
  const { status: userStatus, data: user } = useUser();

  useEffect(() => {
    if (userStatus === 'success' && typeof user?.uid === 'string') {
      setUid(user?.uid);
    }
  }, [uid, user, user?.uid, userStatus]);

  const usersRef = collection(firestore, 'users');
  const { data: users } = useFirestoreCollectionData(usersRef);

  const signedInUser = users?.find((item) => item.uid === uid);

  const redirectToLogin = () => {
    if (typeof signedInUser !== 'undefined') {
      router.push('/login');
    }
  };

  return {
    userStatus,
    user,
    signedInUser,
    redirectToLogin,
  };
};

export default useUserStatus;
