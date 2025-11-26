export function exportTableToXLS(filename = 'tabela.xls') {
  const tableId = "transacoes-table";
  const table = document.getElementById(tableId);
  if (!table) {
    console.error('Tabela não encontrada:', tableId);
    return;
  }

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Sheet1</x:Name>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
        <![endif]-->
      </head>
      <body>${table.outerHTML}</body>
    </html>
  `;

  const blob = new Blob(["\uFEFF", html], {
    type: "application/vnd.ms-excel;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
