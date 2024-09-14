// database.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'stories.db', location: 'default' });

export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        story TEXT,
        imageUrl TEXT
      )`,
    );
  });
};

export const saveStory = (story, imageUrl) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO stories (story, imageUrl) VALUES (?, ?)',
        [story, imageUrl],
        (tx, results) => resolve(results),
        (tx, error) => reject(error)
      );
    });
  });
};

export const getAllStories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM stories',
        [],
        (tx, results) => {
          const stories = [];
          for (let i = 0; i < results.rows.length; i++) {
            stories.push(results.rows.item(i));
          }
          resolve(stories);
        },
        (tx, error) => reject(error)
      );
    });
  });
};
