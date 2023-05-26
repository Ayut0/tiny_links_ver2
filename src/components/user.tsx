import { doc } from 'firebase/firestore';
import React from 'react';

import { useFirestore, useFirestoreDocData } from 'reactfire';

function User() {
  // easily access the Firestore library
  const userRef = doc(useFirestore(), 'urls', 'testurl');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(userRef);
  // console.log(data.creator);

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching user...</p>;
  }
  return <div>User: {data.creator}</div>;
}

export default User;
