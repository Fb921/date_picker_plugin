// const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports =  {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        library: "DatePicker",
        libraryTarget: "commonjs2",
        // publicPath: '/dist/',      
        // umdNamedDefine: true,  
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'build'),
        port: 3010,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                       loader: 'css-loader'
                    }
                    
                ]
            },
            {
                test: /\.(svg)|https$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svg-url-loader',
                }
            },{
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    }
    ,
    experiments: {
        outputModule: true
    },
    // resolve: {      
    //     alias: {          
    //         'react': path.resolve(__dirname, './node_modules/react'),
    //         'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
    //     }  
    // }, 
    // externals: { 
    //     react: {          
    //         commonjs: "react",          
    //         commonjs2: "react",          
    //         amd: "React",          
    //         root: "React"      
    //     },      
    //     "react-dom": {          
    //         commonjs: "react-dom",          
    //         commonjs2: "react-dom",          
    //         amd: "ReactDOM",          
    //         root: "ReactDOM"      
    //     }  
    // } 

}