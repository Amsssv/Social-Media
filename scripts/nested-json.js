import fs from 'fs';
import {resolve, join, dirname} from'path';
import cp from 'child_process';
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

let lib = resolve(__dirname);

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