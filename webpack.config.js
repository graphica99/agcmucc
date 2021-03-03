const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
module.exports = {
    entry: ['babel-polyfill','./frontend-js/main.js'],
    output:{
       path: path.resolve(__dirname, 'public/frontjs'),
       filename: 'bundle.js'
    },
    mode:'development',
    devServer:{
        contentBase:'./frontend-js'
    },
    plugins:[
       new NodemonPlugin()
    ],
    module:{
       rules:[
           {
              test:'/\.js$/',
              exclude:/node_module/,
              use:{
                  loader:'babel-loader'
              }
           }
       ]
    }
}