const {Reporter} = require( '@parcel/plugin');
const path = require('path');
const { spawn } = require('node:child_process');
const fs = require('fs');

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
            
            const packageJSONString = fs.readFileSync(path.resolve(baseDirectory, "package.json"));
            const packageJSON = JSON.parse(packageJSONString);

            if (!packageJSON.parcelServer) {
                process.stdout.write("Missing parcel server config")
                throw new Error("Failed to start parcel server")
            }

            if (!packageJSON.parcelServer.targetName) {
                process.stdout.write("Target name is required")
                throw new Error("Failed to start parcel server")
            }

            if (!packageJSON.targets[packageJSON.parcelServer.targetName]) {
                process.stdout.write(
                    packageJSON.parcelServer.targetName + "is missing from targets. Choose a valid target for targetName"
                );
            }

            const pathToServerIndex = path.resolve(baseDirectory, 'dist', packageJSON.targets[packageJSON.parcelServer.targetName].source);
            process.stdout.write("Path to server index " + pathToServerIndex);
            if (!servers.get(packageJSON.parcelServer.port || '3000')) {
                const server = spawn(`nodemon`, ['--inspect', pathToServerIndex]);

                server.stdout.on('data', (data) => {
                    process.stdout.write(`${data}\n`);
                });
                
                server.stderr.on('data', (data) => {
                    process.stderr.write(`${data}\n`);
                });
    
                servers.set(packageJSON.parcelServer.port || '3000', server);
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
