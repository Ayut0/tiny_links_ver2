import { DocumentData, collection, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import useUserStatus from '../../top/hooks/useUser';

const useMyPage = () => {
  const [userUrlList, setUserUrlList] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string>('');
  const { signedInUser } = useUserStatus();
  const firestore = useFirestore();
  const urlCollection = collection(firestore, 'urls');
  const { status: urlsStatus, data: urlsData } =
    useFirestoreCollectionData(urlCollection);

  useEffect(() => {
    const fetchUrlList = async () => {
      try {
        if (typeof signedInUser?.uid === 'string' && typeof urlsData !== 'undefined') {
          const fetchedUsersUrlList = urlsData?.filter(
            (item) => item.userId === signedInUser?.uid,
          );
          setUserUrlList(fetchedUsersUrlList);
        }
      } catch (e) {
        setError('We detected an error. Please try again later.');
      }
    };
    fetchUrlList();
  }, [firestore, signedInUser?.uid, urlsData]);

  const deleteHandler = async (id: string) => {
    try {
      const urlRef = doc(urlCollection, id);

      await deleteDoc(urlRef);
      setUserUrlList(userUrlList.filter((item) => item.id !== id));
    } catch (e) {
      setError('We detected an error. Please try again later.');
    }
  };

  return {
    urlsStatus,
    userUrlList,
    signedInUser,
    deleteHandler,
    error,
  };
};

export default useMyPage;
