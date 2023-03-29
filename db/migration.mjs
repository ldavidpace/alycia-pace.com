import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { createHash } from 'crypto';


export default async () => {
  const __dirname = path.dirname(
    fileURLToPath(import.meta.url)
  );

  const databaseUrl = process.env.DATABASE_URL || path.join(__dirname, 'database')

  await new Promise((resolve, reject) => {
    const database = new sqlite3.Database(databaseUrl, async (err) => {
      if (err) {
        throw new Error("Something Went wrong" + err);
      }
  
      const filenames = readdirSync(path.join(__dirname, 'migrations'));
      for (var i = 0; i < filenames.length; i++) {
        var filename = filenames[i];
        const nextSql = readFileSync(path.join(__dirname, 'migrations', filename), 'utf-8');
        const hash = createHash('sha512');
        hash.update(nextSql);
        const sqlHash = hash.digest('base64');
        let migration, error;
        try {
           migration = await new Promise((resolve, reject) => {
            database.get("select * from migrations where migration_name = $filename", {$filename: filename}, (err, row) => {
              if (err) {
                return reject(err);
              }
              resolve(row);
            })
          })
          
        } catch(err) {
          console.log(err);
        }
  
        if (!migration) {
          await new Promise((resolve, reject) => {
            database.exec(nextSql, (err) => {
              if(err) return reject(err);
              resolve();
            });
          });
          try {
            await new Promise((resolve, reject) => {
              console.log(`Ran ${filename} with success`);
              database.run(`Insert into migrations (migration_name, sha) values ($filename, $sha)`, {
                $filename: filename,
                $sha: sqlHash,
              }, (err) => {
                if (err) return reject(err);
                resolve();
              });
            });
          } catch (err) {
            throw Error(`Failed to run ${filename}; with Error ${error}`);
          }
        } else if (migration.sha != sqlHash) {
          throw Error(`${filename} does nat match previous sha`);
        } else {
          console.log(`${filename} was run previously`);
        }
      }
       
      resolve();
    });
  });
  
}
