const fs = require('fs');
const shell = require('shelljs');
const { spawnSync } = require('child_process');

const files = fs.readdirSync('.');
const jsFiles = files.filter((f) => f.endsWith('.js') && f !== 'common.js');

const status = shell.mv('../src/assets/images/*', '../src/assets/imagesOld/');
if (status.stderr) console.log(status.stderr);
else console.log('Files moved!');

for (const file of jsFiles) {
  spawnSync('node', [file], { shell: true, stdio: 'inherit' });
}
