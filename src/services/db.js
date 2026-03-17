import { collection, doc, addDoc, getDocs, onSnapshot, query, orderBy, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Hives
export const subscribeToHives = (callback) => {
  const q = query(collection(db, 'hives'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const hives = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(hives);
  });
};

export const getHiveById = async (id) => {
  const docRef = doc(db, 'hives', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

export const addHive = async (hiveData) => {
  return await addDoc(collection(db, 'hives'), {
    ...hiveData,
    createdAt: serverTimestamp()
  });
};

// Evaluations (Zuchtbewertung)
export const subscribeToEvaluations = (hiveId, callback) => {
  const q = query(collection(db, `hives/${hiveId}/evaluations`), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const evaluations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(evaluations);
  });
};

export const addEvaluation = async (hiveId, evaluationData) => {
  return await addDoc(collection(db, `hives/${hiveId}/evaluations`), {
    ...evaluationData,
    date: serverTimestamp()
  });
};

// Inspections
export const subscribeToInspections = (hiveId, callback) => {
  const q = query(collection(db, `hives/${hiveId}/inspections`), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const inspections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(inspections);
  });
};

export const addInspection = async (hiveId, inspectionData) => {
  return await addDoc(collection(db, `hives/${hiveId}/inspections`), {
    ...inspectionData,
    date: serverTimestamp()
  });
};
