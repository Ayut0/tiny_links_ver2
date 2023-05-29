/* eslint-disable no-console */
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirebaseApp } from 'reactfire';

import type { LoginInfo } from '../loginInput';

const useLoginForm = () => {
  const router = useRouter();
  const firebase = useFirebaseApp();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInfo>();

  const loginHandler: SubmitHandler<LoginInfo> = async (data: LoginInfo) => {
    const { email, password } = data;
    try {
      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      // show error message
      console.log(error);
    }
  };

  return {
    handleSubmit,
    loginHandler,
    control,
    errors,
  };
};

export default useLoginForm;
