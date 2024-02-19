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
  const id = await store.add(data);
  console.log('Added data to the database with id:', id);
  await tx.done;
  return id;
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
export const getIndexedDBData = async (id: string) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  
  const data = await store.get(id);
  await tx.done;
  return data as LookupData;
}
interface LookupData {
ip: string;
location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
};
domains: string[];
as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
};
isp: string;
proxy: {
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
};
lookupTime: string;
}