from django.core.management.base import BaseCommand
from predios.models import Predio, Grupo, Especie, Arbol, RegistroSalud


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
    "Aguacate Lorena": "Aguacates", "Aguacate Trinidad": "Aguacates", "Anon": "Anonaceas",
    "Guanabano": "Anonaceas", "Jaboticaba": "Otros frutales", "Mango Haden": "Mangos",
    "Mango Tommy": "Mangos", "Limon Tahiti": "Citricos", "Naranja Sanguina": "Citricos",
    "Grosello": "Otros frutales", "Guayaba Comun": "Guayabas", "Zapote": "Zapote",
    "Naranja Sweety": "Citricos", "Naranja Ombligona": "Citricos", "Mandarina Arrayana": "Citricos",
    "Guayaba Coronilla": "Guayabas", "Guayaba Pera": "Guayabas", "Madrono": "Otros frutales",
    "Pitanga": "Otros frutales", "Guayaba Peruana": "Guayabas", "Nispero": "Otros frutales",
    "Naranja Salerma": "Citricos", "Mandarina Oneco": "Citricos", "Limon Nativo": "Citricos",
    "Tangelo Orlando": "Citricos", "Kumquat Marumi": "Citricos", "Limón Tahiti": "Citricos",
    "Limón Nativo": "Citricos", "Limón Tahití": "Citricos", "Tangelo Minneola": "Citricos",
    "Naranja Valencia": "Citricos", "Carambola": "Otros frutales", "Grosella": "Otros frutales",
    "Kumquat": "Otros frutales", "Mamey": "Otros frutales",
}

GUADALITO_DATA = [
    (1,"Naranja Valencia","Citricos",446.47,513.14),
    (2,"Naranja Valencia","Citricos",341.44,497.15),
    (3,"Naranja Valencia","Citricos",233.12,498.41),
    (4,"Naranja Valencia","Citricos",144.93,481.52),
    (5,"Naranja Valencia","Citricos",43.66,472.35),
    (6,"Naranja Valencia","Citricos",335.19,388.56),
    (7,"Naranja Valencia","Citricos",416.95,352.11),
    (8,"Naranja Valencia","Citricos",275.67,380.02),
    (9,"Naranja Valencia","Citricos",157.39,378.79),
    (10,"Naranja Valencia","Citricos",44.49,369.51),
    (11,"Naranja Valencia","Citricos",356.87,283.62),
    (12,"Naranja Valencia","Citricos",239.82,275.61),
    (13,"Naranja Valencia","Citricos",141.84,265.06),
    (14,"Naranja Valencia","Citricos",42.83,257.45),
    (15,"Naranja Valencia","Citricos",292.97,197.42),
    (16,"Naranja Valencia","Citricos",199.66,189.34),
    (17,"Naranja Valencia","Citricos",127.36,186.93),
    (18,"Naranja Valencia","Citricos",46.16,165.69),
    (19,"Naranja Valencia","Citricos",242.7,103.84),
    (20,"Naranja Valencia","Citricos",148.46,78.91),
    (21,"Naranja Valencia","Citricos",48.82,76.25),
    (22,"Naranja Valencia","Citricos",408.6,445.3),
    (23,"Naranja Valencia","Citricos",474.28,408.25),
    (24,"Naranja Valencia","Citricos",465.24,293.34),
    (25,"Naranja Valencia","Citricos",476.53,196.36),
    (26,"Naranja Valencia","Citricos",466.60,93.33),
    (27,"Naranja Valencia","Citricos",345.99,115.89),
    (28,"Naranja Valencia","Citricos",363.54,87.24),
    (29,"Naranja Valencia","Citricos",106.36,396.3),
    (30,"Naranja Valencia","Citricos",50.37,105.92),
    (31,"Limón Nativo","Citricos",486.67,470.83),
    (32,"Limón Tahití","Citricos",422.2,167.59),
    (33,"Limón Tahití","Citricos",409.39,96.71),
    (34,"Mandarina Arrayana","Citricos",255.69,466.39),
    (35,"Mandarina Arrayana","Citricos",377.59,462.46),
    (36,"Mandarina Oneco","Citricos",254.48,166.3),
    (37,"Tangelo Minneola","Citricos",87.12,492.16),
    (38,"Aguacate Lorena","Aguacates",406.23,551.07),
    (39,"Aguacate Lorena","Aguacates",303.16,562.07),
    (40,"Aguacate Lorena","Aguacates",191.49,558.93),
    (41,"Aguacate Lorena","Aguacates",86.25,560.33),
    (42,"Aguacate Lorena","Aguacates",302.74,638.35),
    (43,"Aguacate Lorena","Aguacates",201.81,648.0),
    (44,"Aguacate Lorena","Aguacates",107.38,659.33),
    (45,"Aguacate Lorena","Aguacates",399.95,646.58),
    (46,"Aguacate Lorena","Aguacates",93.98,756.17),
    (47,"Aguacate Lorena","Aguacates",198.45,753.65),
    (48,"Aguacate Lorena","Aguacates",396.67,742.78),
    (49,"Mango Tommy","Mangos",398.78,751.57),
    (50,"Mango Tommy","Mangos",212.84,746.35),
    (51,"Mango Tommy","Mangos",98.77,744.34),
    (52,"Guayaba Comun","Guayabas",291.75,554.34),
    (53,"Guayaba Peruana","Guayabas",181.72,243.31),
    (54,"Guayaba Peruana","Guayabas",38.88,566.88),
    (55,"Guayaba Peruana","Guayabas",459.2,563.46),
    (56,"Guayaba Peruana","Guayabas",88.52,659.17),
    (57,"Guayaba Coronilla","Guayabas",424.37,266.97),
    (58,"Guanabano","Otros frutales",304.88,464.98),
    (59,"Anon","Otros frutales",457.38,638.16),
    (60,"Zapote","Otros frutales",289.93,737.29),
    (61,"Madrono","Otros frutales",470.42,358.73),
    (62,"Pitanga","Otros frutales",136.67,89.12),
    (63,"Nispero","Otros frutales",177.03,143.17),
    (64,"Carambola","Otros frutales",459.07,163.78),
    (65,"Grosella","Otros frutales",93.31,136.49),
    (66,"Jaboticaba","Otros frutales",64.07,647.74),
    (67,"Kumquat","Otros frutales",96.28,289.98),
]

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

HEALTH_BASE = {
    "Aguacates": 85, "Mangos": 82, "Citricos": 73, "Guayabas": 78,
    "Anonaceas": 90, "Zapote": 88, "Otros frutales": 70,
}


def compute_health_status(score):
    if score >= 80: return "optima"
    if score >= 60: return "buena"
    if score >= 40: return "regular"
    return "critica"


def get_health_score(tree_id, species_name, group_name):
    base = HEALTH_BASE.get(group_name, 75)
    variation = ((tree_id * 7 + len(species_name) * 3) % 15) - 7
    return max(35, min(100, base + variation))


class Command(BaseCommand):
    help = "Seed the database with predios, especies, and arboles from current data files"

    def handle(self, *args, **options):
        self.stdout.write("Seeding database...")

        # ── Predios ──
        zapote, _ = Predio.objects.get_or_create(key="zapote", defaults={"nombre": "El Zapote"})
        guadalito, _ = Predio.objects.get_or_create(key="guadalito", defaults={"nombre": "Guadalito"})
        guaguya, _ = Predio.objects.get_or_create(key="guaguya", defaults={"nombre": "Guaguya"})

        # ── Grupos ──
        grupo_colors = {
            "Aguacates": "#4CAF50", "Mangos": "#c8a35c", "Citricos": "#fb8c00",
            "Guayabas": "#66BB6A", "Anonaceas": "#9bbf54", "Zapote": "#8BC34A",
            "Otros frutales": "#7b809a",
        }
        grupos = {}
        for name in grupo_colors:
            g, _ = Grupo.objects.get_or_create(nombre=name, defaults={"color": grupo_colors[name]})
            grupos[name] = g

        # ── Especies (build unique set from all predios) ──
        all_species_map = {}
        for s in ZAPOTE_SPECIES:
            group_name = SPECIES_GROUP_ZAPOTE.get(s, "Otros frutales")
            all_species_map[s] = group_name
        for _, s, g, _, _ in GUADALITO_DATA:
            all_species_map[s] = g
        for i, s in enumerate(GUAGUYA_SPECIES):
            all_species_map[s] = GUAGUYA_GROUPS[i]

        especies = {}
        for s, g in all_species_map.items():
            grupo = grupos.get(g, grupos["Otros frutales"])
            e, _ = Especie.objects.get_or_create(nombre=s, defaults={"grupo": grupo})
            especies[s] = e

        # ── Árboles: Zapote ──
        Arbol.objects.filter(predio=zapote).delete()
        for i, (s, (x, y)) in enumerate(zip(ZAPOTE_SPECIES, ZAPOTE_COORDS), 1):
            Arbol.objects.create(
                predio=zapote,
                codigo=f"ZAP-{i:03d}",
                especie=especies[s],
                x=x, y=y,
            )

        # ── Árboles: Guadalito ──
        Arbol.objects.filter(predio=guadalito).delete()
        for tid, s, g, x, y in GUADALITO_DATA:
            Arbol.objects.create(
                predio=guadalito,
                codigo=f"GDL-{tid:03d}",
                especie=especies[s],
                x=x, y=y,
            )

        # ── Árboles: Guaguya ──
        Arbol.objects.filter(predio=guaguya).delete()
        for i in range(len(GUAGUYA_SPECIES)):
            Arbol.objects.create(
                predio=guaguya,
                codigo=f"GGY-{i+1:03d}",
                especie=especies[GUAGUYA_SPECIES[i]],
                x=GUAGUYA_COORDS[i * 2],
                y=GUAGUYA_COORDS[i * 2 + 1],
            )

        # ── Registros de salud ──
        RegistroSalud.objects.all().delete()
        for predio in [zapote, guadalito, guaguya]:
            for arbol in predio.arboles.all():
                score = get_health_score(arbol.id, arbol.especie.nombre, arbol.especie.grupo.nombre)
                status = compute_health_status(score)
                RegistroSalud.objects.create(
                    arbol=arbol,
                    score=score,
                    estado=status,
                )

        counts = {
            "predios": Predio.objects.count(),
            "grupos": Grupo.objects.count(),
            "especies": Especie.objects.count(),
            "arboles": Arbol.objects.count(),
            "salud": RegistroSalud.objects.count(),
        }
        self.stdout.write(self.style.SUCCESS(f"Done! {counts}"))
