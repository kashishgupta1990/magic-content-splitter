var fs = require('fs');
var path = require('path');
var inputFilePath = './test/test.txt';
var regexString = /(\[.*?\])/g;

fs.readFile('./test/test.txt',(err,data)=>{
    var fileContent = data.toString();
    fileContent = data.toString().replace(regexString,'');
    console.log(fileContent);
});