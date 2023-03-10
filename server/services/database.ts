const { Client } = require('pg')
const client = new Client()
client
  .connect({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV !== 'production',
    }
  })
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))

export default client;