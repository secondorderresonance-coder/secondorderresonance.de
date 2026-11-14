/* SOR Aufgaben Physik 1: Mechanik (K-PI-01 bis K-PI-13), Aufgabentypen nach Hering, Martin, Stohrer, "Physik für Ingenieure". Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, M = E.M, H = E.H, n = E.H.n, t = E.tr, near = M.near;
    var g = 9.81, PI = Math.PI;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    // Zahl mit 4 gültigen Stellen, Toleranz 0,5 % (Eingaben sind gerundete Messwerte)
    function decOf(v) { return v === 0 ? 2 : Math.max(0, Math.min(6, 3 - Math.floor(Math.log10(Math.abs(v))))); }
    function P(v, unit) { var d = decOf(v); return A.num(v, { dec: d, unit: unit || "", tol: Math.max(Math.abs(v) * 0.005, 0.6 * Math.pow(10, -d)) }); }
    function f(v, d) { if (d !== undefined) return n(v, d); return n(Number(Number(v).toPrecision(4))); }
    function rel(a, b, e) { return Math.abs(a - b) <= (e || 1e-9) * Math.max(1, Math.abs(a), Math.abs(b)); }
    function add(nr, key, de, en, gen) { E.add({ id: "k-pi" + nr + "-" + key, topic: "K-PI-" + (nr < 10 ? "0" : "") + nr, title: t(de, en), gen: gen }); }
    function sim(fn, y0, T, N) { var h = T / N, y = y0.slice(), s = 0; function ad(a, b, c) { return a.map(function (v, k) { return v + c * b[k]; }); } for (var i = 0; i < N; i += 1) { var k1 = fn(s, y), k2 = fn(s + h / 2, ad(y, k1, h / 2)), k3 = fn(s + h / 2, ad(y, k2, h / 2)), k4 = fn(s + h, ad(y, k3, h)); y = y.map(function (v, k) { return v + h / 6 * (k1[k] + 2 * k2[k] + 2 * k3[k] + k4[k]); }); s += h; } return y; }
    E.PHU = { Q: Q, P: P, f: f, rel: rel, decOf: decOf, sim: sim };

    // =============== 1.3 Größen und Messfehler ===============
    add(1, "fehler", "Mittelwert, Fehlerfortpflanzung, Ausgleichsgerade", "Mean, error propagation, best-fit line", function (r, d) {
        if (d === 1) {
            var T0 = r.pick([1.2, 1.5, 1.8, 2.0, 2.4]), xs = [], N = 5;
            for (var i = 0; i < N; i += 1) xs.push(Math.round((T0 + r.int(-6, 6) / 100) * 100) / 100);
            var m = xs.reduce(function (s, x) { return s + x; }, 0) / N, s2 = xs.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / (N - 1), sd = Math.sqrt(s2);
            var alt = (xs.reduce(function (s, x) { return s + x * x; }, 0) - N * m * m) / (N - 1);
            return Q(t("Die Schwingungsdauer eines Pendels wird fünfmal gemessen: " + xs.map(function (x) { return f(x, 2); }).join("; ") + " s. Berechne Mittelwert und Standardabweichung der Einzelmessung.", "The period of a pendulum is measured five times: " + xs.map(function (x) { return f(x, 2); }).join("; ") + " s. Compute the mean and the standard deviation of a single measurement."),
                A.multi([{ l: t("Mittelwert in s", "mean in s"), a: A.num(m, { dec: 3, tol: 0.0006 }) }, { l: t("s in s", "s in s"), a: A.num(sd, { dec: 4, tol: Math.max(0.0006, sd * 0.01) }) }]), t("s = √(Σ (x<sub>i</sub> − x̄)² / (n − 1)).", "s = √(Σ (x<sub>i</sub> − x̄)² / (n − 1))."),
                ["x̄ = " + f(m, 3) + " s", "s = " + f(sd, 4) + " s", t("Unsicherheit des Mittelwerts: s/√n = ", "uncertainty of the mean: s/√n = ") + f(sd / Math.sqrt(N), 4) + " s"], rel(s2, alt, 1e-9));
        }
        if (d === 2) {
            var dm = r.pick([0.1, 0.2, 0.5]), dr = r.pick([0.5, 1, 2]), dh = r.pick([0.2, 0.5, 1]), mm = r.int(40, 400), rr = r.int(10, 40), hh = r.int(20, 120);
            var relm = dm / mm, relr = (dr / 10) / rr, relh = (dh / 10) / hh, tot = (relm + 2 * relr + relh) * 100;
            var rho = function (a, b, c) { return a / (PI * b * b * c); }, base = rho(mm, rr, hh), worst = rho(mm + dm, rr - dr / 10, hh - dh / 10);
            return Q(t("Die Dichte eines Zylinders wird aus ρ = m / (π r² h) bestimmt. Gemessen werden m = " + mm + " g ± " + f(dm) + " g, r = " + rr + " mm ± " + f(dr / 10) + " mm und h = " + hh + " mm ± " + f(dh / 10) + " mm. Wie groß ist der maximale relative Fehler von ρ in %?", "The density of a cylinder is found from ρ = m / (π r² h). Measured are m = " + mm + " g ± " + f(dm) + " g, r = " + rr + " mm ± " + f(dr / 10) + " mm and h = " + hh + " mm ± " + f(dh / 10) + " mm. What is the maximum relative error of ρ in %?"),
                A.num(tot, { dec: 3, unit: "%", tol: Math.max(0.002, tot * 0.01) }), t("Bei Produkten und Potenzen addieren sich die relativen Fehler, jeweils mal dem Betrag des Exponenten.", "For products and powers the relative errors add, each times the absolute exponent."),
                ["Δm/m = " + f(relm * 100) + " %", "2 Δr/r = " + f(2 * relr * 100) + " %", "Δh/h = " + f(relh * 100) + " %", "Δρ/ρ = " + f(tot) + " %"], near((worst - base) / base * 100, tot, tot * 0.03 + 0.01));
        }
        var N3 = r.int(4, 6), a0 = r.int(-5, 5), b0 = r.pick([0.5, 1.2, 2, 3.5, -1.5, 4]), x = [], y = [];
        for (var k = 0; k < N3; k += 1) { x.push(k * 10 + 10); y.push(Math.round((a0 + b0 * (k * 10 + 10) + r.int(-3, 3)) * 10) / 10); }
        var sx = 0, sy = 0, sxx = 0, sxy = 0; for (var j = 0; j < N3; j += 1) { sx += x[j]; sy += y[j]; sxx += x[j] * x[j]; sxy += x[j] * y[j]; }
        var b = (N3 * sxy - sx * sy) / (N3 * sxx - sx * sx), a = (sy - b * sx) / N3, mx = sx / N3, my = sy / N3, cov = 0, vx = 0;
        for (var i2 = 0; i2 < N3; i2 += 1) { cov += (x[i2] - mx) * (y[i2] - my); vx += (x[i2] - mx) * (x[i2] - mx); }
        return Q(t("Eine Thermospannung wird bei verschiedenen Temperaturen gemessen: " + x.map(function (v, i) { return "(" + v + " °C | " + f(y[i], 1) + " mV)"; }).join(", ") + ". Bestimme die Ausgleichsgerade U = a + b ϑ.", "A thermoelectric voltage is measured at several temperatures: " + x.map(function (v, i) { return "(" + v + " °C, " + f(y[i], 1) + " mV)"; }).join(", ") + ". Find the best-fit line U = a + b ϑ."),
            A.multi([{ l: "a in mV", a: A.num(a, { dec: 3, tol: Math.max(0.002, Math.abs(a) * 0.005) }) }, { l: "b in mV/°C", a: A.num(b, { dec: 4, tol: Math.max(0.0002, Math.abs(b) * 0.005) }) }]), t("Methode der kleinsten Quadrate: b = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)², a = ȳ − b x̄.", "Least squares: b = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)², a = ȳ − b x̄."),
            ["x̄ = " + f(mx) + ", ȳ = " + f(my), "b = " + f(b, 4) + " mV/°C", "a = " + f(a, 3) + " mV"], rel(cov / vx, b, 1e-9) && rel(my - b * mx, a, 1e-9));
    });

    // =============== 2.2 Kinematik ===============
    add(2, "kinematik", "Beschleunigung, Wurf und Drehbewegung", "Acceleration, projectiles and rotation", function (r, d) {
        if (d === 1) {
            var v1 = r.pick([20, 30, 40, 50]), v2 = v1 + r.pick([30, 50, 70]), a = r.pick([1.5, 2, 2.5, 3, 4]), dt = (v2 - v1) / 3.6 / a, s = ((v2 / 3.6) * (v2 / 3.6) - (v1 / 3.6) * (v1 / 3.6)) / (2 * a);
            return Q(t("Ein Fahrzeug beschleunigt gleichmäßig mit a = " + f(a) + " m/s² von " + v1 + " km/h auf " + v2 + " km/h. Wie lange dauert das und welchen Weg legt es dabei zurück?", "A vehicle accelerates uniformly at a = " + f(a) + " m/s² from " + v1 + " km/h to " + v2 + " km/h. How long does it take and how far does it travel?"),
                A.multi([{ l: "t in s", a: P(dt) }, { l: "s in m", a: P(s) }]), t("Zuerst in m/s umrechnen (÷ 3,6).", "Convert to m/s first (÷ 3.6)."), ["t = Δv / a = " + f(dt) + " s", "s = (v<sub>2</sub>² − v<sub>1</sub>²) / (2a) = " + f(s) + " m"], rel(v1 / 3.6 * dt + a * dt * dt / 2, s, 1e-9));
        }
        if (d === 2) {
            var h = r.pick([0.75, 0.9, 1.2, 1.5, 2]), sx = r.pick([0.4, 0.6, 0.8, 1.2, 1.5]), tf = Math.sqrt(2 * h / g), v0 = sx / tf, vi = Math.sqrt(v0 * v0 + 2 * g * h);
            var y = sim(function (s, z) { return [z[2], z[3], 0, -g]; }, [0, h, v0, 0], tf, 50);
            return Q(t("Eine Kugel rollt über die Kante eines " + f(h) + " m hohen Tisches und trifft " + f(sx) + " m weiter vorn auf den Boden. Mit welcher Geschwindigkeit verließ sie die Kante, und wie schnell trifft sie auf?", "A ball rolls off the edge of a " + f(h) + " m high table and hits the floor " + f(sx) + " m further on. At what speed did it leave the edge, and how fast does it hit the floor?"),
                A.multi([{ l: "v<sub>0</sub> in m/s", a: P(v0) }, { l: "v<sub>A</sub> in m/s", a: P(vi) }]), t("Waagerechter Wurf: Fallzeit aus h = ½ g t², dann v<sub>0</sub> = s/t.", "Horizontal throw: fall time from h = ½ g t², then v<sub>0</sub> = s/t."), ["t = √(2h/g) = " + f(tf) + " s", "v<sub>0</sub> = " + f(v0) + " m/s", "v<sub>A</sub> = √(v<sub>0</sub>² + 2gh) = " + f(vi) + " m/s"], near(y[0], sx, 1e-9) && near(y[1], 0, 1e-9));
        }
        var n0 = r.pick([900, 1200, 1400, 2800, 3000]), N = r.pick([20, 30, 50, 80]), w0 = 2 * PI * n0 / 60, phi = 2 * PI * N, al = w0 * w0 / (2 * phi), tb = w0 / al;
        return Q(t("Ein Motor läuft mit " + n0 + " min⁻¹. Nach dem Abschalten bremst er gleichmäßig ab und steht nach " + N + " Umdrehungen. Wie groß sind die Winkelverzögerung und die Bremszeit?", "A motor runs at " + n0 + " rpm. After switching off it decelerates uniformly and stops after " + N + " revolutions. Find the angular deceleration and the braking time."),
            A.multi([{ l: "α in rad/s²", a: P(al) }, { l: "t in s", a: P(tb) }]), t("Wie bei der Translation: ω<sub>0</sub>² = 2 α φ und t = ω<sub>0</sub>/α.", "As in translation: ω<sub>0</sub>² = 2 α φ and t = ω<sub>0</sub>/α."), ["ω<sub>0</sub> = 2π n = " + f(w0) + " s⁻¹", "φ = 2π N = " + f(phi), "α = " + f(al) + " s⁻², t = " + f(tb) + " s"], rel(w0 * tb / 2, phi, 1e-12));
    });

    // =============== 2.3 Newton ===============
    add(3, "newton", "Bewegungsgleichungen aufstellen", "Setting up equations of motion", function (r, d) {
        if (d === 1) {
            var m1 = r.pick([0.5, 1, 1.5, 2, 3]), m2 = m1 + r.pick([0.2, 0.5, 1, 1.5]), a = (m2 - m1) * g / (m1 + m2), F = m1 * (g + a);
            return Q(t("Zwei Massen m<sub>1</sub> = " + f(m1) + " kg und m<sub>2</sub> = " + f(m2) + " kg hängen an einem Faden über eine masselose, reibungsfreie Rolle. Wie groß sind die Beschleunigung und die Fadenkraft?", "Two masses m<sub>1</sub> = " + f(m1) + " kg and m<sub>2</sub> = " + f(m2) + " kg hang on a string over a massless, frictionless pulley. Find the acceleration and the string force."),
                A.multi([{ l: "a in m/s²", a: P(a) }, { l: "F<sub>S</sub> in N", a: P(F) }]), t("Für jede Masse eine Gleichung: m<sub>2</sub> g − F<sub>S</sub> = m<sub>2</sub> a und F<sub>S</sub> − m<sub>1</sub> g = m<sub>1</sub> a.", "One equation per mass: m<sub>2</sub> g − F<sub>S</sub> = m<sub>2</sub> a and F<sub>S</sub> − m<sub>1</sub> g = m<sub>1</sub> a."),
                ["a = (m<sub>2</sub> − m<sub>1</sub>) g / (m<sub>1</sub> + m<sub>2</sub>) = " + f(a) + " m/s²", "F<sub>S</sub> = m<sub>1</sub>(g + a) = " + f(F) + " N"], rel(m2 * g - F, m2 * a, 1e-9));
        }
        if (d === 2) {
            var mu = r.pick([0.2, 0.3, 0.4, 0.5, 0.6]), rr = r.pick([10, 15, 20, 25, 30]), w = Math.sqrt(mu * g / (rr / 100)), nmax = w * 60 / (2 * PI);
            return Q(t("Ein Radiergummi liegt " + rr + " cm von der Achse entfernt auf einer rotierenden Scheibe. Die Haftreibungszahl ist μ = " + f(mu) + ". Bis zu welcher Drehzahl bleibt er liegen?", "An eraser lies " + rr + " cm from the axis on a rotating disc. The coefficient of static friction is μ = " + f(mu) + ". Up to which speed does it stay in place?"),
                P(nmax, "min⁻¹"), t("Die Haftreibung muss die Zentripetalkraft liefern: μ m g ≥ m ω² r.", "Static friction must supply the centripetal force: μ m g ≥ m ω² r."), ["ω<sub>max</sub> = √(μ g / r) = " + f(w) + " s⁻¹", "n = ω / 2π = " + f(nmax) + " min⁻¹"], rel(w * w * rr / 100, mu * g, 1e-12));
        }
        var mA = r.pick([800, 1000, 1200, 1500]), mG = mA - r.pick([50, 100, 150, 200]), mM = r.pick([60, 75, 90, 120]), a3 = (mA + mM - mG) * g / (mA + mM + mG);
        return Q(t("Eine Aufzugskabine (" + mA + " kg) ist über ein Seil mit einem Gegengewicht (" + mG + " kg) verbunden. In der Kabine steht eine Person (" + mM + " kg). Mit welcher Beschleunigung fiele die Kabine, wenn die Bremse versagt (ohne Reibung)?", "An elevator car (" + mA + " kg) is connected by a rope to a counterweight (" + mG + " kg). A person (" + mM + " kg) stands in the car. With which acceleration would the car fall if the brake failed (no friction)?"),
            P(a3, "m/s²"), t("Antreibend ist die Differenz der Gewichtskräfte, beschleunigt wird die Gesamtmasse.", "The driving force is the difference of the weights, the total mass is accelerated."), ["a = (" + (mA + mM) + " − " + mG + ") · g / " + (mA + mM + mG) + " = " + f(a3) + " m/s²"], a3 < g && a3 > 0);
    });

    // =============== 2.4 bewegte Bezugssysteme ===============
    add(4, "bezug", "Zentrifugal- und Corioliskraft", "Centrifugal and Coriolis force", function (r, d) {
        var wE = 2 * PI / 86164;
        if (d === 1) {
            var m = r.pick([0.05, 0.1, 0.2, 0.5]), rr = r.pick([0.05, 0.08, 0.1, 0.15]), nn = r.pick([600, 900, 1500, 3000]), w = 2 * PI * nn / 60, F = m * w * w * rr;
            return Q(t("Ein Kettenglied der Masse " + f(m * 1000) + " g läuft mit " + nn + " min⁻¹ auf einem Kreis mit Radius " + f(rr * 100) + " cm um. Wie groß ist die Zentrifugalkraft?", "A chain link of mass " + f(m * 1000) + " g runs at " + nn + " rpm on a circle of radius " + f(rr * 100) + " cm. How large is the centrifugal force?"),
                P(F, "N"), "F<sub>zf</sub> = m ω² r, ω = 2π n.", ["ω = " + f(w) + " s⁻¹", "F = " + f(F) + " N"], rel(m * Math.pow(w * rr, 2) / rr, F, 1e-12));
        }
        if (d === 2) {
            var v = r.pick([200, 500, 800, 900]), phi = r.pick([30, 45, 48, 50, 60]), aC = 2 * wE * (v / 3.6) * Math.sin(phi * PI / 180);
            return Q(t("Wie groß ist die Coriolisbeschleunigung eines Flugzeugs, das mit " + v + " km/h horizontal über einen Ort der geografischen Breite " + phi + "° fliegt? (Sterntag 86 164 s)", "How large is the Coriolis acceleration of an aircraft flying horizontally at " + v + " km/h over a place at latitude " + phi + "°? (sidereal day 86,164 s)"),
                P(aC * 1000, "mm/s²"), t("Für horizontale Bewegung zählt die vertikale Komponente ω sin φ.", "For horizontal motion the vertical component ω sin φ counts."), ["ω = 2π/86 164 s = " + f(wE * 1e5) + " · 10⁻⁵ s⁻¹", "a<sub>C</sub> = 2 ω v sin φ = " + f(aC * 1000) + " mm/s²"], aC < 0.05);
        }
        var mm = r.int(55, 95), a = r.pick([0.8, 1.2, 1.5, 2, 2.5]), up = r.bool(), Fn = mm * (g + (up ? a : -a));
        return Q(t("Eine Person (" + mm + " kg) steht in einem Aufzug auf einer Waage. Der Aufzug fährt " + (up ? "aufwärts an" : "abwärts an") + " und beschleunigt mit " + f(a) + " m/s². Welche Kraft zeigt die Waage?", "A person (" + mm + " kg) stands on scales in an elevator. The elevator starts " + (up ? "upwards" : "downwards") + " with an acceleration of " + f(a) + " m/s². Which force do the scales show?"),
            P(Fn, "N"), t("Im beschleunigten System wirkt zusätzlich die Trägheitskraft −m a.", "In the accelerated frame the inertial force −m a acts in addition."), ["F = m (g " + (up ? "+" : "−") + " a) = " + f(Fn) + " N"], rel(Fn - mm * g, (up ? 1 : -1) * mm * a, 1e-9));
    });

    // =============== 2.5 Impuls ===============
    add(5, "impuls", "Kraftstoß, Rückstoß, Rakete", "Impulse, recoil, rocket", function (r, d) {
        if (d === 1) {
            var m = r.pick([0.06, 0.15, 0.45, 2]), v = r.pick([5, 10, 20, 30]), dt = r.pick([2, 5, 8, 10]) / 1000, F = m * v / dt;
            return Q(t("Eine ruhende Kugel (" + f(m * 1000) + " g) wird mit einem Hammer angestoßen und fliegt mit " + v + " m/s davon. Die Kontaktzeit beträgt " + f(dt * 1000) + " ms. Wie groß ist die mittlere Kraft?", "A ball at rest (" + f(m * 1000) + " g) is struck with a hammer and flies off at " + v + " m/s. The contact time is " + f(dt * 1000) + " ms. How large is the mean force?"),
                P(F, "N"), "F Δt = Δp = m Δv.", ["Δp = " + f(m * v) + " N s", "F = " + f(F) + " N"], rel(F * dt, m * v, 1e-12));
        }
        if (d === 2) {
            var A0 = r.pick([226, 232, 238, 210, 222]), va = r.pick([1.4, 1.5, 1.6, 1.7]), vT = 4 * va / (A0 - 4);
            return Q(t("Ein ruhender Kern mit der Massenzahl " + A0 + " sendet ein α-Teilchen (Massenzahl 4) mit " + f(va) + " · 10⁷ m/s aus. Mit welcher Geschwindigkeit bewegt sich der Restkern zurück (Massen ≈ Massenzahl · u)?", "A nucleus at rest with mass number " + A0 + " emits an α particle (mass number 4) at " + f(va) + " · 10⁷ m/s. At which speed does the remaining nucleus recoil (masses ≈ mass number · u)?"),
                P(vT * 1e7 / 1e5, t("· 10⁵ m/s", "· 10⁵ m/s")), t("Impulserhaltung: vorher ist der Gesamtimpuls null.", "Momentum conservation: the total momentum is zero before."), ["4 v<sub>α</sub> = " + (A0 - 4) + " v<sub>K</sub>", "v<sub>K</sub> = " + f(vT * 100) + " · 10⁵ m/s"], rel(4 * va, (A0 - 4) * vT, 1e-12));
        }
        var mB = r.pick([1, 2, 5, 10]), w = r.pick([2.5, 3, 3.5, 4]), dv = r.pick([4, 5, 6, 7.9]), mT = mB * (Math.exp(dv / w) - 1);
        var Nn = 20000, vv = 0, mm = mB + mT, dm = mT / Nn; for (var i = 0; i < Nn; i += 1) { vv += w * dm / (mm - dm / 2); mm -= dm; }
        return Q(t("Eine Einstufenrakete hat die Leermasse " + mB + " t, die Ausströmgeschwindigkeit ist " + f(w) + " km/s. Wie viel Treibstoff braucht sie, um ohne Schwerkraft und Luftwiderstand die Geschwindigkeit " + f(dv) + " km/s zu erreichen?", "A single-stage rocket has an empty mass of " + mB + " t, the exhaust speed is " + f(w) + " km/s. How much fuel does it need to reach " + f(dv) + " km/s without gravity and air drag?"),
            P(mT, "t"), "Δv = w ln(m<sub>0</sub>/m<sub>B</sub>).", ["m<sub>0</sub>/m<sub>B</sub> = e<sup>" + f(dv / w) + "</sup> = " + f(Math.exp(dv / w)), "m<sub>T</sub> = m<sub>B</sub>(e<sup>Δv/w</sup> − 1) = " + f(mT) + " t"], near(vv, dv, 1e-4 * dv));
    });

    // =============== 2.6 Arbeit, Energie ===============
    add(6, "energie", "Energieerhaltung und Leistung", "Energy conservation and power", function (r, d) {
        if (d === 1) {
            var k = r.pick([100, 200, 400, 500]), y = r.pick([5, 10, 15, 20]) / 100, m = r.pick([40, 80, 100, 200]) / 1000, h = k * y * y / (2 * m * g) - y;
            return Q(t("Eine Feder (k = " + k + " N/m) wird um " + f(y * 100) + " cm zusammengedrückt, darauf liegt eine Kugel (" + f(m * 1000) + " g). Wie hoch steigt die Kugel über die Lage der entspannten Feder, wenn die Feder losgelassen wird?", "A spring (k = " + k + " N/m) is compressed by " + f(y * 100) + " cm with a ball (" + f(m * 1000) + " g) on top. How high does the ball rise above the position of the relaxed spring when the spring is released?"),
                P(h, "m"), t("Die Spannenergie ½ k y² wird zu Lageenergie m g (y + h).", "The spring energy ½ k y² becomes potential energy m g (y + h)."), ["½ k y² = " + f(k * y * y / 2) + " J", "h = ½ k y² / (m g) − y = " + f(h) + " m"], rel(k * y * y / 2, m * g * (h + y), 1e-12));
        }
        if (d === 2) {
            var m2 = r.pick([200, 500, 800, 1000, 1500]), v = r.pick([0.5, 1, 1.5, 2]), eta = r.pick([0.6, 0.7, 0.75, 0.8, 0.85]), Pin = m2 * g * v / eta / 1000;
            return Q(t("Ein Kran hebt eine Last von " + m2 + " kg gleichförmig mit " + f(v) + " m/s. Der Gesamtwirkungsgrad ist η = " + f(eta) + ". Welche elektrische Leistung nimmt der Motor auf?", "A crane lifts a load of " + m2 + " kg uniformly at " + f(v) + " m/s. The overall efficiency is η = " + f(eta) + ". Which electrical power does the motor draw?"),
                P(Pin, "kW"), "P<sub>ab</sub> = F v = m g v,  P<sub>zu</sub> = P<sub>ab</sub>/η.", ["P<sub>ab</sub> = " + f(m2 * g * v / 1000) + " kW", "P<sub>zu</sub> = " + f(Pin) + " kW"], rel(Pin * eta, m2 * g * v / 1000, 1e-12));
        }
        var h3 = r.pick([1, 1.5, 2, 2.5, 3]), q = r.pick([0.9, 0.8, 0.75, 0.64]), v0 = Math.sqrt(2 * g * h3), v1 = Math.sqrt(2 * g * q * h3);
        return Q(t("Eine Stahlkugel fällt aus " + f(h3) + " m Höhe auf eine Platte und springt auf " + f(q * 100) + " % der Höhe zurück. Wie groß sind die Geschwindigkeiten unmittelbar vor und nach dem Aufprall?", "A steel ball falls from a height of " + f(h3) + " m onto a plate and bounces back to " + f(q * 100) + " % of the height. Find the speeds just before and just after impact."),
            A.multi([{ l: t("vorher in m/s", "before in m/s"), a: P(v0) }, { l: t("nachher in m/s", "after in m/s"), a: P(v1) }]), "m g h = ½ m v².", ["v<sub>0</sub> = √(2gh) = " + f(v0) + " m/s", "v<sub>1</sub> = √(2g · " + f(q) + "h) = " + f(v1) + " m/s", t("Energieverlust: ", "energy loss: ") + f((1 - q) * 100) + " %"], rel(v1 / v0, Math.sqrt(q), 1e-12));
    });

    // =============== 2.7 Stöße ===============
    add(7, "stoss", "Elastischer und unelastischer Stoß", "Elastic and inelastic collisions", function (r, d) {
        if (d === 1) {
            var m1 = r.pick([20, 24, 30, 40]) * 1000, m2 = r.pick([15, 20, 25, 30]) * 1000, v1 = r.pick([2, 3, 4]), v2 = r.pick([0, 0.5, 1, 1.5]), u = (m1 * v1 + m2 * v2) / (m1 + m2), dE = (0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2 - 0.5 * (m1 + m2) * u * u) / 1000;
            return Q(t("Ein Waggon (" + m1 / 1000 + " t, " + f(v1) + " m/s) fährt auf einen zweiten Waggon (" + m2 / 1000 + " t, " + f(v2) + " m/s, gleiche Richtung) auf, beide kuppeln. Wie schnell fahren sie weiter, und wie viel Energie geht verloren?", "A wagon (" + m1 / 1000 + " t, " + f(v1) + " m/s) runs into a second wagon (" + m2 / 1000 + " t, " + f(v2) + " m/s, same direction) and they couple. How fast do they move on, and how much energy is lost?"),
                A.multi([{ l: "v' in m/s", a: P(u) }, { l: "ΔE in kJ", a: P(dE) }]), t("Vollkommen unelastisch: nur der Impuls bleibt erhalten.", "Perfectly inelastic: only momentum is conserved."), ["v' = " + f(u) + " m/s", "ΔE = " + f(dE) + " kJ"], rel(dE * 1000, 0.5 * m1 * m2 / (m1 + m2) * (v1 - v2) * (v1 - v2), 1e-9));
        }
        if (d === 2) {
            var a1 = r.pick([50, 100, 200, 300]), a2 = r.pick([100, 150, 250, 400]), w1 = r.pick([4, 6, 10]), w2 = r.pick([0, -2, 2]), u1 = ((a1 - a2) * w1 + 2 * a2 * w2) / (a1 + a2), u2 = ((a2 - a1) * w2 + 2 * a1 * w1) / (a1 + a2);
            return Q(t("Zwei Kugeln stoßen gerade, zentral und elastisch: m<sub>1</sub> = " + a1 + " g mit v<sub>1</sub> = " + w1 + " m/s und m<sub>2</sub> = " + a2 + " g mit v<sub>2</sub> = " + w2 + " m/s. Wie schnell sind sie danach (mit Vorzeichen)?", "Two balls collide head-on, centrally and elastically: m<sub>1</sub> = " + a1 + " g with v<sub>1</sub> = " + w1 + " m/s and m<sub>2</sub> = " + a2 + " g with v<sub>2</sub> = " + w2 + " m/s. What are their velocities afterwards (with sign)?"),
                A.multi([{ l: "v<sub>1</sub>' in m/s", a: P(u1) }, { l: "v<sub>2</sub>' in m/s", a: P(u2) }]), t("Impuls- und Energieerhaltung, oder: die Relativgeschwindigkeit kehrt sich um.", "Momentum and energy conservation, or: the relative velocity reverses."), ["v<sub>1</sub>' = " + f(u1) + " m/s", "v<sub>2</sub>' = " + f(u2) + " m/s"], rel(a1 * w1 + a2 * w2, a1 * u1 + a2 * u2, 1e-9) && rel(a1 * w1 * w1 + a2 * w2 * w2, a1 * u1 * u1 + a2 * u2 * u2, 1e-9));
        }
        var mb = r.pick([10, 15, 20, 25]) / 1000, Mk = r.pick([1, 1.5, 2, 4]), h = r.pick([5, 8, 10, 12, 15]) / 100, V = Math.sqrt(2 * g * h), vb = (mb + Mk) * V / mb;
        return Q(t("Ein Geschoss (" + f(mb * 1000) + " g) bleibt in einem pendelnd aufgehängten Holzklotz (" + f(Mk) + " kg) stecken. Der Klotz steigt danach um " + f(h * 100) + " cm. Wie schnell war das Geschoss?", "A bullet (" + f(mb * 1000) + " g) gets stuck in a wooden block (" + f(Mk) + " kg) hanging as a pendulum. The block then rises by " + f(h * 100) + " cm. How fast was the bullet?"),
            P(vb, "m/s"), t("Erst Stoß (Impuls), dann Pendel (Energie).", "First collision (momentum), then pendulum (energy)."), ["V = √(2 g h) = " + f(V) + " m/s", "v = (m + M) V / m = " + f(vb) + " m/s"], rel(Math.pow(mb * vb / (mb + Mk), 2) / (2 * g), h, 1e-9));
    });

    // =============== 2.8 Drehbewegungen ===============
    add(8, "dreh", "Drehmoment, Rotationsenergie, Drehimpuls", "Torque, rotational energy, angular momentum", function (r, d) {
        if (d === 1) {
            var J = r.pick([0.05, 0.2, 0.5, 1.2, 3]), Mm = r.pick([2, 5, 10, 20]), nn = r.pick([600, 1000, 1500, 3000]), w = 2 * PI * nn / 60, tt = J * w / Mm;
            return Q(t("Ein Rad (J = " + f(J) + " kg m²) wird aus der Ruhe mit dem konstanten Drehmoment " + Mm + " N m angetrieben. Nach welcher Zeit erreicht es " + nn + " min⁻¹ (ohne Reibung)?", "A wheel (J = " + f(J) + " kg m²) is driven from rest by a constant torque of " + Mm + " N m. After what time does it reach " + nn + " rpm (no friction)?"),
                P(tt, "s"), "M = J α,  ω = α t.", ["α = M/J = " + f(Mm / J) + " s⁻²", "ω = " + f(w) + " s⁻¹", "t = " + f(tt) + " s"], rel(Mm * tt, J * w, 1e-12));
        }
        if (d === 2) {
            var mm = r.pick([50, 100, 200, 400]), R = r.pick([0.2, 0.3, 0.4, 0.5]), nn2 = r.pick([1500, 3000, 6000]), J2 = mm * R * R / 2, w2 = 2 * PI * nn2 / 60, Er = J2 * w2 * w2 / 2 / 1000;
            return Q(t("Ein Schwungrad (Vollzylinder, " + mm + " kg, Radius " + f(R * 100) + " cm) dreht mit " + nn2 + " min⁻¹. Wie viel Rotationsenergie speichert es?", "A flywheel (solid cylinder, " + mm + " kg, radius " + f(R * 100) + " cm) spins at " + nn2 + " rpm. How much rotational energy does it store?"),
                P(Er, "kJ"), "E = ½ J ω²,  J = ½ m r².", ["J = " + f(J2) + " kg m²", "ω = " + f(w2) + " s⁻¹", "E = " + f(Er) + " kJ"], rel(Er * 1000, mm * Math.pow(w2 * R, 2) / 4, 1e-12));
        }
        var J1 = r.pick([3, 4, 5, 6]), J2b = r.pick([1, 1.2, 1.5, 2]), n1 = r.pick([0.5, 1, 1.5, 2]), n2 = J1 * n1 / J2b;
        return Q(t("Eine Eiskunstläuferin dreht sich mit ausgestreckten Armen (J = " + f(J1) + " kg m²) " + f(n1) + "-mal pro Sekunde. Sie zieht die Arme an (J = " + f(J2b) + " kg m²). Wie oft dreht sie sich jetzt pro Sekunde, und um welchen Faktor steigt ihre Rotationsenergie?", "A figure skater spins with arms out (J = " + f(J1) + " kg m²) " + f(n1) + " times per second. She pulls her arms in (J = " + f(J2b) + " kg m²). How many turns per second does she make now, and by which factor does her rotational energy rise?"),
            A.multi([{ l: "n<sub>2</sub> in s⁻¹", a: P(n2) }, { l: t("Faktor", "factor"), a: P(J1 / J2b) }]), t("Ohne äußeres Drehmoment bleibt L = J ω erhalten.", "Without external torque L = J ω is conserved."), ["n<sub>2</sub> = J<sub>1</sub> n<sub>1</sub> / J<sub>2</sub> = " + f(n2) + " s⁻¹", "E<sub>2</sub>/E<sub>1</sub> = J<sub>1</sub>/J<sub>2</sub> = " + f(J1 / J2b)], rel(J2b * n2 * n2 / (J1 * n1 * n1), J1 / J2b, 1e-12));
    });

    // =============== 2.9 starre Körper ===============
    add(9, "starr", "Trägheitsmoment, Steiner, Rollen", "Moment of inertia, Steiner, rolling", function (r, d) {
        if (d === 1) {
            var m = r.pick([0.5, 1, 1.4, 2]), l = r.pick([0.6, 1, 1.2, 1.8]), x = r.pick([0.1, 0.2, 0.25, 0.3]) * l, J = m * l * l / 12 + m * x * x;
            var N = 2000, s = 0, dx = l / N; for (var i = 0; i < N; i += 1) { var xi = -l / 2 + (i + 0.5) * dx - x; s += m / l * dx * xi * xi; }
            return Q(t("Ein dünner Stab (" + f(m) + " kg, " + f(l) + " m) dreht sich um eine Achse senkrecht zum Stab, " + f(x * 100) + " cm vom Schwerpunkt entfernt. Wie groß ist das Trägheitsmoment?", "A thin rod (" + f(m) + " kg, " + f(l) + " m) rotates about an axis perpendicular to it, " + f(x * 100) + " cm from the centre of mass. What is the moment of inertia?"),
                P(J, "kg m²"), t("J<sub>S</sub> = m l²/12, dann Steiner.", "J<sub>S</sub> = m l²/12, then Steiner."), ["J<sub>S</sub> = " + f(m * l * l / 12) + " kg m²", "J = J<sub>S</sub> + m d² = " + f(J) + " kg m²"], near(s, J, 1e-6 * J));
        }
        if (d === 2) {
            var bodies = [[t("Vollkugel", "solid sphere"), 0.4], [t("Vollzylinder", "solid cylinder"), 0.5], [t("dünnwandiges Rohr", "thin-walled tube"), 1]], B = r.pick(bodies), h = r.pick([0.5, 1, 1.5, 2, 3]), v = Math.sqrt(2 * g * h / (1 + B[1]));
            return Q(t("Ein(e) " + B[0] + " rollt ohne zu gleiten aus der Ruhe eine schiefe Ebene hinab und verliert dabei " + f(h) + " m Höhe. Wie schnell ist der Schwerpunkt unten?", "A " + B[0] + " rolls without slipping from rest down an incline and loses " + f(h) + " m of height. How fast is the centre of mass at the bottom?"),
                P(v, "m/s"), t("m g h = ½ m v² + ½ J ω² mit ω = v/r und J = k m r² (k = " + f(B[1]) + ").", "m g h = ½ m v² + ½ J ω² with ω = v/r and J = k m r² (k = " + f(B[1]) + ")."), ["v = √(2 g h / (1 + k)) = " + f(v) + " m/s"], rel(g * h, 0.5 * v * v * (1 + B[1]), 1e-12));
        }
        var l3 = r.pick([0.8, 1, 1.2, 1.8, 2]), w = Math.sqrt(3 * g / l3), ve = w * l3;
        var y = sim(function (s, z) { return [z[1], 1.5 * g / l3 * Math.cos(z[0])]; }, [0, 0], 0, 1), th = 0, om = 0, hh = 1e-4; while (th < PI / 2) { var al = 1.5 * g / l3 * Math.cos(th); om += al * hh; th += om * hh; }
        return Q(t("Ein dünner Stab (Länge " + f(l3) + " m) ist an einem Ende drehbar gelagert und fällt aus der waagerechten Lage. Wie schnell ist sein freies Ende, wenn er senkrecht nach unten zeigt?", "A thin rod (length " + f(l3) + " m) is pivoted at one end and falls from the horizontal position. How fast is its free end when it points vertically down?"),
            P(ve, "m/s"), t("Der Schwerpunkt sinkt um l/2, J = m l²/3 um das Ende.", "The centre of mass drops by l/2, J = m l²/3 about the end."), ["m g l/2 = ½ (m l²/3) ω²", "ω = √(3g/l) = " + f(w) + " s⁻¹", "v = ω l = " + f(ve) + " m/s"], near(om, w, 2e-3 * w) && y.length === 2);
    });

    // =============== 2.10 Gravitation ===============
    var G = 6.674e-11, ME = 5.972e24, RE = 6.371e6;
    add(10, "grav", "Gravitationsgesetz und Satellitenbahnen", "Law of gravitation and orbits", function (r, d) {
        if (d === 1) {
            var k = r.pick([2, 3, 4, 9, 0.5]), h = RE * (Math.sqrt(k) - 1) / 1000;
            if (k < 1) { k = 4; h = RE / 1000; }
            return Q(t("In welcher Höhe über der Erdoberfläche ist die Fallbeschleunigung nur noch g/" + k + "? (Erdradius 6371 km)", "At which height above the Earth's surface is the acceleration of gravity only g/" + k + "? (Earth radius 6371 km)"),
                P(h, "km"), t("g ∝ 1/r², also r = R √" + k + ".", "g ∝ 1/r², so r = R √" + k + "."), ["(R + h)/R = √" + k, "h = R(√" + k + " − 1) = " + f(h) + " km"], rel(Math.pow(RE / (RE + h * 1000), 2), 1 / k, 1e-12));
        }
        if (d === 2) {
            var hh = r.pick([400, 800, 1000, 2000, 20200]), rr = RE + hh * 1000, v = Math.sqrt(G * ME / rr), T = 2 * PI * rr / v / 60;
            return Q(t("Ein Satellit umkreist die Erde in " + hh + " km Höhe. Wie groß sind seine Bahngeschwindigkeit und seine Umlaufzeit? (G = 6,674 · 10⁻¹¹ m³/(kg s²), m<sub>E</sub> = 5,972 · 10²⁴ kg, R = 6371 km)", "A satellite orbits the Earth at an altitude of " + hh + " km. Find its orbital speed and period. (G = 6.674 · 10⁻¹¹ m³/(kg s²), m<sub>E</sub> = 5.972 · 10²⁴ kg, R = 6371 km)"),
                A.multi([{ l: "v in km/s", a: P(v / 1000) }, { l: "T in min", a: P(T) }]), t("Gravitation = Zentripetalkraft.", "Gravity = centripetal force."), ["v = √(G m<sub>E</sub> / r) = " + f(v / 1000) + " km/s", "T = 2π r / v = " + f(T) + " min"], rel(Math.pow(T * 60, 2) / Math.pow(rr, 3), 4 * PI * PI / (G * ME), 1e-9));
        }
        var rm = r.pick([4.216, 6.71, 10.7, 3.84]), Td = r.pick([1.77, 3.55, 7.15, 27.3]), Mj = 4 * PI * PI * Math.pow(rm * 1e8, 3) / (G * Math.pow(Td * 86400, 2)) / 1e24;
        return Q(t("Ein Mond umkreist einen Planeten im mittleren Abstand " + f(rm) + " · 10⁵ km mit der Umlaufzeit " + f(Td) + " d. Wie groß ist die Masse des Planeten in 10²⁴ kg?", "A moon orbits a planet at a mean distance of " + f(rm) + " · 10⁵ km with a period of " + f(Td) + " d. What is the planet's mass in 10²⁴ kg?"),
            P(Mj), t("Kepler III aus G m M / r² = m ω² r.", "Kepler III from G m M / r² = m ω² r."), ["M = 4π² r³ / (G T²)", "= " + f(Mj) + " · 10²⁴ kg"], rel(G * Mj * 1e24 / Math.pow(rm * 1e8, 2), Math.pow(2 * PI / (Td * 86400), 2) * rm * 1e8, 1e-9));
    });

    // =============== 2.11 Elastomechanik ===============
    add(11, "elast", "Hooke'sches Gesetz und Festigkeit", "Hooke's law and strength", function (r, d) {
        if (d === 1) {
            var F = r.pick([5, 10, 20, 50]) * 1000, l = r.pick([0.5, 1, 1.5, 2]), dd = r.pick([8, 10, 12, 16, 20]), Em = r.pick([[210, t("Stahl", "steel")], [70, t("Aluminium", "aluminium")], [110, t("Titan", "titanium")]]);
            var Aa = PI * dd * dd / 4, dl = F * l * 1000 / (Em[0] * 1000 * Aa);
            return Q(t("Ein Rundstab aus " + Em[1] + " (E = " + Em[0] + " GPa, d = " + dd + " mm, l = " + f(l) + " m) wird mit " + f(F / 1000) + " kN gezogen. Um wie viel verlängert er sich?", "A round bar of " + Em[1] + " (E = " + Em[0] + " GPa, d = " + dd + " mm, l = " + f(l) + " m) is pulled with " + f(F / 1000) + " kN. How much does it lengthen?"),
                P(dl, "mm"), "Δl = F l / (E A).", ["A = " + f(Aa) + " mm²", "σ = " + f(F / Aa) + " N/mm²", "Δl = " + f(dl) + " mm"], rel(dl / (l * 1000) * Em[0] * 1000, F / Aa, 1e-12));
        }
        if (d === 2) {
            var L = r.pick([0.5, 1, 1.5, 2]), Rm = r.pick([340, 450, 600, 900]), rho = 7850, w = Math.sqrt(2 * Rm * 1e6 / (rho * L * L)), nn = w * 60 / (2 * PI);
            var N = 1000, s = 0, dx = L / N; for (var i = 0; i < N; i += 1) s += rho * w * w * (i + 0.5) * dx * dx;
            return Q(t("Ein Stahlstab (ρ = 7850 kg/m³, Länge " + f(L) + " m) rotiert um eine Achse durch ein Stabende. Bei welcher Drehzahl reißt er, wenn R<sub>m</sub> = " + Rm + " N/mm² ist?", "A steel rod (ρ = 7850 kg/m³, length " + f(L) + " m) rotates about an axis through one end. At which speed does it break if R<sub>m</sub> = " + Rm + " N/mm²?"),
                P(nn, "min⁻¹"), t("Größte Spannung an der Achse: σ = ρ ω² l² / 2.", "Largest stress at the axis: σ = ρ ω² l² / 2."), ["ω = √(2 R<sub>m</sub> / (ρ l²)) = " + f(w) + " s⁻¹", "n = " + f(nn) + " min⁻¹"], near(s, Rm * 1e6, Rm * 1e3));
        }
        var mm = r.pick([10, 20, 50, 100]), dw = r.pick([0.5, 0.8, 1, 1.5]), lw = r.pick([1, 2, 3]), E3 = 210e9, Aw = PI * dw * dw / 4 * 1e-6, sig = mm * g / Aw / 1e6, eps = sig * 1e6 / E3 * 1000;
        return Q(t("An einem Stahldraht (d = " + f(dw) + " mm, l = " + lw + " m, E = 210 GPa) hängt eine Masse von " + mm + " kg. Wie groß sind Spannung und Dehnung?", "A mass of " + mm + " kg hangs on a steel wire (d = " + f(dw) + " mm, l = " + lw + " m, E = 210 GPa). Find the stress and the strain."),
            A.multi([{ l: "σ in N/mm²", a: P(sig) }, { l: "ε in ‰", a: P(eps) }]), "σ = F/A,  ε = σ/E.", ["σ = " + f(sig) + " N/mm²", "ε = " + f(eps) + " ‰", "Δl = " + f(eps * lw) + " mm"], rel(eps / 1000 * E3 * Aw, mm * g, 1e-12));
    });

    // =============== 2.12 Hydrostatik ===============
    add(12, "hydrostatik", "Druck, Auftrieb, Kapillarität", "Pressure, buoyancy, capillarity", function (r, d) {
        if (d === 1) {
            var h = r.pick([1, 1.5, 2, 3, 4]), b = r.pick([1, 2, 3, 5]), F = 1000 * g * b * h * h / 2 / 1000;
            var N = 1000, s = 0, dz = h / N; for (var i = 0; i < N; i += 1) s += 1000 * g * (i + 0.5) * dz * b * dz;
            return Q(t("Ein senkrechter Schieber (Breite " + b + " m) verschließt einen Teich, das Wasser steht " + f(h) + " m hoch bis zur Oberkante. Welche Kraft übt das Wasser auf den Schieber aus?", "A vertical gate (width " + b + " m) closes a pond, the water stands " + f(h) + " m high up to its top edge. Which force does the water exert on the gate?"),
                P(F, "kN"), t("Der Druck wächst linear mit der Tiefe, also zählt der Mitteldruck ρ g h/2.", "Pressure grows linearly with depth, so the mean pressure ρ g h/2 counts."), ["F = ρ g b h² / 2 = " + f(F) + " kN"], near(s / 1000, F, 1e-6 * F));
        }
        if (d === 2) {
            var B = r.pick([[t("Eis", "ice"), 917, t("Meerwasser", "sea water"), 1025], [t("Fichtenholz", "spruce wood"), 470, t("Wasser", "water"), 1000], [t("Eichenholz", "oak wood"), 750, t("Wasser", "water"), 1000], [t("Paraffin", "paraffin"), 900, t("Wasser", "water"), 1000], [t("Polyethylen", "polyethylene"), 950, t("Salzwasser", "salt water"), 1100]]);
            var above = (1 - B[1] / B[3]) * 100;
            return Q(t("Ein Körper aus " + B[0] + " (ρ = " + B[1] + " kg/m³) schwimmt in " + B[2] + " (ρ = " + B[3] + " kg/m³). Welcher Anteil seines Volumens ragt aus der Flüssigkeit?", "A body of " + B[0] + " (ρ = " + B[1] + " kg/m³) floats in " + B[2] + " (ρ = " + B[3] + " kg/m³). Which fraction of its volume sticks out of the liquid?"),
                A.num(above, { dec: 2, unit: "%", tol: 0.05 }), t("Schwimmen: Auftrieb = Gewichtskraft, also V<sub>ein</sub>/V = ρ<sub>K</sub>/ρ<sub>Fl</sub>.", "Floating: buoyancy = weight, so V<sub>sub</sub>/V = ρ<sub>body</sub>/ρ<sub>fluid</sub>."), ["V<sub>ein</sub>/V = " + f(B[1] / B[3]), t("Anteil oben: ", "fraction above: ") + f(above) + " %"], rel(B[3] * (1 - above / 100), B[1], 1e-12));
        }
        var sg = r.pick([0.0728, 0.0728, 0.022, 0.065]), rr = r.pick([0.1, 0.2, 0.25, 0.5, 1]), rhoF = sg === 0.022 ? 790 : 1000, hc = 2 * sg / (rhoF * g * rr / 1000) * 1000;
        return Q(t("Wie hoch steigt eine vollständig benetzende Flüssigkeit (σ = " + f(sg * 1000) + " mN/m, ρ = " + rhoF + " kg/m³) in einer Kapillare mit " + f(rr) + " mm Innenradius?", "How high does a fully wetting liquid (σ = " + f(sg * 1000) + " mN/m, ρ = " + rhoF + " kg/m³) rise in a capillary with " + f(rr) + " mm inner radius?"),
            P(hc, "mm"), t("Kapillardruck 2σ/r gleich hydrostatischem Druck ρ g h.", "Capillary pressure 2σ/r equals hydrostatic pressure ρ g h."), ["h = 2σ / (ρ g r) = " + f(hc) + " mm"], rel(rhoF * g * hc / 1000, 2 * sg / (rr / 1000), 1e-12));
    });

    // =============== 2.12 Hydrodynamik ===============
    add(13, "hydrodynamik", "Kontinuität, Bernoulli, Viskosität", "Continuity, Bernoulli, viscosity", function (r, d) {
        if (d === 1) {
            var d1 = r.pick([40, 50, 80, 100]), d2 = d1 * r.pick([0.5, 0.6, 0.75]), v1 = r.pick([1, 2, 3, 4]), p1 = r.pick([2, 3, 4, 5]) * 1e5, v2 = v1 * Math.pow(d1 / d2, 2), p2 = (p1 + 500 * (v1 * v1 - v2 * v2)) / 1e5;
            return Q(t("Wasser fließt mit " + v1 + " m/s und " + f(p1 / 1e5) + " bar durch ein waagerechtes Rohr (d = " + d1 + " mm). An einer Engstelle ist d = " + f(d2) + " mm. Wie groß sind dort Geschwindigkeit und Druck?", "Water flows at " + v1 + " m/s and " + f(p1 / 1e5) + " bar through a horizontal pipe (d = " + d1 + " mm). At a narrow section d = " + f(d2) + " mm. Find the speed and the pressure there."),
                A.multi([{ l: "v<sub>2</sub> in m/s", a: P(v2) }, { l: "p<sub>2</sub> in bar", a: P(p2) }]), t("Kontinuität, dann Bernoulli ohne Höhenunterschied.", "Continuity, then Bernoulli without height difference."), ["v<sub>2</sub> = v<sub>1</sub>(d<sub>1</sub>/d<sub>2</sub>)² = " + f(v2) + " m/s", "p<sub>2</sub> = p<sub>1</sub> − ½ ρ (v<sub>2</sub>² − v<sub>1</sub>²) = " + f(p2) + " bar"], rel(d1 * d1 * v1, d2 * d2 * v2, 1e-12));
        }
        if (d === 2) {
            var h = r.pick([1, 2, 3, 4, 5]), dd = r.pick([1, 2, 3, 5]), v = Math.sqrt(2 * g * h), V = PI * dd * dd / 4 * 1e-4 * v * 1000;
            return Q(t("Ein Behälter wird ständig bis " + h + " m über einer Bodenöffnung (d = " + dd + " cm) mit Wasser nachgefüllt. Wie groß ist der ausströmende Volumenstrom (ohne Verluste)?", "A tank is kept filled with water up to " + h + " m above an outlet (d = " + dd + " cm). How large is the outflowing volume flow (without losses)?"),
                P(V, "l/s"), t("Torricelli: v = √(2 g h).", "Torricelli: v = √(2 g h)."), ["v = " + f(v) + " m/s", "V̇ = A v = " + f(V) + " l/s"], rel(0.5 * v * v, g * h, 1e-12));
        }
        var dk = r.pick([1, 2, 3, 4]), rk = dk / 2000, rhoK = 7850, rhoF = r.pick([850, 900, 950, 1260]), s = r.pick([10, 20, 25]) / 100, tt = r.pick([4, 8, 12, 20, 30]), v3 = s / tt, eta = 2 * rk * rk * g * (rhoK - rhoF) / (9 * v3);
        return Q(t("In einem Kugelfallviskosimeter sinkt eine Stahlkugel (d = " + dk + " mm, ρ = 7850 kg/m³) in " + tt + " s um " + f(s * 100) + " cm durch ein Öl (ρ = " + rhoF + " kg/m³). Wie groß ist die dynamische Viskosität?", "In a falling-ball viscometer a steel ball (d = " + dk + " mm, ρ = 7850 kg/m³) sinks " + f(s * 100) + " cm through an oil (ρ = " + rhoF + " kg/m³) in " + tt + " s. What is the dynamic viscosity?"),
            P(eta, "Pa s"), t("Gleichgewicht: Gewichtskraft = Auftrieb + Stokes-Reibung 6π η r v.", "Equilibrium: weight = buoyancy + Stokes drag 6π η r v."), ["v = " + f(v3) + " m/s", "η = 2 r² g (ρ<sub>K</sub> − ρ<sub>Fl</sub>) / (9 v) = " + f(eta) + " Pa s"], rel(4 / 3 * PI * Math.pow(rk, 3) * (rhoK - rhoF) * g, 6 * PI * eta * rk * v3, 1e-9));
    });
})(typeof window !== "undefined" ? window : globalThis);
