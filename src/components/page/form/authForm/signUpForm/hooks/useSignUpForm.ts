/* eslint-disable no-console */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFirebaseApp, useFirestore } from 'reactfire';

import type { SignUpInfo, UserInfo } from '../signUpInfo';

const useSignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const firebase = useFirebaseApp();
  const firestore = useFirestore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInfo>();

  const signUpHandler = async (data: SignUpInfo) => {
    const { name, email, password } = data;

    try {
      const auth = getAuth(firebase);
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      const user: UserInfo = {
        uid: newUser.user.uid,
        name: newUser.user.displayName || name,
        email,
        password,
      };
      const users = collection(firestore, 'users');

      await addDoc(users, user);

      router.push('/');
    } catch (e) {
      setError('An error occurred while signing up. Please try again later.');
    }
  };

  return {
    handleSubmit,
    signUpHandler,
    control,
    errors,
    error,
  };
};

export default useSignUpForm;
