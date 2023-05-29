/* eslint-disable no-console */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useFirebaseApp, useFirestore } from 'reactfire';

import type { SignUpInfo, UserInfo } from '../signUpInfo';

const useSignUpForm = () => {
  const router = useRouter();
  const firebase = useFirebaseApp();
  const firestore = useFirestore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInfo>();

  const signUpHandler = async (data: SignUpInfo) => {
    const { userName, email, password } = data;

    try {
      const auth = getAuth(firebase);
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      const user: UserInfo = {
        uid: newUser.user.uid,
        userName,
        email,
        password,
      };
      const users = collection(firestore, 'users');

      await addDoc(users, user);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSubmit,
    signUpHandler,
    control,
    errors,
  };
};

export default useSignUpForm;
