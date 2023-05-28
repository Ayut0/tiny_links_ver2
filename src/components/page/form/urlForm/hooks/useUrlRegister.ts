import { addDoc, collection } from 'firebase/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useFirestore } from 'reactfire';

import type { InputUrl } from '../inputUrl';

import shortenUrl from '@/lib/shortenUrl';

const useUrlRegister = () => {
  const { register, handleSubmit, watch, setValue, control } = useForm<InputUrl>();
  const firestore = useFirestore();
  const urls = collection(firestore, 'urls');
  // const { status, data } = useFirestoreCollectionData(urls);
  // console.log('status', status, 'data', data);

  const submitHandler: SubmitHandler<InputUrl> = async (data: InputUrl) => {
    const shortUrl = shortenUrl(data.longUrl, 6);
    await addDoc(urls, {
      id: 1,
      longUrl: data.longUrl,
      creator: 'Yuto',
      userId: '1',
      shortUrl,
    });
    // console.log(data);
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    submitHandler,
    control,
  };
};

export default useUrlRegister;
