import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

const generateFromJSON = async (json) => {
  const workbook = await XlsxPopulate.fromBlankAsync();
  const sheet = workbook.sheet('Sheet1');
  sheet.cell('A1').value(json);
  sheet.row(1).style({ bold: true });
  return workbook;
};

const download = async (workbook, name = 'out') => {
  const blob = await workbook.outputAsync();
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, `${name}.xlsx`);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${name}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
};

export default generateFromJSON;

export { download };
