const path = require('path');

// specify usage of `--file` flag
const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`;

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
