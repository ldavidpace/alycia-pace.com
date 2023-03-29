const {Reporter} = require( '@parcel/plugin');
const path = require('path');
const { spawn } = require('node:child_process');

let servers = new Map();

module.exports = new Reporter({
    report: ({event, options}) => {
        if (event.type === 'buildStart') {
            process.stdout.write('Started build!\n');
        }
        if (event.type === 'buildSuccess') {
            const baseDirectory = options.projectRoot;

            if (!baseDirectory) {
                process.stdout.write('Cant find base directory \n');
                process.stdout.write(JSON.stringify(options.serveOptions) + '\n');
            }
            
            const pathToServerIndex = path.resolve(baseDirectory, 'dist', 'server', 'index.js');


            if (!servers.get(options.serveOptions.port)) {
                const server = spawn('nodemon', ['--inspect', pathToServerIndex]);

                server.stdout.on('data', (data) => {
                    process.stdout.write(`${data}\n`);
                });
                
                server.stderr.on('data', (data) => {
                    process.stderr.write(`${data}\n`);
                });
    
                servers.set(options.serveOptions.port, server);
            }
        }
        if (event.type === 'watchEnd') {
            servers.forEach((server) => {
                process.stdout.write('Watchend Killing Child Process\n');
                server.kill()
            });
        }
    },
});