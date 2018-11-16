let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//清除目录
const cleanWebpackPlugin = require("clean-webpack-plugin");
let path = require('path')

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

module.exports = {
    mode: 'production',
    entry: {
        'common': './src/page/common/index.js',
        'index': './src/page/index/index.js',
        'list': './src/page/list/index.js',
        'detail': './src/page/detail/index.js',
        'cart': './src/page/cart/index.js',
        'order-confirm': './src/page/order-confirm/index.js',
        'order-list': './src/page/order-list/index.js',
        'order-detail': './src/page/order-detail/index.js',
        'payment': './src/page/payment/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'user-pass-update': './src/page/user-pass-update/index.js',
        'result': './src/page/result/index.js',
        'about': './src/page/about/index.js',
        'test': './src/page/test/index.js'
    },
    output: {
        /* 
        * 【改动】：删除path的配置，在webpack4中文件默认生成的位置就是/dist,
        *  而publicPath和filename特性的设置要保留
        */
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
        filename: 'js/[name].js'
    },
    module: {
        /* 
        * 【改动】：loader的使用中，loaders字段变为rules，用来放各种文件的加载器，用rules确实更为贴切
        */
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                // 不检查node_modules下的js文件
                exclude: "/node_modules/"
            },
            /* 
            * 【改动】：css样式的加载方式变化
            */
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader"]
                })
            },
            {
                test: /\.less$/,
                // 三个loader的顺序不能变
                // 不分离的写法
                // use: ["style-loader", "css-loader", "less-loader"]
                // 分离的写法
                use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use: ["css-loader", "less-loader","postcss-loader"]
				})
            },
            /* 
            * 【改动】：模板文件的加载方式变化
            */
            // 模板文件的处理
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader'
                }
            },
            /* 
            * 【改动】：图片文件的加载方式变化，并和字体文件分开处理
            */
            // 图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            /* 
                            * 【改动】：图片小于2kb的按base64打包
                            */
                            limit: 2048,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            /* 
            * 【改动】：字体文件的加载方式变化
            */
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            { test: /\.ejs$/, loader: 'ejs-loader?variable=data' }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    optimization: {
        runtimeChunk: false,//为true则是把runtime单独打包出来
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
        new HtmlWebpackPlugin(getHtmlConfig('test', '关于MMall')),
        new webpack.ProvidePlugin({
            _: "underscore"
        }),

          // 调用之前先清除
        new cleanWebpackPlugin(["dist"]),
        
        //引入jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]

}