import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next.config.js',
      'app/chapters/[slug]/page.tsx',
      'app/journal/[slug]/page.tsx',
      'components/home/sections.tsx',
      'lib/content.ts'
    ]
  }
];

export default eslintConfig;
