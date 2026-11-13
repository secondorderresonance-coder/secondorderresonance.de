/* SOR Aufgaben: Schule Klasse 1 bis 6 (CM-S-01 … CM-S-17, 48 … 50). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var TR = E.tr;
    var A = E.A, H = E.H, M = E.M, n = H.n, m = H.m;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: ok }; }

    E.add({ id: "s01-plus-minus-20", topic: "CM-S-01", title: TR("Plus und Minus bis 20", "Addition and subtraction to 20"), gen: function (r, d) {
        var a, b, s;
        if (d === 1) {
            a = r.int(2, 8); b = r.int(1, 10 - a); s = a + b;
            if (r.bool()) return Q(TR("Rechne: ", "Compute: ") + m(a + " + " + b), A.num(s), TR("Zähle von ", "Count from ") + a + TR(" aus ", " by ") + b + TR(" weiter.", " forwards."), [a + " + " + b + " = " + s], s - b === a);
            return Q(TR("Rechne: ", "Compute: ") + m(s + " − " + b), A.num(a), TR("Zähle von ", "Count from ") + s + TR(" aus ", " by ") + b + TR(" zurück.", " backwards."), [s + " − " + b + " = " + a], a + b === s);
        }
        a = r.int(5, 9); b = r.int(11 - a, 9); s = a + b;
        var toTen = 10 - a;
        if (d === 2) {
            if (r.bool()) return Q(TR("Rechne: ", "Compute: ") + m(a + " + " + b), A.num(s), TR("Rechne erst bis zur 10: ", "First go up to 10: ") + a + " + " + toTen + " = 10.", [a + " + " + toTen + " = 10", TR("Es fehlen noch ", "Still missing: ") + (b - toTen) + ": 10 + " + (b - toTen) + " = " + s], s - b === a);
            return Q(TR("Rechne: ", "Compute: ") + m(s + " − " + b), A.num(a), TR("Rechne erst zurück bis zur 10.", "First go back to 10."), [s + " − " + (s - 10) + " = 10", "10 − " + (b - (s - 10)) + " = " + a], a + b === s);
        }
        return Q(TR("Welche Zahl fehlt? ", "Which number is missing? ") + m(a + " + ▢ = " + s), A.num(b), TR("Rechne ", "Compute ") + s + " − " + a + ".", [TR("Die fehlende Zahl ist ", "The missing number is ") + s + " − " + a + " = " + b, TR("Probe: ", "Check: ") + a + " + " + b + " = " + s], a + b === s);
    } });

    var SHAPES = [[TR("Dreieck", "triangle"), 3], [TR("Quadrat", "square"), 4], [TR("Rechteck", "rectangle"), 4], [TR("Fünfeck", "pentagon"), 5], [TR("Sechseck", "hexagon"), 6], [TR("Kreis", "circle"), 0]];
    E.add({ id: "s03-formen", topic: "CM-S-03", title: TR("Ebene Grundformen", "Basic plane shapes"), gen: function (r, d) {
        var s = r.pick(SHAPES), t;
        if (d === 1) return Q(TR("Wie viele Ecken hat ein ", "How many corners does a ") + s[0] + "?", A.num(s[1]), TR("Stell dir die Form vor und zähle die Spitzen.", "Picture the shape and count the corners."), [TR("Ein ", "A ") + s[0] + TR(" hat ", " has ") + s[1] + TR(" Ecken.", " corners.")], SHAPES.filter(function (x) { return x[0] === s[0]; })[0][1] === s[1]);
        if (d === 2) {
            do { t = r.pick(SHAPES); } while (t[0] === s[0]);
            return Q(TR("Ein ", "A ") + s[0] + TR(" und ein ", " and a ") + t[0] + TR(" liegen auf dem Tisch. Wie viele Ecken haben beide zusammen?", " are on the table. How many corners do they have together?"), A.num(s[1] + t[1]), TR("Zähle die Ecken jeder Form einzeln und addiere.", "Count the corners of each shape and add them."), [s[0] + ": " + s[1] + TR(" Ecken", " corners"), t[0] + ": " + t[1] + TR(" Ecken", " corners"), TR("Zusammen: ", "Together: ") + s[1] + " + " + t[1] + " = " + (s[1] + t[1])], s[1] + t[1] >= 0);
        }
        var props = [[TR("hat 3 Ecken und 3 Seiten", "has 3 corners and 3 sides"), TR("Dreieck", "triangle")], [TR("hat 4 gleich lange Seiten und 4 rechte Winkel", "has 4 sides of equal length and 4 right angles"), TR("Quadrat", "square")], [TR("hat keine Ecke und ist überall gleich rund", "has no corner and is equally round everywhere"), TR("Kreis", "circle")], [TR("hat 6 Ecken", "has 6 corners"), TR("Sechseck", "hexagon")], [TR("hat 5 Ecken", "has 5 corners"), TR("Fünfeck", "pentagon")]];
        var p = r.pick(props);
        return Q(TR("Welche Form ", "Which shape ") + p[0] + "?", A.choice(r, p[1], r.shuffle(SHAPES.map(function (x) { return x[0]; }).filter(function (x) { return x !== p[1] && !(p[1] === TR("Quadrat", "square") && x === TR("Rechteck", "rectangle")); }))), TR("Gehe die Formen der Reihe nach durch.", "Go through the shapes one by one."), [TR("Die Beschreibung passt zum ", "The description fits the ") + p[1] + "."], true);
    } });

    E.add({ id: "s04-muster", topic: "CM-S-04", title: TR("Muster und Zahlenfolgen", "Patterns and sequences"), gen: function (r, d) {
        var seq = [], a, k, i, next, rule;
        if (d === 1) { a = r.int(1, 9); k = r.int(2, 5); for (i = 0; i < 4; i += 1) seq.push(a + i * k); next = a + 4 * k; rule = TR("immer + ", "always + ") + k; }
        else if (d === 2) { k = r.int(3, 9); a = r.int(50, 90); for (i = 0; i < 4; i += 1) seq.push(a - i * k); next = a - 4 * k; rule = TR("immer − ", "always − ") + k; }
        else if (r.bool()) { a = r.int(1, 4); for (i = 0; i < 4; i += 1) seq.push(a * Math.pow(2, i)); next = a * 16; rule = TR("immer · 2", "always · 2"); }
        else { a = r.int(1, 6); k = r.int(1, 3); var k2 = k + r.int(1, 3); seq = [a, a + k, a + k + k2, a + 2 * k + k2, a + 2 * k + 2 * k2]; next = a + 3 * k + 2 * k2; rule = TR("abwechselnd + ", "alternately + ") + k + TR(" und + ", " and + ") + k2; }
        var diffs = seq.slice(1).map(function (v, j) { return v - seq[j]; });
        return Q(TR("Wie geht die Folge weiter? ", "How does the sequence continue? ") + m(seq.join(", ") + ", ▢"), A.num(next), TR("Schau dir an, wie man von einer Zahl zur nächsten kommt.", "Look at how you get from one number to the next."), [TR("Regel: ", "Rule: ") + rule, TR("Nächste Zahl: ", "Next number: ") + next], d === 1 || d === 2 ? next - seq[3] === diffs[0] : (seq.length === 4 ? next / seq[3] === 2 : next - seq[4] === diffs[0]));
    } });

    E.add({ id: "s02-groessen", topic: "CM-S-02", title: TR("Geld, Uhrzeit und Längen", "Money, time and length"), gen: function (r, d) {
        var pad = function (x) { return (x < 10 ? "0" : "") + x; };
        if (d === 3) {
            var h1 = r.int(7, 14), m1 = r.pick([5, 10, 15, 20, 25, 35, 40, 45, 50]), dur = r.int(4, 28) * 5, end = h1 * 60 + m1 + dur;
            return Q(TR("Der Film beginnt um ", "The film starts at ") + h1 + ":" + pad(m1) + TR(" Uhr und endet um ", " and ends at ") + Math.floor(end / 60) + ":" + pad(end % 60) + TR(" Uhr. Wie viele Minuten dauert er?", ". How many minutes does it last?"), A.num(dur, { unit: "min" }), TR("Rechne zuerst bis zur nächsten vollen Stunde.", "First count up to the next full hour."), [TR("Bis zur vollen Stunde: ", "Up to the full hour: ") + (60 - m1) + " min", TR("Danach bis zum Ende: ", "Then up to the end: ") + (dur - (60 - m1)) + " min", TR("Zusammen: ", "Together: ") + dur + " min"], h1 * 60 + m1 + dur === end);
        }
        var t = r.int(0, 2), a = r.int(1, d === 1 ? 5 : 9), b = d === 1 ? 0 : (t === 0 ? r.pick([10, 15, 20, 30, 45]) : r.int(1, 19) * 5);
        var spec = [["h", "min", 60], ["€", "ct", 100], ["m", "cm", 100]][t], total = a * spec[2] + b;
        return Q(TR("Wie viele ", "How many ") + spec[1] + TR(" sind ", " are ") + a + " " + spec[0] + (b ? " " + b + " " + spec[1] : "") + "?", A.num(total, { unit: spec[1] }), "1 " + spec[0] + " = " + spec[2] + " " + spec[1] + ".", [a + " " + spec[0] + " = " + a + " · " + spec[2] + " " + spec[1] + " = " + a * spec[2] + " " + spec[1]].concat(b ? [a * spec[2] + " + " + b + " = " + total + " " + spec[1]] : []), (total - b) / spec[2] === a);
    } });

    E.add({ id: "s48-zehner", topic: "CM-S-48", title: TR("Rechnen bis 100", "Arithmetic to 100"), gen: function (r, d) {
        var t = r.int(2, 8), o, b, a, s;
        if (d === 1) { o = r.int(1, 7); b = r.int(1, 9 - o); a = t * 10 + o; s = a + b; return Q(TR("Rechne: ", "Compute: ") + m(a + " + " + b), A.num(s), TR("Die Zehner bleiben gleich, nur die Einer ändern sich.", "The tens stay the same, only the ones change."), [o + " + " + b + " = " + (o + b), TR("Also ", "So ") + a + " + " + b + " = " + s], s - a === b); }
        if (d === 2) { o = r.int(3, 9); b = r.int(11 - o, 9); a = t * 10 + o; s = a + b; return Q(TR("Rechne: ", "Compute: ") + m(a + " + " + b), A.num(s), TR("Fülle zuerst bis zum nächsten Zehner auf.", "First fill up to the next ten."), [a + " + " + (10 - o) + " = " + (a + 10 - o), (a + 10 - o) + " + " + (b - 10 + o) + " = " + s], s - b === a); }
        a = r.int(25, 60); b = r.int(15, 39); s = a + b;
        if (r.bool()) return Q(TR("Rechne: ", "Compute: ") + m(a + " + " + b), A.num(s), TR("Addiere erst die Zehner, dann die Einer.", "Add the tens first, then the ones."), [a + " + " + Math.floor(b / 10) * 10 + " = " + (a + Math.floor(b / 10) * 10), (a + Math.floor(b / 10) * 10) + " + " + b % 10 + " = " + s], s - a === b);
        return Q(TR("Rechne: ", "Compute: ") + m(s + " − " + b), A.num(a), TR("Ziehe erst die Zehner ab, dann die Einer.", "Subtract the tens first, then the ones."), [s + " − " + Math.floor(b / 10) * 10 + " = " + (s - Math.floor(b / 10) * 10), (s - Math.floor(b / 10) * 10) + " − " + b % 10 + " = " + a], a + b === s);
    } });

    E.add({ id: "s49-einmaleins", topic: "CM-S-49", title: TR("Kleines Einmaleins", "Times tables"), gen: function (r, d) {
        var a = d === 1 ? r.pick([2, 5, 10]) : r.int(3, 9), b = d === 1 ? r.int(1, 10) : r.int(3, 9), p = a * b, sum = 0;
        for (var i = 0; i < b; i += 1) sum += a;
        if (d < 3) return Q(TR("Rechne: ", "Compute: ") + m(a + " · " + b), A.num(p), b + TR(" mal die ", " times the ") + a + TR(" addieren.", " added."), [a + " · " + b + " = " + p], sum === p);
        if (r.bool()) return Q(TR("Rechne: ", "Compute: ") + m(p + " : " + a), A.num(b), TR("Welche Zahl mal ", "Which number times ") + a + TR(" ergibt ", " gives ") + p + "?", [b + " · " + a + " = " + p, TR("Also ", "So ") + p + " : " + a + " = " + b], sum === p);
        return Q(TR("Welche Zahl fehlt? ", "Which number is missing? ") + m(a + " · ▢ = " + p), A.num(b), TR("Teile ", "Divide ") + p + TR(" durch ", " by ") + a + ".", [p + " : " + a + " = " + b], sum === p);
    } });

    function colAdd(a, b) {
        var steps = [], carry = 0, names = [TR("Einer", "ones"), TR("Zehner", "tens"), TR("Hunderter", "hundreds"), TR("Tausender", "thousands")], i = 0;
        while (a > 0 || b > 0 || carry) {
            var s = a % 10 + b % 10 + carry;
            steps.push(names[i] + ": " + a % 10 + " + " + b % 10 + (carry ? " + " + carry + TR(" (Übertrag)", " (carry)") : "") + " = " + s + (s > 9 ? TR(", schreibe ", ", write ") + s % 10 + TR(", merke 1", ", carry 1") : ""));
            carry = s > 9 ? 1 : 0; a = Math.floor(a / 10); b = Math.floor(b / 10); i += 1;
            if (i > 4) break;
        }
        return steps;
    }
    E.add({ id: "s05-schriftlich-plus", topic: "CM-S-05", title: TR("Schriftlich addieren und subtrahieren", "Column addition and subtraction"), gen: function (r, d) {
        var a = d === 3 ? r.int(1200, 5800) : r.int(120, 580), b = d === 3 ? r.int(1100, 3900) : r.int(110, 390), s = a + b;
        if (d === 1 || (d === 3 && r.bool())) return Q(TR("Rechne schriftlich: ", "Work it out in columns: ") + m(a + " + " + b), A.num(s), TR("Schreibe die Zahlen stellengerecht untereinander und beginne bei den Einern.", "Write the numbers under each other by place value and start with the ones."), colAdd(a, b).concat([TR("Ergebnis: ", "Result: ") + s]), s - a === b);
        return Q(TR("Rechne schriftlich: ", "Work it out in columns: ") + m(s + " − " + b), A.num(a), TR("Rechne von rechts nach links und entbündle, wenn die obere Ziffer zu klein ist.", "Work from right to left and borrow when the top digit is too small."), [TR("Ergebnis: ", "Result: ") + a, TR("Probe mit Plus: ", "Check by adding: ") + a + " + " + b + " = " + s], a + b === s);
    } });

    E.add({ id: "s06-rechteck", topic: "CM-S-06", title: TR("Umfang und Fläche", "Perimeter and area"), gen: function (r, d) {
        var a = r.int(3, 12), b = r.int(2, 9), U = 2 * (a + b), F = a * b;
        while (b === a) b = r.int(2, 9);
        U = 2 * (a + b); F = a * b;
        if (d === 1) {
            if (r.bool()) return Q(TR("Ein Rechteck ist ", "A rectangle is ") + a + TR(" cm lang und ", " cm long and ") + b + TR(" cm breit. Wie groß ist der Umfang?", " cm wide. What is its perimeter?"), A.num(U, { unit: "cm" }), TR("Der Umfang ist der Weg einmal außen herum.", "The perimeter is the distance once around the outside."), [TR("U = 2 · (a + b)", "P = 2 · (a + b)"), TR("U = 2 · (", "P = 2 · (") + a + " + " + b + ") = " + U + " cm"], a + b + a + b === U);
            return Q(TR("Ein Rechteck ist ", "A rectangle is ") + a + TR(" cm lang und ", " cm long and ") + b + TR(" cm breit. Wie groß ist der Flächeninhalt?", " cm wide. What is its area?"), A.num(F, { unit: "cm²" }), TR("Länge mal Breite.", "Length times width."), ["A = a · b", "A = " + a + " · " + b + " = " + F + " cm²"], F / a === b);
        }
        if (d === 2) return Q(TR("Ein Rechteck ist ", "A rectangle is ") + a + TR(" cm lang und ", " cm long and ") + b + TR(" cm breit. Berechne Umfang und Flächeninhalt.", " cm wide. Work out the perimeter and the area."), A.multi([{ l: TR("U (cm)", "P (cm)"), a: A.num(U) }, { l: "A (cm²)", a: A.num(F) }]), TR("U = 2 · (a + b) und A = a · b.", "P = 2 · (a + b) and A = a · b."), [TR("U = 2 · (", "P = 2 · (") + a + " + " + b + ") = " + U + " cm", "A = " + a + " · " + b + " = " + F + " cm²"], a + b + a + b === U && F / b === a);
        if (r.bool()) return Q(TR("Ein Rechteck hat den Flächeninhalt ", "A rectangle has an area of ") + F + TR(" cm² und ist ", " cm² and is ") + a + TR(" cm lang. Wie breit ist es?", " cm long. How wide is it?"), A.num(b, { unit: "cm" }), TR("Teile die Fläche durch die Länge.", "Divide the area by the length."), ["b = A : a", "b = " + F + " : " + a + " = " + b + " cm"], a * b === F);
        return Q(TR("Ein Rechteck hat den Umfang ", "A rectangle has a perimeter of ") + U + TR(" cm und ist ", " cm and is ") + a + TR(" cm lang. Wie breit ist es?", " cm long. How wide is it?"), A.num(b, { unit: "cm" }), TR("Der halbe Umfang ist Länge plus Breite.", "Half the perimeter is length plus width."), ["a + b = U : 2 = " + U / 2, "b = " + U / 2 + " − " + a + " = " + b + " cm"], 2 * (a + b) === U);
    } });

    E.add({ id: "s08-umrechnen", topic: "CM-S-08", title: TR("Größen umrechnen", "Converting units"), gen: function (r, d) {
        var u = r.pick([["kg", "g", 1000], ["km", "m", 1000], ["l", "ml", 1000], ["m", "cm", 100], ["cm", "mm", 10], ["t", "kg", 1000]]), f = u[2], small, big;
        if (d === 1) { big = r.int(2, 12); small = big * f; return Q(TR("Rechne um: ", "Convert: ") + m(big + " " + u[0] + " = ▢ " + u[1]), A.num(small, { unit: u[1] }), "1 " + u[0] + " = " + f + " " + u[1] + ".", [big + " · " + f + " = " + small + " " + u[1]], small / f === big); }
        small = f === 1000 ? r.int(1, 39) * 250 : (f === 100 ? r.int(21, 99) * 5 : r.int(11, 99)); big = small / f;
        if (d === 2) return Q(TR("Rechne um: ", "Convert: ") + m(n(big) + " " + u[0] + " = ▢ " + u[1]), A.num(small, { unit: u[1] }), TR("Multipliziere mit ", "Multiply by ") + f + TR(": Das Komma rückt nach rechts.", ": the decimal point moves to the right."), [n(big) + " · " + f + " = " + small + " " + u[1]], M.near(small / f, big));
        return Q(TR("Rechne um: ", "Convert: ") + m(small + " " + u[1] + " = ▢ " + u[0]), A.num(big, { unit: u[0] }), TR("Teile durch ", "Divide by ") + f + TR(": Das Komma rückt nach links.", ": the decimal point moves to the left."), [small + " : " + f + " = " + n(big) + " " + u[0]], M.near(big * f, small));
    } });

    E.add({ id: "s10-zufall", topic: "CM-S-10", title: TR("Sicher, möglich, unmöglich", "Certain, possible, impossible"), gen: function (r, d) {
        if (d === 1) {
            var st = r.pick([[TR("mit einem normalen Würfel eine 7 würfeln", "roll a 7 with a normal dice"), TR("unmöglich", "impossible")], [TR("mit einem normalen Würfel eine Zahl kleiner als 7 würfeln", "roll a number less than 7 with a normal dice"), TR("sicher", "certain")], [TR("mit einem normalen Würfel eine 6 würfeln", "roll a 6 with a normal dice"), TR("möglich, aber nicht sicher", "possible but not certain")], [TR("aus einem Beutel mit nur roten Kugeln eine rote ziehen", "draw a red ball from a bag with only red balls"), TR("sicher", "certain")], [TR("aus einem Beutel mit nur roten Kugeln eine blaue ziehen", "draw a blue ball from a bag with only red balls"), TR("unmöglich", "impossible")], [TR("beim Münzwurf Zahl werfen", "get tails when tossing a coin"), TR("möglich, aber nicht sicher", "possible but not certain")]]);
            return Q(TR("Wie ist das Ereignis? Du willst ", "What kind of event is it? You want to ") + st[0] + ".", A.choice(r, st[1], [TR("sicher", "certain"), TR("unmöglich", "impossible"), TR("möglich, aber nicht sicher", "possible but not certain")]), TR("Überlege, welche Ergebnisse überhaupt vorkommen können.", "Think about which outcomes can happen at all."), [TR("Das Ereignis ist ", "The event is ") + st[1] + "."], true);
        }
        var red = r.int(1, 5), blue = r.int(1, 5), green = r.int(1, 4), tot = red + blue + green, bag = [], i, cnt = 0;
        for (i = 0; i < red; i += 1) bag.push("r"); for (i = 0; i < blue; i += 1) bag.push("b"); for (i = 0; i < green; i += 1) bag.push("g");
        var text = TR("In einem Beutel liegen ", "A bag contains ") + red + TR(" rote, ", " red, ") + blue + TR(" blaue und ", " blue and ") + green + TR(" grüne Kugeln. Du ziehst eine Kugel, ohne hinzusehen. ", " green balls. You draw one ball without looking. ");
        if (d === 2) { cnt = bag.filter(function (x) { return x === "r"; }).length; return Q(text + TR("Wie groß ist die Wahrscheinlichkeit für Rot? Gib einen Bruch an.", "What is the probability of red? Give a fraction."), A.frac(red, tot), TR("Günstige durch mögliche Ergebnisse.", "Favourable outcomes divided by possible outcomes."), [TR("Mögliche Ergebnisse: ", "Possible outcomes: ") + tot + TR(" Kugeln", " balls"), TR("Günstig: ", "Favourable: ") + red + TR(" rote", " red"), TR("P(rot) = ", "P(red) = ") + H.q(red, tot)], cnt === red && bag.length === tot); }
        cnt = bag.filter(function (x) { return x !== "r"; }).length;
        return Q(text + TR("Wie groß ist die Wahrscheinlichkeit, dass die Kugel nicht rot ist? Gib einen Bruch an.", "What is the probability that the ball is not red? Give a fraction."), A.frac(blue + green, tot), TR("Zähle alle Kugeln, die nicht rot sind.", "Count all balls that are not red."), [TR("Nicht rot: ", "Not red: ") + blue + " + " + green + " = " + (blue + green), TR("P(nicht rot) = ", "P(not red) = ") + H.q(blue + green, tot)], cnt === blue + green);
    } });

    E.add({ id: "s50-mal-geteilt", topic: "CM-S-50", title: TR("Schriftlich multiplizieren und dividieren", "Long multiplication and division"), gen: function (r, d) {
        var a, b, p;
        if (d === 1) { a = r.int(12, 89); b = r.int(3, 9); p = a * b; return Q(TR("Rechne: ", "Compute: ") + m(a + " · " + b), A.num(p), TR("Zerlege ", "Split ") + a + TR(" in Zehner und Einer.", " into tens and ones."), [Math.floor(a / 10) * 10 + " · " + b + " = " + Math.floor(a / 10) * 10 * b, a % 10 + " · " + b + " = " + (a % 10) * b, TR("Zusammen: ", "Together: ") + p], p / b === a); }
        if (d === 2) { a = r.int(12, 49); b = r.int(11, 29); p = a * b; return Q(TR("Rechne: ", "Compute: ") + m(a + " · " + b), A.num(p), TR("Rechne erst mit den Zehnern von ", "First multiply with the tens of ") + b + TR(", dann mit den Einern.", ", then with the ones."), [a + " · " + Math.floor(b / 10) * 10 + " = " + a * Math.floor(b / 10) * 10, a + " · " + b % 10 + " = " + a * (b % 10), TR("Zusammen: ", "Together: ") + p], p / a === b); }
        b = r.int(3, 9); a = r.int(34, 198); p = a * b;
        return Q(TR("Rechne schriftlich: ", "Work it out in columns: ") + m(p + " : " + b), A.num(a), TR("Teile Stelle für Stelle von links nach rechts.", "Divide digit by digit from left to right."), [TR("Ergebnis: ", "Result: ") + a, TR("Probe: ", "Check: ") + a + " · " + b + " = " + p], a * b === p);
    } });

    E.add({ id: "s07-quader", topic: "CM-S-07", title: TR("Würfel und Quader", "Cubes and cuboids"), gen: function (r, d) {
        var a = r.int(2, 9), b = r.int(2, 8), c = r.int(2, 6), V = a * b * c, O = 2 * (a * b + a * c + b * c), cnt = 0, i, j, k;
        for (i = 0; i < a; i += 1) for (j = 0; j < b; j += 1) for (k = 0; k < c; k += 1) cnt += 1;
        var txt = TR("Ein Quader hat die Kanten a = ", "A cuboid has edges a = ") + a + " cm, b = " + b + TR(" cm und c = ", " cm and c = ") + c + " cm. ";
        if (d === 1) return Q(txt + TR("Wie groß ist sein Volumen?", "What is its volume?"), A.num(V, { unit: "cm³" }), "V = a · b · c.", ["V = " + a + " · " + b + " · " + c, "V = " + V + " cm³"], cnt === V);
        if (d === 2) return Q(txt + TR("Wie groß ist seine Oberfläche?", "What is its surface area?"), A.num(O, { unit: "cm²" }), TR("Ein Quader hat 6 Flächen, je zwei sind gleich.", "A cuboid has 6 faces, and they come in equal pairs."), ["O = 2 · (a·b + a·c + b·c)", "O = 2 · (" + a * b + " + " + a * c + " + " + b * c + ") = " + O + " cm²"], O === a * b * 2 + a * c * 2 + b * c * 2);
        return Q(TR("Ein Quader hat das Volumen ", "A cuboid has a volume of ") + V + TR(" cm³. Zwei Kanten sind ", " cm³. Two edges are ") + a + TR(" cm und ", " cm and ") + b + TR(" cm lang. Wie lang ist die dritte Kante?", " cm long. How long is the third edge?"), A.num(c, { unit: "cm" }), TR("Teile das Volumen durch die Grundfläche.", "Divide the volume by the base area."), [TR("Grundfläche: ", "Base area: ") + a + " · " + b + " = " + a * b + " cm²", "c = " + V + " : " + a * b + " = " + c + " cm"], cnt === V);
    } });

    E.add({ id: "s09-diagramm", topic: "CM-S-09", title: TR("Daten in Diagrammen", "Data in charts"), gen: function (r, d) {
        var labels = [TR("Mo", "Mon"), TR("Di", "Tue"), TR("Mi", "Wed"), TR("Do", "Thu")], v = labels.map(function () { return r.int(2, 12); }), sum, i;
        if (d === 3) { sum = v[0] + v[1] + v[2]; v[3] = 4 * r.int(Math.ceil((sum + 2) / 4), Math.ceil((sum + 2) / 4) + 2) - sum; }
        sum = v.reduce(function (x, y) { return x + y; }, 0);
        var fig = H.bars(labels, v), intro = TR("Das Diagramm zeigt, wie viele Bücher an vier Tagen ausgeliehen wurden. ", "The chart shows how many books were borrowed on four days. ");
        if (d === 1) { i = r.int(0, 3); var j = (i + r.int(1, 3)) % 4; return Q(intro + TR("Wie viele Bücher waren es am ", "How many books were borrowed on ") + labels[i] + TR(" und am ", " and on ") + labels[j] + TR(" zusammen?", " together?") + fig, A.num(v[i] + v[j]), TR("Lies beide Säulenhöhen ab.", "Read off both bar heights."), [labels[i] + ": " + v[i] + ", " + labels[j] + ": " + v[j], TR("Zusammen: ", "Together: ") + (v[i] + v[j])], true); }
        if (d === 2) { var mx = Math.max.apply(null, v), mn = Math.min.apply(null, v); return Q(intro + TR("Wie groß ist der Unterschied zwischen dem stärksten und dem schwächsten Tag?", "What is the difference between the busiest and the quietest day?") + fig, A.num(mx - mn), TR("Suche die höchste und die niedrigste Säule.", "Find the tallest and the shortest bar."), [TR("Höchster Wert: ", "Highest value: ") + mx, TR("Niedrigster Wert: ", "Lowest value: ") + mn, TR("Unterschied: ", "Difference: ") + (mx - mn)], v.every(function (x) { return x <= mx && x >= mn; })); }
        return Q(intro + TR("Wie viele Bücher waren es im Durchschnitt pro Tag?", "How many books were borrowed per day on average?") + fig, A.num(sum / 4), TR("Addiere alle Werte und teile durch die Anzahl der Tage.", "Add all values and divide by the number of days."), [TR("Summe: ", "Sum: ") + v.join(" + ") + " = " + sum, TR("Durchschnitt: ", "Average: ") + sum + " : 4 = " + sum / 4], sum % 4 === 0);
    } });

    E.add({ id: "s11-ggt-kgv", topic: "CM-S-11", title: TR("ggT und kgV", "GCD and LCM"), gen: function (r, d) {
        if (d === 3) {
            var ps = r.shuffle([2, 2, 3, 3, 5, 7, 11, 13]).slice(0, r.int(3, 4)).sort(function (x, y) { return x - y; }), N = ps.reduce(function (x, y) { return x * y; }, 1);
            return Q(TR("Zerlege ", "Split ") + N + TR(" in Primfaktoren. Wie heißt der größte Primfaktor?", " into prime factors. What is the largest prime factor?"), A.num(ps[ps.length - 1]), TR("Teile so lange durch 2, 3, 5, 7 …, bis nur noch Primzahlen übrig sind.", "Keep dividing by 2, 3, 5, 7 … until only primes are left."), [N + " = " + ps.join(" · "), TR("Größter Primfaktor: ", "Largest prime factor: ") + ps[ps.length - 1]], ps.every(M.isPrime) && ps.reduce(function (x, y) { return x * y; }, 1) === N);
        }
        var g = r.int(2, 9), p, q;
        do { p = r.int(2, 7); q = r.int(2, 9); } while (M.gcd(p, q) !== 1 || p === q);
        var a = g * p, b = g * q, brute = 1, i;
        for (i = 1; i <= Math.min(a, b); i += 1) if (a % i === 0 && b % i === 0) brute = i;
        if (d === 1) return Q(TR("Bestimme den größten gemeinsamen Teiler von ", "Find the greatest common divisor of ") + a + TR(" und ", " and ") + b + ".", A.num(g), TR("Schreibe die Teiler beider Zahlen auf und suche den größten gemeinsamen.", "Write down the divisors of both numbers and find the largest common one."), [a + " = " + g + " · " + p, b + " = " + g + " · " + q, TR("ggT = ", "gcd = ") + g], brute === g);
        var l = a * b / g, bl = Math.max(a, b);
        while (bl % a !== 0 || bl % b !== 0) bl += 1;
        return Q(TR("Bestimme das kleinste gemeinsame Vielfache von ", "Find the least common multiple of ") + a + TR(" und ", " and ") + b + ".", A.num(l), TR("Gehe die Vielfachen der größeren Zahl durch.", "Go through the multiples of the larger number."), [TR("ggT(", "gcd(") + a + ", " + b + ") = " + g, TR("kgV = ", "lcm = ") + a + " · " + b + " : " + g + " = " + l], bl === l);
    } });

    E.add({ id: "s11-primzahl", topic: "CM-S-11", title: TR("Primzahlen erkennen", "Recognising primes"), gen: function (r, d) {
        var primes = d === 1 ? [11, 13, 17, 19, 23, 29] : [31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97], comp = d === 1 ? [9, 15, 21, 25, 27] : [33, 39, 49, 51, 57, 63, 69, 77, 87, 91, 93];
        var p = r.pick(primes), wrong = r.shuffle(comp).slice(0, 3);
        return Q(TR("Welche dieser Zahlen ist eine Primzahl?", "Which of these numbers is a prime?"), A.choice(r, String(p), wrong.map(String)), TR("Eine Primzahl hat genau zwei Teiler: 1 und sich selbst. Prüfe die Teilbarkeit durch 3 und 7.", "A prime has exactly two divisors: 1 and itself. Check divisibility by 3 and 7."), wrong.map(function (w) { for (var t = 2; t < w; t += 1) if (w % t === 0) return w + " = " + t + " · " + w / t; return ""; }).concat([p + TR(" ist nur durch 1 und ", " is only divisible by 1 and ") + p + TR(" teilbar.", ".")]), M.isPrime(p) && !wrong.some(M.isPrime));
    } });

    E.add({ id: "s14-runden", topic: "CM-S-14", title: TR("Runden und Überschlagen", "Rounding and estimating"), gen: function (r, d) {
        var x, st, res;
        if (d === 1) { x = r.int(1234, 9876); st = r.pick([10, 100]); res = Math.round(x / st) * st; return Q(TR("Runde ", "Round ") + x + TR(" auf ", " to ") + (st === 10 ? TR("Zehner", "tens") : TR("Hunderter", "hundreds")) + ".", A.num(res), TR("Schau auf die Ziffer rechts von der Rundungsstelle: ab 5 wird aufgerundet.", "Look at the digit to the right of the rounding place: from 5 upwards you round up."), [TR("Die entscheidende Ziffer ist ", "The deciding digit is ") + Math.floor(x / (st / 10)) % 10 + ".", TR("Ergebnis: ", "Result: ") + res], Math.abs(res - x) <= st / 2 && res % st === 0); }
        if (d === 2) { x = r.int(1011, 9989) / 100; var dec = r.pick([1, 0]); res = M.round(x, dec); return Q(TR("Runde ", "Round ") + n(x) + TR(" auf ", " to ") + (dec ? TR("eine Nachkommastelle", "one decimal place") : TR("Einer", "ones")) + ".", A.num(res), TR("Schau auf die Stelle direkt rechts daneben.", "Look at the place directly to the right."), [TR("Ergebnis: ", "Result: ") + n(res)], Math.abs(res - x) <= 0.5 * Math.pow(10, -dec) + 1e-9); }
        var a = r.int(21, 89) * 10 + r.pick([-3, -2, -1, 1, 2, 3]), b = r.int(2, 6) * 10 + r.pick([-2, -1, 1, 2]), ra = Math.round(a / 10) * 10, rb = Math.round(b / 10) * 10;
        return Q(TR("Überschlage ", "Estimate ") + m(a + " · " + b) + TR(", indem du beide Zahlen zuerst auf Zehner rundest. Was erhältst du?", " by first rounding both numbers to tens. What do you get?"), A.num(ra * rb), TR("Runde erst, multipliziere dann.", "Round first, then multiply."), [a + " ≈ " + ra + ", " + b + " ≈ " + rb, ra + " · " + rb + " = " + ra * rb, TR("Zum Vergleich der genaue Wert: ", "For comparison, the exact value: ") + a * b], Math.abs(ra * rb - a * b) / (a * b) < 0.2);
    } });

    E.add({ id: "s16-flaechen", topic: "CM-S-16", title: TR("Zusammengesetzte Flächen", "Composite areas"), gen: function (r, d) {
        var W = r.int(6, 12), Hh = r.int(5, 9), w = r.int(2, W - 3), h = r.int(2, Hh - 2), s = Math.min(200 / W, 110 / (Hh + 3)), ox = 50, oy = 20, P = function (x, y) { return (ox + x * s).toFixed(1) + "," + (oy + y * s).toFixed(1); };
        var lab = function (x, y, t) { return '<text x="' + (ox + x * s).toFixed(1) + '" y="' + (oy + y * s).toFixed(1) + '" font-size="11" fill="#cdd4e6" text-anchor="middle">' + t + "</text>"; };
        if (d === 3) {
            if (W % 2) W += 1;
            var t = r.int(2, 4), figH = H.fig('<polygon points="' + [P(0, t), P(W / 2, 0), P(W, t), P(W, t + Hh), P(0, t + Hh)].join(" ") + '" fill="rgba(53,224,196,0.18)" stroke="#35e0c4" stroke-width="2"/><line x1="' + (ox) + '" y1="' + (oy + t * s) + '" x2="' + (ox + W * s) + '" y2="' + (oy + t * s) + '" stroke="#35e0c4" stroke-dasharray="4 3"/>' + lab(W / 2, t + Hh + 1.3, W + " cm") + lab(-1.6, t + Hh / 2, Hh + " cm") + lab(W + 1.7, t / 2 + 0.3, t + " cm"), 300, 20 + (t + Hh + 2) * s, TR("Rechteck mit Dreieck", "Rectangle with triangle"));
            var area = W * Hh + W * t / 2;
            return Q(TR("Die Figur besteht aus einem Rechteck (", "The figure consists of a rectangle (") + W + TR(" cm breit, ", " cm wide, ") + Hh + TR(" cm hoch) und einem Dreieck darüber (Höhe ", " cm high) and a triangle on top (height ") + t + TR(" cm). Wie groß ist die gesamte Fläche?", " cm). What is the total area?") + figH, A.num(area, { unit: "cm²" }), TR("Zerlege in Rechteck und Dreieck. Dreieck: Grundseite mal Höhe durch 2.", "Split into rectangle and triangle. Triangle: base times height divided by 2."), [TR("Rechteck: ", "Rectangle: ") + W + " · " + Hh + " = " + W * Hh + " cm²", TR("Dreieck: ", "Triangle: ") + W + " · " + t + " : 2 = " + W * t / 2 + " cm²", TR("Zusammen: ", "Together: ") + area + " cm²"], M.near(area, W * (Hh + t) - W * t / 2));
        }
        var fig = H.fig('<polygon points="' + [P(0, 0), P(W - w, 0), P(W - w, h), P(W, h), P(W, Hh), P(0, Hh)].join(" ") + '" fill="rgba(245,197,24,0.16)" stroke="#f5c518" stroke-width="2"/>' + lab(W / 2, Hh + 1.3, W + " cm") + lab(-1.6, Hh / 2, Hh + " cm") + lab((W - w) / 2, -0.4, (W - w) + " cm") + lab(W + 1.7, h + (Hh - h) / 2, (Hh - h) + " cm") + lab(W - w / 2, h - 0.4, w + " cm") + lab(W - w - 1.4, h / 2 + 0.3, h + " cm"), 300, 20 + (Hh + 2) * s, TR("L-förmige Fläche", "L-shaped area"));
        var areaL = W * Hh - w * h;
        if (d === 1) return Q(TR("Berechne den Flächeninhalt der Figur.", "Work out the area of the figure.") + fig, A.num(areaL, { unit: "cm²" }), TR("Ergänze zum großen Rechteck und ziehe die fehlende Ecke ab. Oder zerlege in zwei Rechtecke.", "Complete it to the large rectangle and subtract the missing corner. Or split it into two rectangles."), [TR("Großes Rechteck: ", "Large rectangle: ") + W + " · " + Hh + " = " + W * Hh + " cm²", TR("Fehlende Ecke: ", "Missing corner: ") + w + " · " + h + " = " + w * h + " cm²", "A = " + W * Hh + " − " + w * h + " = " + areaL + " cm²"], areaL === (W - w) * Hh + w * (Hh - h));
        var U = 2 * (W + Hh);
        return Q(TR("Berechne den Umfang der Figur.", "Work out the perimeter of the figure.") + fig, A.num(U, { unit: "cm" }), TR("Addiere alle sechs Seitenlängen.", "Add all six side lengths."), [TR("U = ", "P = ") + [W, Hh, W - w, h, w, Hh - h].join(" + "), TR("U = ", "P = ") + U + " cm"], W + Hh + (W - w) + h + w + (Hh - h) === U);
    } });

    E.add({ id: "s12-negativ", topic: "CM-S-12", title: TR("Negative Zahlen", "Negative numbers"), gen: function (r, d) {
        var a = r.nz(-9, 9), b = r.nz(-9, 9), c;
        var p = function (x) { return x < 0 ? "(" + n(x) + ")" : n(x); };
        if (d === 1) { if (a > 0 && b > 0) a = -a; return Q(TR("Rechne: ", "Compute: ") + m(n(a) + " + " + p(b)), A.num(a + b), TR("Stell dir den Zahlenstrahl vor: Plus heißt nach rechts, eine negative Zahl addieren heißt nach links.", "Picture the number line: plus means to the right, adding a negative number means to the left."), [TR("Starte bei ", "Start at ") + n(a) + TR(" und gehe ", " and go ") + Math.abs(b) + TR(" Schritte nach ", " steps to the ") + (b > 0 ? TR("rechts", "right") : TR("links", "left")) + ".", TR("Ergebnis: ", "Result: ") + n(a + b)], a + b - b === a); }
        if (d === 2) {
            if (r.bool()) { if (a > 0 && b > 0) b = -b; return Q(TR("Rechne: ", "Compute: ") + m(p(a) + " · " + p(b)), A.num(a * b), TR("Gleiche Vorzeichen ergeben Plus, verschiedene Minus.", "Equal signs give plus, different signs give minus."), [TR("Betrag: ", "Absolute value: ") + Math.abs(a) + " · " + Math.abs(b) + " = " + Math.abs(a * b), TR("Vorzeichen: ", "Sign: ") + (a * b > 0 ? "plus" : "minus"), TR("Ergebnis: ", "Result: ") + n(a * b)], (a * b) / b === a); }
            if (b > 0) b = -b;
            return Q(TR("Rechne: ", "Compute: ") + m(n(a) + " − " + p(b)), A.num(a - b), TR("Minus eine negative Zahl ist dasselbe wie Plus.", "Minus a negative number is the same as plus."), [n(a) + " − " + p(b) + " = " + n(a) + " + " + Math.abs(b), TR("Ergebnis: ", "Result: ") + n(a - b)], a - b + b === a);
        }
        c = r.int(1, 9); b = r.int(1, 9); if (c <= b) c = b + r.int(1, 5); a = -Math.abs(a);
        return Q(TR("Rechne: ", "Compute: ") + m(n(a) + " · (" + b + " − " + c + ")"), A.num(a * (b - c)), TR("Erst die Klammer, dann multiplizieren.", "Bracket first, then multiply."), [TR("Klammer: ", "Bracket: ") + b + " − " + c + " = " + n(b - c), n(a) + " · " + p(b - c) + " = " + n(a * (b - c))], a * b - a * c === a * (b - c));
    } });

    E.add({ id: "s15-winkel", topic: "CM-S-15", title: TR("Winkel im Dreieck", "Angles in a triangle"), gen: function (r, d) {
        var al, be, ga;
        if (d === 1) { al = r.int(25, 85); be = r.int(30, 150 - al); ga = 180 - al - be; return Q(TR("In einem Dreieck sind α = ", "In a triangle α = ") + al + TR("° und β = ", "° and β = ") + be + TR("°. Wie groß ist γ?", "°. How large is γ?"), A.num(ga, { unit: "°" }), TR("Die drei Innenwinkel ergeben zusammen 180°.", "The three interior angles add up to 180°."), ["γ = 180° − α − β", "γ = 180° − " + al + "° − " + be + "° = " + ga + "°"], al + be + ga === 180 && ga > 0); }
        if (d === 2) { al = r.int(25, 155); return Q(TR("Zwei Geraden schneiden sich. Ein Winkel ist ", "Two lines intersect. One angle is ") + al + TR("° groß. Wie groß ist sein Nebenwinkel?", "°. How large is its supplementary angle?"), A.num(180 - al, { unit: "°" }), TR("Nebenwinkel liegen nebeneinander an einer Geraden und ergeben zusammen 180°.", "Supplementary angles lie next to each other on a line and add up to 180°."), [TR("Nebenwinkel = 180° − ", "Supplementary angle = 180° − ") + al + "° = " + (180 - al) + "°"], al + (180 - al) === 180); }
        ga = 2 * r.int(10, 70); al = (180 - ga) / 2;
        return Q(TR("Ein gleichschenkliges Dreieck hat an der Spitze den Winkel γ = ", "An isosceles triangle has the apex angle γ = ") + ga + TR("°. Wie groß ist jeder Basiswinkel?", "°. How large is each base angle?"), A.num(al, { unit: "°" }), TR("Die beiden Basiswinkel sind gleich groß.", "The two base angles are equal."), [TR("Für beide Basiswinkel bleiben 180° − ", "Both base angles share 180° − ") + ga + "° = " + (180 - ga) + "°", TR("Jeder Basiswinkel: ", "Each base angle: ") + (180 - ga) + "° : 2 = " + al + "°"], 2 * al + ga === 180);
    } });

    E.add({ id: "s13-bruch-plus", topic: "CM-S-13", title: TR("Brüche addieren und subtrahieren", "Adding and subtracting fractions"), gen: function (r, d) {
        var b, a, c, e;
        if (d === 1) { b = r.int(5, 12); a = r.int(1, b - 3); c = r.int(1, b - a - 1); return Q(TR("Rechne: ", "Compute: ") + m(H.fr(a, b) + " + " + H.fr(c, b)), A.frac(a + c, b), TR("Bei gleichem Nenner addierst du nur die Zähler.", "With the same denominator you only add the numerators."), [H.fr(a, b) + " + " + H.fr(c, b) + " = " + H.fr(a + c, b), TR("Gekürzt: ", "Simplified: ") + H.q(a + c, b)], M.near((a + c) / b, a / b + c / b)); }
        do { b = r.int(2, 8); e = r.int(2, 9); } while (b === e);
        a = r.int(1, b - 1); c = r.int(1, e - 1);
        var l = M.lcm(b, e), x = a * l / b, y = c * l / e;
        if (d === 2) return Q(TR("Rechne: ", "Compute: ") + m(H.fr(a, b) + " + " + H.fr(c, e)), A.frac(x + y, l), TR("Bringe beide Brüche auf den gemeinsamen Nenner ", "Bring both fractions to the common denominator ") + l + ".", [H.fr(a, b) + " = " + H.fr(x, l) + TR(" und ", " and ") + H.fr(c, e) + " = " + H.fr(y, l), H.fr(x, l) + " + " + H.fr(y, l) + " = " + H.fr(x + y, l), TR("Ergebnis: ", "Result: ") + H.q(x + y, l)], M.near((x + y) / l, a / b + c / e));
        if (x < y) { var t = a; a = c; c = t; t = b; b = e; e = t; t = x; x = y; y = t; }
        if (x === y) { x += l / b; a += 1; }
        return Q(TR("Rechne: ", "Compute: ") + m(H.fr(a, b) + " − " + H.fr(c, e)), A.frac(x - y, l), TR("Gemeinsamer Nenner: ", "Common denominator: ") + l + ".", [H.fr(a, b) + " = " + H.fr(x, l) + TR(" und ", " and ") + H.fr(c, e) + " = " + H.fr(y, l), H.fr(x, l) + " − " + H.fr(y, l) + " = " + H.fr(x - y, l), TR("Ergebnis: ", "Result: ") + H.q(x - y, l)], M.near((x - y) / l, a / b - c / e));
    } });

    E.add({ id: "s13-bruch-mal", topic: "CM-S-13", title: TR("Brüche multiplizieren und dividieren", "Multiplying and dividing fractions"), gen: function (r, d) {
        var a = r.int(1, 7), b = r.int(2, 9), c = r.int(1, 7), e = r.int(2, 9);
        if (d === 1) return Q(TR("Rechne: ", "Compute: ") + m(H.fr(a, b) + " · " + H.fr(c, e)), A.frac(a * c, b * e), TR("Zähler mal Zähler, Nenner mal Nenner.", "Numerator times numerator, denominator times denominator."), [H.fr(a + " · " + c, b + " · " + e) + " = " + H.fr(a * c, b * e), TR("Gekürzt: ", "Simplified: ") + H.q(a * c, b * e)], M.near(a * c / (b * e), (a / b) * (c / e)));
        if (d === 2) return Q(TR("Rechne: ", "Compute: ") + m(H.fr(a, b) + " : " + H.fr(c, e)), A.frac(a * e, b * c), TR("Durch einen Bruch teilen heißt mit dem Kehrbruch multiplizieren.", "Dividing by a fraction means multiplying by its reciprocal."), [H.fr(a, b) + " · " + H.fr(e, c) + " = " + H.fr(a * e, b * c), TR("Gekürzt: ", "Simplified: ") + H.q(a * e, b * c)], M.near(a * e / (b * c), (a / b) / (c / e)));
        b = r.pick([3, 4, 5, 6, 8]); a = r.int(1, b - 1); var whole = b * r.int(4, 30);
        return Q(TR("Wie viel sind ", "What is ") + m(H.fr(a, b)) + TR(" von ", " of ") + whole + " €?", A.num(whole / b * a, { unit: "€" }), TR("Teile durch den Nenner und multipliziere mit dem Zähler.", "Divide by the denominator and multiply by the numerator."), [whole + " : " + b + " = " + whole / b, whole / b + " · " + a + " = " + whole / b * a + " €"], M.near(whole * a / b, whole / b * a));
    } });

    E.add({ id: "s13-dezimal", topic: "CM-S-13", title: TR("Brüche, Dezimalzahlen, Prozent", "Fractions, decimals, percentages"), gen: function (r, d) {
        var den = r.pick([2, 4, 5, 10, 20, 25]), num = r.int(1, den - 1), v = num / den;
        if (d === 1) return Q(TR("Schreibe ", "Write ") + m(H.fr(num, den)) + TR(" als Dezimalzahl.", " as a decimal."), A.num(v, { tol: 1e-6 }), TR("Erweitere auf den Nenner 10 oder 100.", "Extend to the denominator 10 or 100."), [H.fr(num, den) + " = " + H.fr(num * 100 / den, 100), TR("Das sind ", "That is ") + n(v)], M.near(v * den, num));
        if (d === 2) return Q(TR("Schreibe ", "Write ") + m(n(v)) + TR(" als Prozentzahl.", " as a percentage."), A.num(v * 100, { unit: "%", tol: 1e-6 }), TR("Prozent heißt Hundertstel: Multipliziere mit 100.", "Percent means hundredths: multiply by 100."), [n(v) + " · 100 = " + n(v * 100), TR("Also ", "So ") + n(v * 100) + " %"], M.near(v * 100 / 100, v));
        var opts = [[H.fr(3, 4), 0.75], ["0,7", 0.7], ["72 %", 0.72], [H.fr(4, 5), 0.8], ["0,65", 0.65], ["78 %", 0.78], [H.fr(3, 5), 0.6], ["0,69", 0.69]], pick = r.shuffle(opts).slice(0, 4), best = pick.slice().sort(function (x, y) { return y[1] - x[1]; })[0];
        return Q(TR("Welche Zahl ist am größten?", "Which number is the largest?"), A.choice(r, best[0], pick.filter(function (x) { return x !== best; }).map(function (x) { return x[0]; })), TR("Wandle alle Zahlen in Dezimalzahlen um.", "Convert all numbers to decimals."), pick.map(function (x) { return x[0] + " = " + n(x[1]); }).concat([TR("Am größten ist ", "The largest is ") + best[0] + "."]), pick.every(function (x) { return x[1] <= best[1]; }));
    } });

    E.add({ id: "s13-kuerzen", topic: "CM-S-13", title: TR("Brüche kürzen", "Simplifying fractions"), gen: function (r, d) {
        var g = d === 1 ? r.int(2, 5) : (d === 2 ? r.int(4, 9) : r.int(6, 15)), p, q;
        do { p = r.int(1, 8); q = r.int(2, 11); } while (M.gcd(p, q) !== 1 || p >= q);
        return Q(TR("Kürze ", "Simplify ") + m(H.fr(p * g, q * g)) + TR(" so weit wie möglich.", " as far as possible."), A.multi([{ l: TR("Zähler", "Numerator"), a: A.num(p) }, { l: TR("Nenner", "Denominator"), a: A.num(q) }]), TR("Suche den größten gemeinsamen Teiler von Zähler und Nenner.", "Find the greatest common divisor of numerator and denominator."), [TR("ggT(", "gcd(") + p * g + ", " + q * g + ") = " + g, TR("Zähler: ", "Numerator: ") + p * g + " : " + g + " = " + p, TR("Nenner: ", "Denominator: ") + q * g + " : " + g + " = " + q], M.gcd(p * g, q * g) === g);
    } });

    E.add({ id: "s17-mittelwert", topic: "CM-S-17", title: TR("Mittelwert und Median", "Mean and median"), gen: function (r, d) {
        var k = d === 2 ? 5 : r.int(4, 5), mean = r.int(5, 14), v, i, sum, last;
        do {
            v = []; sum = 0;
            for (i = 0; i < k - 1; i += 1) { v.push(mean + r.int(-3, 3)); sum += v[i]; }
            last = mean * k - sum;
        } while (last < 1);
        v.push(last); sum += last;
        if (d === 1) return Q(TR("Berechne den Mittelwert der Zahlen ", "Work out the mean of the numbers ") + m(v.join("; ")) + ".", A.num(sum / k), TR("Summe durch Anzahl.", "Sum divided by count."), [TR("Summe: ", "Sum: ") + v.join(" + ") + " = " + sum, TR("Mittelwert: ", "Mean: ") + sum + " : " + k + " = " + n(sum / k)], sum === mean * k);
        if (d === 2) { var s = v.slice().sort(function (x, y) { return x - y; }); return Q(TR("Bestimme den Median der Zahlen ", "Find the median of the numbers ") + m(v.join("; ")) + ".", A.num(s[2]), TR("Ordne die Zahlen der Größe nach. Der Median steht in der Mitte.", "Sort the numbers by size. The median is in the middle."), [TR("Geordnet: ", "Sorted: ") + s.join("; "), TR("Der mittlere Wert ist ", "The middle value is ") + s[2] + "."], s.filter(function (x) { return x < s[2]; }).length <= 2 && s.filter(function (x) { return x > s[2]; }).length <= 2); }
        var hidden = v[k - 1];
        return Q(TR("Der Mittelwert von ", "The mean of ") + k + TR(" Zahlen ist ", " numbers is ") + mean + ". " + (k - 1) + TR(" davon sind ", " of them are ") + m(v.slice(0, k - 1).join("; ")) + TR(". Wie heißt die fehlende Zahl?", ". What is the missing number?"), A.num(hidden), TR("Die Summe aller Zahlen ist Mittelwert mal Anzahl.", "The sum of all numbers is mean times count."), [TR("Gesamtsumme: ", "Total sum: ") + mean + " · " + k + " = " + mean * k, TR("Bekannte Summe: ", "Known sum: ") + (sum - hidden), TR("Fehlende Zahl: ", "Missing number: ") + mean * k + " − " + (sum - hidden) + " = " + hidden], sum / k === mean);
    } });
})(typeof window !== "undefined" ? window : globalThis);
