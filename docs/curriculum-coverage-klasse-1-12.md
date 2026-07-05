# Lehrplan-Abdeckung Klasse 1-12 -> Archiv L1-L3

Dieses Dokument bildet eine erste Abdeckungsmatrix zwischen dem typischen
deutschen Schul-Lehrplan (Klasse 1-12) und den bestehenden Archiv-Abschnitten
der Level 1-3 (`app/data/archive-content.js`, `SOR_ARCHIVE.taxonomy`).

## Zweck

- Sichtbar machen, welche Schulstufen bereits Archiv-Abschnitte haben.
- Luecken fuer kuenftige Sublevel-Erweiterungen sichtbar machen.
- Grundlage fuer spaetere, feinere Klassenstufen-Filter im Archiv/Lernpfad.

## Wichtige Einschraenkung

Der Mathematik-Lehrplan ist in Deutschland foederal (16 Bundeslaender) und
unterscheidet sich zusaetzlich nach Schulform (Grundschule, Haupt-/Real-
schule, Gymnasium, Gesamtschule) und G8/G9. Diese Matrix bildet daher eine
**verallgemeinerte, typische Themenreihenfolge** ab, keinen amtlichen
Lehrplan eines einzelnen Bundeslandes. Sie ist als Naeherung zu verstehen,
die iterativ verfeinert werden kann, sobald einzelne Bundeslaender-Lehrplaene
priorisiert werden.

## Abdeckungsmatrix

| Klasse | Typische Schwerpunktthemen | Archiv-Abschnitte (Level.Sublevel) |
|---|---|---|
| 1-2 | Zahlen bis 100/1000, Kopfrechnen, erste geometrische Formen, Einheiten (Grundlagen) | 1.1.1.a, 1.2.1.a, 1.3.2.a |
| 3-4 | Schriftliche Rechenverfahren, erste Dezimalzahlen, Flaechen/Umfang, Einheiten umrechnen, erste Diagramme | 1.1.1.b, 1.1.3.a, 1.2.1.a, 1.2.1.b, 1.3.2.a, 1.3.2.b, 1.4.1.a |
| 5 | Bruchrechnung (Einstieg), Dezimalzahlen vertieft, Winkel und Dreiecke, Koordinatensystem | 1.1.2.a, 1.1.2.c, 1.1.3.a, 1.1.3.b, 1.2.3.a, 1.2.4.a |
| 6 | Brueche vertieft, Prozentrechnung (Einstieg), negative Zahlen, Teilbarkeit/Primfaktoren, Volumen, Zufallsexperimente | 1.1.2.a, 1.1.2.b, 1.1.2.c, 1.1.4.a, 1.1.5.a, 1.1.5.b, 1.2.2.a, 1.4.2.a |
| 7 | Prozent- und Zinsrechnung, Terme, Dreisatz (proportional/antiproportional), lineare Gleichungen (Einstieg) | 1.3.1.a, 1.3.1.b, 2.1.1.a |
| 8 | Lineare Gleichungen und Gleichungssysteme, lineare Funktionen, Prozentrechnung vertieft, Wahrscheinlichkeit (Grundlagen) | 2.1.1.a, 2.1.1.b, 2.1.1.c, 2.1.2.a, 2.1.2.b, 2.2.2.a, 2.2.2.b, 2.6.2.a, 2.6.2.b |
| 9 | Quadratische Gleichungen/Funktionen, Satz des Pythagoras, Trigonometrie (Einstieg), Kombinatorik/Wahrscheinlichkeit | 2.1.3.a, 2.1.3.b, 2.2.3.a, 2.2.3.b, 2.4.1.a, 2.4.1.b, 2.5.3.a, 2.6.1.a, 2.6.1.b |
| 10 | Trigonometrie vertieft (Sinus-/Kosinussatz, Einheitskreis), Potenzen/Wurzeln/Logarithmen, Exponentialfunktionen, Aehnlichkeit/Kreisgeometrie | 2.2.1.a, 2.2.1.b, 2.2.1.c, 2.3.1.a, 2.3.1.b, 2.3.2.a, 2.3.2.b, 2.3.3.a, 2.3.3.b, 2.4.2.a, 2.4.3.a, 2.4.3.b, 2.5.1.a, 2.5.1.b, 2.5.2.a, 2.5.2.b |
| 11 | Analysis (Einstieg: Ableitungsregeln, Monotonie), Vektorgeometrie (Einstieg), Stochastik (Grundlagen) | 3.1.1.a, 3.1.1.b, 3.2.1.a, 3.2.3.a, 3.2.3.b |
| 12 (bzw. Qualifikationsphase/13 in G9) | Kurvendiskussion und Optimierung, Integralrechnung, Exponential-/Logarithmusfunktionen vertieft, Folgen/Reihen, Stochastik vertieft (bedingte Wahrscheinlichkeit, Verteilungen), Vektorgeometrie vertieft, Wahlthemen (komplexe Zahlen, Matrizen, Kegelschnitte) | 3.1.1.c, 3.1.1.d, 3.1.2.a, 3.1.2.b, 3.1.3.a, 3.1.3.b, 3.1.3.c, 3.1.3.d, 3.1.4.a, 3.1.4.b, 3.1.5.a, 3.1.5.b, 3.2.1.a, 3.2.1.b, 3.2.2.a, 3.2.2.b, 3.2.2.c, 3.2.3.b, 3.2.3.c, 3.3.1.a, 3.3.1.b, 3.4.1.a, 3.4.1.b, 3.5.1.a |

## Beobachtete Luecken (fuer kuenftige Iterationen)

- Klasse 1-4 haben bislang nur grobe Sublevel-Zuordnungen; ein eigener,
  feinerer Grundschul-Sublevel-Zweig (z.B. `1.1.1.a` weiter unterteilt nach
  Zahlenraum 100/1000/1.000.000) existiert noch nicht.
- Klasse 7 und 8 teilen sich aktuell den Einstieg in lineare Gleichungen
  (`2.1.1.a`); eine praezisere Trennung nach Klassenstufe waere sinnvoll,
  sobald ein bundeslandspezifischer Lehrplan priorisiert wird.
- Wahlthemen der Oberstufe (Matrizen, Kegelschnitte, komplexe Zahlen) sind in
  L3 vorhanden, werden aber nicht in allen Bundeslaendern/Schulformen in
  Klasse 12 unterrichtet; die Zuordnung ist bewusst als "Wahlthemen"
  gekennzeichnet.

## Naechster Schritt

Diese Matrix ist die Grundlage fuer die im Backlog folgenden Aufgaben:
- Ingenieurmathematik-Abdeckungsmatrix bis Master-Niveau (L4-L5)
- Erweiterung der L6-Forschungsthemen

Sobald konkrete Bundeslaender priorisiert werden, kann diese Matrix pro
Bundesland verfeinert und mit echten Lehrplan-Referenzen verlinkt werden.
