import { collection, doc, addDoc, getDocs, onSnapshot, query, orderBy, setDoc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
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

export const subscribeToHive = (id, callback) => {
  return onSnapshot(doc(db, 'hives', id), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};

export const addHive = async (hiveData) => {
  return await addDoc(collection(db, 'hives'), {
    ...hiveData,
    createdAt: serverTimestamp()
  });
};

export const updateHive = async (id, updateData) => {
  const docRef = doc(db, 'hives', id);
  return await setDoc(docRef, updateData, { merge: true });
};

export const deleteHive = async (id) => {
  const docRef = doc(db, 'hives', id);
  return await deleteDoc(docRef);
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

// Treatments (Varroa)
export const subscribeToTreatments = (hiveId, callback) => {
  const q = query(collection(db, `hives/${hiveId}/treatments`), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const addTreatment = async (hiveId, treatmentData) => {
  return await addDoc(collection(db, `hives/${hiveId}/treatments`), {
    ...treatmentData,
    date: serverTimestamp()
  });
};

// Materials
export const subscribeToMaterials = (callback) => {
  const q = query(collection(db, 'materials'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const updateMaterialCount = async (id, newAvailable) => {
  const docRef = doc(db, 'materials', id);
  return await setDoc(docRef, { available: newAvailable }, { merge: true });
};

export const initMaterialDbIfEmpty = async () => {
  // called once to setup items if clean
  const snap = await getDocs(collection(db, 'materials'));
  if (snap.empty) {
    const defaults = [
      { id: 'zargen', category: 'Beuten', title: 'Zargen', subtitle: '(DNM)', available: 12 },
      { id: 'boeden', category: 'Beuten', title: 'Böden', subtitle: '', available: 4 },
      { id: 'deckel', category: 'Beuten', title: 'Deckel', subtitle: '', available: 6 },
      { id: 'raehmchen', category: 'Waben', title: 'Rähmchen', subtitle: '(Leer)', subtext:'Verdrahtet', available: 45 },
      { id: 'mittelwande', category: 'Waben', title: 'Mittelwände', subtitle: '', subtext:'Wachs', available: 120 },
      { id: 'futter', category: 'Futter', title: 'Futterteig', subtext:'Kg', available: 2.5 }
    ];
    for(const item of defaults) {
      await setDoc(doc(db, 'materials', item.id), item);
    }
  }
};

// Tasks (Aufgaben)
export const subscribeToTasks = (callback) => {
  const q = query(collection(db, 'tasks'), orderBy('dueDate', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const addTask = async (taskData) => {
  return await addDoc(collection(db, 'tasks'), {
    ...taskData,
    createdAt: serverTimestamp()
  });
};

export const deleteTask = async (taskId) => {
  return await deleteDoc(doc(db, 'tasks', taskId));
};

export const updateTaskStatus = async (taskId, isDone) => {
  const docRef = doc(db, 'tasks', taskId);
  return await setDoc(docRef, { done: isDone }, { merge: true });
};

// Calendar Events
export const subscribeToEvents = (callback) => {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const addEvent = async (eventData) => {
  // eventData should have { title, date (YYYY-MM-DD), time, type }
  return await addDoc(collection(db, 'events'), {
    ...eventData,
    createdAt: serverTimestamp()
  });
};

export const deleteEvent = async (eventId) => {
  return await deleteDoc(doc(db, 'events', eventId));
};

export const addDummyTasksIfEmpty = async () => {
  const snap = await getDocs(collection(db, 'tasks'));
  if (snap.empty) {
    const now = new Date();
    const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
    const tasks = [
      { title: 'Drohnenrahmen schneiden', subtitle: 'Kontrolle auf Varroa Milben', hiveId: 'B02', dueDate: yesterday, done: false, type: 'overdue' },
      { title: 'Fütterung prüfen', subtitle: 'Sirupstand kontrollieren', hiveId: 'B05', dueDate: now, done: false, type: 'today' },
      { title: 'Varroabehandlung', subtitle: 'Ameisensäure Langzeitverdunster', hiveId: 'B08', dueDate: now, done: false, type: 'today' },
      { title: 'Volk erweitern', subtitle: 'Honigraum aufsetzen', hiveId: 'B01', dueDate: tomorrow, done: false, type: 'upcoming' },
    ];
    for (const t of tasks) {
      await addDoc(collection(db, 'tasks'), t);
    }
  }
};
