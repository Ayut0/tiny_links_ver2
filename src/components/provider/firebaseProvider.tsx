import { getFirestore } from 'firebase/firestore';
import type { ReactNode } from 'react';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

type Children = {
  children: ReactNode | ReactNode[];
};

function FirebaseSDKProvider({ children }: Children) {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);

  return <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>;
}

export default FirebaseSDKProvider;
