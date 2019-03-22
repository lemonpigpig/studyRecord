var fs = require('fs')
// var _ = require('lodash')
var UglifyJS = require('uglify-js')
var testAST = UglifyJS.parse('function test(a){return a + 1}', {
  filename: 'file1.js'
})
// console.log('----testAST----:', testAST)

var code =
  'function foo() {\n\
    var a = 1;\n\
  function x(){}\n\
  function y(){}\n\
}\n\
function bar() {}'
var toplevel = UglifyJS.parse(code)
var walker = new UglifyJS.TreeWalker(function(node) {
  if (node instanceof UglifyJS.AST_Defun) {
    // string_template is a cute little function that UglifyJS uses for warnings
    console.log(
      `name: ${node.name.name}`,
      `line: ${node.start.line}`,
      `col: ${node.start.col}`
    )
  }
})
toplevel.walk(walker)
