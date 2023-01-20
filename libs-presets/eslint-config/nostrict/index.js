module.exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
  },
  plugins: ['import', 'prettier', 'simple-import-sort', 'react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-use-before-define': [
      'off',
      {
        functions: true,
        classes: true,
        variables: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': ['warn'],
    'no-useless-constructor': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          object: {
            fixWith: 'Record<string, unknown>',
          },
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/adjacent-overload-signatures': ['warn'],
    'no-array-constructor': ['off'],
    '@typescript-eslint/no-array-constructor': ['warn'],
    'no-empty-function': [
      'off',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-extra-non-null-assertion': ['warn'],
    'no-extra-semi': ['off'],
    '@typescript-eslint/no-extra-semi': ['warn'],
    '@typescript-eslint/no-inferrable-types': ['warn'],
    'no-loss-of-precision': ['off'],
    '@typescript-eslint/no-loss-of-precision': ['warn'],
    '@typescript-eslint/no-misused-new': ['warn'],
    '@typescript-eslint/no-namespace': ['warn'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['warn'],
    '@typescript-eslint/no-non-null-assertion': ['warn'],
    '@typescript-eslint/no-this-alias': ['warn'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['warn'],
    '@typescript-eslint/prefer-as-const': ['warn'],
    '@typescript-eslint/prefer-namespace-keyword': ['warn'],
    '@typescript-eslint/triple-slash-reference': ['warn'],
    'react/prop-types': ['warn'],
    'react/forbid-prop-types': ['warn'],
    'react/state-in-constructor': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/display-name': [2],
    'react/jsx-key': [2],
    'react/jsx-no-comment-textnodes': [2],
    'react/jsx-no-duplicate-props': [2],
    'react/jsx-no-target-blank': [2],
    'react/jsx-no-undef': [2],
    'react/jsx-uses-react': [2],
    'react/jsx-uses-vars': [2],
    'react/no-children-prop': [2],
    'react/no-danger-with-children': [2],
    'react/no-deprecated': [2],
    'react/no-direct-mutation-state': [2],
    'react/no-find-dom-node': [2],
    'react/no-is-mounted': [2],
    'react/no-render-return-value': [2],
    'react/no-string-refs': [2],
    'react/no-unescaped-entities': [2],
    'react/no-unknown-property': [2],
    'react/no-unsafe': [0],
    'react/react-in-jsx-scope': [2],
    'react/require-render-return': [2],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'class-methods-use-this': [
      'off',
      {
        exceptMethods: [],
        enforceForClassFields: true,
      },
    ],
    'global-require': ['off'],
    'lines-between-class-members': [
      'off',
      'always',
      {
        exceptAfterSingleLine: false,
      },
    ],
    'func-names': ['off'],
    'no-underscore-dangle': [
      'off',
      {
        allow: [],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
        allowAfterThisConstructor: false,
        allowFunctionParams: true,
        enforceInClassFields: false,
        allowInArrayDestructuring: true,
        allowInObjectDestructuring: true,
      },
    ],
    'no-throw-literal': ['off'],
    'no-plusplus': ['off'],
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        endOfLine: 'lf',
      },
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: false,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/prefer-default-export': ['off'],
    'no-restricted-exports': [
      'off',
      {
        restrictedNamedExports: ['default', 'then'],
      },
    ],
    'import/order': [
      'off',
      {
        groups: [['builtin', 'external', 'internal']],
        distinctGroup: true,
        warnOnUnassignedImports: false,
      },
    ],
    'sort-imports': [
      'off',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'simple-import-sort/imports': ['warn'],
    curly: [0, 'multi-line'],
    'lines-around-comment': [0],
    'no-confusing-arrow': [
      0,
      {
        allowParens: true,
        onlyOneSimpleParam: false,
      },
    ],
    'no-mixed-operators': [
      0,
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['/', '*'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-tabs': [0],
    'no-unexpected-multiline': [0],
    quotes: [
      0,
      'single',
      {
        avoidEscape: true,
      },
    ],
    '@typescript-eslint/quotes': [0],
    'babel/quotes': [0],
    'vue/html-self-closing': [0],
    'vue/max-len': [0],
    'array-bracket-newline': ['off', 'consistent'],
    'array-bracket-spacing': ['off', 'never'],
    'array-element-newline': [
      'off',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'arrow-parens': ['off', 'always'],
    'arrow-spacing': [
      'off',
      {
        before: true,
        after: true,
      },
    ],
    'block-spacing': ['off', 'always'],
    'brace-style': [
      'off',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'comma-dangle': [
      'off',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'comma-spacing': [
      'off',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': [
      'off',
      'last',
      {
        exceptions: {
          ArrayExpression: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false,
          NewExpression: false,
        },
      },
    ],
    'computed-property-spacing': ['off', 'never'],
    'dot-location': ['off', 'property'],
    'eol-last': ['off', 'always'],
    'func-call-spacing': ['off', 'never'],
    'function-call-argument-newline': ['off', 'consistent'],
    'function-paren-newline': ['off', 'multiline-arguments'],
    'generator-star': ['off'],
    'generator-star-spacing': [
      'off',
      {
        before: false,
        after: true,
      },
    ],
    'implicit-arrow-linebreak': ['off', 'beside'],
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        ignoreComments: false,
        offsetTernaryExpressions: false,
      },
    ],
    'jsx-quotes': ['off', 'prefer-double'],
    'key-spacing': [
      'off',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'keyword-spacing': [
      'off',
      {
        before: true,
        after: true,
        overrides: {
          return: {
            after: true,
          },
          throw: {
            after: true,
          },
          case: {
            after: true,
          },
        },
      },
    ],
    'linebreak-style': ['off', 'unix'],
    'multiline-ternary': ['off', 'never'],
    'newline-per-chained-call': [
      'off',
      {
        ignoreChainWithDepth: 4,
      },
    ],
    'new-parens': ['off'],
    'no-arrow-condition': ['off'],
    'no-comma-dangle': ['off'],
    'no-extra-parens': [
      'off',
      'all',
      {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all',
        enforceForArrowConditionals: false,
      },
    ],
    'no-floating-decimal': ['off'],
    'no-mixed-spaces-and-tabs': ['off'],
    'no-multi-spaces': [
      'off',
      {
        ignoreEOLComments: false,
      },
    ],
    'no-multiple-empty-lines': [
      'off',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'no-reserved-keys': ['off'],
    'no-space-before-semi': ['off'],
    'no-trailing-spaces': [
      'off',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],
    'no-whitespace-before-property': ['off'],
    'no-wrap-func': ['off'],
    'nonblock-statement-body-position': [
      'off',
      'beside',
      {
        overrides: {},
      },
    ],
    'object-curly-newline': [
      'off',
      {
        ObjectExpression: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'object-curly-spacing': ['off', 'always'],
    'object-property-newline': [
      'off',
      {
        allowAllPropertiesOnSameLine: true,
        allowMultiplePropertiesPerLine: false,
      },
    ],
    'one-var-declaration-per-line': ['off', 'always'],
    'operator-linebreak': [
      'off',
      'before',
      {
        overrides: {
          '=': 'none',
        },
      },
    ],
    'padded-blocks': [
      'off',
      {
        blocks: 'never',
        classes: 'never',
        switches: 'never',
      },
      {
        allowSingleLineBlocks: true,
      },
    ],
    'quote-props': [
      'off',
      'as-needed',
      {
        keywords: false,
        unnecessary: true,
        numbers: false,
      },
    ],
    'rest-spread-spacing': ['off', 'never'],
    semi: ['off', 'always'],
    'semi-spacing': [
      'off',
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': ['off', 'last'],
    'space-after-function-name': ['off'],
    'space-after-keywords': ['off'],
    'space-before-blocks': ['off'],
    'space-before-function-paren': [
      'off',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-before-function-parentheses': ['off'],
    'space-before-keywords': ['off'],
    'space-in-brackets': ['off'],
    'space-in-parens': ['off', 'never'],
    'space-infix-ops': ['off'],
    'space-return-throw-case': ['off'],
    'space-unary-ops': [
      'off',
      {
        words: true,
        nonwords: false,
        overrides: {},
      },
    ],
    'space-unary-word-ops': ['off'],
    'switch-colon-spacing': [
      'off',
      {
        after: true,
        before: false,
      },
    ],
    'template-curly-spacing': ['off'],
    'template-tag-spacing': ['off', 'never'],
    'unicode-bom': ['off', 'never'],
    'wrap-iife': [
      'off',
      'outside',
      {
        functionPrototypeMethods: false,
      },
    ],
    'wrap-regex': ['off'],
    'yield-star-spacing': ['off', 'after'],
    '@babel/object-curly-spacing': ['off'],
    '@babel/semi': ['off'],
    '@typescript-eslint/brace-style': ['off'],
    '@typescript-eslint/comma-dangle': ['off'],
    '@typescript-eslint/comma-spacing': ['off'],
    '@typescript-eslint/func-call-spacing': ['off'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/keyword-spacing': ['off'],
    '@typescript-eslint/member-delimiter-style': ['off'],
    '@typescript-eslint/no-extra-parens': ['off'],
    '@typescript-eslint/object-curly-spacing': ['off'],
    '@typescript-eslint/semi': ['off'],
    '@typescript-eslint/space-before-blocks': ['off'],
    '@typescript-eslint/space-before-function-paren': ['off'],
    '@typescript-eslint/space-infix-ops': ['off'],
    '@typescript-eslint/type-annotation-spacing': ['off'],
    'babel/object-curly-spacing': ['off'],
    'babel/semi': ['off'],
    'flowtype/boolean-style': ['off'],
    'flowtype/delimiter-dangle': ['off'],
    'flowtype/generic-spacing': ['off'],
    'flowtype/object-type-curly-spacing': ['off'],
    'flowtype/object-type-delimiter': ['off'],
    'flowtype/quotes': ['off'],
    'flowtype/semi': ['off'],
    'flowtype/space-after-type-colon': ['off'],
    'flowtype/space-before-generic-bracket': ['off'],
    'flowtype/space-before-type-colon': ['off'],
    'flowtype/union-intersection-spacing': ['off'],
    'react/jsx-child-element-spacing': ['off'],
    'react/jsx-closing-bracket-location': ['off'],
    'react/jsx-closing-tag-location': ['off'],
    'react/jsx-curly-newline': ['off'],
    'react/jsx-curly-spacing': ['off'],
    'react/jsx-equals-spacing': ['off'],
    'react/jsx-first-prop-new-line': ['off'],
    'react/jsx-indent': ['off'],
    'react/jsx-indent-props': ['off'],
    'react/jsx-max-props-per-line': ['off'],
    'react/jsx-newline': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-props-no-multi-spaces': ['off'],
    'react/jsx-tag-spacing': ['off'],
    'react/jsx-wrap-multilines': ['off'],
    'standard/array-bracket-even-spacing': ['off'],
    'standard/computed-property-even-spacing': ['off'],
    'standard/object-curly-even-spacing': ['off'],
    'unicorn/empty-brace-spaces': ['off'],
    'unicorn/no-nested-ternary': ['off'],
    'unicorn/number-literal-case': ['off'],
    'vue/array-bracket-newline': ['off'],
    'vue/array-bracket-spacing': ['off'],
    'vue/arrow-spacing': ['off'],
    'vue/block-spacing': ['off'],
    'vue/block-tag-newline': ['off'],
    'vue/brace-style': ['off'],
    'vue/comma-dangle': ['off'],
    'vue/comma-spacing': ['off'],
    'vue/comma-style': ['off'],
    'vue/dot-location': ['off'],
    'vue/func-call-spacing': ['off'],
    'vue/html-closing-bracket-newline': ['off'],
    'vue/html-closing-bracket-spacing': ['off'],
    'vue/html-end-tags': ['off'],
    'vue/html-indent': ['off'],
    'vue/html-quotes': ['off'],
    'vue/key-spacing': ['off'],
    'vue/keyword-spacing': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/multiline-html-element-content-newline': ['off'],
    'vue/multiline-ternary': ['off'],
    'vue/mustache-interpolation-spacing': ['off'],
    'vue/no-extra-parens': ['off'],
    'vue/no-multi-spaces': ['off'],
    'vue/no-spaces-around-equal-signs-in-attribute': ['off'],
    'vue/object-curly-newline': ['off'],
    'vue/object-curly-spacing': ['off'],
    'vue/object-property-newline': ['off'],
    'vue/operator-linebreak': ['off'],
    'vue/quote-props': ['off'],
    'vue/script-indent': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/space-in-parens': ['off'],
    'vue/space-infix-ops': ['off'],
    'vue/space-unary-ops': ['off'],
    'vue/template-curly-spacing': ['off'],
    'indent-legacy': ['off'],
    'no-spaced-func': ['off'],
    'react/jsx-space-before-closing': ['off'],
    strict: ['warn', 'never'],
    'import/no-unresolved': [
      'warn',
      {
        commonjs: true,
        caseSensitive: true,
        caseSensitiveStrict: false,
      },
    ],
    'import/named': ['warn'],
    'import/default': ['off'],
    'import/namespace': ['off'],
    'import/export': ['warn'],
    'import/no-named-as-default': ['warn'],
    'import/no-named-as-default-member': ['warn'],
    'import/no-deprecated': ['off'],
    'import/no-mutable-exports': ['warn'],
    'import/no-commonjs': ['off'],
    'import/no-amd': ['warn'],
    'import/no-nodejs-modules': ['off'],
    'import/first': ['warn'],
    'import/imports-first': ['off'],
    'import/no-duplicates': ['warn'],
    'import/no-namespace': ['off'],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],
    'import/newline-after-import': ['warn'],
    'import/no-restricted-paths': ['off'],
    'import/max-dependencies': [
      'off',
      {
        max: 10,
      },
    ],
    'import/no-absolute-path': ['warn'],
    'import/no-dynamic-require': ['warn'],
    'import/no-internal-modules': [
      'off',
      {
        allow: [],
      },
    ],
    'import/unambiguous': ['off'],
    'import/no-webpack-loader-syntax': ['warn'],
    'import/no-unassigned-import': ['off'],
    'import/no-named-default': ['warn'],
    'import/no-anonymous-default-export': [
      'off',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    'import/exports-last': ['off'],
    'import/group-exports': ['off'],
    'import/no-default-export': ['off'],
    'import/no-named-export': ['off'],
    'import/no-self-import': ['warn'],
    'import/no-cycle': [
      'warn',
      {
        maxDepth: '∞',
        ignoreExternal: false,
        allowUnsafeDynamicCyclicDependency: false,
      },
    ],
    'import/no-useless-path-segments': [
      'warn',
      {
        commonjs: true,
      },
    ],
    'import/dynamic-import-chunkname': [
      'off',
      {
        importFunctions: [],
        webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
      },
    ],
    'import/no-relative-parent-imports': ['off'],
    'import/no-unused-modules': [
      'off',
      {
        ignoreExports: [],
        missingExports: true,
        unusedExports: true,
      },
    ],
    'import/no-import-module-exports': [
      'warn',
      {
        exceptions: [],
      },
    ],
    'import/no-relative-packages': ['warn'],
    'arrow-body-style': [
      'warn',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    'constructor-super': ['warn'],
    'no-class-assign': ['warn'],
    'no-const-assign': ['warn'],
    'no-dupe-class-members': ['warn'],
    'no-duplicate-imports': ['off'],
    'no-new-symbol': ['warn'],
    'no-restricted-imports': [
      'off',
      {
        paths: [],
        patterns: [],
      },
    ],
    'no-this-before-super': ['warn'],
    'no-useless-computed-key': ['warn'],
    'no-useless-rename': [
      'warn',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-var': ['warn'],
    'object-shorthand': [
      'warn',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-numeric-literals': ['warn'],
    'prefer-reflect': ['off'],
    'prefer-rest-params': ['warn'],
    'prefer-spread': ['warn'],
    'prefer-template': ['warn'],
    'require-yield': ['warn'],
    'symbol-description': ['warn'],
    'init-declarations': ['off'],
    'no-catch-shadow': ['off'],
    'no-delete-var': ['warn'],
    'no-label-var': ['warn'],
    'no-restricted-globals': [
      'warn',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultStatus',
      'defaultstatus',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-shadow': ['warn'],
    'no-shadow-restricted-names': ['warn'],
    'no-undef': ['warn'],
    'no-undef-init': ['warn'],
    'no-undefined': ['off'],
    camelcase: [
      'warn',
      {
        properties: 'never',
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: false,
      },
    ],
    'capitalized-comments': [
      'off',
      'never',
      {
        line: {
          ignorePattern: '.*',
          ignoreInlineComments: true,
          ignoreConsecutiveComments: true,
        },
        block: {
          ignorePattern: '.*',
          ignoreInlineComments: true,
          ignoreConsecutiveComments: true,
        },
      },
    ],
    'consistent-this': ['off'],
    'func-name-matching': [
      'off',
      'always',
      {
        includeCommonJSModuleExports: false,
        considerPropertyDescriptor: true,
      },
    ],
    'func-style': ['off', 'expression'],
    'id-denylist': ['off'],
    'id-length': ['off'],
    'id-match': ['off'],
    'line-comment-position': [
      'off',
      {
        position: 'above',
        ignorePattern: '',
        applyDefaultPatterns: true,
      },
    ],
    'lines-around-directive': [
      'warn',
      {
        before: 'always',
        after: 'always',
      },
    ],
    'max-depth': ['off', 4],
    'max-lines': [
      'off',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-lines-per-function': [
      'off',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    'max-nested-callbacks': ['off'],
    'max-params': ['off', 3],
    'max-statements': ['off', 10],
    'max-statements-per-line': [
      'off',
      {
        max: 1,
      },
    ],
    'multiline-comment-style': ['off', 'starred-block'],
    'new-cap': [
      'warn',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        properties: true,
      },
    ],
    'newline-after-var': ['off'],
    'newline-before-return': ['off'],
    'no-bitwise': ['warn'],
    'no-continue': ['warn'],
    'no-inline-comments': ['off'],
    'no-lonely-if': ['warn'],
    'no-multi-assign': ['warn'],
    'no-negated-condition': ['off'],
    'no-nested-ternary': ['warn'],
    'no-new-object': ['warn'],
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-ternary': ['off'],
    'no-unneeded-ternary': [
      'warn',
      {
        defaultAssignment: false,
      },
    ],
    'one-var': ['warn', 'never'],
    'operator-assignment': ['warn', 'always'],
    'padding-line-between-statements': ['off'],
    'prefer-exponentiation-operator': ['warn'],
    'prefer-object-spread': ['warn'],
    'require-jsdoc': ['off'],
    'sort-keys': [
      'off',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
    'sort-vars': ['off'],
    'spaced-comment': [
      'warn',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!', '/'],
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!', ':', '::'],
          balanced: true,
        },
      },
    ],
    'callback-return': ['off'],
    'handle-callback-err': ['off'],
    'no-buffer-constructor': ['warn'],
    'no-mixed-requires': ['off', false],
    'no-new-require': ['warn'],
    'no-path-concat': ['warn'],
    'no-process-env': ['off'],
    'no-process-exit': ['off'],
    'no-restricted-modules': ['off'],
    'no-sync': ['off'],
    'for-direction': ['warn'],
    'getter-return': [
      'warn',
      {
        allowImplicit: true,
      },
    ],
    'no-async-promise-executor': ['warn'],
    'no-await-in-loop': ['warn'],
    'no-compare-neg-zero': ['warn'],
    'no-cond-assign': ['warn', 'always'],
    'no-console': ['warn'],
    'no-constant-condition': ['warn'],
    'no-control-regex': ['warn'],
    'no-debugger': ['warn'],
    'no-dupe-args': ['warn'],
    'no-dupe-else-if': ['warn'],
    'no-dupe-keys': ['warn'],
    'no-duplicate-case': ['warn'],
    'no-empty': ['warn'],
    'no-empty-character-class': ['warn'],
    'no-ex-assign': ['warn'],
    'no-extra-boolean-cast': ['warn'],
    'no-func-assign': ['warn'],
    'no-import-assign': ['warn'],
    'no-inner-declarations': ['warn'],
    'no-invalid-regexp': ['warn'],
    'no-irregular-whitespace': ['warn'],
    'no-misleading-character-class': ['warn'],
    'no-obj-calls': ['warn'],
    'no-promise-executor-return': ['warn'],
    'no-prototype-builtins': ['warn'],
    'no-regex-spaces': ['warn'],
    'no-setter-return': ['warn'],
    'no-sparse-arrays': ['warn'],
    'no-template-curly-in-string': ['warn'],
    'no-unreachable': ['warn'],
    'no-unreachable-loop': [
      'warn',
      {
        ignore: [],
      },
    ],
    'no-unsafe-finally': ['warn'],
    'no-unsafe-negation': ['warn'],
    'no-unsafe-optional-chaining': [
      'warn',
      {
        disallowArithmeticOperators: true,
      },
    ],
    'no-unused-private-class-members': ['off'],
    'no-useless-backreference': ['warn'],
    'no-negated-in-lhs': ['off'],
    'require-atomic-updates': ['off'],
    'use-isnan': ['warn'],
    'valid-jsdoc': ['off'],
    'valid-typeof': [
      'warn',
      {
        requireStringLiterals: true,
      },
    ],
    'accessor-pairs': ['off'],
    'array-callback-return': [
      'warn',
      {
        allowImplicit: true,
        checkForEach: false,
      },
    ],
    'block-scoped-var': ['warn'],
    complexity: ['off', 20],
    'consistent-return': ['warn'],
    'default-case': [
      'warn',
      {
        commentPattern: '^no default$',
      },
    ],
    'default-case-last': ['warn'],
    'default-param-last': ['warn'],
    'dot-notation': [
      'warn',
      {
        allowKeywords: true,
        allowPattern: '',
      },
    ],
    eqeqeq: [
      'warn',
      'always',
      {
        null: 'ignore',
      },
    ],
    'grouped-accessor-pairs': ['warn'],
    'guard-for-in': ['warn'],
    'max-classes-per-file': ['warn', 1],
    'no-alert': ['warn'],
    'no-caller': ['warn'],
    'no-case-declarations': ['warn'],
    'no-constructor-return': ['warn'],
    'no-div-regex': ['off'],
    'no-else-return': [
      'warn',
      {
        allowElseIf: false,
      },
    ],
    'no-empty-pattern': ['warn'],
    'no-eq-null': ['off'],
    'no-eval': ['warn'],
    'no-extend-native': ['warn'],
    'no-extra-bind': ['warn'],
    'no-extra-label': ['warn'],
    'no-fallthrough': ['warn'],
    'no-global-assign': [
      'warn',
      {
        exceptions: [],
      },
    ],
    'no-native-reassign': ['off'],
    'no-implicit-coercion': [
      'off',
      {
        boolean: false,
        number: true,
        string: true,
        allow: [],
      },
    ],
    'no-implicit-globals': ['off'],
    'no-implied-eval': ['warn'],
    'no-invalid-this': ['off'],
    'no-iterator': ['warn'],
    'no-labels': [
      'warn',
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    'no-lone-blocks': ['warn'],
    'no-loop-func': ['warn'],
    'no-magic-numbers': [
      'off',
      {
        ignore: [],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],
    'no-multi-str': ['warn'],
    'no-new': ['warn'],
    'no-new-func': ['warn'],
    'no-new-wrappers': ['warn'],
    'no-nonoctal-decimal-escape': ['warn'],
    'no-octal': ['warn'],
    'no-octal-escape': ['warn'],
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'context',
          'req',
          'request',
          'res',
          'response',
          '$scope',
          'staticContext',
        ],
      },
    ],
    'no-proto': ['warn'],
    'no-redeclare': ['warn'],
    'no-restricted-properties': [
      'warn',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead.',
      },
    ],
    'no-return-assign': ['warn', 'always'],
    'no-return-await': ['warn'],
    'no-script-url': ['warn'],
    'no-self-assign': [
      'warn',
      {
        props: true,
      },
    ],
    'no-self-compare': ['warn'],
    'no-sequences': ['warn'],
    'no-unmodified-loop-condition': ['off'],
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        enforceForJSX: false,
      },
    ],
    'no-unused-labels': ['warn'],
    'no-useless-call': ['off'],
    'no-useless-catch': ['warn'],
    'no-useless-concat': ['warn'],
    'no-useless-escape': ['warn'],
    'no-useless-return': ['warn'],
    'no-void': ['warn'],
    'no-warning-comments': [
      'off',
      {
        terms: ['todo', 'fixme', 'xxx'],
        location: 'start',
      },
    ],
    'no-with': ['warn'],
    'prefer-promise-reject-errors': [
      'warn',
      {
        allowEmptyReject: true,
      },
    ],
    'prefer-named-capture-group': ['off'],
    'prefer-regex-literals': [
      'warn',
      {
        disallowRedundantWrapping: true,
      },
    ],
    radix: ['warn'],
    'require-await': ['off'],
    'require-unicode-regexp': ['off'],
    'vars-on-top': ['warn'],
    yoda: ['warn'],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.mjs', '.js', '.json'],
      },
    },
    react: {
      version: '18.2',
    },
    'import/extensions': ['.js', '.mjs', '.jsx'],
    'import/core-modules': [],
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
  },
  ignorePatterns: [
    '/libs-presets/eslint-config/**/node_modules/*',
    '**/node_modules/**',
    '**/__*/**',
    '**/lib/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/public/**',
    '!.gitlab-ci.js',
    '/libs-presets/eslint-config/**/**/node_modules/**',
    '/libs-presets/eslint-config/**/**/__*/**',
    '/libs-presets/eslint-config/**/**/lib/**',
    '/libs-presets/eslint-config/**/**/dist/**',
    '/libs-presets/eslint-config/**/**/build/**',
    '/libs-presets/eslint-config/**/**/coverage/**',
    '/libs-presets/eslint-config/**/**/public/**',
    '!/libs-presets/eslint-config/**/.gitlab-ci.js',
  ],
};
