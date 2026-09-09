"""Пересобирает импорты фото портфолио по содержимому src/assets.

Запуск из папки front-end:  python3 scripts/sync-portfolio.py
Берёт все файлы вида <категория>_r<ряд>_p<фото>.jpg, обновляет assets/index.js
и список PHOTOS в components/Portfolio/Portfolio.jsx (порядок — с чередованием
категорий). Фото тяжелее 900 КБ пережимает до 1600px, оригинал кладёт в originals/.
"""
import io, os, re, glob, shutil
from PIL import Image, ImageOps

os.chdir(os.path.join(os.path.dirname(__file__), '..', 'src'))
ASSETS = 'assets'
LIMITS = {'header_photo.jpg': 2400, 'mob_background.jpg': 1400}

# 1. пережать тяжёлые
def backup(f):
    stem, ext = os.path.splitext(os.path.basename(f))
    dest = os.path.join(ASSETS, 'originals', stem + ext); n = 2
    while os.path.exists(dest):
        dest = os.path.join(ASSETS, 'originals', f'{stem}_v{n}{ext}'); n += 1
    shutil.move(f, dest); return dest

os.makedirs(os.path.join(ASSETS, 'originals'), exist_ok=True)
for f in sorted(glob.glob(f'{ASSETS}/*.jp*g')):
    mx = LIMITS.get(os.path.basename(f), 1600)
    im = ImageOps.exif_transpose(Image.open(f))
    if max(im.size) > mx or os.path.getsize(f) > 900_000:
        src = backup(f)
        im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        im.thumbnail((mx, mx), Image.LANCZOS)
        out = os.path.splitext(f)[0] + '.jpg'
        im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
        print('пережато:', os.path.basename(out), im.size, round(os.path.getsize(out) / 1024), 'KB')

# 2. список кадров
names = sorted(os.path.basename(f)[:-4] for f in glob.glob(f'{ASSETS}/*_r?_p?.jpg'))
cats = {'love': [], 'family': [], 'wed': []}
for n in names:
    cats[n.split('_')[0]].append(n)
order = []
while any(cats.values()):
    for c in ('love', 'family', 'wed'):
        if cats[c]:
            order.append(cats[c].pop(0))
alts = {'love': 'Love story photo session in Belgrade by linanoon photography',
        'family': 'Family photo session in Belgrade by linanoon photography',
        'wed': 'Wedding photography in Belgrade by linanoon photography'}

# 3. assets/index.js
p = f'{ASSETS}/index.js'
s = io.open(p, encoding='utf-8').read()
start = s.index('// portfolio'); end = s.index('// фото карточек')
s = s[:start] + '// portfolio — naming: <tab>_r<row>_p<photo>\n' + ''.join(f'import {n} from "./{n}.jpg";\n' for n in names) + '\n' + s[end:]
i = s.index('export {'); exp = s[i:]
exp = re.sub(r'\n\s+(love|family|wed)_r\d_p\d[^\n]*', '', exp)
exp = exp.replace('    header_photo,\n', '    header_photo,\n    ' + ', '.join(names) + ',\n')
io.open(p, 'w', encoding='utf-8').write(s[:i] + exp)

# 4. Portfolio.jsx
q = 'components/Portfolio/Portfolio.jsx'
t = io.open(q, encoding='utf-8').read()
a = t.index('import {\n  '); b = t.index("} from '../../assets';") + len("} from '../../assets';")
t = t[:a] + 'import {\n  ' + ',\n  '.join(order) + "\n} from '../../assets';" + t[b:]
a = t.index('const PHOTOS = ['); b = t.index('].map((p, i)')
t = t[:a] + 'const PHOTOS = [\n' + ''.join(f"  {{ src: {n}, alt: '{alts[n.split('_')[0]]}' }},\n" for n in order) + t[b:]
io.open(q, 'w', encoding='utf-8').write(t)
print(len(order), 'кадров в ленте:', ', '.join(order))
