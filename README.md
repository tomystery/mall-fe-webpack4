# 1. 两中环境下的不同

1. dev环境下要开启sourceMap 
2. 开发环境style-loader,生产环境extra-text-webpack-plugin,处理css文件
3. 开发环境file-loader,生产环境url-loader处理图片、字体图标那些
4. dev环境下没有clean 目录
5. dev下有dev-server

# 2. webpack4相对于之前版本的改版

1. 新增mode，而这个mode可以使得分别在生产和开发环境下少去配置plugin
2. optimization.splitChunks
3. optimization.minimizer(uglifyjs)-指定压缩器