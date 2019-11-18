"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const createRule = experimental_utils_1.ESLintUtils.RuleCreator(() => '');
const messages = {
    explicitReturnTypeRequired: 'This function requires explicit return type.',
};
exports.explicitReturnTypeRule = createRule({
    name: 'explicit-return-type',
    meta: {
        type: 'suggestion',
        docs: {
            description: '',
            category: 'Stylistic Issues',
            recommended: 'error',
        },
        messages,
        fixable: 'code',
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        function getParserServices(context) {
            if (!context.parserServices ||
                !context.parserServices.program ||
                !context.parserServices.esTreeNodeToTSNodeMap) {
                /**
                 * The user needs to have configured "project" in their parserOptions
                 * for @typescript-eslint/parser
                 */
                throw new Error('You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.');
            }
            return context.parserServices;
        }
        const parserServices = getParserServices(context);
        const typeChecker = parserServices.program.getTypeChecker();
        let node = parserServices.esTreeNodeToTSNodeMap.get(context.getSourceCode().ast).statements[0];
        let nodeType;
        try {
            nodeType = typeChecker.getTypeAtLocation(node);
        }
        catch (error) {
            return {};
        }
        let callSignature = nodeType.getCallSignatures()[0];
        let returnType = callSignature
            ? callSignature.getReturnType()
            : nodeType;
        let returnTypeString = typeChecker.typeToString(returnType);
        console.log(returnTypeString);
        return {};
    },
});
//# sourceMappingURL=rule.js.map