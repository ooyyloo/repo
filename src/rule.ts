import {ESLintUtils, TSESLint, ParserServices} from '@typescript-eslint/experimental-utils';
import { SourceFile, Type } from 'typescript';

const createRule = ESLintUtils.RuleCreator(() => '');

const messages = {
  explicitReturnTypeRequired: 'This function requires explicit return type.',
};

type Options = [
];

type MessageId = keyof typeof messages;

export const explicitReturnTypeRule = createRule<Options, MessageId>({
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
    schema: [
    ],
  },
  defaultOptions: [
  ],

  create(context) {
    type RequiredParserServices = {
      [k in keyof ParserServices]: Exclude<ParserServices[k], undefined>;
    };

    function getParserServices<
      TMessageIds extends string,
      TOptions extends unknown[]
    >(
      context: TSESLint.RuleContext<TMessageIds, TOptions>,
    ): RequiredParserServices {
      if (
        !context.parserServices ||
        !context.parserServices.program ||
        !context.parserServices.esTreeNodeToTSNodeMap
      ) {
        /**
         * The user needs to have configured "project" in their parserOptions
         * for @typescript-eslint/parser
         */
        throw new Error(
          'You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.',
        );
      }

      return context.parserServices as RequiredParserServices;
    }

    const parserServices = getParserServices(context);

    const typeChecker = parserServices.program.getTypeChecker();

    let node = (parserServices.esTreeNodeToTSNodeMap.get(context.getSourceCode().ast) as SourceFile).statements[0];

    let nodeType: Type;

    try {
      nodeType = typeChecker.getTypeAtLocation(node);
    } catch (error) {
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
