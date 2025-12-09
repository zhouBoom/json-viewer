const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'package.json',
  'vite.config.js',
  'playwright.config.js',
  'src/main.js',
  'src/App.vue',
  'src/style.css',
  'src/store.js',
  'src/router/index.js',
  'src/views/Home.vue',
  'src/views/SeatBooking.vue',
  'src/views/Statistics.vue',
  'tests/library-system.spec.js'
];

const baseDir = process.cwd();
const output = [];

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const serialized = {
      content: content,
      file_path: `/testbed/library-seat-app/${file}`
    };
    output.push(`${file}\n${JSON.stringify(serialized, null, 2)}\n`);
  }
});

fs.writeFileSync('serialized_files.json', output.join('\n'), 'utf8');
console.log('Serialization complete!');
