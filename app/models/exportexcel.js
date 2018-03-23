const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');

module.exports = function(user,users){
    let d = new Date();
    const workbook = new Excel.Workbook();
    workbook.creator = user.firstname + " " + user.lastname;
    workbook.lastModifiedBy = user.firstname + " " + user.lastname;
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    let worksheet =  workbook.addWorksheet('users', {
        pageSetup:{paperSize: 9, orientation:'landscape'}
    });
    let filename = d.getMonth() + "_" + d.getDay() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + '.xlsx';


    worksheet.getColumn('A').width = 15;
    worksheet.getColumn('B').width = 25;
    worksheet.getColumn('C').width = 45;
    worksheet.getColumn('D').width = 30;
    worksheet.getColumn('E').width = 20;

    let fills = {
        redDarkVertical: {type: 'pattern', pattern:'darkVertical', fgColor:{argb:'FFFF0000'}},
        redGreenDarkTrellis: {type: 'pattern', pattern:'darkTrellis', fgColor:{argb:'FFFF0000'}, bgColor:{argb:'FF00FF00'}},
        blueWhiteHGrad: {type: 'gradient', gradient: 'angle', degree: 0,
            stops: [{position:0, color:{argb:'FF0000FF'}},{position:1, color:{argb:'FFFFFFFF'}}]},
        rgbPathGrad: {type: 'gradient', gradient: 'path', center:{left:0.5,top:0.5},
            stops: [{position:0, color:{argb:'FFFF0000'}},{position:0.5, color:{argb:'FF00FF00'}},{position:1, color:{argb:'FF0000FF'}}]}
    };
    worksheet.getCell('B1').fill = fills.rgbPathGrad;


    worksheet.getCell('A1').font = {
        name: 'Comic Sans MS',
        family: 4,
        size: 16,
        underline: true,
        bold: true
    };

    worksheet.getColumn(1).numFmt = '"£"#,##0.00;[Red]\-"£"#,##0.00';

    worksheet.getCell('A1').value = "User ID";
    worksheet.getCell('B1').value = "First Name";
    worksheet.getCell('C1').value = "Last Name";
    worksheet.getCell('D1').value = "E-mail";
    worksheet.getCell('E1').value = "Date of created";

    let count = 2;
    for(let i in users){
        worksheet.getCell('A'+count).value = users[i]['id'];
        worksheet.getCell('B'+count).value = users[i]['firstname'];
        worksheet.getCell('C'+count).value = users[i]['lastname'];
        worksheet.getCell('D'+count).value = users[i]['email'];
        worksheet.getCell('E'+count).value = users[i]['createdAt'];
        count++;
    }

    workbook.xlsx.writeFile(path.join(__dirname, `../../files/${filename}`))
        .then(function() {
            console.log('Done.');
        });

};