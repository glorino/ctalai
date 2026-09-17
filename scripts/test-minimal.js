const ExcelJS = require('exceljs');

async function main() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Test');
  ws.getCell('A1').value = 'Hello';
  ws.getCell('B1').value = 123;
  await wb.xlsx.writeFile('test-minimal.xlsx');
  console.log('Minimal file created');
}
main();