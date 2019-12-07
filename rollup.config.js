import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";

// ---- settings ------------

const version = "1.0.2";
const cleanBuild = false;

// --------------------------

const bannerComment = `/**
 * Image Grid Generator.
 * @copyright 2019 FAL
 * @version ${version}
 */
`;

const globals = {
  p5: "p5"
};

const external = ["p5"];

const typescriptPlugin = typescript({
  useTsconfigDeclarationDir: true,
  clean: cleanBuild
});

const cleanupPlugin = cleanup({
  comments: /^\*\*/, // preserve jsdoc comments
  extensions: ["ts"]
});

const plugins = [typescriptPlugin, cleanupPlugin];

const config = {
  input: "src/main.ts",
  output: {
    file: "build/main.js",
    format: "iife",
    sourcemap: true,
    banner: bannerComment,
    preferConst: true,
    globals
  },
  external,
  plugins
};

export default config;
