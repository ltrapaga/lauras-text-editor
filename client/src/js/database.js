import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('UPDATE jateDB');

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to jateDB', result.value);
};
;

export const getDb = async () => {
  console.log('GET jateDB');

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  
  result
   ? console.log('Data retrieved', result.value)
   : console.log('Data not found');

  return result?.value;
};

initdb();
