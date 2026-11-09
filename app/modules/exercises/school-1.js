/* SOR Aufgaben: Schule Klasse 1 bis 6 (CM-S-01 … CM-S-17, 48 … 50). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, H = E.H, M = E.M, n = H.n, m = H.m;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: ok }; }

    E.add({ id: "s01-plus-minus-20", topic: "CM-S-01", title: "Plus und Minus bis 20", gen: function (r, d) {
        var a, b, s;
        if (d === 1) {
            a = r.int(2, 8); b = r.int(1, 10 - a); s = a + b;
            if (r.bool()) return Q("Rechne: " + m(a + " + " + b), A.num(s), "Zähle von " + a + " aus " + b + " weiter.", [a + " + " + b + " = " + s], s - b === a);
            return Q("Rechne: " + m(s + " − " + b), A.num(a), "Zähle von " + s + " aus " + b + " zurück.", [s + " − " + b + " = " + a], a + b === s);
        }
        a = r.int(5, 9); b = r.int(11 - a, 9); s = a + b;
        var toTen = 10 - a;
        if (d === 2) {
            if (r.bool()) return Q("Rechne: " + m(a + " + " + b), A.num(s), "Rechne erst bis zur 10: " + a + " + " + toTen + " = 10.", [a + " + " + toTen + " = 10", "Es fehlen noch " + (b - toTen) + ": 10 + " + (b - toTen) + " = " + s], s - b === a);
            return Q("Rechne: " + m(s + " − " + b), A.num(a), "Rechne erst zurück bis zur 10.", [s + " − " + (s - 10) + " = 10", "10 − " + (b - (s - 10)) + " = " + a], a + b === s);
        }
        return Q("Welche Zahl fehlt? " + m(a + " + ▢ = " + s), A.num(b), "Rechne " + s + " − " + a + ".", ["Die fehlende Zahl ist " + s + " − " + a + " = " + b, "Probe: " + a + " + " + b + " = " + s], a + b === s);
    } });

    var SHAPES = [["Dreieck", 3], ["Quadrat", 4], ["Rechteck", 4], ["Fünfeck", 5], ["Sechseck", 6], ["Kreis", 0]];
    E.add({ id: "s03-formen", topic: "CM-S-03", title: "Ebene Grundformen", gen: function (r, d) {
        var s = r.pick(SHAPES), t;
        if (d === 1) return Q("Wie viele Ecken hat ein " + s[0] + "?", A.num(s[1]), "Stell dir die Form vor und zähle die Spitzen.", ["Ein " + s[0] + " hat " + s[1] + " Ecken."], SHAPES.filter(function (x) { return x[0] === s[0]; })[0][1] === s[1]);
        if (d === 2) {
            do { t = r.pick(SHAPES); } while (t[0] === s[0]);
            return Q("Ein " + s[0] + " und ein " + t[0] + " liegen auf dem Tisch. Wie viele Ecken haben beide zusammen?", A.num(s[1] + t[1]), "Zähle die Ecken jeder Form einzeln und addiere.", [s[0] + ": " + s[1] + " Ecken", t[0] + ": " + t[1] + " Ecken", "Zusammen: " + s[1] + " + " + t[1] + " = " + (s[1] + t[1])], s[1] + t[1] >= 0);
        }
        var props = [["hat 3 Ecken und 3 Seiten", "Dreieck"], ["hat 4 gleich lange Seiten und 4 rechte Winkel", "Quadrat"], ["hat keine Ecke und ist überall gleich rund", "Kreis"], ["hat 6 Ecken", "Sechseck"], ["hat 5 Ecken", "Fünfeck"]];
        var p = r.pick(props);
        return Q("Welche Form " + p[0] + "?", A.choice(r, p[1], r.shuffle(SHAPES.map(function (x) { return x[0]; }).filter(function (x) { return x !== p[1] && !(p[1] === "Quadrat" && x === "Rechteck"); }))), "Gehe die Formen der Reihe nach durch.", ["Die Beschreibung passt zum " + p[1] + "."], true);
    } });

    E.add({ id: "s04-muster", topic: "CM-S-04", title: "Muster und Zahlenfolgen", gen: function (r, d) {
        var seq = [], a, k, i, next, rule;
        if (d === 1) { a = r.int(1, 9); k = r.int(2, 5); for (i = 0; i < 4; i += 1) seq.push(a + i * k); next = a + 4 * k; rule = "immer + " + k; }
        else if (d === 2) { k = r.int(3, 9); a = r.int(50, 90); for (i = 0; i < 4; i += 1) seq.push(a - i * k); next = a - 4 * k; rule = "immer − " + k; }
        else if (r.bool()) { a = r.int(1, 4); for (i = 0; i < 4; i += 1) seq.push(a * Math.pow(2, i)); next = a * 16; rule = "immer · 2"; }
        else { a = r.int(1, 6); k = r.int(1, 3); var k2 = k + r.int(1, 3); seq = [a, a + k, a + k + k2, a + 2 * k + k2, a + 2 * k + 2 * k2]; next = a + 3 * k + 2 * k2; rule = "abwechselnd + " + k + " und + " + k2; }
        var diffs = seq.slice(1).map(function (v, j) { return v - seq[j]; });
        return Q("Wie geht die Folge weiter? " + m(seq.join(", ") + ", ▢"), A.num(next), "Schau dir an, wie man von einer Zahl zur nächsten kommt.", ["Regel: " + rule, "Nächste Zahl: " + next], d === 1 || d === 2 ? next - seq[3] === diffs[0] : (seq.length === 4 ? next / seq[3] === 2 : next - seq[4] === diffs[0]));
    } });

    E.add({ id: "s02-groessen", topic: "CM-S-02", title: "Geld, Uhrzeit und Längen", gen: function (r, d) {
        var pad = function (x) { return (x < 10 ? "0" : "") + x; };
        if (d === 3) {
            var h1 = r.int(7, 14), m1 = r.pick([5, 10, 15, 20, 25, 35, 40, 45, 50]), dur = r.int(4, 28) * 5, end = h1 * 60 + m1 + dur;
            return Q("Der Film beginnt um " + h1 + ":" + pad(m1) + " Uhr und endet um " + Math.floor(end / 60) + ":" + pad(end % 60) + " Uhr. Wie viele Minuten dauert er?", A.num(dur, { unit: "min" }), "Rechne zuerst bis zur nächsten vollen Stunde.", ["Bis zur vollen Stunde: " + (60 - m1) + " min", "Danach bis zum Ende: " + (dur - (60 - m1)) + " min", "Zusammen: " + dur + " min"], h1 * 60 + m1 + dur === end);
        }
        var t = r.int(0, 2), a = r.int(1, d === 1 ? 5 : 9), b = d === 1 ? 0 : (t === 0 ? r.pick([10, 15, 20, 30, 45]) : r.int(1, 19) * 5);
        var spec = [["h", "min", 60], ["€", "ct", 100], ["m", "cm", 100]][t], total = a * spec[2] + b;
        return Q("Wie viele " + spec[1] + " sind " + a + " " + spec[0] + (b ? " " + b + " " + spec[1] : "") + "?", A.num(total, { unit: spec[1] }), "1 " + spec[0] + " = " + spec[2] + " " + spec[1] + ".", [a + " " + spec[0] + " = " + a + " · " + spec[2] + " " + spec[1] + " = " + a * spec[2] + " " + spec[1]].concat(b ? [a * spec[2] + " + " + b + " = " + total + " " + spec[1]] : []), (total - b) / spec[2] === a);
    } });

    E.add({ id: "s48-zehner", topic: "CM-S-48", title: "Rechnen bis 100", gen: function (r, d) {
        var t = r.int(2, 8), o, b, a, s;
        if (d === 1) { o = r.int(1, 7); b = r.int(1, 9 - o); a = t * 10 + o; s = a + b; return Q("Rechne: " + m(a + " + " + b), A.num(s), "Die Zehner bleiben gleich, nur die Einer ändern sich.", [o + " + " + b + " = " + (o + b), "Also " + a + " + " + b + " = " + s], s - a === b); }
        if (d === 2) { o = r.int(3, 9); b = r.int(11 - o, 9); a = t * 10 + o; s = a + b; return Q("Rechne: " + m(a + " + " + b), A.num(s), "Fülle zuerst bis zum nächsten Zehner auf.", [a + " + " + (10 - o) + " = " + (a + 10 - o), (a + 10 - o) + " + " + (b - 10 + o) + " = " + s], s - b === a); }
        a = r.int(25, 60); b = r.int(15, 39); s = a + b;
        if (r.bool()) return Q("Rechne: " + m(a + " + " + b), A.num(s), "Addiere erst die Zehner, dann die Einer.", [a + " + " + Math.floor(b / 10) * 10 + " = " + (a + Math.floor(b / 10) * 10), (a + Math.floor(b / 10) * 10) + " + " + b % 10 + " = " + s], s - a === b);
        return Q("Rechne: " + m(s + " − " + b), A.num(a), "Ziehe erst die Zehner ab, dann die Einer.", [s + " − " + Math.floor(b / 10) * 10 + " = " + (s - Math.floor(b / 10) * 10), (s - Math.floor(b / 10) * 10) + " − " + b % 10 + " = " + a], a + b === s);
    } });

    E.add({ id: "s49-einmaleins", topic: "CM-S-49", title: "Kleines Einmaleins", gen: function (r, d) {
        var a = d === 1 ? r.pick([2, 5, 10]) : r.int(3, 9), b = d === 1 ? r.int(1, 10) : r.int(3, 9), p = a * b, sum = 0;
        for (var i = 0; i < b; i += 1) sum += a;
        if (d < 3) return Q("Rechne: " + m(a + " · " + b), A.num(p), b + " mal die " + a + " addieren.", [a + " · " + b + " = " + p], sum === p);
        if (r.bool()) return Q("Rechne: " + m(p + " : " + a), A.num(b), "Welche Zahl mal " + a + " ergibt " + p + "?", [b + " · " + a + " = " + p, "Also " + p + " : " + a + " = " + b], sum === p);
        return Q("Welche Zahl fehlt? " + m(a + " · ▢ = " + p), A.num(b), "Teile " + p + " durch " + a + ".", [p + " : " + a + " = " + b], sum === p);
    } });

    function colAdd(a, b) {
        var steps = [], carry = 0, names = ["Einer", "Zehner", "Hunderter", "Tausender"], i = 0;
        while (a > 0 || b > 0 || carry) {
            var s = a % 10 + b % 10 + carry;
            steps.push(names[i] + ": " + a % 10 + " + " + b % 10 + (carry ? " + " + carry + " (Übertrag)" : "") + " = " + s + (s > 9 ? ", schreibe " + s % 10 + ", merke 1" : ""));
            carry = s > 9 ? 1 : 0; a = Math.floor(a / 10); b = Math.floor(b / 10); i += 1;
            if (i > 4) break;
        }
        return steps;
    }
    E.add({ id: "s05-schriftlich-plus", topic: "CM-S-05", title: "Schriftlich addieren und subtrahieren", gen: function (r, d) {
        var a = d === 3 ? r.int(1200, 5800) : r.int(120, 580), b = d === 3 ? r.int(1100, 3900) : r.int(110, 390), s = a + b;
        if (d === 1 || (d === 3 && r.bool())) return Q("Rechne schriftlich: " + m(a + " + " + b), A.num(s), "Schreibe die Zahlen stellengerecht untereinander und beginne bei den Einern.", colAdd(a, b).concat(["Ergebnis: " + s]), s - a === b);
        return Q("Rechne schriftlich: " + m(s + " − " + b), A.num(a), "Rechne von rechts nach links und entbündle, wenn die obere Ziffer zu klein ist.", ["Ergebnis: " + a, "Probe mit Plus: " + a + " + " + b + " = " + s], a + b === s);
    } });

    E.add({ id: "s06-rechteck", topic: "CM-S-06", title: "Umfang und Fläche", gen: function (r, d) {
        var a = r.int(3, 12), b = r.int(2, 9), U = 2 * (a + b), F = a * b;
        while (b === a) b = r.int(2, 9);
        U = 2 * (a + b); F = a * b;
        if (d === 1) {
            if (r.bool()) return Q("Ein Rechteck ist " + a + " cm lang und " + b + " cm breit. Wie groß ist der Umfang?", A.num(U, { unit: "cm" }), "Der Umfang ist der Weg einmal außen herum.", ["U = 2 · (a + b)", "U = 2 · (" + a + " + " + b + ") = " + U + " cm"], a + b + a + b === U);
            return Q("Ein Rechteck ist " + a + " cm lang und " + b + " cm breit. Wie groß ist der Flächeninhalt?", A.num(F, { unit: "cm²" }), "Länge mal Breite.", ["A = a · b", "A = " + a + " · " + b + " = " + F + " cm²"], F / a === b);
        }
        if (d === 2) return Q("Ein Rechteck ist " + a + " cm lang und " + b + " cm breit. Berechne Umfang und Flächeninhalt.", A.multi([{ l: "U (cm)", a: A.num(U) }, { l: "A (cm²)", a: A.num(F) }]), "U = 2 · (a + b) und A = a · b.", ["U = 2 · (" + a + " + " + b + ") = " + U + " cm", "A = " + a + " · " + b + " = " + F + " cm²"], a + b + a + b === U && F / b === a);
        if (r.bool()) return Q("Ein Rechteck hat den Flächeninhalt " + F + " cm² und ist " + a + " cm lang. Wie breit ist es?", A.num(b, { unit: "cm" }), "Teile die Fläche durch die Länge.", ["b = A : a", "b = " + F + " : " + a + " = " + b + " cm"], a * b === F);
        return Q("Ein Rechteck hat den Umfang " + U + " cm und ist " + a + " cm lang. Wie breit ist es?", A.num(b, { unit: "cm" }), "Der halbe Umfang ist Länge plus Breite.", ["a + b = U : 2 = " + U / 2, "b = " + U / 2 + " − " + a + " = " + b + " cm"], 2 * (a + b) === U);
    } });

    E.add({ id: "s08-umrechnen", topic: "CM-S-08", title: "Größen umrechnen", gen: function (r, d) {
        var u = r.pick([["kg", "g", 1000], ["km", "m", 1000], ["l", "ml", 1000], ["m", "cm", 100], ["cm", "mm", 10], ["t", "kg", 1000]]), f = u[2], small, big;
        if (d === 1) { big = r.int(2, 12); small = big * f; return Q("Rechne um: " + m(big + " " + u[0] + " = ▢ " + u[1]), A.num(small, { unit: u[1] }), "1 " + u[0] + " = " + f + " " + u[1] + ".", [big + " · " + f + " = " + small + " " + u[1]], small / f === big); }
        small = f === 1000 ? r.int(1, 39) * 250 : (f === 100 ? r.int(21, 99) * 5 : r.int(11, 99)); big = small / f;
        if (d === 2) return Q("Rechne um: " + m(n(big) + " " + u[0] + " = ▢ " + u[1]), A.num(small, { unit: u[1] }), "Multipliziere mit " + f + ": Das Komma rückt nach rechts.", [n(big) + " · " + f + " = " + small + " " + u[1]], M.near(small / f, big));
        return Q("Rechne um: " + m(small + " " + u[1] + " = ▢ " + u[0]), A.num(big, { unit: u[0] }), "Teile durch " + f + ": Das Komma rückt nach links.", [small + " : " + f + " = " + n(big) + " " + u[0]], M.near(big * f, small));
    } });

    E.add({ id: "s10-zufall", topic: "CM-S-10", title: "Sicher, möglich, unmöglich", gen: function (r, d) {
        if (d === 1) {
            var st = r.pick([["mit einem normalen Würfel eine 7 würfeln", "unmöglich"], ["mit einem normalen Würfel eine Zahl kleiner als 7 würfeln", "sicher"], ["mit einem normalen Würfel eine 6 würfeln", "möglich, aber nicht sicher"], ["aus einem Beutel mit nur roten Kugeln eine rote ziehen", "sicher"], ["aus einem Beutel mit nur roten Kugeln eine blaue ziehen", "unmöglich"], ["beim Münzwurf Zahl werfen", "möglich, aber nicht sicher"]]);
            return Q("Wie ist das Ereignis? Du willst " + st[0] + ".", A.choice(r, st[1], ["sicher", "unmöglich", "möglich, aber nicht sicher"]), "Überlege, welche Ergebnisse überhaupt vorkommen können.", ["Das Ereignis ist " + st[1] + "."], true);
        }
        var red = r.int(1, 5), blue = r.int(1, 5), green = r.int(1, 4), tot = red + blue + green, bag = [], i, cnt = 0;
        for (i = 0; i < red; i += 1) bag.push("r"); for (i = 0; i < blue; i += 1) bag.push("b"); for (i = 0; i < green; i += 1) bag.push("g");
        var text = "In einem Beutel liegen " + red + " rote, " + blue + " blaue und " + green + " grüne Kugeln. Du ziehst eine Kugel, ohne hinzusehen. ";
        if (d === 2) { cnt = bag.filter(function (x) { return x === "r"; }).length; return Q(text + "Wie groß ist die Wahrscheinlichkeit für Rot? Gib einen Bruch an.", A.frac(red, tot), "Günstige durch mögliche Ergebnisse.", ["Mögliche Ergebnisse: " + tot + " Kugeln", "Günstig: " + red + " rote", "P(rot) = " + H.q(red, tot)], cnt === red && bag.length === tot); }
        cnt = bag.filter(function (x) { return x !== "r"; }).length;
        return Q(text + "Wie groß ist die Wahrscheinlichkeit, dass die Kugel nicht rot ist? Gib einen Bruch an.", A.frac(blue + green, tot), "Zähle alle Kugeln, die nicht rot sind.", ["Nicht rot: " + blue + " + " + green + " = " + (blue + green), "P(nicht rot) = " + H.q(blue + green, tot)], cnt === blue + green);
    } });

    E.add({ id: "s50-mal-geteilt", topic: "CM-S-50", title: "Schriftlich multiplizieren und dividieren", gen: function (r, d) {
        var a, b, p;
        if (d === 1) { a = r.int(12, 89); b = r.int(3, 9); p = a * b; return Q("Rechne: " + m(a + " · " + b), A.num(p), "Zerlege " + a + " in Zehner und Einer.", [Math.floor(a / 10) * 10 + " · " + b + " = " + Math.floor(a / 10) * 10 * b, a % 10 + " · " + b + " = " + (a % 10) * b, "Zusammen: " + p], p / b === a); }
        if (d === 2) { a = r.int(12, 49); b = r.int(11, 29); p = a * b; return Q("Rechne: " + m(a + " · " + b), A.num(p), "Rechne erst mit den Zehnern von " + b + ", dann mit den Einern.", [a + " · " + Math.floor(b / 10) * 10 + " = " + a * Math.floor(b / 10) * 10, a + " · " + b % 10 + " = " + a * (b % 10), "Zusammen: " + p], p / a === b); }
        b = r.int(3, 9); a = r.int(34, 198); p = a * b;
        return Q("Rechne schriftlich: " + m(p + " : " + b), A.num(a), "Teile Stelle für Stelle von links nach rechts.", ["Ergebnis: " + a, "Probe: " + a + " · " + b + " = " + p], a * b === p);
    } });

    E.add({ id: "s07-quader", topic: "CM-S-07", title: "Würfel und Quader", gen: function (r, d) {
        var a = r.int(2, 9), b = r.int(2, 8), c = r.int(2, 6), V = a * b * c, O = 2 * (a * b + a * c + b * c), cnt = 0, i, j, k;
        for (i = 0; i < a; i += 1) for (j = 0; j < b; j += 1) for (k = 0; k < c; k += 1) cnt += 1;
        var txt = "Ein Quader hat die Kanten a = " + a + " cm, b = " + b + " cm und c = " + c + " cm. ";
        if (d === 1) return Q(txt + "Wie groß ist sein Volumen?", A.num(V, { unit: "cm³" }), "V = a · b · c.", ["V = " + a + " · " + b + " · " + c, "V = " + V + " cm³"], cnt === V);
        if (d === 2) return Q(txt + "Wie groß ist seine Oberfläche?", A.num(O, { unit: "cm²" }), "Ein Quader hat 6 Flächen, je zwei sind gleich.", ["O = 2 · (a·b + a·c + b·c)", "O = 2 · (" + a * b + " + " + a * c + " + " + b * c + ") = " + O + " cm²"], O === a * b * 2 + a * c * 2 + b * c * 2);
        return Q("Ein Quader hat das Volumen " + V + " cm³. Zwei Kanten sind " + a + " cm und " + b + " cm lang. Wie lang ist die dritte Kante?", A.num(c, { unit: "cm" }), "Teile das Volumen durch die Grundfläche.", ["Grundfläche: " + a + " · " + b + " = " + a * b + " cm²", "c = " + V + " : " + a * b + " = " + c + " cm"], cnt === V);
    } });

    E.add({ id: "s09-diagramm", topic: "CM-S-09", title: "Daten in Diagrammen", gen: function (r, d) {
        var labels = ["Mo", "Di", "Mi", "Do"], v = labels.map(function () { return r.int(2, 12); }), sum, i;
        if (d === 3) { sum = v[0] + v[1] + v[2]; v[3] = 4 * r.int(Math.ceil((sum + 2) / 4), Math.ceil((sum + 2) / 4) + 2) - sum; }
        sum = v.reduce(function (x, y) { return x + y; }, 0);
        var fig = H.bars(labels, v), intro = "Das Diagramm zeigt, wie viele Bücher an vier Tagen ausgeliehen wurden. ";
        if (d === 1) { i = r.int(0, 3); var j = (i + r.int(1, 3)) % 4; return Q(intro + "Wie viele Bücher waren es am " + labels[i] + " und am " + labels[j] + " zusammen?" + fig, A.num(v[i] + v[j]), "Lies beide Säulenhöhen ab.", [labels[i] + ": " + v[i] + ", " + labels[j] + ": " + v[j], "Zusammen: " + (v[i] + v[j])], true); }
        if (d === 2) { var mx = Math.max.apply(null, v), mn = Math.min.apply(null, v); return Q(intro + "Wie groß ist der Unterschied zwischen dem stärksten und dem schwächsten Tag?" + fig, A.num(mx - mn), "Suche die höchste und die niedrigste Säule.", ["Höchster Wert: " + mx, "Niedrigster Wert: " + mn, "Unterschied: " + (mx - mn)], v.every(function (x) { return x <= mx && x >= mn; })); }
        return Q(intro + "Wie viele Bücher waren es im Durchschnitt pro Tag?" + fig, A.num(sum / 4), "Addiere alle Werte und teile durch die Anzahl der Tage.", ["Summe: " + v.join(" + ") + " = " + sum, "Durchschnitt: " + sum + " : 4 = " + sum / 4], sum % 4 === 0);
    } });

    E.add({ id: "s11-ggt-kgv", topic: "CM-S-11", title: "ggT und kgV", gen: function (r, d) {
        if (d === 3) {
            var ps = r.shuffle([2, 2, 3, 3, 5, 7, 11, 13]).slice(0, r.int(3, 4)).sort(function (x, y) { return x - y; }), N = ps.reduce(function (x, y) { return x * y; }, 1);
            return Q("Zerlege " + N + " in Primfaktoren. Wie heißt der größte Primfaktor?", A.num(ps[ps.length - 1]), "Teile so lange durch 2, 3, 5, 7 …, bis nur noch Primzahlen übrig sind.", [N + " = " + ps.join(" · "), "Größter Primfaktor: " + ps[ps.length - 1]], ps.every(M.isPrime) && ps.reduce(function (x, y) { return x * y; }, 1) === N);
        }
        var g = r.int(2, 9), p, q;
        do { p = r.int(2, 7); q = r.int(2, 9); } while (M.gcd(p, q) !== 1 || p === q);
        var a = g * p, b = g * q, brute = 1, i;
        for (i = 1; i <= Math.min(a, b); i += 1) if (a % i === 0 && b % i === 0) brute = i;
        if (d === 1) return Q("Bestimme den größten gemeinsamen Teiler von " + a + " und " + b + ".", A.num(g), "Schreibe die Teiler beider Zahlen auf und suche den größten gemeinsamen.", [a + " = " + g + " · " + p, b + " = " + g + " · " + q, "ggT = " + g], brute === g);
        var l = a * b / g, bl = Math.max(a, b);
        while (bl % a !== 0 || bl % b !== 0) bl += 1;
        return Q("Bestimme das kleinste gemeinsame Vielfache von " + a + " und " + b + ".", A.num(l), "Gehe die Vielfachen der größeren Zahl durch.", ["ggT(" + a + ", " + b + ") = " + g, "kgV = " + a + " · " + b + " : " + g + " = " + l], bl === l);
    } });

    E.add({ id: "s11-primzahl", topic: "CM-S-11", title: "Primzahlen erkennen", gen: function (r, d) {
        var primes = d === 1 ? [11, 13, 17, 19, 23, 29] : [31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97], comp = d === 1 ? [9, 15, 21, 25, 27] : [33, 39, 49, 51, 57, 63, 69, 77, 87, 91, 93];
        var p = r.pick(primes), wrong = r.shuffle(comp).slice(0, 3);
        return Q("Welche dieser Zahlen ist eine Primzahl?", A.choice(r, String(p), wrong.map(String)), "Eine Primzahl hat genau zwei Teiler: 1 und sich selbst. Prüfe die Teilbarkeit durch 3 und 7.", wrong.map(function (w) { for (var t = 2; t < w; t += 1) if (w % t === 0) return w + " = " + t + " · " + w / t; return ""; }).concat([p + " ist nur durch 1 und " + p + " teilbar."]), M.isPrime(p) && !wrong.some(M.isPrime));
    } });

    E.add({ id: "s14-runden", topic: "CM-S-14", title: "Runden und Überschlagen", gen: function (r, d) {
        var x, st, res;
        if (d === 1) { x = r.int(1234, 9876); st = r.pick([10, 100]); res = Math.round(x / st) * st; return Q("Runde " + x + " auf " + (st === 10 ? "Zehner" : "Hunderter") + ".", A.num(res), "Schau auf die Ziffer rechts von der Rundungsstelle: ab 5 wird aufgerundet.", ["Die entscheidende Ziffer ist " + Math.floor(x / (st / 10)) % 10 + ".", "Ergebnis: " + res], Math.abs(res - x) <= st / 2 && res % st === 0); }
        if (d === 2) { x = r.int(1011, 9989) / 100; var dec = r.pick([1, 0]); res = M.round(x, dec); return Q("Runde " + n(x) + " auf " + (dec ? "eine Nachkommastelle" : "Einer") + ".", A.num(res), "Schau auf die Stelle direkt rechts daneben.", ["Ergebnis: " + n(res)], Math.abs(res - x) <= 0.5 * Math.pow(10, -dec) + 1e-9); }
        var a = r.int(21, 89) * 10 + r.pick([-3, -2, -1, 1, 2, 3]), b = r.int(2, 6) * 10 + r.pick([-2, -1, 1, 2]), ra = Math.round(a / 10) * 10, rb = Math.round(b / 10) * 10;
        return Q("Überschlage " + m(a + " · " + b) + ", indem du beide Zahlen zuerst auf Zehner rundest. Was erhältst du?", A.num(ra * rb), "Runde erst, multipliziere dann.", [a + " ≈ " + ra + ", " + b + " ≈ " + rb, ra + " · " + rb + " = " + ra * rb, "Zum Vergleich der genaue Wert: " + a * b], Math.abs(ra * rb - a * b) / (a * b) < 0.2);
    } });

    E.add({ id: "s16-flaechen", topic: "CM-S-16", title: "Zusammengesetzte Flächen", gen: function (r, d) {
        var W = r.int(6, 12), Hh = r.int(5, 9), w = r.int(2, W - 3), h = r.int(2, Hh - 2), s = Math.min(200 / W, 110 / (Hh + 3)), ox = 50, oy = 20, P = function (x, y) { return (ox + x * s).toFixed(1) + "," + (oy + y * s).toFixed(1); };
        var lab = function (x, y, t) { return '<text x="' + (ox + x * s).toFixed(1) + '" y="' + (oy + y * s).toFixed(1) + '" font-size="11" fill="#cdd4e6" text-anchor="middle">' + t + "</text>"; };
        if (d === 3) {
            if (W % 2) W += 1;
            var t = r.int(2, 4), figH = H.fig('<polygon points="' + [P(0, t), P(W / 2, 0), P(W, t), P(W, t + Hh), P(0, t + Hh)].join(" ") + '" fill="rgba(53,224,196,0.18)" stroke="#35e0c4" stroke-width="2"/><line x1="' + (ox) + '" y1="' + (oy + t * s) + '" x2="' + (ox + W * s) + '" y2="' + (oy + t * s) + '" stroke="#35e0c4" stroke-dasharray="4 3"/>' + lab(W / 2, t + Hh + 1.3, W + " cm") + lab(-1.6, t + Hh / 2, Hh + " cm") + lab(W + 1.7, t / 2 + 0.3, t + " cm"), 300, 20 + (t + Hh + 2) * s, "Rechteck mit Dreieck");
            var area = W * Hh + W * t / 2;
            return Q("Die Figur besteht aus einem Rechteck (" + W + " cm breit, " + Hh + " cm hoch) und einem Dreieck darüber (Höhe " + t + " cm). Wie groß ist die gesamte Fläche?" + figH, A.num(area, { unit: "cm²" }), "Zerlege in Rechteck und Dreieck. Dreieck: Grundseite mal Höhe durch 2.", ["Rechteck: " + W + " · " + Hh + " = " + W * Hh + " cm²", "Dreieck: " + W + " · " + t + " : 2 = " + W * t / 2 + " cm²", "Zusammen: " + area + " cm²"], M.near(area, W * (Hh + t) - W * t / 2));
        }
        var fig = H.fig('<polygon points="' + [P(0, 0), P(W - w, 0), P(W - w, h), P(W, h), P(W, Hh), P(0, Hh)].join(" ") + '" fill="rgba(245,197,24,0.16)" stroke="#f5c518" stroke-width="2"/>' + lab(W / 2, Hh + 1.3, W + " cm") + lab(-1.6, Hh / 2, Hh + " cm") + lab((W - w) / 2, -0.4, (W - w) + " cm") + lab(W + 1.7, h + (Hh - h) / 2, (Hh - h) + " cm") + lab(W - w / 2, h - 0.4, w + " cm") + lab(W - w - 1.4, h / 2 + 0.3, h + " cm"), 300, 20 + (Hh + 2) * s, "L-förmige Fläche");
        var areaL = W * Hh - w * h;
        if (d === 1) return Q("Berechne den Flächeninhalt der Figur." + fig, A.num(areaL, { unit: "cm²" }), "Ergänze zum großen Rechteck und ziehe die fehlende Ecke ab. Oder zerlege in zwei Rechtecke.", ["Großes Rechteck: " + W + " · " + Hh + " = " + W * Hh + " cm²", "Fehlende Ecke: " + w + " · " + h + " = " + w * h + " cm²", "A = " + W * Hh + " − " + w * h + " = " + areaL + " cm²"], areaL === (W - w) * Hh + w * (Hh - h));
        var U = 2 * (W + Hh);
        return Q("Berechne den Umfang der Figur." + fig, A.num(U, { unit: "cm" }), "Addiere alle sechs Seitenlängen.", ["U = " + [W, Hh, W - w, h, w, Hh - h].join(" + "), "U = " + U + " cm"], W + Hh + (W - w) + h + w + (Hh - h) === U);
    } });

    E.add({ id: "s12-negativ", topic: "CM-S-12", title: "Negative Zahlen", gen: function (r, d) {
        var a = r.nz(-9, 9), b = r.nz(-9, 9), c;
        var p = function (x) { return x < 0 ? "(" + n(x) + ")" : n(x); };
        if (d === 1) { if (a > 0 && b > 0) a = -a; return Q("Rechne: " + m(n(a) + " + " + p(b)), A.num(a + b), "Stell dir den Zahlenstrahl vor: Plus heißt nach rechts, eine negative Zahl addieren heißt nach links.", ["Starte bei " + n(a) + " und gehe " + Math.abs(b) + " Schritte nach " + (b > 0 ? "rechts" : "links") + ".", "Ergebnis: " + n(a + b)], a + b - b === a); }
        if (d === 2) {
            if (r.bool()) { if (a > 0 && b > 0) b = -b; return Q("Rechne: " + m(p(a) + " · " + p(b)), A.num(a * b), "Gleiche Vorzeichen ergeben Plus, verschiedene Minus.", ["Betrag: " + Math.abs(a) + " · " + Math.abs(b) + " = " + Math.abs(a * b), "Vorzeichen: " + (a * b > 0 ? "plus" : "minus"), "Ergebnis: " + n(a * b)], (a * b) / b === a); }
            if (b > 0) b = -b;
            return Q("Rechne: " + m(n(a) + " − " + p(b)), A.num(a - b), "Minus eine negative Zahl ist dasselbe wie Plus.", [n(a) + " − " + p(b) + " = " + n(a) + " + " + Math.abs(b), "Ergebnis: " + n(a - b)], a - b + b === a);
        }
        c = r.int(1, 9); b = r.int(1, 9); if (c <= b) c = b + r.int(1, 5); a = -Math.abs(a);
        return Q("Rechne: " + m(n(a) + " · (" + b + " − " + c + ")"), A.num(a * (b - c)), "Erst die Klammer, dann multiplizieren.", ["Klammer: " + b + " − " + c + " = " + n(b - c), n(a) + " · " + p(b - c) + " = " + n(a * (b - c))], a * b - a * c === a * (b - c));
    } });

    E.add({ id: "s15-winkel", topic: "CM-S-15", title: "Winkel im Dreieck", gen: function (r, d) {
        var al, be, ga;
        if (d === 1) { al = r.int(25, 85); be = r.int(30, 150 - al); ga = 180 - al - be; return Q("In einem Dreieck sind α = " + al + "° und β = " + be + "°. Wie groß ist γ?", A.num(ga, { unit: "°" }), "Die drei Innenwinkel ergeben zusammen 180°.", ["γ = 180° − α − β", "γ = 180° − " + al + "° − " + be + "° = " + ga + "°"], al + be + ga === 180 && ga > 0); }
        if (d === 2) { al = r.int(25, 155); return Q("Zwei Geraden schneiden sich. Ein Winkel ist " + al + "° groß. Wie groß ist sein Nebenwinkel?", A.num(180 - al, { unit: "°" }), "Nebenwinkel liegen nebeneinander an einer Geraden und ergeben zusammen 180°.", ["Nebenwinkel = 180° − " + al + "° = " + (180 - al) + "°"], al + (180 - al) === 180); }
        ga = 2 * r.int(10, 70); al = (180 - ga) / 2;
        return Q("Ein gleichschenkliges Dreieck hat an der Spitze den Winkel γ = " + ga + "°. Wie groß ist jeder Basiswinkel?", A.num(al, { unit: "°" }), "Die beiden Basiswinkel sind gleich groß.", ["Für beide Basiswinkel bleiben 180° − " + ga + "° = " + (180 - ga) + "°", "Jeder Basiswinkel: " + (180 - ga) + "° : 2 = " + al + "°"], 2 * al + ga === 180);
    } });

    E.add({ id: "s13-bruch-plus", topic: "CM-S-13", title: "Brüche addieren und subtrahieren", gen: function (r, d) {
        var b, a, c, e;
        if (d === 1) { b = r.int(5, 12); a = r.int(1, b - 3); c = r.int(1, b - a - 1); return Q("Rechne: " + m(H.fr(a, b) + " + " + H.fr(c, b)), A.frac(a + c, b), "Bei gleichem Nenner addierst du nur die Zähler.", [H.fr(a, b) + " + " + H.fr(c, b) + " = " + H.fr(a + c, b), "Gekürzt: " + H.q(a + c, b)], M.near((a + c) / b, a / b + c / b)); }
        do { b = r.int(2, 8); e = r.int(2, 9); } while (b === e);
        a = r.int(1, b - 1); c = r.int(1, e - 1);
        var l = M.lcm(b, e), x = a * l / b, y = c * l / e;
        if (d === 2) return Q("Rechne: " + m(H.fr(a, b) + " + " + H.fr(c, e)), A.frac(x + y, l), "Bringe beide Brüche auf den gemeinsamen Nenner " + l + ".", [H.fr(a, b) + " = " + H.fr(x, l) + " und " + H.fr(c, e) + " = " + H.fr(y, l), H.fr(x, l) + " + " + H.fr(y, l) + " = " + H.fr(x + y, l), "Ergebnis: " + H.q(x + y, l)], M.near((x + y) / l, a / b + c / e));
        if (x < y) { var t = a; a = c; c = t; t = b; b = e; e = t; t = x; x = y; y = t; }
        if (x === y) { x += l / b; a += 1; }
        return Q("Rechne: " + m(H.fr(a, b) + " − " + H.fr(c, e)), A.frac(x - y, l), "Gemeinsamer Nenner: " + l + ".", [H.fr(a, b) + " = " + H.fr(x, l) + " und " + H.fr(c, e) + " = " + H.fr(y, l), H.fr(x, l) + " − " + H.fr(y, l) + " = " + H.fr(x - y, l), "Ergebnis: " + H.q(x - y, l)], M.near((x - y) / l, a / b - c / e));
    } });

    E.add({ id: "s13-bruch-mal", topic: "CM-S-13", title: "Brüche multiplizieren und dividieren", gen: function (r, d) {
        var a = r.int(1, 7), b = r.int(2, 9), c = r.int(1, 7), e = r.int(2, 9);
        if (d === 1) return Q("Rechne: " + m(H.fr(a, b) + " · " + H.fr(c, e)), A.frac(a * c, b * e), "Zähler mal Zähler, Nenner mal Nenner.", [H.fr(a + " · " + c, b + " · " + e) + " = " + H.fr(a * c, b * e), "Gekürzt: " + H.q(a * c, b * e)], M.near(a * c / (b * e), (a / b) * (c / e)));
        if (d === 2) return Q("Rechne: " + m(H.fr(a, b) + " : " + H.fr(c, e)), A.frac(a * e, b * c), "Durch einen Bruch teilen heißt mit dem Kehrbruch multiplizieren.", [H.fr(a, b) + " · " + H.fr(e, c) + " = " + H.fr(a * e, b * c), "Gekürzt: " + H.q(a * e, b * c)], M.near(a * e / (b * c), (a / b) / (c / e)));
        b = r.pick([3, 4, 5, 6, 8]); a = r.int(1, b - 1); var whole = b * r.int(4, 30);
        return Q("Wie viel sind " + m(H.fr(a, b)) + " von " + whole + " €?", A.num(whole / b * a, { unit: "€" }), "Teile durch den Nenner und multipliziere mit dem Zähler.", [whole + " : " + b + " = " + whole / b, whole / b + " · " + a + " = " + whole / b * a + " €"], M.near(whole * a / b, whole / b * a));
    } });

    E.add({ id: "s13-dezimal", topic: "CM-S-13", title: "Brüche, Dezimalzahlen, Prozent", gen: function (r, d) {
        var den = r.pick([2, 4, 5, 10, 20, 25]), num = r.int(1, den - 1), v = num / den;
        if (d === 1) return Q("Schreibe " + m(H.fr(num, den)) + " als Dezimalzahl.", A.num(v, { tol: 1e-6 }), "Erweitere auf den Nenner 10 oder 100.", [H.fr(num, den) + " = " + H.fr(num * 100 / den, 100), "Das sind " + n(v)], M.near(v * den, num));
        if (d === 2) return Q("Schreibe " + m(n(v)) + " als Prozentzahl.", A.num(v * 100, { unit: "%", tol: 1e-6 }), "Prozent heißt Hundertstel: Multipliziere mit 100.", [n(v) + " · 100 = " + n(v * 100), "Also " + n(v * 100) + " %"], M.near(v * 100 / 100, v));
        var opts = [[H.fr(3, 4), 0.75], ["0,7", 0.7], ["72 %", 0.72], [H.fr(4, 5), 0.8], ["0,65", 0.65], ["78 %", 0.78], [H.fr(3, 5), 0.6], ["0,69", 0.69]], pick = r.shuffle(opts).slice(0, 4), best = pick.slice().sort(function (x, y) { return y[1] - x[1]; })[0];
        return Q("Welche Zahl ist am größten?", A.choice(r, best[0], pick.filter(function (x) { return x !== best; }).map(function (x) { return x[0]; })), "Wandle alle Zahlen in Dezimalzahlen um.", pick.map(function (x) { return x[0] + " = " + n(x[1]); }).concat(["Am größten ist " + best[0] + "."]), pick.every(function (x) { return x[1] <= best[1]; }));
    } });

    E.add({ id: "s13-kuerzen", topic: "CM-S-13", title: "Brüche kürzen", gen: function (r, d) {
        var g = d === 1 ? r.int(2, 5) : (d === 2 ? r.int(4, 9) : r.int(6, 15)), p, q;
        do { p = r.int(1, 8); q = r.int(2, 11); } while (M.gcd(p, q) !== 1 || p >= q);
        return Q("Kürze " + m(H.fr(p * g, q * g)) + " so weit wie möglich.", A.multi([{ l: "Zähler", a: A.num(p) }, { l: "Nenner", a: A.num(q) }]), "Suche den größten gemeinsamen Teiler von Zähler und Nenner.", ["ggT(" + p * g + ", " + q * g + ") = " + g, "Zähler: " + p * g + " : " + g + " = " + p, "Nenner: " + q * g + " : " + g + " = " + q], M.gcd(p * g, q * g) === g);
    } });

    E.add({ id: "s17-mittelwert", topic: "CM-S-17", title: "Mittelwert und Median", gen: function (r, d) {
        var k = d === 2 ? 5 : r.int(4, 5), mean = r.int(5, 14), v, i, sum, last;
        do {
            v = []; sum = 0;
            for (i = 0; i < k - 1; i += 1) { v.push(mean + r.int(-3, 3)); sum += v[i]; }
            last = mean * k - sum;
        } while (last < 1);
        v.push(last); sum += last;
        if (d === 1) return Q("Berechne den Mittelwert der Zahlen " + m(v.join("; ")) + ".", A.num(sum / k), "Summe durch Anzahl.", ["Summe: " + v.join(" + ") + " = " + sum, "Mittelwert: " + sum + " : " + k + " = " + n(sum / k)], sum === mean * k);
        if (d === 2) { var s = v.slice().sort(function (x, y) { return x - y; }); return Q("Bestimme den Median der Zahlen " + m(v.join("; ")) + ".", A.num(s[2]), "Ordne die Zahlen der Größe nach. Der Median steht in der Mitte.", ["Geordnet: " + s.join("; "), "Der mittlere Wert ist " + s[2] + "."], s.filter(function (x) { return x < s[2]; }).length <= 2 && s.filter(function (x) { return x > s[2]; }).length <= 2); }
        var hidden = v[k - 1];
        return Q("Der Mittelwert von " + k + " Zahlen ist " + mean + ". " + (k - 1) + " davon sind " + m(v.slice(0, k - 1).join("; ")) + ". Wie heißt die fehlende Zahl?", A.num(hidden), "Die Summe aller Zahlen ist Mittelwert mal Anzahl.", ["Gesamtsumme: " + mean + " · " + k + " = " + mean * k, "Bekannte Summe: " + (sum - hidden), "Fehlende Zahl: " + mean * k + " − " + (sum - hidden) + " = " + hidden], sum / k === mean);
    } });
})(typeof window !== "undefined" ? window : globalThis);
