import { Database } from "sqlite3";
import { SelectStatementResults, SQLStatementProps } from "./databaseTypes";

const databaseUrl = process.env.DATABASE_URL || 'db/database';

const database = new Database(databaseUrl, (err) => {
  if (err) {
    throw new Error(`Could not start database!!! failed with ${err}`);
  }
});

const prefixBindings = (bindings?: {[key: string]: any}) => {
  if (!bindings) return;
  return Object.entries(bindings).reduce((agg, [key, input]) => {
    agg[`$${key}`] = input;
    return agg;
  }, {})
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
  });

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
  });

export const get = <S extends string>(sql: S, bindings?: SQLStatementProps<S>) =>
  new Promise<SelectStatementResults<S>>((resolve, reject) => {
    database.get(sql, prefixBindings(bindings), function (err, row: SelectStatementResults<S>) {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });

export const all = <S extends string>(sql: S, bindings?: SQLStatementProps<S>) =>
  new Promise((resolve, reject) => {
    database.all(sql, prefixBindings(bindings), function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });

