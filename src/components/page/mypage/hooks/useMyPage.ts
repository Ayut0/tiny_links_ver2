import { DocumentData, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import useUserStatus from '../../top/hooks/useUser';

import type { UserUrlList } from '../userUrl';

const useMyPage = () => {
  const [userUrlList, setUserUrlList] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string>('');
  const [editUrl, setEditUrl] = useState<UserUrlList>();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { signedInUser } = useUserStatus();
  const firestore = useFirestore();
  const urlCollection = collection(firestore, 'urls');
  const { status: urlsStatus, data: urlsData } =
    useFirestoreCollectionData(urlCollection);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const fetchUrlList = useCallback(async () => {
    try {
      if (typeof signedInUser?.uid === 'string' && typeof urlsData !== 'undefined') {
        const fetchedUsersUrlList = urlsData?.filter(
          (item) => item.userId === signedInUser?.uid,
        );
        setUserUrlList(fetchedUsersUrlList);
        setSuccessMessage('Your URL list has been loaded.');
      }
    } catch (e) {
      setError('We detected an error. Please try again later.');
    }
  }, [signedInUser?.uid, urlsData]);

  useEffect(() => {
    fetchUrlList();
  }, [fetchUrlList, firestore, signedInUser?.uid, urlsData]);

  const deleteHandler = async (id: string) => {
    try {
      const urlRef = doc(urlCollection, id);
      await deleteDoc(urlRef);
      setUserUrlList(userUrlList.filter((item) => item.id !== id));
      setSuccessMessage('Your URL has been deleted.');
      setError('');
    } catch (e) {
      setError('We detected an error. Please try again later.');
    }

    await fetchUrlList();
  };

  // Future improvement: use type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editHandler = (url: any) => {
    setEditUrl(url);
    reset({
      longUrl: url.longUrl,
    });
  };
  // Future improvement: use type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateHandler = async (data: any) => {
    try {
      if (typeof editUrl === 'undefined') {
        return;
      }
      const urlRef = doc(urlCollection, editUrl.NO_ID_FIELD);

      await updateDoc(urlRef, { longUrl: data.longUrl });
      setUserUrlList((prevUrls) =>
        prevUrls.map((item) => (item.id === editUrl.id ? { ...item, data } : item)),
      );
      setSuccessMessage('Your URL has been updated.');
    } catch (e) {
      setError('We detected an error. Please try again later.');
    }
  };

  return {
    urlsStatus,
    userUrlList,
    signedInUser,
    deleteHandler,
    editUrl,
    editHandler,
    updateHandler,
    handleSubmit,
    control,
    error,
    errors,
    successMessage,
  };
};

export default useMyPage;
