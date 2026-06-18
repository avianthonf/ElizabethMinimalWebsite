import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".claude/**", "coverage/**", ".next/**"],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
