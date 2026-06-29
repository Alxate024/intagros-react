import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from pathlib import Path
import numpy as np

OUT = Path(__file__).resolve().parent.parent / 'public' / 'media' / 'dashboard'
OUT.mkdir(parents=True, exist_ok=True)

# ── DATA ──────────────────────────────────────────────────────────────────
species_info = {
    'Mango Tommy':       ('Mango',     '#d4a62f'),
    'Mango Haden':       ('Mango',     '#d4a62f'),
    'Mandarina Arrayana':('Citricos',  '#f28c28'),
    'Mandarina Oneco':   ('Citricos',  '#f28c28'),
    'Mandarica Arrayana':('Citricos',  '#f28c28'),
    'Anon':              ('Anonaceas', '#9bbf54'),
    'Zapote':            ('Zapote',    '#b96d3a'),
    'Aguacate Lorena':   ('Aguacate',  '#4f8f42'),
    'Aguacate Trinidad': ('Aguacate',  '#4f8f42'),
    'Madrono':           ('Otros frutales', '#af514f'),
    'Naranja Valencia':  ('Citricos',  '#f07b21'),
    'Naranja Sweety':    ('Citricos',  '#f07b21'),
    'Naranja Sanguina':  ('Citricos',  '#c94835'),
    'Naranja Ombligona': ('Citricos',  '#f07b21'),
    'Naranja Salerma':   ('Citricos',  '#f07b21'),
    'Naranja Variegada': ('Citricos',  '#f07b21'),
    'Tangelo Orlando':   ('Citricos',  '#f6a23c'),
    'Grosello':          ('Otros frutales', '#d64b5f'),
    'Guanabano':         ('Anonaceas', '#6d9f44'),
    'Pomelo':            ('Citricos',  '#f39a4a'),
    'Limon Tahiti':      ('Citricos',  '#8dbf3f'),
    'Limon Nativo':      ('Citricos',  '#8dbf3f'),
    'Guayaba Coronilla': ('Guayaba',   '#77a95f'),
    'Guayaba Comun':     ('Guayaba',   '#77a95f'),
    'Guayaba Pera':      ('Guayaba',   '#77a95f'),
    'Guayaba Peruana':   ('Guayaba',   '#77a95f'),
    'Guayana Coronilla': ('Guayaba',   '#77a95f'),
    'Guayana Peruana':   ('Guayaba',   '#77a95f'),
    'Nispero':           ('Otros frutales', '#c9973c'),
    'Mamey':             ('Otros frutales', '#a96945'),
    'Jaboticaba':        ('Otros frutales', '#5a4a73'),
    'Kumquat Marumi':    ('Citricos',  '#f2b544'),
    'Carambola':         ('Otros frutales', '#c9b642'),
    'Maranon':           ('Otros frutales', '#c86138'),
    'Naranja':           ('Citricos',  '#f07b21'),
}

species_by_number = [
    'Mango Tommy','Mandarina Arrayana','Mango Tommy','Anon','Mandarina Arrayana',
    'Mandarina Oneco','Zapote','Aguacate Lorena','Aguacate Lorena','Madrono',
    'Naranja Valencia','Naranja Sweety','Naranja Valencia','Grosello','Naranja Sweety',
    'Tangelo Orlando','Naranja Valencia','Aguacate Lorena','Mango Tommy','Tangelo Orlando',
    'Naranja Sanguina','Tangelo Orlando','Aguacate Lorena','Naranja Valencia','Madrono',
    'Naranja Valencia','Naranja Sweety','Naranja Sweety','Naranja Valencia','Naranja Sweety',
    'Naranja Valencia','Tangelo Orlando','Naranja Sweety','Naranja Valencia','Naranja Sweety',
    'Mandarina Arrayana','Guanabano','Mango Tommy','Naranja Sweety','Naranja Valencia',
    'Naranja Valencia','Tangelo Orlando','Pomelo','Mandarina Arrayana','Aguacate Lorena',
    'Naranja Ombligona','Tangelo Orlando','Mango Tommy','Naranja Valencia','Naranja Salerma',
    'Limon Tahiti','Tangelo Orlando','Anon','Aguacate Lorena','Naranja Ombligona',
    'Naranja Valencia','Guanabano','Aguacate Lorena','Tangelo Orlando','Naranja Salerma',
    'Tangelo Orlando','Mandarina Arrayana','Mandarina Arrayana','Mango Tommy','Naranja Sweety',
    'Grosello','Mango Tommy','Guayaba Coronilla','Nispero','Guayaba Coronilla',
    'Zapote','Guayaba Comun','Naranja Valencia','Guayaba Coronilla','Nispero',
    'Naranja Valencia','Aguacate Lorena','Naranja Sweety','Guayaba Coronilla','Zapote',
    'Mango Tommy','Guayaba Peruana','Mamey','Aguacate Trinidad','Tangelo Orlando',
    'Naranja Valencia','Naranja Valencia','Mandarina Arrayana','Mandarina Arrayana',
    'Naranja Valencia','Naranja Valencia','Guayaba Pera','Guayaba Coronilla',
    'Naranja Variegada','Guayaba Comun','Naranja Valencia','Naranja Sweety','Limon Nativo',
    'Jaboticaba','Aguacate Lorena','Aguacate Lorena','Mango Haden','Guayaba Comun',
    'Mango Tommy','Mandarina Oneco','Mandarina Arrayana','Naranja Valencia','Aguacate Lorena',
    'Kumquat Marumi','Jaboticaba','Carambola','Mandarina Arrayana','Jaboticaba',
    'Maranon','Madrono','Aguacate Lorena','Limon Tahiti',
]

records = []
for s in species_by_number:
    g, c = species_info.get(s, ('Sin clasificar', '#7d8b57'))
    records.append({'species': s, 'group': g, 'color': c})
df = pd.DataFrame(records)

group_order = df['group'].value_counts().index.tolist()
group_colors = {
    'Citricos': '#f07b21', 'Aguacate': '#4f8f42', 'Mango': '#d4a62f',
    'Guayaba': '#77a95f', 'Anonaceas': '#9bbf54', 'Otros frutales': '#5a4a73',
    'Zapote': '#b96d3a',
}
GROUP_ORDER = ['Citricos', 'Aguacate', 'Mango', 'Guayaba', 'Anonaceas', 'Otros frutales', 'Zapote']
GROUP_COLORS_LIST = ['#f07b21', '#4f8f42', '#d4a62f', '#77a95f', '#9bbf54', '#5a4a73', '#b96d3a']

# ── THEME ──────────────────────────────────────────────────────────────────
BG      = '#0a1a0e'
TEXT    = '#eef3df'
TEXT2   = '#6b8f4e'
GOLD    = '#f4d35e'
GREEN   = '#7fb069'
AX_BG   = '#0e1e10'
GRID    = '#1a2e1a'

plt.rcParams.update({
    'figure.facecolor': BG,
    'axes.facecolor':   AX_BG,
    'axes.edgecolor':   GRID,
    'axes.labelcolor':  TEXT,
    'text.color':       TEXT,
    'xtick.color':      TEXT2,
    'ytick.color':      TEXT2,
    'grid.color':       GRID,
    'grid.alpha':       0.3,
    'font.family':      'sans-serif',
    'font.size':        9,
})

def save(name, dpi=200):
    path = OUT / name
    plt.savefig(path, dpi=dpi, bbox_inches='tight', transparent=False,
                facecolor=BG, edgecolor='none')
    plt.close()
    print(f'  + {path.name}')

# ── 1. GROUP DISTRIBUTION (horizontal bars) ───────────────────────────────
fig, ax = plt.subplots(figsize=(7, 4.2))
gb = df.groupby('group').size().reindex(GROUP_ORDER, fill_value=0)
colors = [group_colors[g] for g in gb.index]
bars = ax.barh(gb.index, gb.values, color=colors, height=0.65, edgecolor='none')
for bar, v, c in zip(bars, gb.values, colors):
    ax.text(bar.get_width() + 1.5, bar.get_y() + bar.get_height()/2,
            str(int(v)), va='center', fontsize=11, fontweight=700, color=c if v > max(gb.values)*0.15 else TEXT)
ax.set_xlim(0, gb.max() + gb.max()*0.2)
ax.xaxis.set_major_locator(mticker.MaxNLocator(integer=True))
ax.tick_params(axis='y', labelsize=9.5)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(GRID)
ax.spines['bottom'].set_color(GRID)
ax.set_title('Distribución por grupo botánico', color=TEXT, fontsize=13, fontweight=700, pad=14)
fig.tight_layout()
save('group_bars.png')

# ── 2. TOP SPECIES (horizontal bars) ─────────────────────────────────────
top_species = df['species'].value_counts().head(12)
fig, ax = plt.subplots(figsize=(7, 5))
species_group = df[['species', 'group']].drop_duplicates().set_index('species')['group'].to_dict()
bar_colors = [group_colors.get(species_group[s], '#7d8b57') for s in top_species.index]
bars = ax.barh(top_species.index, top_species.values, color=bar_colors, height=0.6, edgecolor='none')
for bar, v, c in zip(bars, top_species.values, bar_colors):
    ax.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
            str(int(v)), va='center', fontsize=9, fontweight=600, color=c if v > top_species.max()*0.15 else TEXT)
ax.set_xlim(0, top_species.max() + top_species.max()*0.15)
ax.xaxis.set_major_locator(mticker.MaxNLocator(integer=True))
ax.tick_params(axis='y', labelsize=8)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(GRID)
ax.spines['bottom'].set_color(GRID)
ax.set_title('Especies más representadas', color=TEXT, fontsize=13, fontweight=700, pad=14)
fig.tight_layout()
save('top_species.png')

# ── 3. DONUT CHART ─────────────────────────────────────────────────────────
gb = df.groupby('group').size().reindex(GROUP_ORDER, fill_value=0)
fig, ax = plt.subplots(figsize=(5.5, 5.5))
wedges, texts, autotexts = ax.pie(
    gb.values, labels=None, autopct='', startangle=90,
    colors=GROUP_COLORS_LIST, pctdistance=0.75,
    wedgeprops=dict(width=0.4, edgecolor=BG, linewidth=2.5),
    textprops=dict(color=TEXT, fontsize=9),
)
total = gb.sum()
labels = [f'{g}  {v}' for g, v in zip(gb.index, gb.values)]
ax.legend(wedges, labels, loc='center', frameon=False, fontsize=8.5,
          labelcolor=TEXT2, handletextpad=0.8)
ax.set_title('Composición por grupo', color=TEXT, fontsize=13, fontweight=700, pad=14)
fig.tight_layout()
save('group_donut.png')

# ── 4. SPECIES PER GROUP (grouped bars) ────────────────────────────────────
group_species = df.groupby(['group', 'species']).size().reset_index(name='count')
fig, ax = plt.subplots(figsize=(8, 4.5))
n_groups = len(GROUP_ORDER)
x_pos = np.arange(n_groups)
bar_w = 0.55
bars = ax.bar(x_pos, [group_species[group_species['group']==g]['count'].sum() for g in GROUP_ORDER],
              width=bar_w, color=GROUP_COLORS_LIST, edgecolor='none')
for i, (bar, g) in enumerate(zip(bars, GROUP_ORDER)):
    sg = group_species[group_species['group']==g].sort_values('count', ascending=False)
    label = '\n'.join([f'{r.species}: {r.count}' for _, r in sg.iterrows()])
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
            str(int(bar.get_height())), ha='center', va='bottom', fontsize=10,
            fontweight=700, color=TEXT)
ax.set_xticks(x_pos)
ax.set_xticklabels(GROUP_ORDER, fontsize=8.5, rotation=20, ha='right')
ax.yaxis.set_major_locator(mticker.MaxNLocator(integer=True))
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(GRID)
ax.spines['bottom'].set_color(GRID)
ax.set_title('Árboles por grupo', color=TEXT, fontsize=13, fontweight=700, pad=14)
fig.tight_layout()
save('species_per_group.png')

# ── 5. CÍTRICOS BREAKDOWN (sub-bar of the largest group) ──────────────────
citricos_df = df[df['group'] == 'Citricos']
cs = citricos_df['species'].value_counts()
cs_colors = {'Naranja Valencia': '#f07b21', 'Naranja Sweety': '#f07b21',
             'Tangelo Orlando': '#f6a23c', 'Mandarina Arrayana': '#f28c28',
             'Naranja Salerma': '#f07b21', 'Naranja Sanguina': '#c94835',
             'Naranja Ombligona': '#f07b21', 'Limon Tahiti': '#8dbf3f',
             'Pomelo': '#f39a4a', 'Mandarina Oneco': '#f28c28',
             'Naranja Variegada': '#f07b21', 'Kumquat Marumi': '#f2b544',
             'Limon Nativo': '#8dbf3f', 'Mandarica Arrayana': '#f28c28'}
fig, ax = plt.subplots(figsize=(7, 4))
cc = [cs_colors.get(s, '#f07b21') for s in cs.index]
bars = ax.barh(cs.index, cs.values, color=cc, height=0.6, edgecolor='none')
for bar, v, c in zip(bars, cs.values, cc):
    ax.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
            str(int(v)), va='center', fontsize=8.5, fontweight=600, color=c if v > cs.max()*0.15 else TEXT)
ax.set_xlim(0, cs.max() + cs.max()*0.18)
ax.xaxis.set_major_locator(mticker.MaxNLocator(integer=True))
ax.tick_params(axis='y', labelsize=8)
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(GRID); ax.spines['bottom'].set_color(GRID)
ax.set_title('Cítricos — desglose por variedad', color=TEXT, fontsize=12, fontweight=700, pad=12)
fig.tight_layout()
save('citricos_breakdown.png')

# ── 6. HEALTH DISTRIBUTION ────────────────────────────────────────────────
health_base = {
    'Aguacate': 85, 'Mango': 82, 'Citricos': 73, 'Guayaba': 78,
    'Anonaceas': 90, 'Zapote': 88, 'Otros frutales': 70,
}
health_records = []
for i, (_, row) in enumerate(df.iterrows()):
    base = health_base.get(row['group'], 75)
    score = max(35, min(100, base + ((i * 7 + len(row['species']) * 3) % 15) - 7))
    if score >= 80: label = 'Óptima'
    elif score >= 60: label = 'Buena'
    elif score >= 40: label = 'Regular'
    else: label = 'Crítica'
    health_records.append({'species': row['species'], 'group': row['group'], 'score': score, 'label': label})
hd = pd.DataFrame(health_records)

fig, ax = plt.subplots(figsize=(7, 4))
health_order = ['Óptima', 'Buena', 'Regular', 'Crítica']
health_colors = ['#7fb069', '#d4a62f', '#f4d35e', '#c94835']
for i, label in enumerate(health_order):
    subset = hd[hd['label'] == label]
    ax.barh(label, len(subset), color=health_colors[i], height=0.55, edgecolor='none')
    if len(subset) > 0:
        ax.text(len(subset) + 1.5, i, str(len(subset)), va='center', fontsize=11, fontweight=700, color=health_colors[i])
ax.set_xlim(0, len(hd) + 8)
ax.xaxis.set_major_locator(mticker.MaxNLocator(integer=True))
ax.tick_params(axis='y', labelsize=9.5)
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(GRID); ax.spines['bottom'].set_color(GRID)
ax.set_title('Distribución de salud del predio', color=TEXT, fontsize=13, fontweight=700, pad=14)
fig.tight_layout()
save('health_distribution.png')

# ── 7. SUMMARY CARD (standalone figure for the small KPI area) ───────────
fig, ax = plt.subplots(figsize=(4, 1.8))
ax.axis('off')
text_lines = [
    ('ÁRBOLES', f'{len(df)}', GREEN),
    ('VARIEDADES', f'{df["species"].nunique()}', GOLD),
    ('GRUPOS', f'{df["group"].nunique()}', '#f07b21'),
]
cell_w = 1 / 3
for i, (label, value, color) in enumerate(text_lines):
    ax.text(i * cell_w + cell_w/2, 0.7, value, ha='center', va='center',
            fontsize=28, fontweight=800, color=color, fontfamily='sans-serif')
    ax.text(i * cell_w + cell_w/2, 0.15, label, ha='center', va='center',
            fontsize=8, fontweight=600, color=TEXT2, fontfamily='sans-serif')
    ax.plot([i * cell_w + cell_w/2 - 0.12, i * cell_w + cell_w/2 + 0.12],
            [0.38, 0.38], color=color, linewidth=1.5, alpha=0.4)
fig.tight_layout()
save('summary_stats.png')

print(f'\n✅ All charts saved to {OUT}')
