// 安装依赖
const gulp = require('gulp')
//架设静态服务器
const browserSync = require('browser-sync')

gulp.task('browser-sync', function() {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './', // 设置服务器的根目录
      index: './index.html' // 指定默认打开的文件
    },
    port: 8050 // 指定访问服务器的端口号
  })
})
