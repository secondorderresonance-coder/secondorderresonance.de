# Archive Authoring

Dieses Dokument definiert die minimale Authoring-Struktur fuer neue Archivaufgaben.

## Ziel

Neue Aufgaben sollen:
- zum 6-Level-System passen
- konsistente Felder verwenden
- ohne Sonderlogik in die skalierbare Generierung passen
- vor dem Einbau mit dem QA-Skript pruefbar sein

## Seed-Task Template

```js
{
    id: "T-2-001",
    title: "Lineare Gleichung loesen",
    level: "2",
    sublevel: "2.1.1",
    topic: "Gleichungen loesen und umstellen",
    tags: ["gleichung", "termumformung"],
    difficulty: "mittel",
    question: "Loese 3x - 7 = 11.",
    answer: "x = 6",
    explanation: "Addiere zuerst 7 auf beiden Seiten und teile anschliessend durch 3.",
    type: "kurzantwort",
    estimatedTime: 2
}
```

## Feldregeln

- `id`: eindeutige Seed-ID im Format `T-<level>-<laufnummer>`
- `title`: kurze, klare Aufgabebezeichnung
- `level`: `"1"` bis `"6"`
- `sublevel`: muss in der Taxonomie des jeweiligen Levels existieren
- `topic`: sichtbarer Themenname fuer Filter und Listen
- `tags`: Array mit mindestens einem kurzen Tag
- `difficulty`: `leicht`, `mittel` oder `schwer`
- `question`: klare Aufgabenstellung
- `answer`: erwartete Zielantwort
- `explanation`: kurze, fachlich saubere Erklaerung
- `type`: aktuell `kurzantwort` oder `konzeptfrage`
- `estimatedTime`: positive Minutenangabe als Zahl

## Themenserie Template

Wenn ein Thema wachsen soll, zuerst 4-8 starke Seed-Aufgaben anlegen und erst dann skalieren:

```txt
Level: 3
Sublevel: 3.1.1
Topic: Ableitung und Kurvendiskussion

Seed-Ideen:
1. Potenzregel direkt anwenden
2. Produkt aus Faktor und Potenz
3. Nullstellen der Ableitung deuten
4. Monotonie aus Vorzeichen ableiten
5. Einfaches Extremum begruenden
6. Tangentensteigung interpretieren
```

## QA Ablauf

Vor inhaltlichen Ausbau-Schritten:

```bash
node tools/archive-qa.js
```

Das Skript prueft aktuell:
- globale Archivstruktur
- Pflichtfelder aller Aufgaben
- eindeutige IDs
- Level/Sublevel-Konsistenz zur Taxonomie
- erlaubte Werte fuer `difficulty` und `type`
- Placement-Fragen gegen dieselbe Taxonomie

## Erweiterungsregel

Bevor ein Level massiv ausgebaut wird:
- erst neue Seed-Aufgaben fachlich sauber formulieren
- dann QA laufen lassen
- erst danach die skalierte Generierung oder Serienzahl erhoehen
