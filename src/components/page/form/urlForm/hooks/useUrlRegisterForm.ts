import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useFirestore } from 'reactfire';

import type { InputUrl } from '../inputUrl';

import useUserStatus from '@/components/page/top/hooks/useUser';
import shortenUrl from '@/lib/shortenUrl';

const useUrlRegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const { signedInUser } = useUserStatus();

  const { handleSubmit, watch, setValue, control } = useForm<InputUrl>();
  const firestore = useFirestore();
  const urls = collection(firestore, 'urls');

  const submitHandler: SubmitHandler<InputUrl> = async (data: InputUrl) => {
    if (typeof signedInUser === 'undefined') {
      router.push('/login');
    } else {
      const shortUrl = shortenUrl(data.longUrl, 6);
      try {
        await addDoc(urls, {
          id: Math.floor(Math.random() * 1000),
          longUrl: data.longUrl,
          creator: signedInUser.name,
          userId: signedInUser.uid,
          shortUrl,
        });
        router.push('/mypage');
      } catch (e) {
        setError('An error occurred while adding the URL. Please try again later.');
      }
    }
  };

  return {
    handleSubmit,
    watch,
    setValue,
    submitHandler,
    control,
    error,
  };
};

export default useUrlRegisterForm;
