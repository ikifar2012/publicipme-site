// utils/indexedDB.js
import { openDB } from 'idb';
const dbName = 'LookupDataDB';
const storeName = 'LookupDataStore';

export const openDatabase = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addDataToDB = async (data: any) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  // add lookup time to the data
  data.lookupTime = Date.now().toString();
  await store.add(data);
  await tx.done;
};

export const getAllDataFromDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const data = await store.getAll() as any[] || [] as any[];
  await tx.done;
  return data;
};
export const clearAllDataFromDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  await tx.done;
}
