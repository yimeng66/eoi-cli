import path from 'path';
import ts from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: {
    format: 'cjs',
    file: path.resolve(__dirname, pkg.main),
  },
  external: Object.keys(pkg.dependencies || ''),
  plugins: [json(), ts()],
};
