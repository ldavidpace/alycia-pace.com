import migrate from '../server/db/migration.mjs'

migrate().then(() => {
    console.log('All migrations have been run');
});

