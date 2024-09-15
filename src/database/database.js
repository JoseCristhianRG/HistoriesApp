// database.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'stories.db', location: 'default' });

// const updateSchema = () => {
//   db.transaction(tx => {
//     // Aquí se agrega el nuevo campo a la tabla existente
//     tx.executeSql(
//       `ALTER TABLE stories ADD COLUMN deleted INTEGER DEFAULT 0;`,
//       [],
//       (tx, results) => {
//         console.log('Campo deleted añadido exitosamente');
//       },
//       error => {
//         console.error('Error al añadir campo deleted:', error);
//       }
//     );
//   });
// };

// updateSchema();


export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE,
        title TEXT,
        story TEXT,
        language TEXT,
        imageUrl TEXT,
        deleted INTEGER default 0
      )`,
    );
  });
};

export const saveStory = (date, title, story, language, imageUrl) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO stories (date, title, story, language, imageUrl) VALUES (?, ?, ?, ?, ?)',
        [date, title, story, language, imageUrl],
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
        'SELECT * FROM stories WHERE deleted = 0 ORDER BY id DESC',
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

export const getAllDeleteStories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM stories WHERE deleted = 1 ORDER BY id DESC',
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

export const deleteStory = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE stories SET deleted = 1 WHERE id = ?',
        [id],
        (tx, results) => {
          console.log('Historia marcada como borrada');
          resolve(true);
        },
        error => {
          console.error('Error al marcar historia como borrada:', error);
          resolve(false);
        }
      );
    });
  });
};


export const restoreDeleteStories = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE stories SET deleted = 0 WHERE id = ?',
        [id],
        (tx, results) => {
          console.log('Historia marcada como borrada');
          resolve(true);
        },
        error => {
          console.error('Error al marcar historia como borrada:', error);
          resolve(false);
        }
      );
    });
  });
};

