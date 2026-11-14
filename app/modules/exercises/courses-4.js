/* SOR Aufgaben für Maschinenelemente, Elektrizitätslehre und Physik (K-ME-*, K-ET-*, K-PH-*). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, M = E.M, n = E.H.n, t = E.tr;
    var g = 9.81;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    var nm = function (v, dec, unit) { return A.num(v, { dec: dec, unit: unit || "", tol: Math.max(Math.abs(v) * 0.004, 0.6 * Math.pow(10, -dec)) }); };
    var deg = Math.PI / 180;

    // ================= Maschinenelemente =================
    E.add({ id: "k-me-nachweis", topic: "K-ME-1", title: t("Festigkeitsnachweis", "Strength verification"), gen: function (r, d) {
        var s = r.int(4, 30) * 5, tau = r.int(2, 20) * 5, sv = Math.sqrt(s * s + 3 * tau * tau);
        if (d === 1) return Q(t("An einer Stelle einer Welle wirken die Biegespannung σ = " + s + " MPa und die Torsionsspannung τ = " + tau + " MPa. Wie groß ist die Vergleichsspannung nach von Mises (auf 0,1)?", "At one point of a shaft the bending stress is σ = " + s + " MPa and the torsional stress τ = " + tau + " MPa. What is the von Mises equivalent stress (to 0.1)?"),
            nm(sv, 1, "MPa"), t("σ<sub>v</sub> = √(σ² + 3 τ²).", "σ<sub>v</sub> = √(σ² + 3 τ²)."), ["σ<sub>v</sub> = √(" + s + "² + 3 · " + tau + "²) = " + n(sv, 1) + " MPa"], M.near(sv * sv - 3 * tau * tau, s * s, 1e-9));
        var Re = r.pick([235, 275, 355, 460, 640]);
        if (d === 2) return Q(t("Für dieselbe Belastung (σ = " + s + " MPa, τ = " + tau + " MPa) wird ein Stahl mit R<sub>e</sub> = " + Re + " MPa verwendet. Wie groß ist die Sicherheit gegen Fließen (auf 0,01)?", "For the same load (σ = " + s + " MPa, τ = " + tau + " MPa) a steel with R<sub>e</sub> = " + Re + " MPa is used. What is the safety factor against yielding (to 0.01)?"),
            nm(Re / sv, 2, ""), t("Erst die Vergleichsspannung, dann S = R<sub>e</sub> / σ<sub>v</sub>.", "First the equivalent stress, then S = R<sub>e</sub> / σ<sub>v</sub>."), ["σ<sub>v</sub> = " + n(sv, 1) + " MPa", "S = " + Re + " / " + n(sv, 1) + " = " + n(Re / sv, 2)], M.near(Re / sv * sv, Re, 1e-9));
        var Smin = r.pick([1.5, 2, 2.5]), s3 = r.int(4, Math.floor(Re / Smin / 5) - 2) * 5, tmax = Math.sqrt((Math.pow(Re / Smin, 2) - s3 * s3) / 3);
        return Q(t("Ein Bauteil aus Stahl (R<sub>e</sub> = " + Re + " MPa) trägt die Biegespannung σ = " + s3 + " MPa. Die Sicherheit soll mindestens " + n(Smin) + " betragen. Welche Torsionsspannung τ ist höchstens zulässig (auf 0,1)?", "A steel part (R<sub>e</sub> = " + Re + " MPa) carries a bending stress σ = " + s3 + " MPa. The safety factor must be at least " + n(Smin) + ". What is the largest permissible torsional stress τ (to 0.1)?"),
            nm(tmax, 1, "MPa"), t("Setze σ<sub>v</sub> = R<sub>e</sub> / S und löse nach τ auf.", "Set σ<sub>v</sub> = R<sub>e</sub> / S and solve for τ."), ["σ<sub>v,zul</sub> = ".replace("zul", t("zul", "allow")) + Re + " / " + n(Smin) + " = " + n(Re / Smin, 1) + " MPa", "τ = √((" + n(Re / Smin, 1) + "² − " + s3 + "²) / 3) = " + n(tmax, 1) + " MPa"], M.near(Math.sqrt(s3 * s3 + 3 * tmax * tmax) * Smin, Re, 1e-9));
    } });

    var THREADS = [["M8", 36.6], ["M10", 58], ["M12", 84.3], ["M16", 157], ["M20", 245], ["M24", 353]];
    E.add({ id: "k-me-schraube", topic: "K-ME-2", title: t("Schraubenverbindungen", "Bolted joints"), gen: function (r, d) {
        var th = r.pick(THREADS);
        if (d === 1) {
            var FV = r.int(5, 40) * 1000, s = FV / th[1];
            return Q(t("Eine Schraube " + th[0] + " (Spannungsquerschnitt A<sub>S</sub> = " + n(th[1]) + " mm²) wird mit F<sub>V</sub> = " + n(FV / 1000) + " kN vorgespannt. Wie groß ist die Zugspannung in MPa (auf 0,1)?", "An " + th[0] + " bolt (stress area A<sub>S</sub> = " + n(th[1]) + " mm²) is preloaded with F<sub>V</sub> = " + n(FV / 1000) + " kN. What is the tensile stress in MPa (to 0.1)?"),
                nm(s, 1, "MPa"), t("σ = F<sub>V</sub> / A<sub>S</sub>.", "σ = F<sub>V</sub> / A<sub>S</sub>."), ["σ = " + FV + " / " + n(th[1]) + " = " + n(s, 1) + " MPa"], M.near(s * th[1], FV, 1e-9));
        }
        var mu = r.pick([0.1, 0.12, 0.15, 0.2]), z = r.int(2, 8);
        if (d === 2) {
            var F2 = r.int(10, 50) * 1000, FQ = mu * F2 * z;
            return Q(t("Ein Flansch wird mit " + z + " Schrauben verbunden, jede mit F<sub>V</sub> = " + n(F2 / 1000) + " kN vorgespannt. Die Reibzahl in der einen Trennfuge ist μ = " + n(mu) + ". Welche Querkraft in kN kann die Verbindung ohne Rutschen übertragen (auf 0,01)?", "A flange is joined by " + z + " bolts, each preloaded with F<sub>V</sub> = " + n(F2 / 1000) + " kN. The friction coefficient in the single interface is μ = " + n(mu) + ". What transverse force in kN can the joint transmit without slipping (to 0.01)?"),
                nm(FQ / 1000, 2, "kN"), t("Jede Schraube presst mit F<sub>V</sub>, die Reibkraft ist μ mal die gesamte Anpresskraft.", "Each bolt clamps with F<sub>V</sub>; the friction force is μ times the total clamping force."), ["F<sub>Q</sub> = " + n(mu) + " · " + z + " · " + n(F2 / 1000) + " kN = " + n(FQ / 1000, 2) + " kN"], M.near(FQ / mu / z, F2, 1e-9));
        }
        var FQ3 = r.int(4, 40) * 1000, S = r.pick([1.2, 1.5, 2]), mf = r.int(1, 2), FV3 = FQ3 * S / (mu * z * mf);
        return Q(t("Eine Verbindung mit " + z + " Schrauben und " + mf + " Trennfuge(n) soll die Querkraft F<sub>Q</sub> = " + n(FQ3 / 1000) + " kN mit Rutschsicherheit S = " + n(S) + " übertragen, μ = " + n(mu) + ". Welche Vorspannkraft in kN braucht jede Schraube (auf 0,01)?", "A joint with " + z + " bolts and " + mf + " interface(s) must transmit a transverse force F<sub>Q</sub> = " + n(FQ3 / 1000) + " kN with slip safety S = " + n(S) + ", μ = " + n(mu) + ". What preload in kN does each bolt need (to 0.01)?"),
            nm(FV3 / 1000, 2, "kN"), t("F<sub>Q</sub> · S ≤ μ · F<sub>V</sub> · z · Anzahl der Fugen.", "F<sub>Q</sub> · S ≤ μ · F<sub>V</sub> · z · number of interfaces."), ["F<sub>V</sub> = " + n(FQ3 / 1000) + " · " + n(S) + " / (" + n(mu) + " · " + z + " · " + mf + ")", "= " + n(FV3 / 1000, 2) + " kN"], M.near(mu * FV3 * z * mf, FQ3 * S, 1e-9));
    } });

    E.add({ id: "k-me-welle", topic: "K-ME-3", title: t("Wellen und Torsion", "Shafts and torsion"), gen: function (r, d) {
        var P = r.pick([1.5, 3, 5.5, 7.5, 11, 15, 22, 30, 45]), rpm = r.pick([500, 750, 960, 1450, 2900]), T = P * 1000 / (2 * Math.PI * rpm / 60);
        if (d === 1) return Q(t("Ein Elektromotor gibt " + n(P) + " kW bei " + rpm + " 1/min ab. Wie groß ist das Drehmoment an der Welle (auf 0,1 Nm)?", "An electric motor delivers " + n(P) + " kW at " + rpm + " rpm. What is the torque on the shaft (to 0.1 Nm)?"),
            nm(T, 1, "Nm"), t("P = T · ω mit ω = 2π n / 60.", "P = T · ω with ω = 2π n / 60."), ["ω = 2π · " + rpm + " / 60 = " + n(2 * Math.PI * rpm / 60, 2) + " 1/s", "T = " + n(P * 1000) + " / " + n(2 * Math.PI * rpm / 60, 2) + " = " + n(T, 1) + " Nm"], M.near(T * 2 * Math.PI * rpm / 60, P * 1000, 1e-9));
        var D = r.pick([20, 25, 30, 35, 40, 50]);
        if (d === 2) {
            var tau = 16 * T * 1000 / (Math.PI * Math.pow(D, 3));
            return Q(t("Die Welle eines Motors (" + n(P) + " kW, " + rpm + " 1/min) hat " + D + " mm Durchmesser. Wie groß ist die Torsionsspannung am Rand in MPa (auf 0,01)?", "The shaft of a motor (" + n(P) + " kW, " + rpm + " rpm) has a diameter of " + D + " mm. What is the torsional stress at the surface in MPa (to 0.01)?"),
                nm(tau, 2, "MPa"), t("Erst T aus P und n, dann τ = 16 T / (π d³) mit T in Nmm.", "First T from P and n, then τ = 16 T / (π d³) with T in Nmm."), ["T = " + n(T, 1) + " Nm", "τ = 16 · " + n(T * 1000, 0) + " / (π · " + D + "³) = " + n(tau, 2) + " MPa"], M.near(tau * Math.PI * Math.pow(D, 3) / 16 / 1000, T, 1e-9));
        }
        var tz = r.pick([20, 25, 30, 40, 50]), dmin = Math.pow(16 * T * 1000 / (Math.PI * tz), 1 / 3);
        return Q(t("Für einen Antrieb mit " + n(P) + " kW bei " + rpm + " 1/min ist eine Vollwelle auszulegen, zulässig sind τ = " + tz + " MPa. Welcher Mindestdurchmesser ergibt sich (auf 0,1 mm)?", "A solid shaft is to be designed for a drive with " + n(P) + " kW at " + rpm + " rpm; the permissible stress is τ = " + tz + " MPa. What minimum diameter results (to 0.1 mm)?"),
            nm(dmin, 1, "mm"), t("τ = 16 T / (π d³) nach d auflösen.", "Solve τ = 16 T / (π d³) for d."), ["T = " + n(T, 1) + " Nm", "d = ∛(16 · " + n(T * 1000, 0) + " / (π · " + tz + ")) = " + n(dmin, 1) + " mm"], M.near(16 * T * 1000 / (Math.PI * Math.pow(dmin, 3)), tz, 1e-9));
    } });

    E.add({ id: "k-me-lager", topic: "K-ME-4", title: t("Wälzlager-Lebensdauer", "Rolling bearing life"), gen: function (r, d) {
        var C = r.pick([14, 19.5, 25.5, 33.2, 52, 63.7]), P = M.round(C / r.pick([2, 2.5, 3, 4, 5, 6]), 2), L = Math.pow(C / P, 3);
        if (d === 1) return Q(t("Ein Rillenkugellager hat die dynamische Tragzahl C = " + n(C) + " kN und die äquivalente Belastung P = " + n(P, 2) + " kN. Wie groß ist die nominelle Lebensdauer L<sub>10</sub> in Millionen Umdrehungen (auf 0,1)?", "A deep groove ball bearing has a dynamic load rating C = " + n(C) + " kN and an equivalent load P = " + n(P, 2) + " kN. What is the nominal life L<sub>10</sub> in millions of revolutions (to 0.1)?"),
            nm(L, 1, t("Mio. U", "million rev")), t("Kugellager: L<sub>10</sub> = (C / P)³.", "Ball bearings: L<sub>10</sub> = (C / P)³."), ["C / P = " + n(C / P, 3), "L<sub>10</sub> = " + n(C / P, 3) + "³ = " + n(L, 1)], M.near(Math.cbrt(L) * P, C, 1e-9));
        var rpm = r.pick([500, 750, 1000, 1450, 3000]);
        if (d === 2) {
            var h = L * 1e6 / (60 * rpm);
            return Q(t("Dasselbe Lager (C = " + n(C) + " kN, P = " + n(P, 2) + " kN) läuft mit " + rpm + " 1/min. Wie viele Betriebsstunden erreicht es nominell (auf 1 h)?", "The same bearing (C = " + n(C) + " kN, P = " + n(P, 2) + " kN) runs at " + rpm + " rpm. How many operating hours does it reach nominally (to 1 h)?"),
                nm(h, 0, "h"), t("L<sub>10h</sub> = L<sub>10</sub> · 10<sup>6</sup> / (60 n).", "L<sub>10h</sub> = L<sub>10</sub> · 10<sup>6</sup> / (60 n)."), ["L<sub>10</sub> = " + n(L, 2) + " · 10<sup>6</sup> U".replace(" U", t(" U", " rev")), "L<sub>10h</sub> = " + n(L * 1e6, 0) + " / (60 · " + rpm + ") = " + n(h, 0) + " h"], M.near(h * 60 * rpm, Math.pow(C / P, 3) * 1e6, 1e-9));
        }
        var Lh = r.pick([5000, 10000, 20000, 30000, 50000]), P3 = r.pick([2, 3, 5, 8, 12]), Creq = P3 * Math.pow(Lh * 60 * rpm / 1e6, 3 / 10);
        return Q(t("Ein Zylinderrollenlager mit P = " + P3 + " kN soll bei " + rpm + " 1/min mindestens " + Lh + " h halten. Welche dynamische Tragzahl C ist mindestens nötig (auf 0,1 kN)?", "A cylindrical roller bearing with P = " + P3 + " kN must last at least " + Lh + " h at " + rpm + " rpm. What minimum dynamic load rating C is needed (to 0.1 kN)?"),
            nm(Creq, 1, "kN"), t("Rollenlager: p = 10/3. Erst L<sub>10</sub> in Mio. Umdrehungen, dann C = P · L<sub>10</sub><sup>3/10</sup>.", "Roller bearings: p = 10/3. First L<sub>10</sub> in millions of revolutions, then C = P · L<sub>10</sub><sup>3/10</sup>."), ["L<sub>10</sub> = " + Lh + " · 60 · " + rpm + " / 10<sup>6</sup> = " + n(Lh * 60 * rpm / 1e6, 1), "C = " + P3 + " · " + n(Lh * 60 * rpm / 1e6, 1) + "<sup>0,3</sup>".replace("0,3", t("0,3", "0.3")) + " = " + n(Creq, 1) + " kN"], M.near(Math.pow(Creq / P3, 10 / 3) * 1e6 / (60 * rpm), Lh, 1e-9));
    } });

    E.add({ id: "k-me-zahnrad", topic: "K-ME-5", title: t("Zahnräder", "Gears"), gen: function (r, d) {
        var z1 = r.int(14, 30), z2 = z1 * r.pick([2, 3, 4]) + r.int(0, 9), i = z2 / z1, n1 = r.pick([960, 1450, 2900, 3000]);
        if (d === 1) return Q(t("Ein Ritzel mit z<sub>1</sub> = " + z1 + " Zähnen treibt ein Rad mit z<sub>2</sub> = " + z2 + " Zähnen an, n<sub>1</sub> = " + n1 + " 1/min. Bestimme die Übersetzung i und die Abtriebsdrehzahl n<sub>2</sub>.", "A pinion with z<sub>1</sub> = " + z1 + " teeth drives a gear with z<sub>2</sub> = " + z2 + " teeth, n<sub>1</sub> = " + n1 + " rpm. Find the ratio i and the output speed n<sub>2</sub>."),
            A.multi([{ l: "i", a: nm(i, 3, "") }, { l: "n<sub>2</sub>", a: nm(n1 / i, 1, t("1/min", "rpm")) }]), t("i = z<sub>2</sub> / z<sub>1</sub> = n<sub>1</sub> / n<sub>2</sub>.", "i = z<sub>2</sub> / z<sub>1</sub> = n<sub>1</sub> / n<sub>2</sub>."), ["i = " + z2 + " / " + z1 + " = " + n(i, 3), "n<sub>2</sub> = " + n1 + " / " + n(i, 3) + " = " + n(n1 / i, 1)], M.near(n1 * z1, (n1 / i) * z2, 1e-9));
        if (d === 2) {
            var T1 = r.int(10, 200), eta = r.pick([0.95, 0.96, 0.97, 0.98, 0.99]), T2 = T1 * i * eta;
            return Q(t("Am Ritzel (z<sub>1</sub> = " + z1 + ") liegt das Moment T<sub>1</sub> = " + T1 + " Nm an, das Rad hat z<sub>2</sub> = " + z2 + ", der Wirkungsgrad der Stufe ist η = " + n(eta) + ". Welches Moment steht am Abtrieb zur Verfügung (auf 0,1 Nm)?", "The pinion (z<sub>1</sub> = " + z1 + ") carries a torque T<sub>1</sub> = " + T1 + " Nm; the gear has z<sub>2</sub> = " + z2 + " and the stage efficiency is η = " + n(eta) + ". What output torque is available (to 0.1 Nm)?"),
                nm(T2, 1, "Nm"), t("T<sub>2</sub> = T<sub>1</sub> · i · η.", "T<sub>2</sub> = T<sub>1</sub> · i · η."), ["i = " + n(i, 3), "T<sub>2</sub> = " + T1 + " · " + n(i, 3) + " · " + n(eta) + " = " + n(T2, 1) + " Nm"], M.near(T2 * (n1 / i), T1 * n1 * eta, 1e-9));
        }
        var m = r.pick([1, 1.5, 2, 2.5, 3, 4, 5]);
        return Q(t("Ein Stirnradpaar mit Modul m = " + n(m) + " mm hat z<sub>1</sub> = " + z1 + " und z<sub>2</sub> = " + z2 + " Zähne. Bestimme die Teilkreisdurchmesser und den Achsabstand.", "A spur gear pair with module m = " + n(m) + " mm has z<sub>1</sub> = " + z1 + " and z<sub>2</sub> = " + z2 + " teeth. Find the pitch diameters and the centre distance."),
            A.multi([{ l: "d<sub>1</sub>", a: nm(m * z1, 1, "mm") }, { l: "d<sub>2</sub>", a: nm(m * z2, 1, "mm") }, { l: "a", a: nm(m * (z1 + z2) / 2, 2, "mm") }]), t("d = m · z, der Achsabstand ist die Summe der Radien.", "d = m · z; the centre distance is the sum of the radii."), ["d<sub>1</sub> = " + n(m) + " · " + z1 + " = " + n(m * z1, 1) + " mm", "d<sub>2</sub> = " + n(m) + " · " + z2 + " = " + n(m * z2, 1) + " mm", "a = (" + n(m * z1, 1) + " + " + n(m * z2, 1) + ") / 2 = " + n(m * (z1 + z2) / 2, 2) + " mm"], M.near((m * z1 + m * z2) / 2, m * (z1 + z2) / 2, 1e-9));
    } });

    E.add({ id: "k-me-feder", topic: "K-ME-6", title: t("Federn", "Springs"), gen: function (r, d) {
        if (d === 1) {
            var F = r.int(5, 80) * 10, s = r.int(4, 40), c = F / s;
            return Q(t("Eine Druckfeder wird mit F = " + F + " N um s = " + s + " mm zusammengedrückt. Wie groß ist die Federrate in N/mm (auf 0,01)?", "A compression spring is compressed by s = " + s + " mm under F = " + F + " N. What is the spring rate in N/mm (to 0.01)?"),
                nm(c, 2, "N/mm"), t("c = F / s.", "c = F / s."), ["c = " + F + " / " + s + " = " + n(c, 2) + " N/mm"], M.near(c * s, F, 1e-9));
        }
        var c1 = r.int(5, 60), c2 = r.int(5, 60), c3 = r.int(5, 60);
        if (d === 2) {
            var cs = c1 * c2 / (c1 + c2) + c3;
            return Q(t("Zwei Federn mit c<sub>1</sub> = " + c1 + " N/mm und c<sub>2</sub> = " + c2 + " N/mm sind hintereinander geschaltet. Parallel dazu wirkt eine dritte Feder mit c<sub>3</sub> = " + c3 + " N/mm. Wie groß ist die Gesamtfederrate (auf 0,01)?", "Two springs with c<sub>1</sub> = " + c1 + " N/mm and c<sub>2</sub> = " + c2 + " N/mm are in series. A third spring with c<sub>3</sub> = " + c3 + " N/mm acts in parallel to them. What is the total spring rate (to 0.01)?"),
                nm(cs, 2, "N/mm"), t("Reihe: Kehrwerte addieren. Parallel: Raten addieren.", "Series: add the reciprocals. Parallel: add the rates."), ["c<sub>12</sub> = " + c1 + " · " + c2 + " / (" + c1 + " + " + c2 + ") = " + n(c1 * c2 / (c1 + c2), 2), "c = " + n(c1 * c2 / (c1 + c2), 2) + " + " + c3 + " = " + n(cs, 2) + " N/mm"], M.near(1 / (cs - c3), 1 / c1 + 1 / c2, 1e-9));
        }
        var s3 = r.int(5, 40), W = 0.5 * c1 * s3 * s3 / 1000;
        return Q(t("Eine Feder mit c = " + c1 + " N/mm wird um " + s3 + " mm gespannt. Wie viel Energie speichert sie in J (auf 0,001)?", "A spring with c = " + c1 + " N/mm is compressed by " + s3 + " mm. How much energy does it store in J (to 0.001)?"),
            nm(W, 3, "J"), t("W = ½ c s². N · mm in J umrechnen: durch 1000 teilen.", "W = ½ c s². Convert N · mm to J: divide by 1000."), ["W = ½ · " + c1 + " · " + s3 + "² = " + n(W * 1000, 1) + " Nmm = " + n(W, 3) + " J"], M.near(M.simpson(function (x) { return c1 * x; }, 0, s3, 10) / 1000, W, 1e-9));
    } });

    // ================= Elektrizitätslehre =================
    var RS = [10, 22, 33, 47, 56, 68, 100, 150, 220, 330, 470, 680, 1000, 2200, 4700];
    E.add({ id: "k-et-ohm", topic: "K-ET-1", title: t("Ohmsches Gesetz", "Ohm's law"), gen: function (r, d) {
        var R = r.pick(RS), U = r.pick([1.5, 3.3, 5, 9, 12, 24]);
        if (d === 1) return Q(t("An einem Widerstand R = " + R + " Ω liegt U = " + n(U) + " V. Wie groß ist der Strom in mA (auf 0,01)?", "A voltage U = " + n(U) + " V is applied across a resistor R = " + R + " Ω. What is the current in mA (to 0.01)?"),
            nm(U / R * 1000, 2, "mA"), t("I = U / R.", "I = U / R."), ["I = " + n(U) + " / " + R + " = " + n(U / R * 1000, 2) + " mA"], M.near(U / R * R, U, 1e-9));
        if (d === 2) return Q(t("Welche Leistung in mW wird in einem Widerstand R = " + R + " Ω umgesetzt, wenn U = " + n(U) + " V anliegt (auf 0,1)?", "What power in mW is dissipated in a resistor R = " + R + " Ω when U = " + n(U) + " V is applied (to 0.1)?"),
            nm(U * U / R * 1000, 1, "mW"), t("P = U² / R.", "P = U² / R."), ["P = " + n(U) + "² / " + R + " = " + n(U * U / R * 1000, 1) + " mW"], M.near((U / R) * U, U * U / R, 1e-9));
        var Pn = r.pick([0.125, 0.25, 0.5, 1, 2]), Umax = Math.sqrt(Pn * R);
        return Q(t("Ein Widerstand R = " + R + " Ω ist für höchstens " + n(Pn) + " W ausgelegt. Welche Spannung darf höchstens anliegen (auf 0,01 V)?", "A resistor R = " + R + " Ω is rated for at most " + n(Pn) + " W. What is the maximum voltage that may be applied (to 0.01 V)?"),
            nm(Umax, 2, "V"), t("Aus P = U² / R folgt U = √(P R).", "From P = U² / R it follows that U = √(P R)."), ["U = √(" + n(Pn) + " · " + R + ") = " + n(Umax, 2) + " V"], M.near(Umax * Umax / R, Pn, 1e-9));
    } });

    E.add({ id: "k-et-netz", topic: "K-ET-2", title: t("Reihe und parallel", "Series and parallel"), gen: function (r, d) {
        var a = r.pick(RS), b = r.pick(RS), c = r.pick(RS), par = function (x, y) { return x * y / (x + y); };
        if (d === 1) { var R3 = r.pick(RS); return Q(t("Drei Widerstände " + a + " Ω, " + b + " Ω und " + R3 + " Ω sind in Reihe geschaltet. Wie groß ist der Gesamtwiderstand?", "Three resistors of " + a + " Ω, " + b + " Ω and " + R3 + " Ω are connected in series. What is the total resistance?"),
            nm(a + b + R3, 0, "Ω"), t("In Reihe addieren sich die Widerstände.", "In series the resistances add."), ["R = " + a + " + " + b + " + " + R3 + " = " + (a + b + R3) + " Ω"], M.near(a + b + R3 - R3, a + b)); }
        if (d === 2) return Q(t("Zwei Widerstände " + a + " Ω und " + b + " Ω sind parallel geschaltet. Wie groß ist der Ersatzwiderstand (auf 0,01)?", "Two resistors of " + a + " Ω and " + b + " Ω are connected in parallel. What is the equivalent resistance (to 0.01)?"),
            nm(par(a, b), 2, "Ω"), t("Produkt durch Summe, oder Leitwerte addieren.", "Product over sum, or add the conductances."), ["R = " + a + " · " + b + " / (" + a + " + " + b + ") = " + n(par(a, b), 2) + " Ω"], M.near(1 / par(a, b), 1 / a + 1 / b, 1e-9) && par(a, b) <= Math.min(a, b));
        var Rt = a + par(b, c);
        return Q(t("R<sub>1</sub> = " + a + " Ω liegt in Reihe zu einer Parallelschaltung aus R<sub>2</sub> = " + b + " Ω und R<sub>3</sub> = " + c + " Ω. Wie groß ist der Gesamtwiderstand (auf 0,01)?", "R<sub>1</sub> = " + a + " Ω is in series with a parallel combination of R<sub>2</sub> = " + b + " Ω and R<sub>3</sub> = " + c + " Ω. What is the total resistance (to 0.01)?"),
            nm(Rt, 2, "Ω"), t("Erst die Parallelschaltung zusammenfassen, dann R<sub>1</sub> addieren.", "First combine the parallel part, then add R<sub>1</sub>."), ["R<sub>23</sub> = " + n(par(b, c), 2) + " Ω", "R = " + a + " + " + n(par(b, c), 2) + " = " + n(Rt, 2) + " Ω"], M.near(1 / (Rt - a), 1 / b + 1 / c, 1e-9));
    } });

    E.add({ id: "k-et-teiler", topic: "K-ET-3", title: t("Spannungsteiler", "Voltage divider"), gen: function (r, d) {
        var U = r.pick([5, 9, 12, 24]), R1 = r.pick(RS), R2 = r.pick(RS);
        if (d === 1) { var U2 = U * R2 / (R1 + R2); return Q(t("Ein Spannungsteiler aus R<sub>1</sub> = " + R1 + " Ω und R<sub>2</sub> = " + R2 + " Ω liegt an U = " + U + " V. Welche Spannung fällt an R<sub>2</sub> ab (auf 0,01)?", "A voltage divider of R<sub>1</sub> = " + R1 + " Ω and R<sub>2</sub> = " + R2 + " Ω is connected to U = " + U + " V. What voltage appears across R<sub>2</sub> (to 0.01)?"),
            nm(U2, 2, "V"), t("U<sub>2</sub> = U · R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>).", "U<sub>2</sub> = U · R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)."), ["I = " + U + " / " + (R1 + R2) + " = " + n(U / (R1 + R2) * 1000, 3) + " mA", "U<sub>2</sub> = I · R<sub>2</sub> = " + n(U2, 2) + " V"], M.near(U / (R1 + R2) * R1 + U2, U, 1e-9)); }
        if (d === 2) {
            var Ut = r.int(1, U - 1) + r.pick([0, 0.5]), R2n = R1 * Ut / (U - Ut);
            return Q(t("Aus U = " + U + " V soll mit R<sub>1</sub> = " + R1 + " Ω eine Spannung von " + n(Ut) + " V an R<sub>2</sub> abgegriffen werden. Wie groß muss R<sub>2</sub> sein (auf 0,1 Ω)?", "From U = " + U + " V a voltage of " + n(Ut) + " V is to be tapped across R<sub>2</sub>, with R<sub>1</sub> = " + R1 + " Ω. How large must R<sub>2</sub> be (to 0.1 Ω)?"),
                nm(R2n, 1, "Ω"), t("Die Spannungen verhalten sich wie die Widerstände: U<sub>2</sub> / U<sub>1</sub> = R<sub>2</sub> / R<sub>1</sub>.", "The voltages are in the same ratio as the resistances: U<sub>2</sub> / U<sub>1</sub> = R<sub>2</sub> / R<sub>1</sub>."), ["U<sub>1</sub> = " + U + " − " + n(Ut) + " = " + n(U - Ut) + " V", "R<sub>2</sub> = " + R1 + " · " + n(Ut) + " / " + n(U - Ut) + " = " + n(R2n, 1) + " Ω"], M.near(U * R2n / (R1 + R2n), Ut, 1e-9));
        }
        var RL = r.pick(RS), Rp = R2 * RL / (R2 + RL), U2L = U * Rp / (R1 + Rp);
        return Q(t("Am Spannungsteiler (U = " + U + " V, R<sub>1</sub> = " + R1 + " Ω, R<sub>2</sub> = " + R2 + " Ω) wird parallel zu R<sub>2</sub> eine Last R<sub>L</sub> = " + RL + " Ω angeschlossen. Welche Spannung liegt nun an der Last (auf 0,01)?", "A load R<sub>L</sub> = " + RL + " Ω is connected in parallel with R<sub>2</sub> of a voltage divider (U = " + U + " V, R<sub>1</sub> = " + R1 + " Ω, R<sub>2</sub> = " + R2 + " Ω). What voltage is now across the load (to 0.01)?"),
            nm(U2L, 2, "V"), t("R<sub>2</sub> und R<sub>L</sub> parallel zusammenfassen, dann wieder Spannungsteiler.", "Combine R<sub>2</sub> and R<sub>L</sub> in parallel, then use the divider again."), ["R<sub>2</sub> ∥ R<sub>L</sub> = " + n(Rp, 2) + " Ω", "U<sub>L</sub> = " + U + " · " + n(Rp, 2) + " / (" + R1 + " + " + n(Rp, 2) + ") = " + n(U2L, 2) + " V"], M.near((U - U2L) / R1, U2L / R2 + U2L / RL, 1e-9));
    } });

    E.add({ id: "k-et-rc", topic: "K-ET-4", title: t("RC-Glied", "RC circuit"), gen: function (r, d) {
        var R = r.pick([1, 2.2, 4.7, 10, 22, 47, 100]), C = r.pick([1, 2.2, 4.7, 10, 22, 47, 100]), tau = R * C;
        if (d === 1) return Q(t("Ein RC-Glied hat R = " + n(R) + " kΩ und C = " + n(C) + " µF. Wie groß ist die Zeitkonstante τ in ms (auf 0,01)?", "An RC circuit has R = " + n(R) + " kΩ and C = " + n(C) + " µF. What is the time constant τ in ms (to 0.01)?"),
            nm(tau, 2, "ms"), t("τ = R · C. kΩ mal µF ergibt ms.", "τ = R · C. kΩ times µF gives ms."), ["τ = " + n(R) + " · 10<sup>3</sup> Ω · " + n(C) + " · 10<sup>−6</sup> F = " + n(tau, 2) + " ms"], M.near(R * 1e3 * C * 1e-6 * 1000, tau, 1e-9));
        var U = r.pick([5, 10, 12, 24]);
        var sim = function (tt) { var u = 0, dt = tau / 4000; for (var x = 0; x < tt; x += dt) u += dt * (U - u) / tau; return u; };
        if (d === 2) {
            var k = r.pick([0.5, 1, 2, 3]), uc = U * (1 - Math.exp(-k));
            return Q(t("Ein entladener Kondensator (C = " + n(C) + " µF) wird über R = " + n(R) + " kΩ an U = " + U + " V gelegt. Welche Spannung hat er nach t = " + n(k * tau, 2) + " ms (auf 0,01 V)?", "A discharged capacitor (C = " + n(C) + " µF) is connected through R = " + n(R) + " kΩ to U = " + U + " V. What voltage does it have after t = " + n(k * tau, 2) + " ms (to 0.01 V)?"),
                nm(uc, 2, "V"), t("u<sub>C</sub> = U (1 − e<sup>−t/τ</sup>).", "u<sub>C</sub> = U (1 − e<sup>−t/τ</sup>)."), ["τ = " + n(tau, 2) + " ms, t / τ = " + n(k), "u<sub>C</sub> = " + U + " · (1 − e<sup>−" + n(k) + "</sup>) = " + n(uc, 2) + " V"], Math.abs(sim(k * tau) - uc) < 0.01 * U);
        }
        var pct = r.pick([50, 80, 90, 95, 99]), tt = -tau * Math.log(1 - pct / 100);
        return Q(t("Nach welcher Zeit hat sich ein Kondensator im RC-Glied (R = " + n(R) + " kΩ, C = " + n(C) + " µF) auf " + pct + " % der Endspannung aufgeladen (auf 0,01 ms)?", "After what time has a capacitor in an RC circuit (R = " + n(R) + " kΩ, C = " + n(C) + " µF) charged to " + pct + "% of the final voltage (to 0.01 ms)?"),
            nm(tt, 2, "ms"), t("1 − e<sup>−t/τ</sup> = Anteil, also t = −τ ln(1 − Anteil).", "1 − e<sup>−t/τ</sup> = fraction, so t = −τ ln(1 − fraction)."), ["τ = " + n(tau, 2) + " ms", "t = −" + n(tau, 2) + " · ln(1 − " + n(pct / 100) + ") = " + n(tt, 2) + " ms"], Math.abs(sim(tt) / U - pct / 100) < 0.01);
    } });

    E.add({ id: "k-et-ac", topic: "K-ET-5", title: t("Wechselstrom", "Alternating current"), gen: function (r, d) {
        if (d === 1) {
            var up = r.pick([10, 50, 100, 170, 325, 400]), ueff = up / Math.SQRT2, rms = Math.sqrt(M.simpson(function (x) { return Math.pow(up * Math.sin(x), 2); }, 0, 2 * Math.PI, 400) / (2 * Math.PI));
            return Q(t("Eine sinusförmige Wechselspannung hat den Scheitelwert û = " + up + " V. Wie groß ist ihr Effektivwert (auf 0,01)?", "A sinusoidal AC voltage has a peak value û = " + up + " V. What is its RMS value (to 0.01)?"),
                nm(ueff, 2, "V"), t("Beim Sinus gilt U<sub>eff</sub> = û / √2.", "For a sine wave U<sub>eff</sub> = û / √2."), ["U<sub>eff</sub> = " + up + " / √2 = " + n(ueff, 2) + " V"], M.near(rms, ueff, 1e-6));
        }
        var f = r.pick([50, 60, 100, 400, 1000]), Cu = r.pick([1, 2.2, 4.7, 10, 22, 47]), XC = 1 / (2 * Math.PI * f * Cu * 1e-6);
        if (d === 2) return Q(t("Wie groß ist der Blindwiderstand eines Kondensators mit C = " + n(Cu) + " µF bei f = " + f + " Hz (auf 0,01 Ω)?", "What is the reactance of a capacitor with C = " + n(Cu) + " µF at f = " + f + " Hz (to 0.01 Ω)?"),
            nm(XC, 2, "Ω"), t("X<sub>C</sub> = 1 / (2π f C).", "X<sub>C</sub> = 1 / (2π f C)."), ["X<sub>C</sub> = 1 / (2π · " + f + " · " + n(Cu) + " · 10<sup>−6</sup>) = " + n(XC, 2) + " Ω"], M.near(XC * 2 * Math.PI * f * Cu, 1e6, 1e-9));
        var R = r.pick([10, 22, 47, 100, 220]), L = r.pick([10, 22, 47, 100, 220]) / 1000, U = r.pick([12, 24, 48, 230]), XL = 2 * Math.PI * f * L, Z = Math.sqrt(R * R + Math.pow(XL - XC, 2)), I = U / Z;
        return Q(t("Eine Reihenschaltung aus R = " + R + " Ω, L = " + n(L * 1000) + " mH und C = " + n(Cu) + " µF liegt an U = " + U + " V, f = " + f + " Hz. Bestimme den Scheinwiderstand |Z| und den Strom.", "A series circuit of R = " + R + " Ω, L = " + n(L * 1000) + " mH and C = " + n(Cu) + " µF is connected to U = " + U + " V, f = " + f + " Hz. Find the impedance |Z| and the current."),
            A.multi([{ l: "|Z|", a: nm(Z, 2, "Ω") }, { l: "I", a: nm(I, 3, "A") }]), t("Erst X<sub>L</sub> und X<sub>C</sub>, dann |Z| = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²) und I = U / |Z|.", "First X<sub>L</sub> and X<sub>C</sub>, then |Z| = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²) and I = U / |Z|."), ["X<sub>L</sub> = " + n(XL, 2) + " Ω, X<sub>C</sub> = " + n(XC, 2) + " Ω", "|Z| = " + n(Z, 2) + " Ω", "I = " + U + " / " + n(Z, 2) + " = " + n(I, 3) + " A"], M.near(Math.pow(I * Z, 2), U * U, 1e-9));
    } });

    E.add({ id: "k-et-drehstrom", topic: "K-ET-6", title: t("Drehstrom", "Three-phase power"), gen: function (r, d) {
        var U = 400, I = r.pick([5, 8, 10, 16, 20, 25, 32, 40, 63]), cp = r.pick([0.75, 0.8, 0.82, 0.85, 0.88, 0.9]), P = Math.sqrt(3) * U * I * cp / 1000;
        if (d === 1) return Q(t("Ein Drehstrommotor nimmt am 400-V-Netz I = " + I + " A bei cos φ = " + n(cp) + " auf. Wie groß ist die aufgenommene Wirkleistung in kW (auf 0,01)?", "A three-phase motor draws I = " + I + " A from a 400 V supply at cos φ = " + n(cp) + ". What real power does it take in kW (to 0.01)?"),
            nm(P, 2, "kW"), t("P = √3 · U · I · cos φ.", "P = √3 · U · I · cos φ."), ["P = √3 · 400 · " + I + " · " + n(cp) + " = " + n(P, 2) + " kW"], M.near(P * 1000 / (Math.sqrt(3) * U * cp), I, 1e-9));
        var Pm = r.pick([1.5, 2.2, 4, 5.5, 7.5, 11, 15, 22]), eta = r.pick([0.8, 0.85, 0.88, 0.9, 0.92]);
        if (d === 2) {
            var I2 = Pm * 1000 / (Math.sqrt(3) * U * cp);
            return Q(t("Ein Drehstromverbraucher soll am 400-V-Netz " + n(Pm) + " kW Wirkleistung aufnehmen, cos φ = " + n(cp) + ". Welcher Leiterstrom fließt (auf 0,01 A)?", "A three-phase load is to draw " + n(Pm) + " kW of real power from a 400 V supply, cos φ = " + n(cp) + ". What line current flows (to 0.01 A)?"),
                nm(I2, 2, "A"), t("P = √3 U I cos φ nach I auflösen.", "Solve P = √3 U I cos φ for I."), ["I = " + n(Pm * 1000) + " / (√3 · 400 · " + n(cp) + ") = " + n(I2, 2) + " A"], M.near(Math.sqrt(3) * U * I2 * cp, Pm * 1000, 1e-9));
        }
        var I3 = Pm * 1000 / eta / (Math.sqrt(3) * U * cp);
        return Q(t("Ein Motor gibt an der Welle " + n(Pm) + " kW ab, Wirkungsgrad η = " + n(eta) + ", cos φ = " + n(cp) + ", Netz 400 V in Sternschaltung. Bestimme die Strangspannung und den Leiterstrom.", "A motor delivers " + n(Pm) + " kW at the shaft, efficiency η = " + n(eta) + ", cos φ = " + n(cp) + ", 400 V supply in star connection. Find the phase voltage and the line current."),
            A.multi([{ l: t("U<sub>Strang</sub>", "U<sub>phase</sub>"), a: nm(U / Math.sqrt(3), 1, "V") }, { l: "I", a: nm(I3, 2, "A") }]), t("Stern: U<sub>Strang</sub> = U / √3. Elektrische Leistung = mechanische Leistung / η.", "Star: U<sub>phase</sub> = U / √3. Electrical power = mechanical power / η."), ["U<sub>Str</sub> = 400 / √3 = ".replace("Str", t("Str", "ph")) + n(U / Math.sqrt(3), 1) + " V", "P<sub>el</sub> = " + n(Pm) + " / " + n(eta) + " = " + n(Pm / eta, 2) + " kW", "I = " + n(I3, 2) + " A"], M.near(3 * (U / Math.sqrt(3)) * I3 * cp * eta, Pm * 1000, 1e-9));
    } });

    // ================= Physik =================
    E.add({ id: "k-ph-wurf", topic: "K-PH-1", title: t("Waagerechter Wurf", "Horizontal projectile"), gen: function (r, d) {
        var h = r.pick([1.25, 2, 5, 10, 20, 45, 80]), tF = Math.sqrt(2 * h / g);
        var sim = function (v0) { var x = 0, y = 0, vy = 0, dt = 1e-5; while (y < h) { x += v0 * dt; vy += g * dt; y += vy * dt; } return x; };
        if (d === 1) return Q(t("Eine Kugel rollt von einem " + n(h) + " m hohen Tisch. Wie lange fällt sie (auf 0,001 s)?", "A ball rolls off a table " + n(h) + " m high. How long does it fall (to 0.001 s)?"),
            nm(tF, 3, "s"), t("Vertikal ist es ein freier Fall: h = ½ g t².", "Vertically it is free fall: h = ½ g t²."), ["t = √(2 · " + n(h) + " / " + t("9,81", "9.81") + ") = " + n(tF, 3) + " s"], M.near(0.5 * g * tF * tF, h, 1e-9));
        var v0 = r.pick([2, 3, 5, 8, 10, 15, 20]);
        if (d === 2) return Q(t("Ein Wasserstrahl tritt waagerecht mit v<sub>0</sub> = " + v0 + " m/s aus einer Düse in " + n(h) + " m Höhe aus. In welcher Entfernung trifft er auf den Boden (auf 0,01 m)?", "A water jet leaves a nozzle horizontally at v<sub>0</sub> = " + v0 + " m/s from a height of " + n(h) + " m. How far away does it hit the ground (to 0.01 m)?"),
            nm(v0 * tF, 2, "m"), t("Fallzeit aus der Höhe, dann Wurfweite w = v<sub>0</sub> t.", "Fall time from the height, then range w = v<sub>0</sub> t."), ["t = " + n(tF, 3) + " s", "w = " + v0 + " · " + n(tF, 3) + " = " + n(v0 * tF, 2) + " m"], Math.abs(sim(v0) - v0 * tF) < 0.002 * v0 + 0.01);
        var w = r.int(3, 40), vreq = w / tF;
        return Q(t("Ein Ball soll waagerecht aus " + n(h) + " m Höhe geworfen werden und " + w + " m entfernt landen. Mit welcher Geschwindigkeit muss er abgeworfen werden (auf 0,01)?", "A ball is thrown horizontally from a height of " + n(h) + " m and should land " + w + " m away. At what speed must it be thrown (to 0.01)?"),
            nm(vreq, 2, "m/s"), t("Die Fallzeit hängt nur von der Höhe ab. Dann v<sub>0</sub> = w / t.", "The fall time depends only on the height. Then v<sub>0</sub> = w / t."), ["t = " + n(tF, 3) + " s", "v<sub>0</sub> = " + w + " / " + n(tF, 3) + " = " + n(vreq, 2) + " m/s"], Math.abs(sim(vreq) - w) < 0.002 * w + 0.01);
    } });

    E.add({ id: "k-ph-linse", topic: "K-PH-2", title: t("Linsen", "Lenses"), gen: function (r, d) {
        var f = r.pick([5, 10, 15, 20, 25, 50]), gg = f * r.pick([1.5, 2, 2.5, 3, 4, 5, 6]), b = 1 / (1 / f - 1 / gg);
        if (d === 1) return Q(t("Ein Gegenstand steht " + n(gg) + " cm vor einer Sammellinse mit f = " + f + " cm. In welchem Abstand hinter der Linse entsteht das scharfe Bild (auf 0,01 cm)?", "An object stands " + n(gg) + " cm in front of a converging lens with f = " + f + " cm. At what distance behind the lens is the sharp image (to 0.01 cm)?"),
            nm(b, 2, "cm"), t("Linsengleichung 1/f = 1/g + 1/b nach b auflösen.", "Solve the lens equation 1/f = 1/g + 1/b for b."), ["1/b = 1/" + f + " − 1/" + n(gg) + " = " + n(1 / b, 5), "b = " + n(b, 2) + " cm"], M.near(1 / gg + 1 / b, 1 / f, 1e-9));
        if (d === 2) {
            var G = r.pick([1, 2, 3, 5, 10]), B = G * b / gg;
            return Q(t("Ein " + G + " cm großer Gegenstand steht " + n(gg) + " cm vor einer Linse mit f = " + f + " cm. Bestimme die Bildweite und die Bildgröße.", "An object " + G + " cm tall stands " + n(gg) + " cm in front of a lens with f = " + f + " cm. Find the image distance and the image size."),
                A.multi([{ l: "b", a: nm(b, 2, "cm") }, { l: "B", a: nm(B, 2, "cm") }]), t("Erst b aus der Linsengleichung, dann B / G = b / g.", "First b from the lens equation, then B / G = b / g."), ["b = " + n(b, 2) + " cm", "B = " + G + " · " + n(b, 2) + " / " + n(gg) + " = " + n(B, 2) + " cm"], M.near(B / G, b / gg, 1e-9));
        }
        var g3 = r.int(15, 80), b3 = r.int(15, 80), f3 = g3 * b3 / (g3 + b3);
        return Q(t("Ein Projektor bildet ein Dia scharf ab, wenn das Dia " + g3 + " cm vor und der Schirm " + b3 + " cm hinter der Linse steht. Welche Brennweite hat die Linse (auf 0,01 cm)?", "A projector forms a sharp image when the slide is " + g3 + " cm in front of the lens and the screen " + b3 + " cm behind it. What is the focal length of the lens (to 0.01 cm)?"),
            nm(f3, 2, "cm"), t("1/f = 1/g + 1/b.", "1/f = 1/g + 1/b."), ["f = " + g3 + " · " + b3 + " / (" + g3 + " + " + b3 + ") = " + n(f3, 2) + " cm"], M.near(1 / f3, 1 / g3 + 1 / b3, 1e-9));
    } });

    E.add({ id: "k-ph-brechung", topic: "K-PH-3", title: t("Brechung", "Refraction"), gen: function (r, d) {
        var med = r.pick([[t("Wasser", "water"), 1.33], [t("Glas", "glass"), 1.5], [t("Plexiglas", "acrylic"), 1.49], [t("Diamant", "diamond"), 2.42], [t("Kronglas", "crown glass"), 1.52]]);
        if (d === 1) {
            var a1 = r.int(10, 70), a2 = Math.asin(Math.sin(a1 * deg) / med[1]) / deg;
            return Q(t("Licht fällt aus Luft (n = 1) unter α<sub>1</sub> = " + a1 + "° auf " + med[0] + " (n = " + n(med[1], 2) + "). Unter welchem Winkel wird es gebrochen (auf 0,1°)?", "Light passes from air (n = 1) at α<sub>1</sub> = " + a1 + "° into " + med[0] + " (n = " + n(med[1], 2) + "). At what angle is it refracted (to 0.1°)?"),
                nm(a2, 1, "°"), t("Snellius: n<sub>1</sub> sin α<sub>1</sub> = n<sub>2</sub> sin α<sub>2</sub>.", "Snell's law: n<sub>1</sub> sin α<sub>1</sub> = n<sub>2</sub> sin α<sub>2</sub>."), ["sin α<sub>2</sub> = sin " + a1 + "° / " + n(med[1], 2) + " = " + n(Math.sin(a2 * deg), 4), "α<sub>2</sub> = " + n(a2, 1) + "°"], M.near(Math.sin(a1 * deg), med[1] * Math.sin(a2 * deg), 1e-9) && a2 < a1);
        }
        if (d === 2) {
            var aG = Math.asin(1 / med[1]) / deg;
            return Q(t("Ab welchem Einfallswinkel wird Licht beim Übergang von " + med[0] + " (n = " + n(med[1], 2) + ") in Luft totalreflektiert (auf 0,1°)?", "Beyond what angle of incidence is light totally reflected when passing from " + med[0] + " (n = " + n(med[1], 2) + ") into air (to 0.1°)?"),
                nm(aG, 1, "°"), t("Grenzwinkel: der gebrochene Strahl liegt bei 90°, also sin α<sub>G</sub> = n<sub>2</sub> / n<sub>1</sub>.", "Critical angle: the refracted ray lies at 90°, so sin α<sub>G</sub> = n<sub>2</sub> / n<sub>1</sub>."), ["sin α<sub>G</sub> = 1 / " + n(med[1], 2) + " = " + n(1 / med[1], 4), "α<sub>G</sub> = " + n(aG, 1) + "°"], M.near(med[1] * Math.sin(aG * deg), Math.sin(90 * deg), 1e-9));
        }
        var b1 = r.int(25, 70), nn = r.int(130, 180) / 100, b2 = M.round(Math.asin(Math.sin(b1 * deg) / nn) / deg, 1), nc = Math.sin(b1 * deg) / Math.sin(b2 * deg);
        return Q(t("Ein Laserstrahl trifft aus Luft unter " + b1 + "° auf einen unbekannten Kunststoff und läuft dort unter " + n(b2, 1) + "° weiter. Welche Brechzahl hat der Kunststoff (auf 0,01)?", "A laser beam hits an unknown plastic from air at " + b1 + "° and continues inside at " + n(b2, 1) + "°. What is the refractive index of the plastic (to 0.01)?"),
            nm(nc, 2, ""), t("n<sub>2</sub> = sin α<sub>1</sub> / sin α<sub>2</sub>, wenn n<sub>1</sub> = 1.", "n<sub>2</sub> = sin α<sub>1</sub> / sin α<sub>2</sub> when n<sub>1</sub> = 1."), ["n = sin " + b1 + "° / sin " + n(b2, 1) + "° = " + n(nc, 2)], Math.abs(nc - nn) < 0.01);
    } });

    E.add({ id: "k-ph-welle", topic: "K-PH-4", title: t("Wellen", "Waves"), gen: function (r, d) {
        if (d === 1) {
            var f = r.pick([20, 50, 110, 220, 440, 1000, 2000, 8000]), lam = 343 / f;
            return Q(t("Schall breitet sich in Luft mit c = 343 m/s aus. Welche Wellenlänge hat ein Ton mit f = " + f + " Hz (auf 0,001 m)?", "Sound travels in air at c = 343 m/s. What is the wavelength of a tone with f = " + f + " Hz (to 0.001 m)?"),
                nm(lam, 3, "m"), t("λ = c / f.", "λ = c / f."), ["λ = 343 / " + f + " = " + n(lam, 3) + " m"], M.near(lam * f, 343, 1e-9));
        }
        if (d === 2) {
            var fM = r.pick([87.5, 92.3, 98.6, 101.1, 104.4, 107.9]), lam2 = 299.792458 / fM;
            return Q(t("Ein UKW-Sender funkt auf " + n(fM) + " MHz. Wie lang ist die Wellenlänge (c = 3 · 10<sup>8</sup> m/s, auf 0,001 m)?", "An FM station broadcasts on " + n(fM) + " MHz. How long is the wavelength (c = 3 · 10<sup>8</sup> m/s, to 0.001 m)?"),
                A.num(300 / fM, { dec: 3, unit: "m", tol: 0.006 * 300 / fM }), t("λ = c / f, MHz = 10<sup>6</sup> Hz.", "λ = c / f, MHz = 10<sup>6</sup> Hz."), ["λ = 3 · 10<sup>8</sup> / (" + n(fM) + " · 10<sup>6</sup>) = " + n(300 / fM, 3) + " m"], Math.abs(lam2 - 300 / fM) / lam2 < 0.001);
        }
        var c = r.pick([[t("Luft", "air"), 343], [t("Wasser", "water"), 1480], [t("Stahl", "steel"), 5900]]), lam3 = r.pick([0.05, 0.1, 0.2, 0.5, 1, 2]), T = lam3 / c[1] * 1000;
        return Q(t("Eine Schallwelle in " + c[0] + " (c = " + c[1] + " m/s) hat die Wellenlänge " + n(lam3) + " m. Wie lang ist eine Periode in ms (auf 0,0001)?", "A sound wave in " + c[0] + " (c = " + c[1] + " m/s) has a wavelength of " + n(lam3) + " m. How long is one period in ms (to 0.0001)?"),
            nm(T, 4, "ms"), t("f = c / λ und T = 1 / f, also T = λ / c.", "f = c / λ and T = 1 / f, so T = λ / c."), ["T = " + n(lam3) + " / " + c[1] + " = " + n(T, 4) + " ms"], M.near(c[1] / lam3 * T / 1000, 1, 1e-9));
    } });

    E.add({ id: "k-ph-doppler", topic: "K-PH-5", title: t("Doppler-Effekt", "Doppler effect"), gen: function (r, d) {
        var c = 343, f = r.pick([400, 440, 500, 700, 800, 1000]), v = r.pick([10, 15, 20, 25, 30, 40]);
        var sim = function (vs) { var tEmit = 0, tA = 0, dist = 1000; var t1 = dist / c; var t2 = 1 / f + (dist - vs / f) / c; return 1 / (t2 - t1); };
        if (d === 1) { var fa = f * c / (c - v); return Q(t("Ein Krankenwagen mit Sirene (f = " + f + " Hz) fährt mit " + v + " m/s auf dich zu. Welche Frequenz hörst du (c = 343 m/s, auf 0,1 Hz)?", "An ambulance with a siren (f = " + f + " Hz) drives towards you at " + v + " m/s. What frequency do you hear (c = 343 m/s, to 0.1 Hz)?"),
            nm(fa, 1, "Hz"), t("Quelle nähert sich: f′ = f · c / (c − v).", "Source approaching: f′ = f · c / (c − v)."), ["f′ = " + f + " · 343 / (343 − " + v + ") = " + n(fa, 1) + " Hz"], M.near(sim(v), fa, 1e-9)); }
        if (d === 2) { var fr = f * c / (c + v); return Q(t("Derselbe Krankenwagen (f = " + f + " Hz) entfernt sich jetzt mit " + v + " m/s. Welche Frequenz hörst du (c = 343 m/s, auf 0,1 Hz)?", "The same ambulance (f = " + f + " Hz) now moves away at " + v + " m/s. What frequency do you hear (c = 343 m/s, to 0.1 Hz)?"),
            nm(fr, 1, "Hz"), t("Quelle entfernt sich: f′ = f · c / (c + v).", "Source receding: f′ = f · c / (c + v)."), ["f′ = " + f + " · 343 / (343 + " + v + ") = " + n(fr, 1) + " Hz"], M.near(sim(-v), fr, 1e-9)); }
        var fm = M.round(f * c / (c - v), 0), vc = c * (1 - f / fm);
        return Q(t("Ein Zug hupt mit " + f + " Hz. Während er auf dich zufährt, misst du " + fm + " Hz. Wie schnell fährt er in km/h (c = 343 m/s, auf 0,1)?", "A train sounds its horn at " + f + " Hz. While it approaches you, you measure " + fm + " Hz. How fast is it travelling in km/h (c = 343 m/s, to 0.1)?"),
            nm(vc * 3.6, 1, "km/h"), t("f′ = f c / (c − v) nach v auflösen: v = c (1 − f / f′).", "Solve f′ = f c / (c − v) for v: v = c (1 − f / f′)."), ["v = 343 · (1 − " + f + " / " + fm + ") = " + n(vc, 2) + " m/s", "= " + n(vc * 3.6, 1) + " km/h"], M.near(sim(vc), fm, 1e-9));
    } });

    E.add({ id: "k-ph-zerfall", topic: "K-PH-6", title: t("Radioaktiver Zerfall", "Radioactive decay"), gen: function (r, d) {
        var iso = r.pick([[t("Iod-131", "iodine-131"), 8, t("Tage", "days")], [t("Cobalt-60", "cobalt-60"), 5.27, t("Jahre", "years")], [t("Cäsium-137", "caesium-137"), 30.2, t("Jahre", "years")], [t("Technetium-99m", "technetium-99m"), 6, t("Stunden", "hours")], [t("Kohlenstoff-14", "carbon-14"), 5730, t("Jahre", "years")]]);
        var sim = function (frac) { var N = 1, k = Math.LN2 / iso[1], dt = iso[1] / 20000, x = 0; while (N > frac) { N -= k * N * dt; x += dt; } return x; };
        if (d === 1) { var N0 = r.pick([1000, 4000, 8000, 16000, 64000]), k1 = r.int(1, 5), N = N0 / Math.pow(2, k1); return Q(t("Eine Probe " + iso[0] + " (Halbwertszeit " + n(iso[1]) + " " + iso[2] + ") enthält " + N0 + " Kerne. Wie viele sind nach " + n(k1 * iso[1], 2) + " " + iso[2] + " noch übrig?", "A sample of " + iso[0] + " (half-life " + n(iso[1]) + " " + iso[2] + ") contains " + N0 + " nuclei. How many remain after " + n(k1 * iso[1], 2) + " " + iso[2] + "?"),
            nm(N, 0, ""), t("Wie viele Halbwertszeiten sind vergangen? Je Halbwertszeit halbieren.", "How many half-lives have passed? Halve once per half-life."), [k1 + t(" Halbwertszeiten", " half-lives"), "N = " + N0 + " / 2<sup>" + k1 + "</sup> = " + n(N, 0)], M.near(N0 * Math.pow(0.5, k1), N, 1e-9)); }
        if (d === 2) { var tt = M.round(iso[1] * r.int(3, 40) / 10, 2), pct = 100 * Math.pow(0.5, tt / iso[1]); return Q(t("Wie viel Prozent einer Probe " + iso[0] + " (T<sub>½</sub> = " + n(iso[1]) + " " + iso[2] + ") sind nach " + n(tt, 2) + " " + iso[2] + " noch nicht zerfallen (auf 0,01)?", "What percentage of a sample of " + iso[0] + " (T<sub>½</sub> = " + n(iso[1]) + " " + iso[2] + ") has not yet decayed after " + n(tt, 2) + " " + iso[2] + " (to 0.01)?"),
            nm(pct, 2, "%"), t("N / N<sub>0</sub> = (½)<sup>t / T½</sup>.", "N / N<sub>0</sub> = (½)<sup>t / T½</sup>."), ["t / T<sub>½</sub> = " + n(tt / iso[1], 4), "N / N<sub>0</sub> = " + n(pct, 2) + " %"], Math.abs(sim(pct / 100) - tt) < iso[1] * 0.002); }
        var rest = r.pick([50, 25, 20, 10, 5, 1]) + r.pick([0, 0.5]), tr = iso[1] * Math.log(100 / rest) / Math.LN2;
        return Q(t("Nach welcher Zeit sind von einer Probe " + iso[0] + " (T<sub>½</sub> = " + n(iso[1]) + " " + iso[2] + ") nur noch " + n(rest) + " % übrig (auf 0,01 " + iso[2] + ")?", "After what time is only " + n(rest) + "% of a sample of " + iso[0] + " (T<sub>½</sub> = " + n(iso[1]) + " " + iso[2] + ") left (to 0.01 " + iso[2] + ")?"),
            nm(tr, 2, iso[2]), t("Löse (½)<sup>t/T½</sup> = Anteil mit dem Logarithmus.", "Solve (½)<sup>t/T½</sup> = fraction with logarithms."), ["t = T<sub>½</sub> · log<sub>2</sub>(100 / " + n(rest) + ") = " + n(iso[1]) + " · " + n(Math.log(100 / rest) / Math.LN2, 4), "= " + n(tr, 2) + " " + iso[2]], Math.abs(sim(rest / 100) - tr) < iso[1] * 0.002);
    } });
})(typeof window !== "undefined" ? window : globalThis);
