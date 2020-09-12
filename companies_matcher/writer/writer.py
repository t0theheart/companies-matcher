import xlwt


def write_to_xlsx(data: dict, column_headers: list, rows_headers: list):
    book = xlwt.Workbook(encoding="utf-8")
    sheet = book.add_sheet("Matching", cell_overwrite_ok=True)

    for x, column_header in enumerate(column_headers):
        sheet.write(0, x + 1, column_header)

        for y, rows_header in enumerate(rows_headers):
            y += 1
            sheet.write(y, 0, rows_header)
            sheet.write(y, x + 1, data[column_header][rows_header])

    book.save("matching.xlsx")
