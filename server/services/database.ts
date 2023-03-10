const { Client } = require('pg')
const client = new Client()
client
  .connect({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
  })
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))

export default client;