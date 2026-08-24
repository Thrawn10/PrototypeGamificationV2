# Bauspezifikation: Prototyp «Lernpfad»

Gamifizierte Ausbildungsbegleitung für das Bundesamt für Informatik und Telekommunikation (BIT).

Dieses Dokument ist so geschrieben, dass ein Sprachmodell ohne Zugriff auf eine bestehende
Implementierung den Prototyp vollständig bauen kann. Es enthält Datengrundlage, Zustandsmodell,
Layout-Koordinaten, Interaktionsregeln, Designtokens und alle UI-Texte im Wortlaut.

**Sprache der Oberfläche: Deutsch (Schweizer Hochdeutsch).** Kein «ß», immer «ss». Alle in diesem
Dokument in Anführungszeichen gesetzten UI-Texte sind wörtlich zu übernehmen.

---

## 1. Zweck und Kontext

Der Prototyp wird in einem Pitch vor der HR Nachwuchsförderung des BIT gezeigt. Er ist in eine
reveal.js-Präsentation eingebettet und dient als visuelles Anschauungsbeispiel für eine mögliche
Applikation. Er ist **kein Produktentwurf und keine lauffähige Software**.

Was der Prototyp beim Publikum auslösen soll, in dieser Reihenfolge:

1. «So könnte der Bildungsplan aussehen, wenn er nicht in Excel läge.»
2. «Ein Kompetenzabschluss erzwingt eine Rückmeldung — das löst unser Qualitätsproblem.»
3. «Die spielerischen Elemente lassen sich abschalten, ohne dass die Applikation nutzlos wird.»
4. «Die Nachwuchsförderung sieht endlich den Gesamtstand.»

Punkt 2 ist der wichtigste. Der Prototyp muss diesen Ablauf in unter 60 Sekunden live vorführbar
machen (siehe Abschnitt 8, «Der Durchstich»).

### Gestalterische Grundhaltung

Der Skilltree soll **wie ein Skilltree aus einem Computerspiel aussehen** — dunkel, leuchtende
Knoten, Verbindungslinien, gesperrte Bereiche, Freischalt-Momente. Das ist kein Zufall und keine
Spielerei: Der Pitch handelt von Gamification, und der Prototyp muss zeigen, was damit konkret
gemeint ist. Eine nüchterne Verwaltungsoberfläche würde das Thema verfehlen.

Gleichzeitig muss der Inhalt echt sein. Die Knoten tragen die tatsächlichen Handlungskompetenzen
aus dem offiziellen Bildungsplan, nicht erfundene Beispieldaten. Genau dieser Kontrast — Spieloptik,
amtlicher Inhalt — ist die Aussage.

---

## 2. Technische Rahmenbedingungen

| Vorgabe | Wert |
|---|---|
| Format | **Eine einzelne `.html`-Datei**, keine Build-Schritte, keine Imports |
| Einbettung | `<iframe>` in einer reveal.js-Slide, Zielbreite ca. 1280 × 720 px |
| Abhängigkeiten | Nur Google Fonts über CDN. Kein React, kein Framework, keine Icon-Library |
| Persistenz | **Keine.** Kein `localStorage`, kein Backend. Zustand nur im Speicher, Reload setzt zurück |
| Grafik | Skilltree als **Inline-SVG**, per JavaScript aus Daten erzeugt (nicht handgeschrieben) |
| Icons | Unicode-Emoji, keine externen Assets |
| Barrierefreiheit | Sichtbarer Tastaturfokus, Knoten mit `tabindex` und Enter/Space bedienbar, `prefers-reduced-motion` respektiert |
| Responsivität | Muss ab 1000 px Breite gut aussehen. Darunter darf das Detailpanel überlagern statt danebenstehen |

---

## 3. Datengrundlage: der Bildungsplan

Quelle: `Vorlage_Bildungsplan_APP_2021.xlsx` — Bildungsplan Informatiker/-in EFZ, Fachrichtung
Applikationsentwicklung (2021).

Struktur der Datei: Ein Blatt `Start` mit der Übersicht, ein Blatt `Erklärung` mit den
Taxonomiestufen, und **25 Blätter** (`A1`–`A7`, `B1`–`B4`, `C1`–`C4`, `G1`–`G6`, `H1`–`H4`), je eine
Handlungskompetenz. Jedes Blatt enthält den Titel der Handlungskompetenz, einen Beschreibungstext
und eine Tabelle der Leistungsziele mit Taxonomiestufe.

### 3.1 Extraktionsskript

Dieses Skript aus der Originaldatei ausführen und das Ergebnis als JavaScript-Konstante in die
HTML-Datei einbetten. Es liefert 25 Handlungskompetenzen mit insgesamt **144 Leistungszielen**.

```python
import json, re
from openpyxl import load_workbook

wb = load_workbook("Vorlage_Bildungsplan_APP_2021.xlsx", read_only=True, data_only=True)
TAXSET = {"Wissen","Verstehen","Anwenden","Analyse","Synthese","Beurteilen"}
TAX = {"Wissen":"K1","Verstehen":"K2","Anwenden":"K3",
       "Analyse":"K4","Synthese":"K5","Beurteilen":"K6"}

def clean(s):
    s = s.replace("_x0002_", "")      # Trennzeichen-Artefakt der Quelle
    s = re.sub(r"\s+", " ", s).strip()
    return s.replace(" ,", ",")

out = {}
for name in wb.sheetnames:
    if name in ("Start", "Erklärung"):
        continue
    letter = name[0].lower()
    rows = [[("" if c is None else str(c).strip()) for c in r]
            for r in wb[name].iter_rows(values_only=True)]
    hk_title, lz = "", []
    for r in rows:
        joined = [x for x in r if x]
        if not joined:
            continue
        first = joined[0]
        if not hk_title and re.match(r"^[a-hA-H]\d+:", first):
            hk_title = first
        m = re.match(r"^([a-hA-H]?\d+\.\d+):\s*(.*)$", first)
        if m:
            code = m.group(1)
            if not re.match(r"^[a-h]", code):     # repariert "6.3" -> "a6.3"
                code = letter + code
            tax = next((c for c in r if c in TAXSET), "")
            lz.append({"c": code.lower(), "t": clean(m.group(2)), "k": TAX.get(tax, "")})
    m = re.match(r"^[a-h]\d+:\s*(.*)$", clean(hk_title))
    n = clean(m.group(1)) if m else clean(hk_title)
    out[name.lower()] = {"n": n[:1].upper() + n[1:], "lz": lz}

open("hk-data.js", "w", encoding="utf-8").write(
    "const HK = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
```

**Fallstricke, die dieses Skript bereits löst — nicht «vereinfachen»:**

- `_x0002_` ist ein Trennzeichen-Artefakt aus der Quelle (`Anforderun_x0002_gen` → `Anforderungen`).
  Es muss ersatzlos entfernt werden.
- Auf keinen Fall Bindestriche zusammenziehen. `System- und Kontextabgrenzung` ist korrekt und darf
  nicht zu `Systemund` werden. Eine Regel wie `s.replace("- ", "")` zerstört den Text.
- Ein Leistungsziel in Blatt `A6` ist in der Quelle als `6.3` statt `a6.3` erfasst. Der Präfix wird
  aus dem Blattnamen ergänzt.
- Die Taxonomiestufe steht nicht immer in derselben Spalte. Die ganze Zeile durchsuchen.

Erwartete Ausgabestruktur:

```js
const HK = {
  "a1": {
    "n": "Bedürfnisse von Stakeholdern im Rahmen eines ICT-Projekts abklären und dokumentieren",
    "lz": [
      {"c":"a1.1","t":"Sie klären Projektziele und übergeordnete Parameter wie Kosten, Zeit, …","k":"K3"},
      …
    ]
  },
  …
}
```

### 3.2 Sollwerte zur Kontrolle

Nach der Extraktion müssen exakt diese 25 Einträge mit dieser Anzahl Leistungsziele vorliegen
(Summe 144). Weicht etwas ab, ist die Extraktion fehlerhaft.

| Code | LZ | Titel der Handlungskompetenz |
|---|---|---|
| a1 | 7 | Bedürfnisse von Stakeholdern im Rahmen eines ICT-Projekts abklären und dokumentieren |
| a2 | 3 | Vorgehensmodell für ein ICT-Projekt bestimmen |
| a3 | 5 | Informationen zu ICT-Lösungen und zu Innovationen recherchieren |
| a4 | 5 | ICT-Projekte und daraus entstehende Aufgaben gemäss Vorgehensmodell planen |
| a5 | 5 | Varianten für ICT-Lösungen visualisieren und präsentieren |
| a6 | 4 | Fortschritt von ICT-Projekten und daraus entstehenden Aufgaben gemäss Vorgehensmodell überprüfen und rapportieren |
| a7 | 7 | ICT-Lösungen der Kundin oder dem Kunden übergeben und Projekt abschliessen |
| b1 | 6 | Den eigenen ICT-Arbeitsplatz einrichten |
| b2 | 4 | Komplexe ICT-Supportanfragen entgegennehmen und bearbeiten |
| b3 | 4 | Kundinnen und Kunden in Bezug auf Datenschutz und Datensicherheit beraten |
| b4 | 4 | Geschäftsprozesse von Kundinnen und Kunden analysieren, visualisieren und dokumentieren |
| c1 | 7 | Daten identifizieren, analysieren und Datenmodelle entwickeln |
| c2 | 7 | Datenmodelle in einem digitalen Datenspeicher umsetzen |
| c3 | 8 | Datensicherheit und Datenschutz für ICT-Lösungen planen, implementieren und dokumentieren |
| c4 | 6 | Daten aus digitalen Datenspeichern aufbereiten |
| g1 | 8 | Anforderungen an Applikationen und Schnittstellen analysieren und dokumentieren |
| g2 | 6 | Gestaltungsentwürfe für Benutzerschnittstellen auf technische Machbarkeit überprüfen und weiterentwickeln |
| g3 | 5 | Sicherheit von Applikationen und Schnittstellen beurteilen und dokumentieren |
| g4 | 5 | Umsetzungsvarianten für Applikationen entwerfen und Lösung konzeptionell ausarbeiten |
| g5 | 7 | Applikationen und Schnittstellen gemäss Entwurf implementieren und dabei die Sicherheitsanforderungen erfüllen |
| g6 | 9 | Qualität und Sicherheit von Applikationen und Schnittstellen überprüfen |
| h1 | 6 | Geeignete Plattform für die Auslieferung von Applikationen bestimmen |
| h2 | 3 | Auslieferungsprozess von Applikationen definieren |
| h3 | 7 | Auslieferungsprozess von Applikationen durchführen |
| h4 | 6 | Applikationen und Schnittstellen überwachen und Probleme im laufenden Betrieb beheben |

### 3.3 Handlungskompetenzbereiche

Fünf Bereiche, jeder mit eigener Farbe. Der Buchstabe des Codes bestimmt den Bereich.

| Schlüssel | Name (UI) | Farbe | Dunkle Füllung |
|---|---|---|---|
| `a` | Begleiten von ICT-Projekten | `#E8A33D` Gold | `#2A1F08` |
| `b` | Unterstützen und Beraten | `#37BDD8` Cyan | `#07222A` |
| `c` | Aufbauen und Pflegen von Daten | `#31C489` Grün | `#082418` |
| `g` | Entwickeln von Applikationen | `#9B7BF7` Violett | `#1B1440` |
| `h` | Ausliefern und Betreiben | `#F0703C` Orange | `#2A1408` |

Violett ist die Leitfarbe der Applikation (primäre Schaltflächen, XP-Balken), weil
Applikationsentwicklung die dargestellte Fachrichtung ist.

---

## 4. Informationsarchitektur

### 4.1 Ansichten

Vier Ansichten, umgeschaltet über Tabs unter der Kopfzeile:

| Ansicht | Tab-Beschriftung | Inhalt |
|---|---|---|
| `tree` | «Ausbildungsweg» | Der Skilltree. Startansicht |
| `feedback` | «Rückmeldungen» + Zähler | Liste der Rückmeldungen |
| `badges` | «Auszeichnungen» + Zähler | Badge-Galerie |
| `cockpit` | «Cockpit» | Übersicht der Nachwuchsförderung |

### 4.2 Rollen

Ein Umschalter oben rechts, drei Rollen. Der Rollenwechsel ist ein zentrales Demo-Werkzeug: Er zeigt
dieselbe Kompetenz aus zwei Blickwinkeln.

| Rolle | Beschriftung | Sichtbare Tabs | Rechte im Baum |
|---|---|---|---|
| `lernende` | «Lernende» | Ausbildungsweg, Rückmeldungen, Auszeichnungen | Leistungsziele abhaken, Kompetenz **einreichen** |
| `praxis` | «Praxisbildner» | Ausbildungsweg, Rückmeldungen, Auszeichnungen | Leistungsziele abhaken, Kompetenz **bestätigen** (erzwingt Rückmeldung) |
| `hr` | «Nachwuchsförderung» | Ausbildungsweg, Auszeichnungen, Cockpit | Nur Lesezugriff |

Regeln beim Wechsel: Ist die aktive Ansicht für die neue Rolle nicht verfügbar, auf eine erlaubte
zurückfallen (`hr` → `cockpit`, sonst → `tree`).

### 4.3 Schalter «Spielelemente»

Ein Kippschalter in der Kopfzeile, beschriftet «Spielelemente», standardmässig **ein**. Er setzt eine
Klasse `plain` auf das Wurzelelement. Im Zustand «aus»:

- XP-Anzeige und Stufenanzeige verschwinden
- Tab «Auszeichnungen» verschwindet; ist er aktiv, auf «Ausbildungsweg» wechseln
- Alle farbigen Leuchteffekte am Baum verschwinden; Knoten und Kanten werden neutral graublau
  (`#5C6B94` für erledigt, `#3C4870` für offen)
- Keine XP- und Badge-Meldungen mehr
- In den Ansichten «Rückmeldungen» und «Cockpit» erscheint oben ein Hinweisbanner:
  «**Spielelemente sind ausgeschaltet.** Fortschritt und Rückmeldungen funktionieren unverändert weiter.»

**Der Fortschritt, die Leistungsziele, die Rückmeldungen und das Cockpit bleiben vollständig
funktionsfähig.** Das ist die Kernaussage dieses Schalters und darf nicht verwässert werden: Die
Applikation funktioniert ohne Spielelemente, sie sieht nur nüchterner aus.

---

## 5. Zustandsmodell

### 5.1 Status einer Handlungskompetenz

Fünf Zustände. Jeder Knoten hat genau einen.

| Status | Bedeutung | Darstellung im Baum |
|---|---|---|
| `done` | Abgeschlossen und mit Rückmeldung bestätigt | Gefüllt in Bereichsfarbe, Leuchten, Häkchen |
| `active` | In Arbeit, mindestens ein Leistungsziel erfüllt | Gestrichelter Rand in Bereichsfarbe, pulsierend |
| `pending` | Von Lernenden eingereicht, wartet auf Bestätigung | Gestrichelter Rand in Gold `#E8A33D` |
| `open` | Freigeschaltet, noch nicht begonnen | Umriss in Bereichsfarbe, halbtransparent |
| `locked` | Voraussetzungen nicht erfüllt | Dunkel, Schlosssymbol statt Code, nicht anklickbar |

### 5.2 Freischaltregel

Jede Kompetenz hat eine Liste von Voraussetzungen (`dep`). Eine Kompetenz ist freigeschaltet, wenn
**alle** Voraussetzungen den Status `done` haben. `root` gilt immer als erfüllt.

Nach jeder Statusänderung wird über alle Kompetenzen neu berechnet: Wer nicht `done`, `active` oder
`pending` ist, wird zu `open` oder `locked`. `active` und `pending` werden nie zurückgesetzt.

### 5.3 Leistungsziele

Pro Kompetenz eine Menge erfüllter Leistungsziel-Codes. Abhaken im Detailpanel.

- Das erste abgehakte Leistungsziel schiebt eine Kompetenz von `open` nach `active`.
- Eine Kompetenz kann erst eingereicht bzw. bestätigt werden, wenn **alle** Leistungsziele erfüllt sind.
- Bei `done` sind alle Leistungsziele automatisch erfüllt und nicht mehr veränderbar.
- Rolle `hr` kann nichts abhaken.

### 5.4 Erfahrungspunkte

Rein dekorativ, nur sichtbar wenn Spielelemente eingeschaltet sind.

```
XP = (Anzahl erfüllter Leistungsziele × 10) + (Anzahl abgeschlossener Kompetenzen × 100)
Stufe = floor(XP / 1500) + 1
Stufenanzeige: "Stufe {n} · 2. Lehrjahr"
Balkenfüllung: (XP mod 1500) / 1500
```

### 5.5 Startzustand

Dieser Startzustand ist so gewählt, dass der Durchstich aus Abschnitt 8 genau eine Freischaltung und
genau eine Auszeichnung auslöst. **Nicht verändern**, sonst zerfällt die Demo.

- `done` (8 Stück): `a1`, `a2`, `a3`, `b1`, `b2`, `c1`, `g1`, `g2` — alle Leistungsziele erfüllt
- `active` (1 Stück): `g3` mit den **ersten 2 von 5** Leistungszielen erfüllt
- Bei `a4` und `c2` je das erste Leistungsziel erfüllt (zeigt angefangene Arbeit)
- Alle übrigen ergeben sich aus der Freischaltregel
- Beim Start ist `g3` automatisch ausgewählt und das Detailpanel offen

Ergebnis: 8 von 25 Kompetenzen, 1 240 XP, Stufe 1.

---

## 6. Der Skilltree

### 6.1 Zeichenfläche

SVG mit `viewBox="0 0 1320 840"`, `preserveAspectRatio="xMidYMid meet"`, füllt die verfügbare
Fläche. Eine innere Gruppe `#viewport` trägt die Transformation für Zoom und Verschieben.

Zeichenreihenfolge: erst alle Kanten, dann alle Knoten.

### 6.2 Knotenpositionen und Voraussetzungen

`x`/`y` sind Mittelpunkte im viewBox-Koordinatensystem. `kurz` ist die zweizeilige Beschriftung
unter dem Knoten (`\n` = Zeilenumbruch).

| Code | x | y | Kurzbeschriftung | Voraussetzungen |
|---|---|---|---|---|
| a1 | 320 | 165 | Bedürfnisse\nabklären | root |
| a2 | 470 | 100 | Vorgehens-\nmodell | a1 |
| a3 | 470 | 230 | Innovationen\nrecherchieren | a1 |
| a4 | 620 | 165 | Projekt\nplanen | a2, a3 |
| a5 | 770 | 105 | Varianten\npräsentieren | a4 |
| a6 | 770 | 228 | Fortschritt\nrapportieren | a4 |
| a7 | 920 | 165 | Übergabe &\nAbschluss | a5, a6 |
| b1 | 300 | 312 | Arbeitsplatz\neinrichten | root |
| b2 | 452 | 348 | Support-\nanfragen | b1 |
| b3 | 620 | 308 | Datenschutz\nberaten | b2 |
| b4 | 790 | 342 | Geschäfts-\nprozesse | b3 |
| g1 | 340 | 442 | Anforderungen\nanalysieren | root |
| g3 | 492 | 396 | Sicherheit\nbeurteilen | g1, b3 |
| g2 | 492 | 492 | Benutzer-\nschnittstellen | g1 |
| g4 | 642 | 446 | Umsetzungs-\nvarianten | g2, g3, a4 |
| g5 | 792 | 496 | Implemen-\ntieren | g4, c2 |
| g6 | 942 | 446 | Qualität\nprüfen | g5 |
| c1 | 330 | 582 | Datenmodelle\nentwickeln | root |
| c2 | 482 | 620 | Datenspeicher\numsetzen | c1 |
| c3 | 642 | 580 | Daten-\nsicherheit | c2 |
| c4 | 800 | 618 | Daten\naufbereiten | c3 |
| h1 | 420 | 736 | Plattform\nbestimmen | root |
| h2 | 572 | 764 | Auslieferung\ndefinieren | h1 |
| h3 | 722 | 734 | Auslieferung\ndurchführen | h2, g6 |
| h4 | 878 | 762 | Betrieb &\nÜberwachung | h3 |

Die bereichsübergreifenden Voraussetzungen (`g3` ← `b3`, `g4` ← `a4`, `g5` ← `c2`, `h3` ← `g6`) sind
absichtlich gesetzt. Sie erzeugen das Netz statt fünf paralleler Stränge und bilden echte fachliche
Abhängigkeiten ab: Ohne Datenschutzberatung keine Sicherheitsbeurteilung, ohne Datenspeicher keine
Implementierung.

### 6.3 Wurzel und Ziel

**Wurzel** bei `x=110, y=420`. Sechseck mit Radius 44, Gold, Status immer `done`. Code im Knoten:
«BBC». Beschriftung: «Basis-\nlehrjahr».

**Ziel** bei `x=1180, y=420`. **Raute** (nicht Sechseck) mit Radius 46, Farbe `#FFD166`, dazu ein
konzentrischer Rautenumriss mit Radius 58 bei 28 % Deckkraft. Code: «IPA». Beschriftung:
«Individuelle\npraktische Arbeit». Voraussetzungen: `a7`, `b4`, `g6`, `c4`, `h4` — alle fünf
Bereichsenden. Das Ziel ist im Startzustand gesperrt und nicht anklickbar.

Diese Konvergenz von fünf Richtungen auf einen Punkt ist das prägende Bild des Baums. Sie muss
sichtbar bleiben; die Zielraute nicht verschieben.

### 6.4 Knotendarstellung

Jeder Kompetenzknoten ist eine SVG-Gruppe mit Radius 31 und, von hinten nach vorne:

1. **Leuchten:** dieselbe Sechseckform, gefüllt in Bereichsfarbe, mit Gauss-Weichzeichner
   (`stdDeviation ≈ 7`, zweifach überlagert). Deckkraft je Status: `done` 0.55, `active` 0.3,
   sonst 0.
2. **Fortschrittsring:** zwei Kreise mit Radius 39. Der hintere ist die graue Spur, der vordere
   zeigt über `stroke-dasharray`/`stroke-dashoffset` den Anteil erfüllter Leistungsziele, um
   −90° gedreht, damit er oben beginnt. Der Ring ist die einzige Stelle, an der Teilfortschritt
   pro Kompetenz sichtbar wird — er trägt viel und darf nicht entfallen.
3. **Sechseck:** spitz nach oben (Ecken bei 60°·i − 90°), Füllung und Rand nach Status.
4. **Code:** der Kompetenzcode (`g3`) in Monospace, zentriert. Bei `locked` stattdessen ein
   Schlosssymbol.
5. **Häkchen** unterhalb der Mitte, nur bei `done`.
6. **Beschriftung:** ein bis zwei Zeilen unter dem Knoten, ab `y + 50`, Zeilenabstand 14 px,
   zentriert.

Zustand `sel` (ausgewählt): weisser Rand, volles Leuchten. Bei Hover heller Rand.

Bei einer Freischaltung erhält der Knoten kurzzeitig eine Klasse, die die Randstärke zweimal von
2 auf 5 px und zurück animiert (ca. 1,6 s pro Durchgang).

### 6.5 Kanten

Jede Kante wird **zweifach** gezeichnet, das erzeugt die typische Skilltree-Optik:

1. Gehäuse: fast schwarz (`#070A14`), Strichstärke 9
2. Innenlinie: Strichstärke 3.5 in der Farbe des **Zielknotens**, wenn die Kante «lebt»
   (Ausgangsknoten ist `done` oder `root`); sonst Strichstärke 2.5, gestrichelt (`2 7`),
   Farbe `#1E294A`

Kanten sind gerade Linien zwischen den Mittelpunkten. Kanten zum Ziel verwenden `#FFD166`.

### 6.6 Zoom und Verschieben

- Ziehen mit der Maus auf leerer Fläche verschiebt (`pointerdown` auf einem Knoten ignorieren).
  Der Cursor wechselt zwischen `grab` und `grabbing`.
- Umrechnung der Pixel-Bewegung in viewBox-Einheiten: Faktor `1320 / Breite des Containers`.
- Drei Schaltflächen unten rechts: «−», «⌂», «+». Zoomschritt 1.2, Grenzen 0.55 bis 2.2.
  «⌂» setzt Zoom auf 1 und Verschiebung auf 0.

### 6.7 Überlagerungen im Baum

**Oben links, zwei Karten übereinander:**

Karte 1 — Fortschritt:
- Eyebrow «HANDLUNGSKOMPETENZEN» in Monospace, gesperrt, sehr klein
- Grosse Zahl `{erledigt}` mit kleinerem `/ 25`
- Fortschrittsbalken in Violett

Karte 2 — Legende: fünf Zeilen mit kleinem Sechseck in Bereichsfarbe und dem Bereichsnamen.

**Klick auf einen gesperrten Knoten** öffnet kein Panel, sondern zeigt eine Meldung:
Titelzeile «Noch gesperrt», Text «Zuerst {fehlende Codes} abschliessen».

---

## 7. Detailpanel

Rechte Spalte, 372 px breit, schiebt von rechts ein (`transform: translateX(100%)` → `none`,
ca. 340 ms). Schliessen über «×», Escape oder Klick auf einen anderen Knoten.

### 7.1 Kopf

- Bereichszeile: kleines Sechseck plus Bereichsname, in Bereichsfarbe, Monospace, gesperrt, versal
- Überschrift: Code in Bereichsfarbe und Monospace, dann « · », dann der volle Titel der
  Handlungskompetenz aus dem Bildungsplan
- Zwei Status-Chips: der Statusname und «{n} von {m} Leistungszielen»

Statusnamen im Panel: `done` → «Abgeschlossen», `active` → «In Arbeit», `pending` → «Wartet auf
Bestätigung», `open` → «Freigeschaltet».

### 7.2 Körper

Abschnittstitel «LEISTUNGSZIELE» mit Zähler rechts, darunter die Liste. Jede Zeile:

- Kästchen links (17 px, abgerundet), gefüllt in Bereichsfarbe mit dunklem Häkchen, wenn erfüllt
- Leistungszielcode in Monospace, klein, gedämpft — in Bereichsfarbe, wenn erfüllt
- Volltext des Leistungsziels aus dem Bildungsplan
- Taxonomiestufe als kleiner Chip (`K1`–`K6`)

Die ganze Zeile ist eine Schaltfläche. Deaktiviert bei `done` und für Rolle `hr`.

Darunter, falls Rückmeldungen zu dieser Kompetenz existieren: Abschnitt «RÜCKMELDUNGEN» mit
kompakten Karten (Datum, Person, Art-Chip, erster Textabschnitt).

### 7.3 Fuss

Genau eine Schaltfläche plus eine Hinweiszeile. Die Beschriftung hängt von Rolle und Status ab:

| Rolle | Status | Schaltfläche | Hinweiszeile |
|---|---|---|---|
| alle | `done` | «Abgeschlossen und bestätigt» (deaktiviert) | «Bestätigt mit Rückmeldung. Änderungen sind über die Berufsbildung möglich.» |
| `lernende` | alle LZ erfüllt | «Zur Bestätigung einreichen» | «Alle Leistungsziele erfüllt. Bereit zur Bestätigung.» |
| `lernende` | LZ offen | «Zur Bestätigung einreichen» (deaktiviert) | «Noch **{n}** Leistungsziele offen.» |
| `lernende` | `pending` | «Eingereicht · wartet auf Ciril S.» (deaktiviert) | «Deine Praxisbildnerin oder dein Praxisbildner bestätigt die Kompetenz mit einer Rückmeldung.» |
| `praxis` | alle LZ erfüllt oder `pending` | «Bestätigen und Rückmeldung geben» | «Die Kompetenz wird erst abgeschlossen, **wenn eine Rückmeldung erfasst ist**.» |
| `praxis` | LZ offen | «Bestätigen und Rückmeldung geben» (deaktiviert) | «Noch **{n}** Leistungsziele offen.» |
| `hr` | alle | keine | «Nur Lesezugriff. Kompetenzen werden von Lernenden und Praxisbildenden gepflegt.» |

Ohne Auswahl zeigt das Panel einen leeren Zustand: graues Sechseck und der Text «Wähle eine
Handlungskompetenz im Baum, um Leistungsziele und Rückmeldungen zu sehen.»

---

## 8. Der Durchstich

Dieser Ablauf ist der Zweck des gesamten Prototyps. Er muss ohne Umwege funktionieren.

1. Start: `g3` «Sicherheit beurteilen» ist ausgewählt, Status `active`, 2 von 5 Leistungszielen
   erfüllt, Rolle `Lernende`.
2. Die drei offenen Leistungsziele abhaken. Der Fortschrittsring am Knoten füllt sich, bei
   eingeschalteten Spielelementen erscheint je eine Meldung «+10 XP».
3. Schaltfläche «Zur Bestätigung einreichen» wird aktiv. Klick → `g3` wechselt auf `pending`,
   der Knoten wird gold und gestrichelt, Meldung «Eingereicht — Wartet auf Bestätigung durch
   Ciril S.».
4. Rolle auf «Praxisbildner» wechseln. Dasselbe Panel zeigt jetzt «Bestätigen und Rückmeldung geben».
5. Klick → **Dialog öffnet sich**. Er lässt sich nicht mit leerem Pflichtfeld speichern.
6. Versuch, leer zu speichern → Feld wird rot, Meldung «Ohne diese Angabe wird die Kompetenz nicht
   abgeschlossen.» *(Diesen Fehlversuch im Pitch bewusst vorführen — er ist der Beweis für die
   Behauptung «Feedback wird erzwungen».)*
7. Text eingeben, speichern. Danach in dieser Reihenfolge:
   - `g3` wird `done`, füllt sich, Häkchen erscheint, Kanten ab `g3` leuchten auf
   - Meldung «+100 XP · g3 abgeschlossen»
   - nach ca. 500 ms: `g4` schaltet frei, Knoten pulsiert, Meldung «Freigeschaltet — g4 · …»
   - nach ca. 950 ms: Auszeichnung «Applikationen I» wird vergeben, goldene Meldung
   - die neue Rückmeldung erscheint im Panel und in der Ansicht «Rückmeldungen»
8. Schalter «Spielelemente» ausschalten → Farben und Leuchten verschwinden, XP und Auszeichnungen
   verschwinden, Baum und Rückmeldungen funktionieren weiter.

### 8.1 Dialog «Rückmeldung»

- Eyebrow «SCHRITT 2 VON 2», Titel «Rückmeldung zu {code}», darunter der volle Titel der
  Handlungskompetenz
- Auswahl «Art der Rückmeldung»: zwei Schaltflächen «Anerkennung» (vorausgewählt) und
  «Entwicklungsimpuls»
- Feld 1, **Pflicht**: «Was gut gelaufen ist», Platzhalter «Konkret und beobachtbar formulieren.»
- Feld 2: «Was noch besser werden könnte», Platzhalter «Optional.»
- Feld 3: «Nächster Schritt», Platzhalter «Optional.»
- Fusszeile: «Abbrechen» und «Rückmeldung speichern und abschliessen»
- Schliessen über Escape, Klick auf den Hintergrund oder «Abbrechen». Beim Öffnen Fokus in Feld 1.

Die drei Felder sind bewusst so benannt. Sie stammen aus der Feedbacksystematik der Berufsbildung
und sind für das Publikum wiedererkennbar.

---

## 9. Weitere Ansichten

### 9.1 Rückmeldungen

Überschrift und Lead wechseln mit der Rolle:

- `lernende`: «Meine Rückmeldungen» / «Jede abgeschlossene Handlungskompetenz braucht eine
  Rückmeldung. Sie hängt an der Kompetenz und bleibt nachvollziehbar.»
- `praxis`: «Rückmeldungen an Anna Meier» / «Jede bestätigte Handlungskompetenz erzeugt eine
  Rückmeldung. So bleibt nachvollziehbar, was besprochen wurde.»

Jede Karte enthält: Datum in Monospace, Person, Art-Chip (grün «Anerkennung» / violett
«Entwicklungsimpuls»), Kompetenz-Chip mit Code und gekürztem Titel, bei ungelesenen ein «NEU».
Darunter eine Definitionsliste mit den drei Feldern; leere Felder werden weggelassen. Für
`lernende` zusätzlich eine Schaltfläche «Als gelesen markieren», die nach dem Klick zu «✓ Gelesen»
wird und den Zähler im Tab reduziert.

Ungelesene Karten heben sich durch violetten Rand ab. Der Tab-Zähler ist rot, solange Ungelesene
existieren.

**Startdaten:**

| ID | HK | Datum | Art | Gelesen | Was gut gelaufen ist | Was besser werden könnte | Nächster Schritt |
|---|---|---|---|---|---|---|---|
| 1 | g2 | 19.08.2026 | Entwicklungsimpuls | nein | «Der Entwurf für die Benutzeroberfläche war technisch sauber durchdacht, besonders die Aufteilung in wiederverwendbare Komponenten.» | «Die Barrierefreiheit kam noch zu kurz. Kontraste und Fokusreihenfolge sollten von Anfang an mitgedacht werden.» | «Nimm dir für den nächsten Entwurf die Accessibility-Richtlinien der Bundesverwaltung als Checkliste.» |
| 2 | b2 | 11.08.2026 | Anerkennung | nein | «Du hast eine komplexe Supportanfrage eigenständig bis zur Lösung geführt und sie so dokumentiert, dass der Second Level sie direkt nutzen konnte.» | — | «Bring den Fall in die nächste Teamrunde ein, davon haben die anderen etwas.» |
| 3 | c1 | 02.07.2026 | Anerkennung | ja | «Das Datenmodell war nach dem zweiten Durchgang vollständig normalisiert und gut nachvollziehbar dokumentiert.» | «Beim ersten Entwurf fehlten die Testfälle für die Datenkorrektheit.» | «Beim nächsten Modell die Testfälle direkt mitplanen, nicht nachträglich.» |

Alle Rückmeldungen stammen von «Ciril S.». Neue Einträge erhalten das Datum «24.08.2026» und werden
oben eingefügt.

### 9.2 Auszeichnungen

Raster mit Karten ab 196 px Breite. Erhaltene Karten: farbiger Rand, Farbverlauf im Hintergrund,
Medaille als Sechseck mit Farbverlauf und Schlagschatten, Emoji in Farbe, unten «erhalten».
Nicht erhaltene: graues Sechseck, Emoji entsättigt auf 35 % Deckkraft, gedämpfte Schrift.
Oben rechts jeder Karte ein Seltenheits-Chip.

| ID | Titel | Beschreibung | Emoji | Stufe | Farbe | Bedingung |
|---|---|---|---|---|---|---|
| m1 | Erster Schritt | Erste Handlungskompetenz abgeschlossen | 🌱 | Bronze | `#C98B45` | ≥ 1 erledigt |
| m2 | Grundlagen gelegt | Fünf Handlungskompetenzen abgeschlossen | ⚙️ | Bronze | `#C98B45` | ≥ 5 erledigt |
| m3 | Lernjournal-Serie | Zwölf Wochen ohne Lücke dokumentiert | 📘 | Silber | `#9FB3D9` | immer erfüllt |
| m4 | Basislehrjahr bestanden | Ausbildung im BBC abgeschlossen | 🎓 | Silber | `#9FB3D9` | immer erfüllt |
| m5 | Applikationen I | Anforderungen, Schnittstellen und Sicherheit erarbeitet | 🧩 | Gold | `#E8A33D` | g1, g2, g3 erledigt |
| m6 | Zweistellig | Zehn Handlungskompetenzen abgeschlossen | 🔟 | Gold | `#E8A33D` | ≥ 10 erledigt |
| m7 | Datenprofi | Alle Kompetenzen im Bereich Daten abgeschlossen | 🗄️ | Gold | `#E8A33D` | c1–c4 erledigt |
| m8 | Projektbegleiter | Alle Kompetenzen im Bereich ICT-Projekte abgeschlossen | 🧭 | Gold | `#E8A33D` | a1–a7 erledigt |
| m9 | Bereit für die IPA | Alle 25 Handlungskompetenzen abgeschlossen | 🏆 | Platin | `#7FE3C4` | ≥ 25 erledigt |
| m10 | Jahrgang 2026 «Phoenix» | Vom Jahrgang selbst gestaltet. Entwurf bis Ende Semester einreichen. | 🔥 | Jahrgang | `#F0703C` | nie automatisch |

`m10` wird gestrichelt umrandet dargestellt, mit schraffiertem Medaillenfeld. Diese Karte
illustriert die Idee, dass Lernende eigene Badges für ihren Jahrgang gestalten — sie ist im Pitch
der emotionalste Punkt und darf nicht wie ein normales gesperrtes Badge aussehen.

Im Startzustand sind m1, m2, m3, m4 erhalten (4 Stück). Der Durchstich vergibt m5.

### 9.3 Cockpit

Nur für Rolle `hr`.

Kennzahlenreihe, vier Karten: «Nachwuchskräfte» 24 («über alle Berufsfelder») · «Ø Ausbildungsstand»
{Mittelwert} % («Handlungskompetenzen abgeschlossen») · «Offene Bestätigungen» 3 («warten auf
Praxisbildende») · «Hinweise» {Anzahl markierte} («Regel ausgelöst»), diese Karte rot umrandet.

Tabelle «Nachwuchskräfte · Applikationsentwicklung» mit Spalten Person, Lehrjahr, Fortschritt,
Letzte Rückmeldung. Person mit farbigem Initialen-Kästchen und Berufsbezeichnung darunter.
Fortschritt als Balken plus Prozentzahl. Auffällige Zeile mit rotem Punkt.

| Person | Lehrjahr | Beruf | Fortschritt | Letzte Rückmeldung | Farbe | Auffällig |
|---|---|---|---|---|---|---|
| Anna Meier | 3. Lehrjahr | Applikationsentwicklung | 64 % | vor 4 Tagen | `#9B7BF7` | nein |
| Luca Bernasconi | 2. Lehrjahr | Applikationsentwicklung | 36 % | vor 6 Tagen | `#37BDD8` | nein |
| Jana Keller | 4. Lehrjahr | Plattformentwicklung | 88 % | vor 2 Tagen | `#31C489` | nein |
| Kevin Müller | 2. Lehrjahr | Applikationsentwicklung | 31 % | vor 34 Tagen | `#F0703C` | **ja** |
| Sara Wyss | 1. Lehrjahr | Basislehrjahr BBC | 12 % | vor 9 Tagen | `#E8A33D` | nein |
| Nils Frei | 3. Lehrjahr | Mediamatik | 58 % | vor 5 Tagen | `#9FB3D9` | nein |

Rechte Spalte «Regeln», vier Zeilen mit Kippschalter:

| Regel | Beschreibung | Standard |
|---|---|---|
| Keine Rückmeldung seit 30 Tagen | Meldung an Praxisbildende und Berufsbildung | ein |
| Fortschritt unter Jahrgangsschnitt | Hinweis im Cockpit, keine Meldung an Lernende | ein |
| Lernbericht überfällig | Erinnerung an Lernende, wöchentlich | ein |
| Kompetenz seit 90 Tagen in Arbeit | Hinweis im Cockpit | aus |

Die zweite Regel ist bewusst so formuliert. Sie zeigt, dass Vergleichsdaten der Begleitung dienen
und nicht als Druckmittel an Lernende gehen — das war eine Sorge aus den Interviews.

---

## 10. Designtokens

### 10.1 Farben

```
--bg:      #080B16    Hintergrund
--bg-2:    #0C1122    Eingabefelder
--panel:   #111830    Karten, Panel
--panel-2: #161F3C    erhöhte Flächen
--line:    #1E294A    Trennlinien
--line-2:  #2A3865    Ränder
--txt:     #E8EDFA    Text
--txt-2:   #A7B4D4    Sekundärtext
--muted:   #6E7CA0    Beschriftungen
--dim:     #3C4870    gesperrt
--ipa:     #FFD166    Ziel
--alert:   #F2545B    Warnung
```

Hintergrund der Anwendung: zwei weiche radiale Verläufe (`#131C3A` bei 22 % / 42 %, `#10182F` bei
88 % / 78 %) über der Grundfarbe, darüber ein Punktraster (radialer Verlauf, 34 px Abstand,
Deckkraft 0.045). Das Raster ist der einzige Hintergrundschmuck — nichts weiter hinzufügen.

### 10.2 Schrift

| Rolle | Schrift | Einsatz |
|---|---|---|
| Anzeige | **Chakra Petch** 600/700 | Wortmarke, Überschriften, Knotenbeschriftungen, Badge-Titel, grosse Zahlen |
| Fliesstext | **Inter** 400/500/600 | alle Fliesstexte, Formularfelder |
| Daten | **JetBrains Mono** 500/700 | Kompetenzcodes, Leistungszielcodes, Daten, Eyebrows, Zähler |

Eyebrows durchgehend: Monospace, ca. 9.5 px, `letter-spacing: .16em`, Versalien, gedämpfte Farbe.
Chakra Petch ist die technisch-kantige Anzeigeschrift, die dem Ganzen den Spielcharakter gibt —
sie nicht durch eine neutrale Grotesk ersetzen.

### 10.3 Form und Bewegung

- Radien: 10 px Karten, 7 px Schaltflächen und Felder, 20 px Chips
- Sechseck als durchgehendes Formmotiv: Knoten, Wortmarke, Medaillen, Meldungssymbole, Legendenpunkte
- Übergangskurve: `cubic-bezier(.22,.7,.3,1)`
- Dauern: Hover 160–180 ms, Statuswechsel 280 ms, Panel 340 ms, Fortschrittsbalken 600–700 ms
- `active`-Knoten atmen dauerhaft (2.8 s, Randdeckkraft 0.6 → 1)
- Bei `prefers-reduced-motion: reduce` alle Dauern auf 0.01 ms

### 10.4 Meldungen

Unten rechts gestapelt, neueste unten, einschiebend von rechts, nach 3.4 s ausblenden.
Aufbau: Sechseck-Symbol links, darin ein Emoji; rechts Eyebrow, fette Zeile in Chakra Petch.

| Art | Symbolfarbe | Verwendung |
|---|---|---|
| `xp` | Violett | Leistungsziel erfüllt, Kompetenz abgeschlossen |
| `unlock` | Cyan | Freischaltung, Einreichung, gesperrter Knoten |
| `badge` | Gold, zusätzlich goldener Kartenrand | Auszeichnung erhalten |

---

## 11. Kopfzeile

Von links nach rechts: Wortmarke (Sechseck mit «L», Verlauf Violett) mit «LERNPFAD» in Versalien und
Unterzeile «Ausbildungsbegleitung BIT»; Chip «PROTOTYP» in Gold auf dunklem Braun; Dehnraum;
XP-Anzeige (Stufentext, Balken 190 px, XP-Zahl); Schalter «Spielelemente»; Rollenumschalter.

Der Chip «PROTOTYP» bleibt immer sichtbar. Das Publikum soll zu keinem Zeitpunkt glauben, es sehe
ein fertiges System.

---

## 12. Abnahmekriterien

Der Prototyp ist fertig, wenn alle folgenden Punkte zutreffen:

1. Der Baum zeigt 25 Kompetenzknoten, eine Wurzel und ein Ziel; alle Beschriftungen sind lesbar und
   überlappen einander nicht.
2. Die Knotencodes und Titel stimmen mit der Tabelle in Abschnitt 3.2 überein; die Leistungsziele
   sind Volltexte aus dem Bildungsplan, keine Platzhalter.
3. Der Durchstich aus Abschnitt 8 läuft vollständig durch und löst genau eine Freischaltung (`g4`)
   und genau eine Auszeichnung (`m5`) aus.
4. Der Dialog verweigert das Speichern bei leerem Pflichtfeld und zeigt die vorgesehene Fehlermeldung.
5. Der Rollenwechsel verändert Schaltflächen, Tabs und Rechte wie in Abschnitt 4.2 und 7.3 beschrieben.
6. Der Schalter «Spielelemente» entfernt XP, Auszeichnungen, Leuchten und Farbcodierung, lässt aber
   Fortschritt, Leistungsziele, Rückmeldungen und Cockpit vollständig funktionsfähig.
7. Gesperrte Knoten sind nicht anklickbar und nennen bei Klick die fehlenden Voraussetzungen.
8. Zoom, Verschieben und Zurücksetzen funktionieren; Knoten sind mit Tab erreichbar und mit Enter
   auslösbar.
9. Bei 1280 × 720 px ist der ganze Baum ohne Scrollen sichtbar.
10. Ein Reload stellt exakt den Startzustand aus Abschnitt 5.5 wieder her.

---

## 13. Bewusst nicht enthalten

Diese Dinge fehlen absichtlich. Wer sie ergänzt, verlängert die Bauzeit ohne Nutzen für den Pitch
oder verwässert die Aussage:

- Anmeldung, Benutzerverwaltung, Berechtigungen über den Rollenumschalter hinaus
- Persistenz, Backend, Schnittstellen zu bestehenden Systemen des BIT
- Weitere Lehrberufe (Wirtschaftsinformatik, Mediamatik, Plattformentwicklung). Der Prototyp zeigt
  ausschliesslich Applikationsentwicklung
- Lernjournal, Bildungsbericht, Notenverwaltung
- Peer-Badges, anonymisierter Jahrgangsvergleich, Benachrichtigungseinstellungen — im Pitch als
  spätere Ausbaustufe beschrieben, hier nicht gebaut
- Das Punkte- und Sammelkartensystem aus der Ausbaustufe
- Mehrsprachigkeit
- Echte Bearbeitung des Kompetenzkatalogs durch Ausbildungsverantwortliche

---

## 14. Hinweise zur Umsetzung

- **SVG aus Daten erzeugen, nicht von Hand schreiben.** Bei jeder Zustandsänderung den Baum neu
  zeichnen. Bei 27 Knoten ist das schnell genug und spart die gesamte Aktualisierungslogik.
- Sechseck-Pfad: `for i in 0..5: Winkel = (60·i − 90)°`, Punkt = `(x + r·cos, y + r·sin)`,
  Pfad `M…L…L…Z`.
- Fortschrittsring: Umfang = `2π · (r + 8)`, `stroke-dasharray` = Umfang,
  `stroke-dashoffset` = `Umfang · (1 − erfüllt/gesamt)`, `transform="rotate(-90 x y)"`.
- Bereichsfarbe als CSS-Variable auf die Knotengruppe setzen (`style="--nc:…"`) und im Stylesheet
  ausschliesslich über `var(--nc)` arbeiten. Das hält die Statusregeln frei von Farblogik.
- Beim Ermitteln neu freigeschalteter Knoten die Menge **vor** der Statusänderung festhalten und
  danach vergleichen, sonst werden Freischaltmeldungen doppelt oder gar nicht ausgelöst.
- Die zeitlich gestaffelten Meldungen (XP → Freischaltung → Auszeichnung) sind wichtig für die
  Wirkung. Alle gleichzeitig einzublenden nimmt dem Moment die Dramaturgie.
- Auf CSS-Spezifität achten: Statusklassen (`.node.done`) und Modusklassen (`.plain .node.done`)
  greifen ineinander. Der Modus `plain` muss gewinnen, notfalls mit `!important` bei den Kanten.