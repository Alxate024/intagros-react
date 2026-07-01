import json, os, numpy as np, pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path

# ── DATA ────────────────────────────────────────────────────────────────────

ZAPOTE_SPECIES = [
    "Mango Tommy","Anon","Guanabano","Jaboticaba","Mango Haden","Limon Tahiti","Naranja Sanguina",
    "Grosello","Guayaba Comun","Mango Tommy","Mango Haden","Mango Haden","Mango Tommy","Mango Tommy",
    "Mango Tommy","Aguacate Lorena","Aguacate Lorena","Zapote","Mango Tommy","Mango Tommy",
    "Limon Tahiti","Mango Tommy","Mango Tommy","Mango Tommy","Mango Tommy","Mango Haden",
    "Mango Tommy","Mango Haden","Aguacate Lorena","Mango Tommy","Mango Haden","Naranja Sweety",
    "Naranja Ombligona","Mandarina Arrayana","Mandarina Arrayana","Mango Tommy","Mango Tommy",
    "Mango Haden","Mango Haden","Mango Tommy","Aguacate Trinidad","Mango Tommy","Mango Haden",
    "Mango Tommy","Mango Haden","Mango Tommy","Mango Tommy","Mango Tommy","Zapote","Aguacate Lorena",
    "Aguacate Lorena","Guayaba Comun","Guayaba Coronilla","Guayaba Pera","Madrono","Pitanga",
    "Guayaba Comun","Guayaba Comun","Guayaba Peruana","Nispero","Naranja Salerma","Mango Tommy",
    "Mango Tommy","Mandarina Oneco","Naranja Ombligona","Mandarina Arrayana","Guayaba Peruana",
    "Mandarina Arrayana","Guayaba Pera","Mandarina Arrayana","Guayaba Comun","Guayaba Peruana",
    "Limon Nativo","Naranja Ombligona","Guayaba Peruana","Naranja Ombligona","Mandarina Arrayana",
    "Naranja Ombligona","Naranja Sweety","Guayaba Pera","Mango Haden","Tangelo Orlando",
    "Limon Tahiti","Limon Tahiti","Limon Nativo","Limon Tahiti","Mango Tommy","Guayaba Pera",
    "Mandarina Arrayana","Mandarina Arrayana","Guayaba Comun","Mango Tommy","Aguacate Lorena",
    "Zapote","Kumquat Marumi","Mango Tommy","Mango Haden","Mango Tommy","Aguacate Lorena",
    "Mango Tommy","Mango Tommy","Aguacate Lorena","Mango Tommy","Guayaba Peruana","Guayaba Comun",
    "Mango Tommy","Mango Haden","Mango Tommy","Guayaba Comun","Mango Tommy","Guayaba Peruana",
    "Mango Tommy","Aguacate Lorena","Mango Tommy","Mango Haden","Mango Tommy","Mango Tommy",
    "Guayaba Pera","Mango Haden","Mango Haden","Mango Tommy","Mango Tommy","Mango Tommy",
]
ZAPOTE_COORDS = [
    (761,316),(415,548),(315,548),(257,472),(210,300),(610,190),(515,88),(105,190),
    (105,300),(812,88),(705,88),(610,88),(515,88),(414,88),(315,88),(914,88),(1010,88),
    (1010,185),(1010,280),(1010,376),(705,392),(915,280),(915,376),(915,472),(812,376),
    (812,472),(105,392),(105,480),(1010,480),(210,392),(210,480),(315,376),(315,472),
    (414,280),(414,376),(705,280),(705,376),(610,280),(610,376),(515,280),(914,185),
    (812,280),(610,480),(515,376),(515,480),(414,472),(315,280),(210,280),(915,185),
    (1010,185),(1010,280),(915,280),(812,280),(705,280),(610,280),(515,280),(414,280),
    (315,280),(210,280),(1010,376),(915,376),(812,376),(705,376),(610,376),(515,376),
    (414,376),(315,376),(210,376),(1010,472),(915,472),(812,472),(705,472),(610,472),
    (515,472),(414,472),(315,472),(210,472),(1010,88),(914,88),(812,88),(705,88),
    (610,88),(515,88),(414,88),(315,88),(210,88),(105,88),(210,190),(315,190),(414,190),
    (610,190),(705,190),(812,190),(914,190),(1010,190),(210,600),(315,600),(414,600),
    (515,600),(610,600),(705,600),(812,600),(915,600),(1010,600),(210,695),(315,695),
    (414,695),(515,695),(610,695),(705,695),(812,695),(915,695),(1010,695),(210,790),
    (315,790),(414,790),(515,790),(610,790),(705,790),(812,790),(915,790),(1010,790),
]

SPECIES_GROUP_ZAPOTE = {
    "Aguacate Lorena":"Aguacate","Aguacate Trinidad":"Aguacate","Anon":"Anonaceas","Guanabano":"Anonaceas",
    "Jaboticaba":"Otros frutales","Mango Haden":"Mango","Mango Tommy":"Mango","Limon Tahiti":"Citricos",
    "Naranja Sanguina":"Citricos","Grosello":"Otros frutales","Guayaba Comun":"Guayaba","Zapote":"Zapote",
    "Naranja Sweety":"Citricos","Naranja Ombligona":"Citricos","Mandarina Arrayana":"Citricos",
    "Guayaba Coronilla":"Guayaba","Guayaba Pera":"Guayaba","Madrono":"Otros frutales",
    "Pitanga":"Otros frutales","Guayaba Peruana":"Guayaba","Nispero":"Otros frutales","Naranja Salerma":"Citricos",
    "Mandarina Oneco":"Citricos","Limon Nativo":"Citricos","Tangelo Orlando":"Citricos","Kumquat Marumi":"Citricos",
    "Limón Tahiti":"Citricos","Limón Nativo":"Citricos","Limón Tahití":"Citricos","Tangelo Minneola":"Citricos",
    "Naranja Valencia":"Citricos","Carambola":"Otros frutales","Grosella":"Otros frutales","Kumquat":"Otros frutales",
    "Mamey":"Otros frutales",
}

ZAPOTE_TREES = []
for i, (s, (x, y)) in enumerate(zip(ZAPOTE_SPECIES, ZAPOTE_COORDS), 1):
    group = SPECIES_GROUP_ZAPOTE.get(s, "Otros frutales")
    ZAPOTE_TREES.append({"id": i, "code": f"ZAP-{i:03d}", "species": s, "group": group, "x": x, "y": y})


GUADALITO_TREES = [
    {"id":1,"species":"Naranja Valencia","group":"Citricos","x":446.47,"y":513.14},
    {"id":2,"species":"Naranja Valencia","group":"Citricos","x":341.44,"y":497.15},
    {"id":3,"species":"Naranja Valencia","group":"Citricos","x":233.12,"y":498.41},
    {"id":4,"species":"Naranja Valencia","group":"Citricos","x":144.93,"y":481.52},
    {"id":5,"species":"Naranja Valencia","group":"Citricos","x":43.66,"y":472.35},
    {"id":6,"species":"Naranja Valencia","group":"Citricos","x":335.19,"y":388.56},
    {"id":7,"species":"Naranja Valencia","group":"Citricos","x":416.95,"y":352.11},
    {"id":8,"species":"Naranja Valencia","group":"Citricos","x":275.67,"y":380.02},
    {"id":9,"species":"Naranja Valencia","group":"Citricos","x":157.39,"y":378.79},
    {"id":10,"species":"Naranja Valencia","group":"Citricos","x":44.49,"y":369.51},
    {"id":11,"species":"Naranja Valencia","group":"Citricos","x":356.87,"y":283.62},
    {"id":12,"species":"Naranja Valencia","group":"Citricos","x":239.82,"y":275.61},
    {"id":13,"species":"Naranja Valencia","group":"Citricos","x":141.84,"y":265.06},
    {"id":14,"species":"Naranja Valencia","group":"Citricos","x":42.83,"y":257.45},
    {"id":15,"species":"Naranja Valencia","group":"Citricos","x":292.97,"y":197.42},
    {"id":16,"species":"Naranja Valencia","group":"Citricos","x":199.66,"y":189.34},
    {"id":17,"species":"Naranja Valencia","group":"Citricos","x":127.36,"y":186.93},
    {"id":18,"species":"Naranja Valencia","group":"Citricos","x":46.16,"y":165.69},
    {"id":19,"species":"Naranja Valencia","group":"Citricos","x":242.7,"y":103.84},
    {"id":20,"species":"Naranja Valencia","group":"Citricos","x":148.46,"y":78.91},
    {"id":21,"species":"Naranja Valencia","group":"Citricos","x":48.82,"y":76.25},
    {"id":22,"species":"Naranja Valencia","group":"Citricos","x":408.6,"y":445.3},
    {"id":23,"species":"Naranja Valencia","group":"Citricos","x":474.28,"y":408.25},
    {"id":24,"species":"Naranja Valencia","group":"Citricos","x":465.24,"y":293.34},
    {"id":25,"species":"Naranja Valencia","group":"Citricos","x":476.53,"y":196.36},
    {"id":26,"species":"Naranja Valencia","group":"Citricos","x":466.60,"y":93.33},
    {"id":27,"species":"Naranja Valencia","group":"Citricos","x":345.99,"y":115.89},
    {"id":28,"species":"Naranja Valencia","group":"Citricos","x":363.54,"y":87.24},
    {"id":29,"species":"Naranja Valencia","group":"Citricos","x":106.36,"y":396.3},
    {"id":30,"species":"Naranja Valencia","group":"Citricos","x":50.37,"y":105.92},
    {"id":31,"species":"Limón Nativo","group":"Citricos","x":486.67,"y":470.83},
    {"id":32,"species":"Limón Tahití","group":"Citricos","x":422.2,"y":167.59},
    {"id":33,"species":"Limón Tahití","group":"Citricos","x":409.39,"y":96.71},
    {"id":34,"species":"Mandarina Arrayana","group":"Citricos","x":255.69,"y":466.39},
    {"id":35,"species":"Mandarina Arrayana","group":"Citricos","x":377.59,"y":462.46},
    {"id":36,"species":"Mandarina Oneco","group":"Citricos","x":254.48,"y":166.3},
    {"id":37,"species":"Tangelo Minneola","group":"Citricos","x":87.12,"y":492.16},
    {"id":38,"species":"Aguacate Lorena","group":"Aguacates","x":406.23,"y":551.07},
    {"id":39,"species":"Aguacate Lorena","group":"Aguacates","x":303.16,"y":562.07},
    {"id":40,"species":"Aguacate Lorena","group":"Aguacates","x":191.49,"y":558.93},
    {"id":41,"species":"Aguacate Lorena","group":"Aguacates","x":86.25,"y":560.33},
    {"id":42,"species":"Aguacate Lorena","group":"Aguacates","x":302.74,"y":638.35},
    {"id":43,"species":"Aguacate Lorena","group":"Aguacates","x":201.81,"y":648.0},
    {"id":44,"species":"Aguacate Lorena","group":"Aguacates","x":107.38,"y":659.33},
    {"id":45,"species":"Aguacate Lorena","group":"Aguacates","x":399.95,"y":646.58},
    {"id":46,"species":"Aguacate Lorena","group":"Aguacates","x":93.98,"y":756.17},
    {"id":47,"species":"Aguacate Lorena","group":"Aguacates","x":198.45,"y":753.65},
    {"id":48,"species":"Aguacate Lorena","group":"Aguacates","x":396.67,"y":742.78},
    {"id":49,"species":"Mango Tommy","group":"Mangos","x":398.78,"y":751.57},
    {"id":50,"species":"Mango Tommy","group":"Mangos","x":212.84,"y":746.35},
    {"id":51,"species":"Mango Tommy","group":"Mangos","x":98.77,"y":744.34},
    {"id":52,"species":"Guayaba Comun","group":"Guayabas","x":291.75,"y":554.34},
    {"id":53,"species":"Guayaba Peruana","group":"Guayabas","x":181.72,"y":243.31},
    {"id":54,"species":"Guayaba Peruana","group":"Guayabas","x":38.88,"y":566.88},
    {"id":55,"species":"Guayaba Peruana","group":"Guayabas","x":459.2,"y":563.46},
    {"id":56,"species":"Guayaba Peruana","group":"Guayabas","x":88.52,"y":659.17},
    {"id":57,"species":"Guayaba Coronilla","group":"Guayabas","x":424.37,"y":266.97},
    {"id":58,"species":"Guanabano","group":"Otros frutales","x":304.88,"y":464.98},
    {"id":59,"species":"Anon","group":"Otros frutales","x":457.38,"y":638.16},
    {"id":60,"species":"Zapote","group":"Otros frutales","x":289.93,"y":737.29},
    {"id":61,"species":"Madrono","group":"Otros frutales","x":470.42,"y":358.73},
    {"id":62,"species":"Pitanga","group":"Otros frutales","x":136.67,"y":89.12},
    {"id":63,"species":"Nispero","group":"Otros frutales","x":177.03,"y":143.17},
    {"id":64,"species":"Carambola","group":"Otros frutales","x":459.07,"y":163.78},
    {"id":65,"species":"Grosella","group":"Otros frutales","x":93.31,"y":136.49},
    {"id":66,"species":"Jaboticaba","group":"Otros frutales","x":64.07,"y":647.74},
    {"id":67,"species":"Kumquat","group":"Otros frutales","x":96.28,"y":289.98},
]

# Fix last entry
GUADALITO_TREES[-1]["y"] = 289.98

GUAGUYA_SPECIES = [
    "Aguacate Lorena","Aguacate Trinidad","Aguacate Lorena","Aguacate Lorena","Aguacate Lorena",
    "Naranja Valencia","Mandarina Arrayana","Naranja Valencia","Naranja Valencia","Limon Nativo",
    "Mandarina Oneco","Tangelo Orlando","Naranja Sweety","Naranja Sanguina","Naranja Ombligona",
    "Mango Tommy","Mango Tommy","Mango Tommy","Mango Haden","Mango Tommy","Mango Tommy","Mango Haden",
    "Mango Tommy","Mango Tommy","Mango Tommy","Mango Tommy","Guayaba Comun","Guayaba Peruana",
    "Guayaba Coronilla","Guayaba Pera","Guayaba Comun","Guayaba Peruana","Guayaba Comun",
    "Anon","Guanabano","Madrono","Nispero","Pitanga","Grosella","Carambola","Jaboticaba","Kumquat",
    "Zapote","Zapote","Mamey","Aguacate Lorena","Mango Haden","Naranja Sweety","Limon Tahiti",
    "Mandarina Arrayana","Guayaba Peruana","Anon","Zapote","Grosella",
]
GUAGUYA_GROUPS = [
    "Aguacates","Aguacates","Aguacates","Aguacates","Aguacates",
    "Citricos","Citricos","Citricos","Citricos","Citricos",
    "Citricos","Citricos","Citricos","Citricos","Citricos",
    "Mangos","Mangos","Mangos","Mangos","Mangos","Mangos","Mangos",
    "Mangos","Mangos","Mangos","Mangos","Guayabas","Guayabas",
    "Guayabas","Guayabas","Guayabas","Guayabas","Guayabas",
    "Anonaceas","Anonaceas","Otros frutales","Otros frutales","Otros frutales","Otros frutales",
    "Otros frutales","Otros frutales","Otros frutales","Otros frutales","Zapote","Zapote",
    "Aguacates","Mangos","Citricos","Citricos","Citricos","Guayabas","Anonaceas","Zapote","Otros frutales",
]
GUAGUYA_COORDS = [
    105,88,210,88,315,88,415,88,515,88,610,88,705,88,812,88,762,44,705,190,610,190,515,190,415,190,
    210,190,105,190,105,300,210,300,515,300,610,300,705,300,812,300,915,300,915,390,812,390,705,390,
    658,350,610,390,515,390,210,390,105,390,210,485,315,485,415,485,515,485,610,485,705,485,812,485,
    915,485,1010,485,915,575,812,575,705,575,610,575,315,575,210,575,105,575,105,670,210,670,315,670,
    610,670,705,670,415,760,315,760,105,760,
]

GUAGUYA_TREES = []
for i in range(len(GUAGUYA_SPECIES)):
    GUAGUYA_TREES.append({
        "id": i + 1,
        "species": GUAGUYA_SPECIES[i],
        "group": GUAGUYA_GROUPS[i],
        "x": GUAGUYA_COORDS[i * 2],
        "y": GUAGUYA_COORDS[i * 2 + 1],
    })


def compute_health(score):
    if score >= 80: return "Óptima", "good"
    if score >= 60: return "Buena", "good"
    if score >= 40: return "Regular", "warning"
    return "Crítica", "critical"

HEALTH_BASE = {
    "Aguacate": (85, "Aguacates"), "Mango": (82, "Mangos"),
    "Citricos": (73, "Citricos"), "Mango": (82, "Mangos"),
    "Guayaba": (78, "Guayabas"), "Anonaceas": (90, "Anonaceas"),
    "Anon": (90, "Anonaceas"), "Guanabano": (90, "Anonaceas"),
    "Zapote": (88, "Zapote"), "Otros frutales": (70, "Otros frutales"),
    "Aguacates": (85, "Aguacates"), "Mangos": (82, "Mangos"),
    "Guayabas": (78, "Guayabas"),
}

def get_health(tree):
    group_key = tree["group"]
    base = HEALTH_BASE.get(group_key, (75, group_key))[0]
    variation = ((tree["id"] * 7 + len(tree["species"]) * 3) % 15) - 7
    score = max(35, min(100, base + variation))
    label, status = compute_health(score)
    return {"score": score, "label": label, "status": status}

def analyze(predio_name, trees):
    df = pd.DataFrame(trees)
    species_list = sorted(df["species"].unique())
    groups_list = sorted(df["group"].unique())

    health_data = [get_health(t) for t in trees]
    df_health = pd.DataFrame(health_data)

    scores = df_health["score"].values
    avg_health = int(np.round(np.mean(scores)))
    opt_count = int(np.sum(df_health["label"] == "Óptima") + np.sum(df_health["status"] == "good"))
    warn_count = int(np.sum(df_health["label"] == "Regular") + np.sum(df_health["status"] == "warning"))
    crit_count = int(np.sum(df_health["label"] == "Crítica") + np.sum(df_health["status"] == "critical"))

    group_counts = df["group"].value_counts()

    species_counts = df["species"].value_counts()
    top_species = species_counts.head(5).to_dict()

    stats = {
        "predio": predio_name,
        "total_trees": len(trees),
        "species_count": len(species_list),
        "species_list": species_list,
        "group_count": len(groups_list),
        "groups": groups_list,
        "avg_health": avg_health,
        "health_distribution": {
            "optimas": int(df_health[df_health["label"] == "Óptima"].shape[0]),
            "buenas": int(df_health[df_health["label"] == "Buena"].shape[0]),
            "regulares": int(df_health[df_health["label"] == "Regular"].shape[0]),
            "criticas": int(df_health[df_health["label"] == "Crítica"].shape[0]),
        },
        "health_stats": {
            "min": int(np.min(scores)),
            "max": int(np.max(scores)),
            "mean": avg_health,
            "median": int(np.median(scores)),
            "std": round(float(np.std(scores)), 2),
        },
        "group_breakdown": [
            {"group": g, "count": int(group_counts[g]), "pct": round(float(group_counts[g] / len(trees) * 100), 1)}
            for g in groups_list
        ],
        "top_species": {k: int(v) for k, v in top_species.items()},
    }
    return stats, df, df_health

def save_charts(predio_key, predio_name, df, df_health, stats, output_dir):
    group_counts = df["group"].value_counts().sort_index()

    # ── Bar chart: distribution by group ──
    fig, ax = plt.subplots(figsize=(8, 4))
    colors_bar = ["#66BB6A", "#26a69a", "#c8a35c", "#fb8c00", "#EF5350", "#7b809a", "#4CAF50"]
    bars = ax.bar(group_counts.index, group_counts.values, color=colors_bar[:len(group_counts)], edgecolor="white", linewidth=0.5)
    for bar, val in zip(bars, group_counts.values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3, str(val), ha="center", fontsize=10, fontweight="bold", color="#e8ede4")
    ax.set_title(f"Distribución por grupo · {predio_name}", fontsize=14, fontweight="bold", color="#e8ede4", pad=15)
    ax.set_facecolor("#1a2e1f")
    fig.patch.set_facecolor("#101d13")
    ax.tick_params(colors="#b8c4b0")
    ax.spines["bottom"].set_color("#2e4832")
    ax.spines["left"].set_color("#2e4832")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.set_xlabel("")
    plt.xticks(rotation=30, ha="right")
    plt.tight_layout()
    fig.savefig(os.path.join(output_dir, f"{predio_key}_bars.png"), dpi=150, bbox_inches="tight", facecolor="#101d13")
    plt.close(fig)

    # ── Pie chart: composition ──
    fig, ax = plt.subplots(figsize=(5, 5))
    colors_pie = ["#c8a35c", "#26a69a", "#66BB6A", "#fb8c00", "#EF5350", "#7b809a", "#4CAF50", "#e8ede4"]
    wedges, texts, autotexts = ax.pie(
        group_counts.values, labels=group_counts.index, autopct="%1.1f%%",
        colors=colors_pie[:len(group_counts)], startangle=90,
        textprops={"color": "#e8ede4", "fontsize": 9, "fontweight": "bold"},
    )
    for at in autotexts:
        at.set_color("#101d13")
    ax.set_title(f"Composición · {predio_name}", fontsize=14, fontweight="bold", color="#e8ede4", pad=15)
    fig.patch.set_facecolor("#101d13")
    plt.tight_layout()
    fig.savefig(os.path.join(output_dir, f"{predio_key}_pie.png"), dpi=150, bbox_inches="tight", facecolor="#101d13")
    plt.close(fig)

    # ── Health distribution bar chart ──
    fig, ax = plt.subplots(figsize=(6, 3))
    health_labels = ["Óptimas", "Buenas", "Regulares", "Críticas"]
    health_values = [stats["health_distribution"][k] for k in ["optimas", "buenas", "regulares", "criticas"]]
    health_colors = ["#4CAF50", "#66BB6A", "#fb8c00", "#F44335"]
    bars = ax.bar(health_labels, health_values, color=health_colors, edgecolor="white", linewidth=0.5)
    for bar, val in zip(bars, health_values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2, str(val), ha="center", fontsize=10, fontweight="bold", color="#e8ede4")
    ax.set_title(f"Salud del predio · {predio_name}", fontsize=14, fontweight="bold", color="#e8ede4", pad=15)
    ax.set_facecolor("#1a2e1f")
    fig.patch.set_facecolor("#101d13")
    ax.tick_params(colors="#b8c4b0")
    ax.spines["bottom"].set_color("#2e4832")
    ax.spines["left"].set_color("#2e4832")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    plt.tight_layout()
    fig.savefig(os.path.join(output_dir, f"{predio_key}_health.png"), dpi=150, bbox_inches="tight", facecolor="#101d13")
    plt.close(fig)

    # ── Health score histogram ──
    fig, ax = plt.subplots(figsize=(6, 3))
    scores = df_health["score"].values
    n_bins = min(10, len(set(scores)))
    ax.hist(scores, bins=n_bins, color="#26a69a", edgecolor="white", linewidth=0.5, alpha=0.8)
    ax.axvline(np.mean(scores), color="#c8a35c", linestyle="--", linewidth=2, label=f"Media: {stats['health_stats']['mean']}%")
    ax.axvline(np.median(scores), color="#fb8c00", linestyle=":", linewidth=2, label=f"Mediana: {stats['health_stats']['median']}%")
    ax.set_title(f"Distribución de salud · {predio_name}", fontsize=14, fontweight="bold", color="#e8ede4", pad=15)
    ax.set_facecolor("#1a2e1f")
    fig.patch.set_facecolor("#101d13")
    ax.tick_params(colors="#b8c4b0")
    ax.spines["bottom"].set_color("#2e4832")
    ax.spines["left"].set_color("#2e4832")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(facecolor="#1a2e1f", edgecolor="#2e4832", labelcolor="#b8c4b0")
    plt.tight_layout()
    fig.savefig(os.path.join(output_dir, f"{predio_key}_histogram.png"), dpi=150, bbox_inches="tight", facecolor="#101d13")
    plt.close(fig)

def main():
    base_dir = Path(__file__).resolve().parent.parent
    output_dir = base_dir / "public" / "charts"
    output_dir.mkdir(parents=True, exist_ok=True)
    data_dir = base_dir / "public" / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    predios = [
        ("zapote", "El Zapote", ZAPOTE_TREES),
        ("guadalito", "Guadalito", GUADALITO_TREES),
        ("guaguya", "Guaguya", GUAGUYA_TREES),
    ]

    for key, name, trees in predios:
        print(f"Generating stats for {name} ({len(trees)} trees)...")
        stats, df, df_health = analyze(name, trees)
        save_charts(key, name, df, df_health, stats, str(output_dir))

        # Save stats JSON
        with open(data_dir / f"stats_{key}.json", "w", encoding="utf-8") as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)

        print(f"  -> {len(trees)} trees, {stats['group_count']} groups, {stats['species_count']} species")
        print(f"  -> Avg health: {stats['avg_health']}%")
        print(f"  -> Charts saved to public/charts/{key}_*.png")
        print(f"  -> Stats saved to public/data/stats_{key}.json")

    print("\nDone! All stats and charts generated.")

if __name__ == "__main__":
    main()
