"""Read-only audit of owner-supplied kit. Never saves the source workbook/PDFs."""
from pathlib import Path
from zipfile import ZipFile
from hashlib import sha256
import json
from pypdf import PdfReader
from openpyxl import load_workbook
root = Path(__file__).resolve().parents[1]
source = root / 'kit-separado-y-zip'
out = root / 'docs/design/evidence/kit'
out.mkdir(parents=True, exist_ok=True)
report = {'files': [], 'pdfs': {}, 'workbook': {}}
for p in sorted(source.iterdir()):
    report['files'].append({'name': p.name, 'bytes': p.stat().st_size, 'sha256': sha256(p.read_bytes()).hexdigest()})
    if p.suffix == '.pdf':
        reader = PdfReader(p)
        pages = [page.extract_text() for page in reader.pages]
        report['pdfs'][p.name] = {'pages': len(pages), 'text': pages}
with ZipFile(source / 'Dentflow_Kit_Gratuito_Publico.zip') as z:
    assert z.testzip() is None
    report['zip'] = [{'name': n, 'matches_original': z.read(n) == (source / Path(n).name).read_bytes()} for n in z.namelist() if not n.endswith('/')]
    assert len(report['zip']) == 4 and all(x['matches_original'] for x in report['zip'])
wb = load_workbook(source / 'Dentflow_Planilla_Seguimiento.xlsx', data_only=False)
for ws in wb:
    report['workbook'][ws.title] = {'rows': ws.max_row, 'columns': ws.max_column, 'sample': [[v for v in row] for row in ws.iter_rows(min_row=1,max_row=min(ws.max_row,16),values_only=True)], 'formula_count': sum(c.data_type == 'f' for row in ws for c in row), 'validation_count': len(ws.data_validations.dataValidation)}
report['external_links'] = len(wb._external_links)
(out / 'kit-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2, default=str), encoding='utf-8')
for name, pdf in report['pdfs'].items():
    print(name, pdf['pages'])
    for i,text in enumerate(pdf['text']): print(f'PAGE {i+1}\n{text}')
print(json.dumps(report['workbook'], ensure_ascii=False, default=str, indent=2))
