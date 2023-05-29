import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useFirestore } from 'reactfire';

import type { InputUrl } from '../inputUrl';

import useUserStatus from '@/components/page/top/hooks/useUser';
import shortenUrl from '@/lib/shortenUrl';

const useUrlRegisterForm = () => {
  const router = useRouter();
  const { signedInUser } = useUserStatus();
  const { handleSubmit, watch, setValue, control } = useForm<InputUrl>();
  const firestore = useFirestore();
  const urls = collection(firestore, 'urls');

  const submitHandler: SubmitHandler<InputUrl> = async (data: InputUrl) => {
    if (typeof signedInUser === 'undefined') {
      router.push('/login');
    } else {
      const shortUrl = shortenUrl(data.longUrl, 6);
      await addDoc(urls, {
        id: Math.floor(Math.random() * 1000),
        longUrl: data.longUrl,
        creator: signedInUser.name,
        userId: signedInUser.uid,
        shortUrl,
      });
    }
  };

  return {
    handleSubmit,
    watch,
    setValue,
    submitHandler,
    control,
  };
};

export default useUrlRegisterForm;
