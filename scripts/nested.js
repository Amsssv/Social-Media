import fs from 'fs';
import {resolve, join} from'path';
import cp from 'child_process';

let lib = resolve(__dirname, '../SocialMedia/');

fs.readdirSync(lib).forEach((mod) => {
    let modPath = join(lib, mod);

    if (!fs.existsSync(join(modPath, 'package.json'))) {
        return;
    }

    cp.spawn('npm.cmd', ['install'], {
        env: process.env,
        cwd: modPath,
        stdio: 'inherit'
    });
})