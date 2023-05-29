import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { ReactNode } from 'react';
import { FirestoreProvider, useFirebaseApp, AuthProvider } from 'reactfire';

type Children = {
  children: ReactNode | ReactNode[];
};

function FirebaseSDKProvider({ children }: Children) {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
}

export default FirebaseSDKProvider;
