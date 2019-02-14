import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const defaultPlugins = [
  resolve({
    jsnext: true,
    main: true
  }),
  babel({
    runtimeHelpers: true,
    exclude: "node_modules/**", // only transpile our source code
    plugins: ["@babel/plugin-transform-runtime"],
    externalHelpers: true
  }),
  commonjs(), // converts date-fns to ES modules
  production && uglify() // minify, but only in production
];

export default [
  {
    input: "js/poll/index.js",
    output: {
      file: pkg.module,
      format: "iife",
      name: "Poll",
      sourcemap: true
    },
    plugins: defaultPlugins
  },
  {
    input: "js/admin/index.js",
    output: {
      file: "dist/admin.iief.js",
      format: "iife",
      name: "Admin",
      sourcemap: true
    },
    plugins: defaultPlugins
  }
];