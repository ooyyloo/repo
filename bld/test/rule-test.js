"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
exports.RuleTester = experimental_utils_1.TSESLint.RuleTester;
const rule_1 = require("../rule");
const ruleTester = new exports.RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: path_1.default.join(__dirname, '../../test/'),
    },
});
ruleTester.run('explicit-return-type', rule_1.explicitReturnTypeRule, {
    valid: [],
    invalid: [
        {
            code: fs_1.default.readFileSync(path_1.default.join(__dirname, '../../test/a.ts')).toString(),
            filename: path_1.default.join(__dirname, '../../test/a.ts'),
            errors: [
                { messageId: 'explicitReturnTypeRequired', line: 2 },
            ],
        },
    ],
});
//# sourceMappingURL=rule-test.js.map