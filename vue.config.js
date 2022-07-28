// module.exports={
// 	lintOnSave: false,
//     devServer: {
//         overlay: {
//             warning: false,
//             errors: false
//         }
//     },
// }
module.exports = {
  publicPath: "./", // 公共路径(必须有的)
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", //静态资源文件名称
  lintOnSave: false,
  productionSourceMap: false, //去除打包后js的map文件
  devServer:{
      // proxy:{
      //     '/api':{
      //         changeOrigin:true,
      //         target: 'http://172.24.148.199:7003',  // 后台接口域名
      //         ws: true,        //如果要代理 websockets，配置这个参数
      //         // secure: false,  // 如果是https接口，需要配置这个参数
      //         changeOrigin: true,  //是否跨域
      //         pathRewrite : {
      //             '^/api':''
      //         }
      //     }
      // }
      
},
  //去掉console
  configureWebpack: (config) => {
      // 判断为生产模式下，因为开发模式我们是想保存console的
      if (process.env.NODE_ENV === "production") {
          config.optimization.minimizer.map((arg) => {
              const option = arg.options.terserOptions.compress;
              option.drop_console = true; // 打开开关
              return arg;
          });
      }
  },
};
