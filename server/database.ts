import { readFileSync } from 'fs';
import { Database } from 'sqlite3';

import {
  SelectStatementResults, SQLStatementProps,
} from './databaseTypes';
import {
  getDatabase, putObject,
} from './s3/s3Client';


import path = require("path");

const databaseUrl = process.env.DATABASE_URL || path.join(__dirname, 'database.db');


let database;
getDatabase(databaseUrl, true).catch(() => {
  console.log(`Couldn't Retrieve Previous Database`);
}).finally(() => {
  database = new Database(databaseUrl, (err) => {
    if (err) {
      console.error(`Could not start database!!! failed with ${err}`);
      process.exit(1);
    }
  });
});


const prefixBindings = (bindings?: {[key: string]: any}) => {
  if (!bindings) return;
  return Object.entries(bindings).reduce((agg, [key, input]) => {
    agg[`$${key}`] = input;
    return agg;
  }, {})
}

const syncDatabase = (returnValue: any) => {
  const database = readFileSync(databaseUrl);
  putObject(databaseUrl, database);
  return returnValue;
}

export const insert = <S extends string>(
  sql: S,
  bindings?: SQLStatementProps<S>
) =>
  new Promise<number>((resolve, reject) => {
    database.run(sql, prefixBindings(bindings), function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  }).then(syncDatabase);

export const update = <S extends string>(
  sql: S,
  bindings?: SQLStatementProps<S>
) =>
  new Promise<number>((resolve, reject) => {
    database.run(sql, prefixBindings(bindings), function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes);
    });
  }).then(syncDatabase);

export const get = <S extends string>(sql: S, bindings?: SQLStatementProps<S>): Promise<any> =>
  new Promise<SelectStatementResults<S>>((resolve, reject) => {
    database.get(sql, prefixBindings(bindings), function (err, row: SelectStatementResults<S>) {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });

export const all = <S extends string>(sql: S, bindings?: SQLStatementProps<S>): Promise<any> =>
  new Promise((resolve, reject) => {
    database.all(sql, prefixBindings(bindings), function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });

