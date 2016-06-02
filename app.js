var fs = require('fs');
var path = require('path');
var async = require('async');
var inputFilePath = './test/test.txt';
var outputFilePath = './output/';
var regexStringCaptureBracket = /(\[.*?\])/g;
var regexTrackMatch = /(CD) [0-9]* Track [0-9]*/g;
var regexTrackMatch2 = /(CD) [0-9.0-9]* \/ MP3 [0-9]*/g;
var regexSearchCd = /(CD) [0-9.0-9]*/g;
var finalList = [];
var task = [];

if (!fs.existsSync(outputFilePath)){
    fs.mkdirSync(outputFilePath);
}

fs.readFile(inputFilePath, (err, data)=> {
    var fileContent = data.toString();
    var fileList = [];
    fileContent = data.toString().replace(regexStringCaptureBracket, '');
    fileList = fileContent.split(regexTrackMatch);
    fileList.forEach(function (fileData) {
        var isRequiredFile = fileData.match(regexTrackMatch2);
        var result;
        var fName;
        if (isRequiredFile) {
            result = regexTrackMatch2.exec(fileData);
            if (result && result.length > 0) {
                result = result[0].split('/');
                result = result[0].trim().replace(/CD/, '').replace(' ', '').split('.');
                fName = 'CD ' + result[0] + ' Track ' + result[1];
                finalList.push({
                    fileName: fName + '.txt',
                    fileData: fName + '\n' + fileData
                });

            }
        }
    });

    finalList.forEach((fData)=> {
        task.push((callback)=> {
            fs.writeFile(path.join(outputFilePath,fData.fileName),fData.fileData,(err,data)=>{
                callback(err, 'File: '+ fData.fileName);
            });
        });
    });

    async.series(task, (err, fResult)=> {
        if (err) {
            throw err;
        } else {
            console.log(fResult);
            console.log('File successfully generated.');
        }
    })

});