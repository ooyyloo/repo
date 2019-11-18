import FS from 'fs';
import Path from 'path';

import {TSESLint} from '@typescript-eslint/experimental-utils';
export const RuleTester = TSESLint.RuleTester;

import {explicitReturnTypeRule} from '../rule';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: Path.join(__dirname, '../../test/'),
  },
});

ruleTester.run('explicit-return-type', explicitReturnTypeRule, {
  valid: [],
  invalid: [
    {
      code: FS.readFileSync(
        Path.join(__dirname, '../../test/a.ts'),
      ).toString(),
      filename: Path.join(__dirname, '../../test/a.ts'),
      errors: [
        {messageId: 'explicitReturnTypeRequired', line: 2},
      ],
    },
  ],
});
