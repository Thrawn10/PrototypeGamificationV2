---
schema: bit-gamification-pitch/v1
version: 1.2
sprache: de-CH
orthografie: "Schweizer Hochdeutsch – kein 'ß', immer 'ss'"
erstellt: 2026-08-24
status: entwurf

deck:
  titel: "Gamification der Ausbildung im BIT"
  untertitel: "Vom Excel-Bildungsplan zum digitalen Skilltree"
  kicker: "Projektpitch"
  autor: "Tim Ambühl"
  organisation: "Bundesamt für Informatik und Telekommunikation (BIT)"
  kontext: "Pitch für ein mögliches Entwicklungsprojekt, wissenschaftlich fundiert durch die Transferarbeit 3 (TA3, FFHS, 10.05.2026)"
  publikum:
    wer: "HR Nachwuchsförderung BIT"
    rolle: "Zugleich potenzielle Auftraggeberschaft und Entscheidungsinstanz"
    vorwissen: >-
      Sehr hoch. Zwei der drei Experteninterviews stammen aus diesem Kreis. Die Ausgangslage
      muss nicht erklärt, sondern nur als gemeinsame Basis kurz gespiegelt werden. Neu für das
      Publikum sind: die wissenschaftliche Evidenz, das konkrete Lösungsbild und der
      Umsetzungsweg.
    haltung: >-
      Bereitschaft für digitale und spielerische Elemente ist laut Interviews klar vorhanden.
      Hauptvorbehalte sind erfahrungsgemäss Budget, Aufwand und Nachweisbarkeit des Nutzens.
  kernbotschaft: >-
    Das BIT kann seine Ausbildungsbegleitung mit einer eigenen, gamifizierten Webapplikation
    digitalisieren – wissenschaftlich fundiert, weitgehend durch die eigenen Nachwuchskräfte
    umsetzbar und wissenschaftlich begleitet durch PiBS-Studierende.
  elevator_pitch: >-
    Der Ausbildungsstand wird heute in Excel-Tabellen geführt. Wir schlagen eine Webapplikation
    vor, die den Bildungsplan als Skilltree sichtbar macht, Feedback an den Fortschritt koppelt
    und erreichte Meilensteine mit Badges anerkennt – gebaut von Nachwuchskräften, begleitet von
    Praxisbildenden, evaluiert von PiBS-Studierenden.

produktdarstellung:
  grundsatz: >-
    Die Applikation wird im gesamten Hauptteil als EIN zusammenhängendes Produkt dargestellt,
    nicht als Zusammenstellung von Modulen. Die Modulstruktur (M1–M4) war ein methodisches
    Hilfsmittel des Design Science Research in der Transferarbeit, um Anforderungen einzeln
    validierbar zu machen. Sie ist keine Produktarchitektur und für das Publikum irrelevant.
  regel_fuer_agent: >-
    Auf sichtbaren Slides des Hauptteils (S01–S11) dürfen die Begriffe 'Modul', 'M1', 'M2',
    'M3' oder 'M4' NICHT erscheinen – weder in Titeln, Untertiteln noch im Fliesstext.
    Die Modulherkunft ist ausschliesslich im Feld 'quellen' (nicht sichtbar) zulässig.
  erzaehllogik: >-
    Die Lösung wird entlang eines Nutzungsflusses erzählt, nicht entlang von Funktionsblöcken:
    Der Skilltree bildet den Ausbildungsverlauf ab. Wird darin eine Kompetenz abgeschlossen,
    löst das automatisch Feedback und Anerkennung aus. Darüber liegt eine Cockpit-Sicht für die
    Ausbildungsverantwortlichen. Das Zusammenspiel ist der Kern der Aussage – einzelne
    Funktionen für sich genommen sind wenig überzeugend.

timing:
  slot_minuten: "20–30, Zielwert eher am unteren Rand"
  budget:
    vortrag: "ca. 14–16 Minuten"
    live_demo_prototyp: "ca. 3–4 Minuten"
    diskussion_und_entscheid: "ca. 8–10 Minuten"
  regel_fuer_agent: >-
    Der aktuelle Deck (S01–S11) enthält keine 'optional'-Slides mehr – es gibt keinen
    Kürzungspuffer. Die Diskussion ist bei diesem Publikum der wichtigste Teil – der Vortrag
    darf sie nicht auffressen.

reveal:
  theme: "TODO – Hausfarben BIT / Bundesverwaltung abklären"
  transition: "slide"
  slideNumber: true
  hash: true
  vertikale_stacks: true
  hinweis_fuer_agent: >-
    Slides mit gleichem Feld 'gruppe' und 'vertikal: true' gehören in denselben vertikalen
    Stack (<section><section>…</section></section>). Alle übrigen Slides sind horizontale
    Top-Level-Sections. Die Reihenfolge ergibt sich aus 'reihenfolge' unten. Backup-Slides
    liegen als eigener vertikaler Stack am Ende und werden nur bei Rückfragen angesprungen.
    Zwingend beachten: die Regel unter 'produktdarstellung.regel_fuer_agent'.
  reihenfolge:
    - S01
    - S02
    - S03
    - S04
    - S05
    - S06
    - S07
    - S08
    - S09
    - S10
    - S11

prototyp:
  quelle: "https://thrawn10.github.io/Transferarbeit3_Gamification/"
  repository: "GitHub Pages, öffentlich – keine Verfügbarkeitsgarantie (vgl. TA3 Kap. 4.2)"
  einbettung: "iframe innerhalb der reveal.js-Slides; Fallback = statischer Screenshot"
  darstellung: >-
    Der Prototyp wird als eine Applikation mit mehreren Ansichten gezeigt, nicht als vier
    getrennte Prototypen. Die Ansichtsbezeichnungen unten sind bewusst funktional benannt.
    Falls der Prototyp selbst noch Modulbeschriftungen trägt, diese vor dem Pitch entfernen
    oder in der Demo nicht ansteuern.
  demo_empfehlung: >-
    Eine einzige zusammenhängende Live-Demo bei S05 (Skilltree). Ein Ast im Skilltree
    aufklappen, eine Kompetenz abschliessen und zeigen, wie daraus Feedback und Badge
    entstehen. Genau dieser Durchstich ist die Botschaft: es ist ein Fluss, kein Baukasten.
    Übrige Ansichten über Screenshots.
  disclaimer: >-
    Die Prototypen sind KI-generiert auf Basis der Daten aus Relevance- und Rigor Cycle.
    Die Design-Ideen und Konzepte (Skilltree, Badges) stammen vom Autor. Layout, Design und
    Erstellung der Prototypen wurden durch Claude AI übernommen und durch den Autor
    überarbeitet und ergänzt. Sie dienen als Mockups, nicht als lauffähige Software.
  ansichten:
    - id: view-skilltree
      label: "Skilltree – Ausbildungsverlauf"
      pfad: "TODO – konkreten Unterpfad/Anker im Repo ergänzen"
      fallback_asset: "assets/proto/modul1-skilltree.png"
    - id: view-feedback-lernende
      label: "Feedback – Sicht Lernende"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul2-lernende.png"
    - id: view-feedback-pb
      label: "Feedback – Sicht Praxisbildende"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul2-praxisbildner.png"
    - id: view-badges
      label: "Badge-Galerie"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul3-badges.png"
    - id: view-peer-badges
      label: "Peer-Badges"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul4-peer-badges.png"
    - id: view-cockpit
      label: "Cockpit – Jahrgangsübersicht"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul4-jahresuebersicht.png"
    - id: view-nudges
      label: "Erinnerungen und Benachrichtigungen"
      pfad: "TODO"
      fallback_asset: "assets/proto/modul4-nudges.png"
  hinweis_assetnamen: >-
    Die Dateinamen der Screenshots stammen aus der Transferarbeit und enthalten weiterhin
    'modul…'. Das ist unkritisch, solange die Dateinamen nicht sichtbar sind. Bei Neuexport
    der Screenshots auf funktionale Namen umstellen.

offene_punkte:
  - id: OP1
    status: geklaert
    frage: "Publikum?"
    antwort: "HR Nachwuchsförderung, zugleich potenzielle Auftraggeberschaft."
  - id: OP2
    status: geklaert
    frage: "Zeitslot?"
    antwort: "20–30 Minuten, tendenziell kurz halten. Deck gestrafft, Kürzungspuffer über 'optional'-Slides."
  - id: OP5
    status: geklaert
    frage: "Was ist das BBC?"
    antwort: "Anbieter der Basisausbildung der Lernenden im ersten Ausbildungsjahr für das BIT. Ausgeschriebene Form der Abkürzung noch offen."
  - id: OP9
    status: geklaert
    frage: "Modulstruktur im Pitch?"
    antwort: >-
      Entfällt im Hauptteil. Die Applikation wird als ein Produkt dargestellt; die Module
      erscheinen nur als methodischer Hintergrund auf Backup-Slide B01.
  - id: OP3
    status: offen
    frage: "Gibt es eine Aufwand- und Kostenschätzung (Personentage, Betrieb, Infrastruktur)?"
    auswirkung: >-
      Kritisch bei diesem Publikum. Der aktuelle Deck (S01–S11) enthält keine dedizierte
      Aufwand- und Kostenslide mehr. Die erste Rückfrage ist fast sicher 'was kostet das'.
      Empfehlung: entweder vorher eine grobe Schätzung ergänzen oder den Ask bewusst auf eine
      Machbarkeits- und Aufwandabklärung beschränken.
  - id: OP4
    status: offen
    frage: "Wunschtermin / Ankerpunkt im Lehrjahr für einen Pilotstart?"
    auswirkung: "Der aktuelle Deck enthält keine Roadmap-Slide mehr; Zeiträume für einen Pilotstart sind offen."
  - id: OP6
    status: offen
    frage: "Inkonsistenz in der TA3: Fazit nennt sechs Gestaltungsprinzipien, Tabelle Kap. 3.5.4 listet neun."
    auswirkung: "Die neun Gestaltungsprinzipien der Tabelle sind im aktuellen Deck nicht mehr enthalten (Backup-Slides entfernt). Vor dem Pitch in der Arbeit bereinigen."
  - id: OP7
    status: offen
    frage: "Darf die Sammelkarten-Idee (S11) gezeigt werden?"
    auswirkung: >-
      Die Sammelkarten-Idee ist im aktuellen Deck nicht mehr enthalten. Falls sie gezeigt
      werden soll, müsste sie als spätere Stufe wieder ergänzt werden.
  - id: OP8
    status: offen
    frage: "Aktuelle Anzahl Nachwuchskräfte im BIT?"
    auswirkung: >-
      Platzhalter auf S03. Die Zahl macht das Kostenargument (400 CHF pro Kopf und Jahr) erst
      greifbar – das Publikum kennt sie, deshalb muss sie stimmen.
  - id: OP10
    status: offen
    frage: "Trägt der bestehende Prototyp sichtbare Modulbeschriftungen?"
    auswirkung: >-
      Falls ja, vor der Demo entfernen oder diese Ansichten nicht ansteuern – sonst
      widerspricht die Live-Demo der Erzählung 'eine Applikation'.

glossar:
  BIT: "Bundesamt für Informatik und Telekommunikation"
  DSR: "Design Science Research (Framework nach Hevner et al., 2004)"
  BiVo: "Bildungsverordnung"
  EFZ: "Eidgenössisches Fähigkeitszeugnis"
  ÜK: "Überbetrieblicher Kurs"
  HK: "Handlungskompetenz"
  NFW: "Nachwuchsförderung"
  PiBS: "Praxisintegrierter Bachelor Informatik"
  IPA: "Individuelle praktische Arbeit (Abschlussarbeit der Lehre)"
  BBC: "Anbieter der Basisausbildung der Lernenden im ersten Ausbildungsjahr für das BIT"
  MVP: "Minimum Viable Product"
  SDT: "Selbstbestimmungstheorie (Ryan & Deci, 2000)"
  SUS: "System Usability Scale"

kennzahlen_pool:
  - id: K01
    wert: "99 %"
    label: "Abschlussquote im BIT"
    quelle: "TA3 Kap. 2.2.1 / Interview 3"
  - id: K02
    wert: "~90 %"
    label: "Anteil der Ausbildungszufriedenheit, der auf Wertschätzung und Kommunikation zurückgeführt wird"
    quelle: "TA3 Kap. 2.2.4 / Interview 2"
  - id: K03
    wert: "~400 CHF"
    label: "Jahreskosten pro Nachwuchskraft für die kommerzielle Marktlösung"
    quelle: "TA3 Kap. 2.2.2 / Interview 2"
  - id: K04
    wert: "1,65 → 11,10 Mrd. USD"
    label: "Marktvolumen Gamification-Technologie im Arbeitsumfeld, 2015–2020"
    quelle: "Brouwer & Conboy, 2017 (TA3 Kap. 3.1)"
  - id: K05
    wert: "+37 %"
    label: "Rückkehrende Nutzer im Deloitte-Führungskräftetraining nach Gamification"
    quelle: "Triantafyllou et al., 2025 (TA3 Kap. 3.4.2)"
  - id: K06
    wert: "−50,2 % / +70 %"
    label: "Klickrate auf Phishing-Links / Meldequote verdächtiger Mails nach gamifiziertem Training"
    quelle: "Bitrian et al., 2024 – Studie mit 1.178 Mitarbeitenden (TA3 Kap. 3.4.2)"
  - id: K07
    wert: "0,725"
    label: "Pfadkoeffizient: direkter Effekt von Gamification-Techniken auf Engagement"
    quelle: "Capatina et al., 2024 (TA3 Kap. 3.4.1)"
  - id: K08
    wert: "3"
    label: "Experteninterviews (Praxisbildner/in, 2× HR Nachwuchsförderung), 30–45 Min."
    quelle: "TA3 Kap. 2.1"
  - id: K09
    wert: "66 % / 52 % / 38,4 %"
    label: "Erklärte Varianz in Informationsqualität / Systemqualität / wahrgenommenem Spass durch vier Spielelemente"
    quelle: "Bitrian et al., 2024 (TA3 Kap. 3.4.1)"
---

# Präsentationsinhalt – Gamification der Ausbildung im BIT

> **Hinweis für den Coding-Agent:** Jede Slide ist eine `##`-Überschrift, gefolgt von genau
> einem YAML-Block. Alle Felder sind stabil benannt. Freitext für die Slide steht
> ausschliesslich in `inhalt`, Sprechertext ausschliesslich in `notizen`.
> Felder mit dem Wert `TODO` oder `null` dürfen **nicht** erfunden werden.
> Kennzahlen werden nie inline ausgeschrieben, sondern über `ref:` aus dem `kennzahlen_pool`
> referenziert.
> **Wichtigste inhaltliche Regel:** siehe `produktdarstellung` im Frontmatter – im Hauptteil
> erscheint keine Modulterminologie.
> Feldreferenz: `id`, `typ`, `gruppe`, `vertikal`, `optional`, `titel`, `untertitel`,
> `layout`, `inhalt`, `prototyp`, `assets`, `quellen`, `notizen`.

---

## S01 — Titel

```yaml
id: S01
typ: titel
gruppe: intro
vertikal: false
optional: false
titel: "Gamification der Ausbildung im BIT"
untertitel: null
layout: title
inhalt:
  kicker: "Projektvorschlag für die Nachwuchsförderung"
  meta:
    - "Tim Ambühl"
    - "Zollikofen, 25.08.2026"
prototyp: null
assets: []
quellen: ["TA3 Titelblatt"]
notizen: >-
  Kurz. Einstieg: Danke, dass ihr euch für die Interviews Zeit genommen habt – daraus ist eine
  Arbeit geworden, und aus der Arbeit ein Vorschlag. Heute geht es um den Vorschlag.
```

---

## S02 — Worum es geht

```yaml
id: S02
typ: inhalt
gruppe: intro
vertikal: false
optional: false
titel: "Worum es heute geht"
untertitel: null
layout: drei-spalten
inhalt:
  spalten:
    - icon: "problem"
      titel: "Das Problem"
      text: "Der Ausbildungsstand wird in Excel gepflegt. Es fehlt eine digitale, motivierende Rückmeldung."
    - icon: "loesung"
      titel: "Der Vorschlag"
      text: "Eine eigene Webapplikation: Skilltree, gekoppeltes Feedback, Badges"
    - icon: "umsetzung"
      titel: "Die Umsetzung"
      text: "Gebaut von Nachwuchskräften, begleitet von Praxisbildenden, evaluiert von PiBS-Studierenden."
prototyp: null
assets: []
quellen: ["Content-Datei: Wie Gamification im BIT / Art der Umsetzung / Wissenschaftliche Begleitung"]
notizen: >-
  Agenda-Ersatz und Erwartungssteuerung in einem. Die drei Spalten spiegeln die Struktur des
  Pitches: Problem, Vorschlag, Umsetzung.
```

---

## S03 — Ausgangslage und Lücke

```yaml
id: S03
typ: inhalt
gruppe: problem
vertikal: false
optional: false
titel: "Die Ausbildung läuft – die Werkzeuge sind analog"
untertitel: "Gemeinsame Ausgangslage, kurz gespiegelt"
layout: kennzahl-plus-gegenueberstellung
inhalt:
  kennzahlen:
    - ref: K01
    - ref: K03
  links:
    titel: "Das funktioniert"
    farbe: "positiv"
    punkte:
      - "Rund 99 Prozent Abschlussquote, bisher keine nicht bestandene Lehrabschlussprüfung."
      - "Klar geregelter Rahmen: Bildungsplan mit definierten Handlungskompetenzen an drei Lernorten."
      - "Engmaschige Begleitung, besonders im ersten Lehrjahr über das BBC."
  rechts:
    titel: "Probleme"
    farbe: "warnung"
    punkte:
      - "Dokumentation über monatliche Lernberichte, Bildungsberichte 1–4 und gemeinsame Excel-Tabellen – gesetzlich genügend, aber ohne digitales, motivierendes Rückmeldesystem."
      - "Die Qualität der Begleitung variiert merklich zwischen den Praxisbildenden."
      - "Die kommerzielle Marktlösung kostet rund 400 CHF pro Nachwuchskraft und Jahr – bei TODO Nachwuchskräften jährlich wiederkehrend."
prototyp: null
assets: []
quellen: ["TA3 Kap. 2.2.1", "TA3 Kap. 2.2.2", "Interview 2", "Interview 3"]
notizen: >-
  Nicht erklären, sondern spiegeln – das Publikum kennt diese Lage besser als ich. Maximal
  90 Sekunden. Zweck der Slide ist die rechte Spalte, insbesondere die 400-CHF-Zeile als
  Brücke zum Argument der Eigenentwicklung. Anzahl Nachwuchskräfte vorher einsetzen (OP8).
```

---

## S04 — Warum Gamification

```yaml
id: S04
typ: inhalt
gruppe: wissenschaft
vertikal: true
optional: false
titel: "Warum Gamification"
untertitel: "Die Kurzfassung aus der Literaturanalyse"
layout: drei-saeulen-kompakt
inhalt:
  saeulen:
    - titel: "Selbstbestimmungstheorie"
      quelle: "Ryan & Deci, 2000"
      text: "Kompetenz, Autonomie, soziale Eingebundenheit – Spielelemente können diese drei Grundbedürfnisse gezielt ansprechen."
    - titel: "Erwartungstheorie"
      quelle: "Vroom, 1965"
      text: "Transparente Regeln, sofortiges Feedback und sinnstiftende Abzeichen erhöhen die Motivationskraft."
    - titel: "IS-Erfolgsmodell"
      quelle: "DeLone & McLean, 1992"
      text: "Spielelemente verbessern Informations- und Systemqualität und steigern darüber Nützlichkeit und Selbstwirksamkeit."
prototyp: null
assets: []
quellen: ["TA3 Kap. 3.2", "TA3 Kap. 3.3.2", "TA3 Kap. 3.5.1"]
notizen: >-
  Maximal 60 Sekunden, nicht vorlesen. Der Punkt ist nicht die Theorie selbst, sondern dass es
  eine gibt – bei öffentlichen Mitteln muss der Ansatz begründbar sein.
```

---

## S05 — Der Skilltree

```yaml
id: S05
typ: inhalt
gruppe: loesung
vertikal: false
optional: false
titel: "Der Ausbildungsverlauf als Skilltree"
untertitel: null
layout: hero-mit-bullets
inhalt:
  hero: "Der gesamte Ausbildungsverlauf – vom BBC bis zur IPA – als verzweigter Baum."
  bullets:
    - "Abgeschlossene Kompetenzen werden freigeschaltet und öffnen den Weg zu weiterführenden Lernzielen."
    - "Keine erzwungene Reihenfolge: Kompetenzen lassen sich in beliebiger Reihenfolge als erworben markieren – die Ausbildung muss flexibel auf individuelle Interessen und betriebliche Realität reagieren können."
    - "Ein Fortschrittsbalken kann den Baum für die schnelle Gesamtübersicht ergänzen."
    - "Ergebnis: bessere Übersicht über die Ausbildung und eine strukturierte Datenlage statt verteilter Excel-Tabellen."
prototyp: null
assets: []
quellen: ["Content-Datei: Basic", "TA3 Kap. 4.3.1", "TA3 Anforderung A1.1–A1.3"]
notizen: >-
  Hier findet die Live-Demo statt (vgl. 'prototyp.demo_empfehlung'): in den Prototyp wechseln,
  einen Ast aufklappen, eine Kompetenz abschliessen – und den ausgelösten Feedback-Eintrag samt
  Badge gleich mitzeigen. Dieser Durchstich beweist die Aussage und ist überzeugender als jede
  Aufzählung. Danach zurück auf die Slides.
```

---

## S06 — Feedback wird verbindlich

```yaml
id: S06
typ: inhalt
gruppe: loesung
vertikal: false
optional: false
titel: "Feedback wird verbindlich"
untertitel: null
layout: bullets-mit-verankerung
inhalt:
  bullets:
    - "Für jeden Abschluss einer Kompetenz muss Feedback vom Praxisbildner kommen – Feedback wird strukturell erzwungen, nicht dem Zufall überlassen."
    - "Es hängt direkt an der Kompetenz im Baum, nicht an einem losen Formular. Eine chronologische Historie macht die Entwicklung nachvollziehbar."
    - "Verpflichtende Einträge ergänzen mündliches Feedback – oder stellen sicher, dass überhaupt Feedback ankommt."
    - "Der bestehende Lernjournal-Prozess kann integriert werden."
  verankerung: "Damit adressiert die Applikation die Varianz in der Begleitqualität – einen der meistgenannten Punkte aus den Interviews."
prototyp: null
assets: []
quellen: ["Content-Datei: Basic", "TA3 Kap. 4.3.2", "TA3 Kap. 2.2.4"]
notizen: >-
  'Erzwungen' hart aussprechen, dann sofort die Warnung nachliefern. Die Qualitätsvarianz nicht
  als Vorwurf gegen einzelne Praxisbildende formulieren, sondern als strukturelle Entlastung.
```

---

## S07 — Anerkennung wird sichtbar

```yaml
id: S07
typ: inhalt
gruppe: loesung
vertikal: false
optional: false
titel: "Anerkennung wird sichtbar"
untertitel: null
layout: bullets-mit-verankerung
inhalt:
  bullets:
    - "Erreichte Meilensteine lösen automatisch Badges aus – unterschieden nach kleinen (erste Kompetenz) und grossen Meilensteinen (Lehrjahr abgeschlossen)."
    - "Digitale Badges können mit physischen Stickern ergänzt oder ausgetauscht werden."
    - "Nachwuchskräfte entwerfen eigene Badges für ihren Jahrgang – zum Beispiel ein Abschluss-Badge 2026."
  verankerung: "Damit adressiert die Applikation die Wertschätzung – einen der meistgenannten Punkte aus den Interviews."
  kennzahlen:
    - ref: K02
prototyp: null
assets: []
quellen: ["Content-Datei: Basic", "TA3 Kap. 4.3.3", "TA3 Kap. 2.2.4"]
notizen: >-
  Die selbst gestalteten Jahrgangs-Badges sind der emotionalste Punkt und kosten faktisch
  nichts. Die KPI (~90 %) unterstreicht, wie stark Wertschätzung zur Zufriedenheit beiträgt.
```

---

## S08 — Individualisierung und Cockpit

```yaml
id: S08
typ: inhalt
gruppe: loesung
vertikal: false
optional: false
titel: "Individualisierbar – und mit Cockpit"
untertitel: "Der administrative Nutzen für die Nachwuchsförderung"
layout: zwei-spalten
inhalt:
  links:
    titel: "Individualisierung"
    punkte:
      - "Praxisbildende und Ausbildungsverantwortliche passen Meilensteine beliebig an und erweitern sie."
      - "Neue oder spezielle Meilensteine sind jederzeit ergänzbar – zum Beispiel ein KI-Workshop oder die Mitarbeit in einem Projekt."
      - "Kompetenzkataloge sind ohne Programmieraufwand pflegbar."
      - "Damit lässt sich das System auf Berufsfeld, Jahrgang und einzelne Person zuschneiden."
  rechts:
    titel: "Cockpit und Datenlage"
    punkte:
      - "Live-Abruf des Fortschritts jeder Nachwuchskraft."
      - "Regeln, um frühzeitig auf Probleme aufmerksam zu werden."
      - "Der administrative Aufwand kann massiv verringert werden."
      - "Belastbare Datengrundlage über Jahrgänge und Berufsfelder hinweg."
prototyp: null
assets: []
quellen: ["Content-Datei: Basic", "TA3 Anforderung A1.4", "TA3 Kap. 4.3.4"]
notizen: >-
  Die wichtigste Slide für dieses Publikum. Motivation der Lernenden ist ein weiches Argument –
  weniger Administration, Frühwarnung und belastbare Daten sind harte. Hier ruhig etwas mehr
  Zeit nehmen als bei S07.
```

---

## S09 — Nutzen für das BIT

```yaml
id: S09
typ: inhalt
gruppe: nutzen
vertikal: false
optional: false
titel: "Was das BIT davon hat"
untertitel: null
layout: nutzen-raster
inhalt:
  nutzen:
    - titel: "Motivation"
      text: "Mögliche Motivationssteigerung von Lernenden und Studierenden – besonders bei wenig intrinsisch motivierenden Tätigkeiten wie Dokumentation oder Unit-Tests."
    - titel: "Lesbarkeit des Bildungsplans"
      text: "Bessere Darstellung und Readability des Bildungsplans. Der Ausbildungsstand ist jederzeit für alle Beteiligten transparent."
    - titel: "Verpflichtendes Feedback"
      text: "Feedback ist strukturell verankert statt von der Person abhängig – das gleicht Unterschiede in der Begleitqualität aus."
    - titel: "Verbesserte Datenlage"
      text: "Strukturierte, auswertbare Daten statt verteilter Excel-Tabellen – Grundlage für Frühwarnung und Steuerung."
    - titel: "Eigenentwicklung"
      text: "Kann durch Nachwuchskräfte entwickelt werden – kein Lizenzabo, volle Kontrolle über die Weiterentwicklung."
    - titel: "Inklusion"
      text: "Klare Aufgabenstellungen, explizite Fortschrittsanzeigen und strukturierte Rückmeldungen wirken besonders bei neurodivergenten Auszubildenden."
prototyp: null
assets: []
quellen: ["Content-Datei: Wie Gamification im BIT", "TA3 Kap. 2.2.4"]
notizen: >-
  Die Slide, die man fotografiert. Wenn die Zeit knapp wird, ist dies die letzte inhaltliche
  Slide vor dem Abschluss – hier nicht kürzen.
```

---

## S10 — Wissenschaftliche Begleitung

```yaml
id: S10
typ: inhalt
gruppe: umsetzung
vertikal: false
optional: false
titel: "Wissenschaftlich begleitet"
untertitel: "PiBS-Studierende messen, ob es wirkt"
layout: bullets-mit-methoden
inhalt:
  bullets:
    - "Begleitung durch PiBS-Studierende im Rahmen einer Transferarbeit, Seminararbeit oder Bachelorarbeit."
    - "Dadurch wird die Effektivität gemessen und es können gezielte Änderungen vorgenommen werden."
    - "Zusätzlich fundiert und rechtfertigt es das Projekt wissenschaftlich."
  methoden:
    titel: "Mögliche Validierungsmethoden"
    punkte:
      - "Usability-Tests nach System Usability Scale mit Auszubildenden und Praxisbildenden"
      - "Qualitative Interviews zu wahrgenommener Motivation und Akzeptanz"
      - "Vergleich des Dokumentationsaufwands vor und nach Einführung von M1 und M2"
      - "Nachholen der bisher fehlenden Anforderungserhebung bei den Auszubildenden selbst"
prototyp: null
assets: []
quellen: ["Content-Datei: Wissenschaftliche Begleitung", "TA3 Kap. 5", "TA3 Anforderung NF4", "Interview 1"]
notizen: >-
  Der letzte Halbsatz der Hervorhebung ist entscheidend: Die Evaluation ist eine studentische
  Arbeit, kein Beratungsmandat. Damit fällt der häufigste Einwand gegen Wirkungsmessung weg.
  Offen benennen, dass die Sicht der Auszubildenden bisher fehlt – selbst genannt wirkt das
  ehrlich statt lückenhaft.
```

---

## S11 — Wissenschaftliche Begleitung (Duplikat)

```yaml
id: S11
typ: inhalt
gruppe: umsetzung
vertikal: false
optional: false
titel: "Wissenschaftlich begleitet"
untertitel: "PiBS-Studierende messen, ob es wirkt"
layout: bullets-mit-methoden
inhalt:
  bullets:
    - "Begleitung durch PiBS-Studierende im Rahmen einer Transferarbeit, Seminararbeit oder Bachelorarbeit."
    - "Dadurch wird die Effektivität gemessen und es können gezielte Änderungen vorgenommen werden."
    - "Zusätzlich fundiert und rechtfertigt es das Projekt wissenschaftlich."
  methoden:
    titel: "Mögliche Validierungsmethoden"
    punkte:
      - "Usability-Tests nach System Usability Scale mit Auszubildenden und Praxisbildenden"
      - "Qualitative Interviews zu wahrgenommener Motivation und Akzeptanz"
      - "Vergleich des Dokumentationsaufwands vor und nach Einführung von M1 und M2"
      - "Nachholen der bisher fehlenden Anforderungserhebung bei den Auszubildenden selbst"
prototyp: null
assets: []
quellen: ["Content-Datei: Wissenschaftliche Begleitung", "TA3 Kap. 5", "TA3 Anforderung NF4", "Interview 1"]
notizen: >-
  ACHTUNG: S11 ist im aktuellen HTML-Deck ein identisches Duplikat von S10. Vor dem Pitch
  prüfen, ob diese Slide beabsichtigt ist oder entfernt werden soll.
```