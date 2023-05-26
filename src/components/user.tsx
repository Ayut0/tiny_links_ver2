import { doc, getFirestore } from 'firebase/firestore'
import React from 'react'

import {
  FirestoreProvider,
  useFirestore,
  useFirestoreDocData,
  useFirebaseApp,
} from 'reactfire'

function User() {
  const firestooreInstance = getFirestore(useFirebaseApp())
  // easily access the Firestore library
  const userRef = doc(useFirestore(), 'urls', 'testurl')

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(userRef)
  console.log(status, data)

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching user...</p>
  }
  return (
    <FirestoreProvider sdk={firestooreInstance}>
      <div>User</div>
    </FirestoreProvider>
  )
}

export default User
