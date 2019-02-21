import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import pkg from "./package.json";

const env = process.env.NODE_ENV;

const defaultPlugins = [
  babel({
    runtimeHelpers: true,
    exclude: "node_modules/**", // only transpile our source code
    plugins: ["@babel/plugin-transform-runtime"],
    externalHelpers: true
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(), // converts date-fns to ES modules
  env === "production" && uglify() // minify, but only in production
];

export default [
  {
    input: "js/poll/index.js",
    output: {
      file: pkg.module,
      format: "iife",
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
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
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
      name: "Admin",
      sourcemap: true
    },
    plugins: defaultPlugins
  }
];
