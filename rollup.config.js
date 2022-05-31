import path from 'path';
import ts from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: path.resolve(__dirname, pkg.main),
      banner: '#!/usr/bin/env node',
    },
  ],
  external: Object.keys(pkg.dependencies || '').concat(['path', 'fs']),
  plugins: [json(), ts(), terser()],
};
