
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import css from "rollup-plugin-import-css";
import styles from "rollup-plugin-styles";


console.log(css)

export default {
    input: "src/index.jsx",
    output:{
        dir: "dist",
        format:"es",
        assetFileNames: "[name]-[hash][extname]",
    },
   plugins: [
      nodeResolve({
         extensions: ['.js', '.jsx']
      }),
      babel({
         babelHelpers: 'bundled',
         presets: ['@babel/preset-react'],
         extensions: ['.js', '.jsx','.css']
      }),
      commonjs(),
      replace({
         preventAssignment: false,
         'process.env.NODE_ENV': '"development"'
      }),
      css(),
      styles()
   ]
}