/* SOR Aufgaben für TM 3, Fluidmechanik und Werkstoffe (K-TM3-*, K-FL-*, K-WS-*). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, M = E.M, n = E.H.n, t = E.tr;
    var g = 9.81;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    // Zahlantwort mit Toleranz für gerundete Zwischenwerte (0,4 % oder halbe letzte Stelle)
    var nm = function (v, dec, unit) { return A.num(v, { dec: dec, unit: unit || "", tol: Math.max(Math.abs(v) * 0.004, 0.6 * Math.pow(10, -dec)) }); };
    // einfache Zeitintegration für unabhängige Gegenproben
    function integrate(acc, v0, T) { var x = 0, v = v0, dt = T / 20000; for (var i = 0; i < 20000; i += 1) { var a = acc(v); x += v * dt + 0.5 * a * dt * dt; v += a * dt; } return { x: x, v: v }; }

    // ================= TM 3 =================
    E.add({ id: "k-tm3-bewegung", topic: "K-TM3-1", title: t("Beschleunigte Bewegung", "Accelerated motion"), gen: function (r, d) {
        if (d === 1) {
            var v0 = r.int(0, 15), a = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), tt = r.int(2, 12), v = v0 + a * tt, s = v0 * tt + 0.5 * a * tt * tt, sim = integrate(function () { return a; }, v0, tt);
            return Q(t("Ein Fahrzeug fährt mit v<sub>0</sub> = " + v0 + " m/s und beschleunigt " + tt + " s lang gleichmäßig mit a = " + n(a) + " m/s². Bestimme die Endgeschwindigkeit und den zurückgelegten Weg.", "A vehicle moving at v<sub>0</sub> = " + v0 + " m/s accelerates uniformly at a = " + n(a) + " m/s² for " + tt + " s. Find the final speed and the distance covered."),
                A.multi([{ l: "v", a: nm(v, 1, "m/s") }, { l: "s", a: nm(s, 1, "m") }]), t("v = v<sub>0</sub> + a t und s = v<sub>0</sub> t + ½ a t².", "v = v<sub>0</sub> + a t and s = v<sub>0</sub> t + ½ a t²."),
                ["v = " + v0 + " + " + n(a) + " · " + tt + " = " + n(v, 1) + " m/s", "s = " + v0 + " · " + tt + " + ½ · " + n(a) + " · " + tt + "² = " + n(s, 1) + " m"], M.near(sim.v, v, 1e-6) && M.near(sim.x, s, 1e-4));
        }
        var kmh = r.pick([36, 54, 72, 90, 108, 126, 144]), v1 = kmh / 3.6, b = r.pick([3, 4, 5, 6, 7, 8]);
        var simStop = function (tr) { var x = v1 * tr, v = v1, dt = 1e-4; while (v > 0) { x += v * dt; v -= b * dt; } return x; };
        if (d === 2) return Q(t("Ein Auto fährt mit " + kmh + " km/h und bremst mit a = " + b + " m/s² bis zum Stillstand. Wie lang ist der Bremsweg (auf 0,1 m)?", "A car travelling at " + kmh + " km/h brakes at a = " + b + " m/s² to a standstill. How long is the braking distance (to 0.1 m)?"),
            nm(v1 * v1 / (2 * b), 1, "m"), t("Erst km/h durch 3,6 teilen, dann s = v² / (2a).", "First divide km/h by 3.6, then s = v² / (2a)."), ["v = " + kmh + " / " + t("3,6", "3.6") + " = " + n(v1, 2) + " m/s", "s = " + n(v1, 2) + "² / (2 · " + b + ") = " + n(v1 * v1 / (2 * b), 1) + " m"], Math.abs(simStop(0) - v1 * v1 / (2 * b)) < 0.05);
        var tr = r.pick([0.6, 0.8, 1, 1.2, 1.5]), sTot = v1 * tr + v1 * v1 / (2 * b);
        return Q(t("Ein Auto fährt mit " + kmh + " km/h. Die Fahrerin reagiert nach " + n(tr) + " s und bremst dann mit " + b + " m/s². Wie lang ist der gesamte Anhalteweg (auf 0,1 m)?", "A car is travelling at " + kmh + " km/h. The driver reacts after " + n(tr) + " s and then brakes at " + b + " m/s². How long is the total stopping distance (to 0.1 m)?"),
            nm(sTot, 1, "m"), t("Reaktionsweg (gleichförmig) plus Bremsweg.", "Reaction distance (constant speed) plus braking distance."), [t("Reaktionsweg", "Reaction distance") + ": " + n(v1, 2) + " · " + n(tr) + " = " + n(v1 * tr, 1) + " m", t("Bremsweg", "Braking distance") + ": " + n(v1 * v1 / (2 * b), 1) + " m", t("Summe", "Total") + ": " + n(sTot, 1) + " m"], Math.abs(simStop(tr) - sTot) < 0.05);
    } });

    E.add({ id: "k-tm3-kreis", topic: "K-TM3-2", title: t("Kreisbewegung", "Circular motion"), gen: function (r, d) {
        if (d === 1) {
            var rpm = r.pick([60, 120, 300, 600, 900, 1200, 1500, 3000]), rad = r.pick([0.05, 0.1, 0.2, 0.25, 0.3, 0.5]), w = 2 * Math.PI * rpm / 60, v = w * rad, an = v * v / rad;
            return Q(t("Ein Punkt sitzt im Abstand r = " + n(rad) + " m auf einer Scheibe mit n = " + rpm + " 1/min. Berechne Bahngeschwindigkeit und Zentripetalbeschleunigung.", "A point sits at r = " + n(rad) + " m on a disc turning at n = " + rpm + " rpm. Find the tangential speed and the centripetal acceleration."),
                A.multi([{ l: "v", a: nm(v, 2, "m/s") }, { l: "a<sub>n</sub>", a: nm(an, 1, "m/s²") }]), t("ω = 2π n / 60, dann v = ω r und a<sub>n</sub> = v² / r.", "ω = 2π n / 60, then v = ω r and a<sub>n</sub> = v² / r."), ["ω = 2π · " + rpm + " / 60 = " + n(w, 2) + " 1/s", "v = " + n(w, 2) + " · " + n(rad) + " = " + n(v, 2) + " m/s", "a<sub>n</sub> = " + n(v, 2) + "² / " + n(rad) + " = " + n(an, 1) + " m/s²"], M.near(an, w * w * rad, 1e-9));
        }
        if (d === 2) {
            var R = r.pick([20, 30, 40, 50, 80, 100, 150]), mu = r.pick([0.3, 0.4, 0.5, 0.6, 0.7, 0.8]), vmax = Math.sqrt(mu * g * R);
            return Q(t("Ein Auto durchfährt eine ebene Kurve mit Radius " + R + " m. Die Haftreibungszahl ist μ = " + n(mu) + ". Mit welcher Geschwindigkeit in km/h rutscht es gerade noch nicht (auf 0,1)?", "A car drives through a flat curve of radius " + R + " m. The coefficient of static friction is μ = " + n(mu) + ". At what speed in km/h does it just not slide (to 0.1)?"),
                nm(vmax * 3.6, 1, "km/h"), t("Die Reibkraft μ m g muss die Zentripetalkraft m v² / r liefern.", "The friction force μ m g must supply the centripetal force m v² / r."), ["v = √(μ g r) = √(" + n(mu) + " · 9,81 · ".replace("9,81", t("9,81", "9.81")) + R + ") = " + n(vmax, 2) + " m/s", "= " + n(vmax * 3.6, 1) + " km/h"], M.near(mu * g, vmax * vmax / R, 1e-9));
        }
        var k = r.pick([100, 200, 500, 1000, 2000, 5000]), rr = r.pick([0.08, 0.1, 0.12, 0.15, 0.2]), nreq = 60 / (2 * Math.PI) * Math.sqrt(k * g / rr);
        return Q(t("Eine Zentrifuge soll im Abstand r = " + n(rr) + " m das " + k + "-Fache der Erdbeschleunigung erzeugen. Welche Drehzahl in 1/min ist nötig (auf 1)?", "A centrifuge must produce " + k + " times the gravitational acceleration at r = " + n(rr) + " m. What speed in rpm is needed (to 1)?"),
            A.num(nreq, { dec: 0, unit: t("1/min", "rpm"), tol: Math.max(nreq * 0.004, 0.6) }), t("Löse a<sub>n</sub> = ω² r nach ω auf und rechne in 1/min um.", "Solve a<sub>n</sub> = ω² r for ω and convert to rpm."), ["a<sub>n</sub> = " + k + " · 9,81 = ".replace("9,81", t("9,81", "9.81")) + n(k * g, 1) + " m/s²", "ω = √(" + n(k * g, 1) + " / " + n(rr) + ") = " + n(Math.sqrt(k * g / rr), 1) + " 1/s", "n = ω · 60 / 2π = " + n(nreq, 0)], M.near(Math.pow(2 * Math.PI * nreq / 60, 2) * rr, k * g, 1e-9));
    } });

    E.add({ id: "k-tm3-newton", topic: "K-TM3-3", title: t("Newton und Reibung", "Newton and friction"), gen: function (r, d) {
        if (d === 1) {
            var m = r.pick([20, 40, 50, 80, 100, 150]), mu = r.pick([0.1, 0.2, 0.25, 0.3]), F = Math.ceil(mu * m * g / 10) * 10 + r.int(2, 30) * 10, a = (F - mu * m * g) / m;
            return Q(t("Eine Kiste mit m = " + m + " kg wird auf ebenem Boden mit F = " + F + " N gezogen. Die Gleitreibungszahl ist μ = " + n(mu) + ". Welche Beschleunigung erfährt sie (auf 0,01)?", "A crate of m = " + m + " kg is pulled across level ground with F = " + F + " N. The coefficient of kinetic friction is μ = " + n(mu) + ". What acceleration does it get (to 0.01)?"),
                nm(a, 2, "m/s²"), t("Resultierende Kraft = Zugkraft − Reibkraft, dann durch m teilen.", "Net force = pulling force − friction, then divide by m."), ["F<sub>R</sub> = " + n(mu) + " · " + m + " · 9,81 = ".replace("9,81", t("9,81", "9.81")) + n(mu * m * g, 1) + " N", "a = (" + F + " − " + n(mu * m * g, 1) + ") / " + m + " = " + n(a, 2) + " m/s²"], M.near(m * a + mu * m * g, F, 1e-9) && a > 0);
        }
        if (d === 2) {
            var al = r.pick([20, 25, 30, 35, 40, 45]), mu2 = r.pick([0.1, 0.15, 0.2, 0.25, 0.3]), ar = al * Math.PI / 180, a2 = g * (Math.sin(ar) - mu2 * Math.cos(ar)), sim = integrate(function () { return g * Math.sin(ar) - mu2 * g * Math.cos(ar); }, 0, 1);
            return Q(t("Ein Block rutscht eine schiefe Ebene mit α = " + al + "° hinab, μ = " + n(mu2) + ". Wie groß ist seine Beschleunigung (auf 0,01)?", "A block slides down an incline with α = " + al + "°, μ = " + n(mu2) + ". What is its acceleration (to 0.01)?"),
                nm(a2, 2, "m/s²"), t("Hangabtrieb g sin α minus Reibung μ g cos α.", "Downhill component g sin α minus friction μ g cos α."), ["a = 9,81 · (sin " + al + "° − " + n(mu2) + " · cos " + al + "°)".replace("9,81", t("9,81", "9.81")), "= " + n(a2, 2) + " m/s²"], M.near(sim.v, a2, 1e-6) && a2 > 0);
        }
        var m1 = r.int(3, 12), m2 = r.int(1, m1 - 1), a3 = (m1 - m2) * g / (m1 + m2), S = 2 * m1 * m2 * g / (m1 + m2);
        return Q(t("Über eine reibungsfreie Rolle hängen m<sub>1</sub> = " + m1 + " kg und m<sub>2</sub> = " + m2 + " kg an einem Seil. Bestimme die Beschleunigung und die Seilkraft.", "Masses m<sub>1</sub> = " + m1 + " kg and m<sub>2</sub> = " + m2 + " kg hang from a rope over a frictionless pulley. Find the acceleration and the rope force."),
            A.multi([{ l: "a", a: nm(a3, 2, "m/s²") }, { l: "S", a: nm(S, 1, "N") }]), t("Freischneiden: m<sub>1</sub> g − S = m<sub>1</sub> a und S − m<sub>2</sub> g = m<sub>2</sub> a.", "Free-body diagrams: m<sub>1</sub> g − S = m<sub>1</sub> a and S − m<sub>2</sub> g = m<sub>2</sub> a."), ["a = (m<sub>1</sub> − m<sub>2</sub>) g / (m<sub>1</sub> + m<sub>2</sub>) = " + n(a3, 2) + " m/s²", "S = m<sub>2</sub> (g + a) = " + n(S, 1) + " N"], M.near(m1 * g - S, m1 * a3, 1e-9) && M.near(S - m2 * g, m2 * a3, 1e-9));
    } });

    E.add({ id: "k-tm3-energie", topic: "K-TM3-4", title: t("Energie und Leistung", "Energy and power"), gen: function (r, d) {
        if (d === 1) {
            var h = r.pick([1.25, 2, 3.2, 5, 8, 10, 20, 45]), v = Math.sqrt(2 * g * h), tF = Math.sqrt(2 * h / g);
            return Q(t("Ein Werkzeug fällt aus " + n(h) + " m Höhe. Mit welcher Geschwindigkeit trifft es auf (Luftwiderstand vernachlässigt, auf 0,01)?", "A tool falls from a height of " + n(h) + " m. At what speed does it hit the ground (ignore air resistance, to 0.01)?"),
                nm(v, 2, "m/s"), t("Lageenergie wird zu Bewegungsenergie: m g h = ½ m v².", "Potential energy turns into kinetic energy: m g h = ½ m v²."), ["v = √(2 · 9,81 · ".replace("9,81", t("9,81", "9.81")) + n(h) + ") = " + n(v, 2) + " m/s"], M.near(integrate(function () { return g; }, 0, tF).v, v, 1e-6));
        }
        if (d === 2) {
            var m = r.pick([800, 1000, 1200, 1500, 1800, 2000]), k1 = r.pick([0, 18, 36, 54]), k2 = k1 + r.pick([18, 36, 54, 72]), W = 0.5 * m * (Math.pow(k2 / 3.6, 2) - Math.pow(k1 / 3.6, 2)) / 1000;
            return Q(t("Ein Auto mit m = " + m + " kg beschleunigt von " + k1 + " km/h auf " + k2 + " km/h. Wie viel Arbeit in kJ ist dafür ohne Verluste nötig (auf 0,1)?", "A car with m = " + m + " kg accelerates from " + k1 + " km/h to " + k2 + " km/h. How much work in kJ is needed without losses (to 0.1)?"),
                nm(W, 1, "kJ"), t("Arbeit = Zuwachs an Bewegungsenergie. Geschwindigkeiten in m/s umrechnen.", "Work = increase in kinetic energy. Convert speeds to m/s."), ["v<sub>1</sub> = " + n(k1 / 3.6, 2) + " m/s, v<sub>2</sub> = " + n(k2 / 3.6, 2) + " m/s", "W = ½ · " + m + " · (" + n(k2 / 3.6, 2) + "² − " + n(k1 / 3.6, 2) + "²) = " + n(W, 1) + " kJ"], M.near(m * (k2 - k1) * (k2 + k1) / (2 * 3.6 * 3.6 * 1000), W, 1e-9));
        }
        var mm = r.pick([200, 300, 500, 800, 1000]), hh = r.int(3, 20), ts = r.pick([5, 8, 10, 15, 20, 30]), eta = r.pick([0.7, 0.75, 0.8, 0.85, 0.9]), P = mm * g * hh / ts / 1000;
        return Q(t("Ein Kran hebt " + mm + " kg in " + ts + " s um " + hh + " m. Der Antrieb hat den Wirkungsgrad η = " + n(eta) + ". Bestimme die mechanische Hubleistung und die aufgenommene elektrische Leistung in kW.", "A crane lifts " + mm + " kg by " + hh + " m in " + ts + " s. The drive efficiency is η = " + n(eta) + ". Find the mechanical lifting power and the electrical input power in kW."),
            A.multi([{ l: "P<sub>mech</sub>", a: nm(P, 2, "kW") }, { l: "P<sub>el</sub>", a: nm(P / eta, 2, "kW") }]), t("P = m g h / t, die Eingangsleistung ist P / η.", "P = m g h / t; the input power is P / η."), ["P<sub>mech</sub> = " + mm + " · 9,81 · ".replace("9,81", t("9,81", "9.81")) + hh + " / " + ts + " = " + n(P, 2) + " kW", "P<sub>el</sub> = " + n(P, 2) + " / " + n(eta) + " = " + n(P / eta, 2) + " kW"], M.near(P / eta * eta * ts * 1000, mm * g * hh, 1e-9));
    } });

    E.add({ id: "k-tm3-impuls", topic: "K-TM3-5", title: t("Impuls und Stoß", "Momentum and collisions"), gen: function (r, d) {
        var m1 = r.pick([800, 1000, 1200, 1500, 2000]), m2 = r.pick([600, 900, 1100, 1400, 3000]), v1 = r.pick([5, 8, 10, 12, 15, 20]), vv = m1 * v1 / (m1 + m2);
        if (d === 1) return Q(t("Ein Wagen (" + m1 + " kg, " + v1 + " m/s) fährt auf einen stehenden Wagen (" + m2 + " kg) auf. Beide verhaken sich. Wie schnell sind sie danach (auf 0,01)?", "A car (" + m1 + " kg, " + v1 + " m/s) runs into a stationary car (" + m2 + " kg). They lock together. How fast do they move afterwards (to 0.01)?"),
            nm(vv, 2, "m/s"), t("Impulserhaltung: m<sub>1</sub> v<sub>1</sub> = (m<sub>1</sub> + m<sub>2</sub>) v′.", "Conservation of momentum: m<sub>1</sub> v<sub>1</sub> = (m<sub>1</sub> + m<sub>2</sub>) v′."), ["v′ = " + m1 + " · " + v1 + " / " + (m1 + m2) + " = " + n(vv, 2) + " m/s"], M.near((m1 + m2) * vv, m1 * v1, 1e-9));
        if (d === 2) {
            var E1 = 0.5 * m1 * v1 * v1, E2 = 0.5 * (m1 + m2) * vv * vv, loss = (E1 - E2) / E1 * 100;
            return Q(t("Gleicher Unfall: Wagen 1 (" + m1 + " kg, " + v1 + " m/s), Wagen 2 (" + m2 + " kg) steht. Bestimme die gemeinsame Geschwindigkeit und den Anteil der Bewegungsenergie in Prozent, der in Verformung und Wärme geht.", "Same crash: car 1 (" + m1 + " kg, " + v1 + " m/s), car 2 (" + m2 + " kg) at rest. Find the common speed and the share of kinetic energy in percent that goes into deformation and heat."),
                A.multi([{ l: "v′", a: nm(vv, 2, "m/s") }, { l: t("Verlust", "loss"), a: nm(loss, 1, "%") }]), t("Energie vorher und nachher vergleichen. Kontrolle: Verlust = m<sub>2</sub> / (m<sub>1</sub> + m<sub>2</sub>).", "Compare the energy before and after. Check: loss = m<sub>2</sub> / (m<sub>1</sub> + m<sub>2</sub>)."), ["v′ = " + n(vv, 2) + " m/s", "E<sub>vor</sub> = ".replace("vor", t("vor", "before")) + n(E1 / 1000, 1) + " kJ, E<sub>nach</sub> = ".replace("nach", t("nach", "after")) + n(E2 / 1000, 1) + " kJ", t("Verlust", "Loss") + " = " + n(loss, 1) + " %"], M.near(loss, m2 / (m1 + m2) * 100, 1e-9));
        }
        var m = r.pick([0.06, 0.1, 0.16, 0.43, 0.6]), vin = r.int(8, 30), vout = r.int(4, vin), dt = r.pick([2, 4, 5, 8, 10]), F = m * (vin + vout) / (dt / 1000);
        return Q(t("Ein Ball (" + n(m) + " kg) trifft mit " + vin + " m/s auf eine Wand und springt mit " + vout + " m/s zurück. Der Kontakt dauert " + dt + " ms. Wie groß ist die mittlere Kraft auf die Wand in N (auf 1)?", "A ball (" + n(m) + " kg) hits a wall at " + vin + " m/s and bounces back at " + vout + " m/s. Contact lasts " + dt + " ms. What is the average force on the wall in N (to 1)?"),
            nm(F, 0, "N"), t("Kraftstoß F Δt = Δp. Die Richtung kehrt sich um, also addieren sich die Beträge.", "Impulse F Δt = Δp. The direction reverses, so the magnitudes add."), ["Δp = " + n(m) + " · (" + vin + " + " + vout + ") = " + n(m * (vin + vout), 2) + " Ns", "F = " + n(m * (vin + vout), 2) + " / " + n(dt / 1000, 3) + " = " + n(F, 0) + " N"], M.near(F * dt / 1000, m * vin - m * (-vout), 1e-9));
    } });

    E.add({ id: "k-tm3-schwingung", topic: "K-TM3-6", title: t("Freie Schwingung", "Free vibration"), gen: function (r, d) {
        var simPeriod = function (c, m) { var x = 1, v = 0, dt = 1e-5, tt = 0, last = 1, cross = []; while (cross.length < 3 && tt < 100) { var a = -c / m * x; v += a * dt; x += v * dt; tt += dt; if (last > 0 && x <= 0) cross.push(tt); last = x; } return cross[2] - cross[1]; };
        if (d === 1) {
            var c = r.pick([200, 500, 800, 1000, 2000, 5000]), m = r.pick([0.5, 1, 2, 4, 5, 10]), f = Math.sqrt(c / m) / (2 * Math.PI);
            return Q(t("Eine Masse m = " + n(m) + " kg hängt an einer Feder mit c = " + c + " N/m. Mit welcher Frequenz schwingt sie (auf 0,01 Hz)?", "A mass m = " + n(m) + " kg hangs on a spring with c = " + c + " N/m. At what frequency does it oscillate (to 0.01 Hz)?"),
                nm(f, 2, "Hz"), t("ω<sub>0</sub> = √(c / m), dann f = ω<sub>0</sub> / 2π.", "ω<sub>0</sub> = √(c / m), then f = ω<sub>0</sub> / 2π."), ["ω<sub>0</sub> = √(" + c + " / " + n(m) + ") = " + n(Math.sqrt(c / m), 2) + " 1/s", "f = " + n(f, 2) + " Hz"], Math.abs(simPeriod(c, m) * f - 1) < 0.01);
        }
        if (d === 2) {
            var ft = r.pick([2, 5, 8, 10, 12, 20, 25]), mm = r.pick([0.2, 0.5, 1, 2, 3]), cc = mm * Math.pow(2 * Math.PI * ft, 2);
            return Q(t("Ein Sensorhalter mit m = " + n(mm) + " kg soll mit f = " + ft + " Hz eigenschwingen. Welche Federsteifigkeit in N/m braucht er (auf 1)?", "A sensor mount with m = " + n(mm) + " kg should have a natural frequency of f = " + ft + " Hz. What spring stiffness in N/m does it need (to 1)?"),
                nm(cc, 0, "N/m"), t("Löse f = √(c / m) / 2π nach c auf.", "Solve f = √(c / m) / 2π for c."), ["c = m · (2π f)² = " + n(mm) + " · (2π · " + ft + ")²", "= " + n(cc, 0) + " N/m"], Math.abs(simPeriod(cc, mm) * ft - 1) < 0.01);
        }
        var xs = r.pick([1, 2, 5, 10, 20, 25, 50]), f3 = Math.sqrt(g / (xs / 1000)) / (2 * Math.PI);
        return Q(t("Eine Maschine senkt ihre Gummilager durch ihr Eigengewicht um " + xs + " mm ein. Wie groß ist ihre Eigenfrequenz in vertikaler Richtung (auf 0,01 Hz)?", "A machine compresses its rubber mounts by " + xs + " mm under its own weight. What is its natural frequency in the vertical direction (to 0.01 Hz)?"),
            nm(f3, 2, "Hz"), t("Statische Einfederung: c · x<sub>st</sub> = m g, also c / m = g / x<sub>st</sub>.", "Static deflection: c · x<sub>st</sub> = m g, so c / m = g / x<sub>st</sub>."), ["c / m = 9,81 / ".replace("9,81", t("9,81", "9.81")) + n(xs / 1000, 3) + " = " + n(g / (xs / 1000), 0) + " 1/s²", "f = √(" + n(g / (xs / 1000), 0) + ") / 2π = " + n(f3, 2) + " Hz"], Math.abs(simPeriod(g / (xs / 1000), 1) * f3 - 1) < 0.01);
    } });

    // ================= Fluidmechanik =================
    var rhoW = 1000;
    E.add({ id: "k-fl-druck", topic: "K-FL-1", title: t("Hydrostatischer Druck", "Hydrostatic pressure"), gen: function (r, d) {
        if (d === 1) {
            var h = r.pick([2, 5, 8, 10, 15, 20, 30, 40, 50]), p = rhoW * g * h / 1e5;
            return Q(t("Ein Taucher ist " + h + " m unter der Wasseroberfläche. Wie groß ist der Überdruck durch das Wasser in bar (auf 0,01)?", "A diver is " + h + " m below the water surface. What is the gauge pressure due to the water in bar (to 0.01)?"),
                nm(p, 2, "bar"), t("p = ρ g h, dabei 1 bar = 10<sup>5</sup> Pa.", "p = ρ g h, with 1 bar = 10<sup>5</sup> Pa."), ["p = 1000 · 9,81 · ".replace("9,81", t("9,81", "9.81")) + h + " = " + n(rhoW * g * h, 0) + " Pa = " + n(p, 2) + " bar"], M.near(p * 1e5 / (rhoW * g), h, 1e-9));
        }
        if (d === 2) {
            var hh = r.pick([1.5, 2, 3, 4, 5, 6]), Ah = r.pick([0.25, 0.5, 0.8, 1, 1.2]), F = rhoW * g * hh * Ah / 1000;
            return Q(t("Eine Klappe mit A = " + n(Ah) + " m² sitzt in einem Wassertank, ihr Mittelpunkt liegt " + n(hh) + " m unter dem Wasserspiegel. Welche Kraft in kN drückt auf die Klappe (auf 0,01)?", "A hatch of A = " + n(Ah) + " m² sits in a water tank; its centre is " + n(hh) + " m below the surface. What force in kN acts on the hatch (to 0.01)?"),
                nm(F, 2, "kN"), t("Bei einer ebenen Fläche zählt der Druck im Flächenschwerpunkt: F = ρ g h<sub>S</sub> A.", "For a flat surface the pressure at the centroid counts: F = ρ g h<sub>S</sub> A."), ["p<sub>S</sub> = " + n(rhoW * g * hh, 0) + " Pa", "F = " + n(rhoW * g * hh, 0) + " · " + n(Ah) + " = " + n(F, 2) + " kN"], M.near(F * 1000 / Ah / (rhoW * g), hh, 1e-9));
        }
        var d1 = r.pick([10, 20, 25, 30, 40]), d2 = d1 * r.pick([3, 4, 5, 6, 8, 10]), F1 = r.pick([50, 100, 150, 200, 300]), F2 = F1 * Math.pow(d2 / d1, 2);
        return Q(t("Eine hydraulische Presse hat einen Pumpkolben mit d<sub>1</sub> = " + d1 + " mm und einen Presskolben mit d<sub>2</sub> = " + d2 + " mm. Auf den Pumpkolben wirken " + F1 + " N. Welche Kraft in kN entsteht am Presskolben (auf 0,01)?", "A hydraulic press has a pump piston with d<sub>1</sub> = " + d1 + " mm and a press piston with d<sub>2</sub> = " + d2 + " mm. " + F1 + " N act on the pump piston. What force in kN acts at the press piston (to 0.01)?"),
            nm(F2 / 1000, 2, "kN"), t("Der Druck ist überall gleich, die Kräfte verhalten sich wie die Flächen.", "The pressure is the same everywhere, so the forces scale with the areas."), ["F<sub>2</sub> = F<sub>1</sub> · (d<sub>2</sub> / d<sub>1</sub>)² = " + F1 + " · " + (d2 / d1) + "²", "= " + n(F2, 0) + " N = " + n(F2 / 1000, 2) + " kN"], M.near(F1 / (Math.PI * d1 * d1 / 4), F2 / (Math.PI * d2 * d2 / 4), 1e-9));
    } });

    E.add({ id: "k-fl-auftrieb", topic: "K-FL-2", title: t("Auftrieb", "Buoyancy"), gen: function (r, d) {
        if (d === 1) {
            var V = r.pick([0.5, 1, 2, 2.5, 5, 10, 20]), F = rhoW * g * V / 1000;
            return Q(t("Ein Körper mit " + n(V) + " Litern Volumen ist ganz in Wasser getaucht. Wie groß ist die Auftriebskraft (auf 0,01 N)?", "A body with a volume of " + n(V) + " litres is fully immersed in water. What is the buoyant force (to 0.01 N)?"),
                nm(F, 2, "N"), t("F<sub>A</sub> = ρ<sub>Wasser</sub> g V, 1 Liter = 0,001 m³.", "F<sub>A</sub> = ρ<sub>water</sub> g V, 1 litre = 0.001 m³."), ["F<sub>A</sub> = 1000 · 9,81 · ".replace("9,81", t("9,81", "9.81")) + n(V / 1000, 4) + " = " + n(F, 2) + " N"], M.near(F / g, V, 1e-9));
        }
        if (d === 2) {
            var mat = r.pick([[t("Fichtenholz", "spruce"), 450], [t("Eichenholz", "oak"), 700], [t("Kork", "cork"), 240], [t("Eis", "ice"), 917], [t("Polyethylen", "polyethylene"), 950], [t("Balsaholz", "balsa"), 150]]), frac = mat[1] / rhoW * 100;
            return Q(t("Ein Block aus " + mat[0] + " (ρ = " + mat[1] + " kg/m³) schwimmt in Wasser. Wie viel Prozent seines Volumens liegen unter Wasser?", "A block of " + mat[0] + " (ρ = " + mat[1] + " kg/m³) floats in water. What percentage of its volume is below the surface?"),
                nm(frac, 1, "%"), t("Gewicht = Auftrieb: ρ<sub>K</sub> V g = ρ<sub>W</sub> V<sub>ein</sub> g.", "Weight = buoyancy: ρ<sub>b</sub> V g = ρ<sub>w</sub> V<sub>sub</sub> g."), ["V<sub>ein</sub> / V = " + mat[1] + " / 1000 = " + n(frac, 1) + " %"], M.near(mat[1] * g, rhoW * g * frac / 100, 1e-9));
        }
        var ms = r.pick([2, 5, 8, 10, 20, 50]), rhoS = r.pick([[7850, t("Stahl", "steel")], [2700, t("Aluminium", "aluminium")], [8900, t("Kupfer", "copper")], [4500, t("Titan", "titanium")]]), Fw = ms * g * (1 - rhoW / rhoS[0]);
        return Q(t("Ein Bauteil aus " + rhoS[1] + " (ρ = " + rhoS[0] + " kg/m³, m = " + ms + " kg) hängt an einer Federwaage unter Wasser. Was zeigt die Waage in N an (auf 0,1)?", "A part made of " + rhoS[1] + " (ρ = " + rhoS[0] + " kg/m³, m = " + ms + " kg) hangs from a spring balance under water. What does the balance read in N (to 0.1)?"),
            nm(Fw, 1, "N"), t("Gewicht minus Auftrieb. Das Volumen ist m / ρ.", "Weight minus buoyancy. The volume is m / ρ."), ["V = " + ms + " / " + rhoS[0] + " = " + n(ms / rhoS[0] * 1000, 3) + " l", "F = " + n(ms * g, 1) + " − " + n(rhoW * g * ms / rhoS[0], 1) + " = " + n(Fw, 1) + " N"], M.near(Fw + rhoW * g * ms / rhoS[0], ms * g, 1e-9));
    } });

    E.add({ id: "k-fl-konti", topic: "K-FL-3", title: t("Kontinuitätsgleichung", "Continuity equation"), gen: function (r, d) {
        if (d === 1) {
            var D1 = r.pick([40, 50, 60, 80, 100]), D2 = D1 / r.pick([2, 2.5, 4, 5]), v1 = r.pick([0.5, 1, 1.5, 2, 2.5]), v2 = v1 * Math.pow(D1 / D2, 2);
            return Q(t("Wasser strömt mit " + n(v1) + " m/s durch ein Rohr mit " + D1 + " mm Durchmesser, das sich auf " + n(D2) + " mm verengt. Wie schnell strömt es im engen Teil (auf 0,01)?", "Water flows at " + n(v1) + " m/s through a pipe of " + D1 + " mm diameter that narrows to " + n(D2) + " mm. How fast does it flow in the narrow part (to 0.01)?"),
                nm(v2, 2, "m/s"), t("A<sub>1</sub> v<sub>1</sub> = A<sub>2</sub> v<sub>2</sub>, die Fläche wächst mit dem Quadrat des Durchmessers.", "A<sub>1</sub> v<sub>1</sub> = A<sub>2</sub> v<sub>2</sub>; the area grows with the square of the diameter."), ["v<sub>2</sub> = v<sub>1</sub> · (d<sub>1</sub> / d<sub>2</sub>)² = " + n(v1) + " · " + n(D1 / D2) + "² = " + n(v2, 2) + " m/s"], M.near(Math.PI * D1 * D1 / 4 * v1, Math.PI * D2 * D2 / 4 * v2, 1e-9));
        }
        var Dm = r.pick([10, 15, 20, 25, 32, 40]), Vd = r.pick([0.1, 0.2, 0.25, 0.4, 0.5, 1, 2]), Am = Math.PI * Math.pow(Dm / 1000, 2) / 4, v = Vd / 1000 / Am;
        if (d === 2) return Q(t("Durch eine Leitung mit " + Dm + " mm Innendurchmesser fließen " + n(Vd) + " l/s. Wie groß ist die mittlere Strömungsgeschwindigkeit (auf 0,01)?", "A flow of " + n(Vd) + " l/s passes through a pipe with an inner diameter of " + Dm + " mm. What is the mean flow velocity (to 0.01)?"),
            nm(v, 2, "m/s"), t("v = V̇ / A mit A = π d² / 4. Liter in m³ umrechnen.", "v = V̇ / A with A = π d² / 4. Convert litres to m³."), ["A = π · " + n(Dm / 1000, 3) + "² / 4 = " + n(Am * 1e4, 3) + " cm²", "v = " + n(Vd / 1000, 4) + " / " + n(Am, 6) + " = " + n(v, 2) + " m/s"], M.near(v * Am * 1000, Vd, 1e-9));
        var vv = r.pick([1, 1.5, 2, 2.5, 3]), Vol = r.pick([100, 200, 300, 500, 1000]), Vdot = vv * Am * 1000, tmin = Vol / Vdot / 60;
        return Q(t("Ein Schlauch mit " + Dm + " mm Innendurchmesser liefert Wasser mit " + n(vv) + " m/s. Wie viele Minuten dauert es, ein Becken mit " + Vol + " Litern zu füllen (auf 0,1)?", "A hose with an inner diameter of " + Dm + " mm delivers water at " + n(vv) + " m/s. How many minutes does it take to fill a " + Vol + " litre basin (to 0.1)?"),
            nm(tmin, 1, "min"), t("Erst den Volumenstrom V̇ = A v berechnen, dann t = V / V̇.", "First compute the flow rate V̇ = A v, then t = V / V̇."), ["V̇ = " + n(Am, 6) + " · " + n(vv) + " = " + n(Vdot, 3) + " l/s", "t = " + Vol + " / " + n(Vdot, 3) + " = " + n(Vol / Vdot, 0) + " s = " + n(tmin, 1) + " min"], M.near(tmin * 60 * vv * Am * 1000, Vol, 1e-9));
    } });

    E.add({ id: "k-fl-bernoulli", topic: "K-FL-4", title: t("Bernoulli-Gleichung", "Bernoulli's equation"), gen: function (r, d) {
        if (d === 1) {
            var h = r.pick([0.5, 0.8, 1, 1.25, 2, 3, 5]), v = Math.sqrt(2 * g * h);
            return Q(t("Aus einem offenen Tank strömt Wasser durch eine kleine Öffnung " + n(h) + " m unter dem Wasserspiegel. Mit welcher Geschwindigkeit tritt es aus (auf 0,01)?", "Water flows out of an open tank through a small opening " + n(h) + " m below the surface. At what speed does it leave (to 0.01)?"),
                nm(v, 2, "m/s"), t("Torricelli: Bernoulli zwischen Wasserspiegel und Öffnung, beide bei Umgebungsdruck.", "Torricelli: Bernoulli between surface and opening, both at ambient pressure."), ["v = √(2 g h) = √(2 · 9,81 · ".replace("9,81", t("9,81", "9.81")) + n(h) + ") = " + n(v, 2) + " m/s"], M.near(0.5 * rhoW * v * v, rhoW * g * h, 1e-9));
        }
        if (d === 2) {
            var v1 = r.pick([1, 1.5, 2, 2.5, 3]), ratio = r.pick([2, 3, 4]), v2 = v1 * ratio, dp = 0.5 * rhoW * (v2 * v2 - v1 * v1) / 1000;
            return Q(t("In einem Venturirohr strömt Wasser mit " + n(v1) + " m/s, im engen Querschnitt ist die Fläche " + ratio + "-mal kleiner. Um wie viel kPa sinkt der statische Druck dort (auf 0,01)?", "Water flows through a Venturi tube at " + n(v1) + " m/s; at the throat the area is " + ratio + " times smaller. By how many kPa does the static pressure drop there (to 0.01)?"),
                nm(dp, 2, "kPa"), t("Kontinuität liefert v<sub>2</sub>, Bernoulli dann Δp = ½ ρ (v<sub>2</sub>² − v<sub>1</sub>²).", "Continuity gives v<sub>2</sub>, then Bernoulli Δp = ½ ρ (v<sub>2</sub>² − v<sub>1</sub>²)."), ["v<sub>2</sub> = " + ratio + " · " + n(v1) + " = " + n(v2) + " m/s", "Δp = ½ · 1000 · (" + n(v2) + "² − " + n(v1) + "²) = " + n(dp * 1000, 0) + " Pa = " + n(dp, 2) + " kPa"], M.near(dp * 1000 + 0.5 * rhoW * v1 * v1, 0.5 * rhoW * v2 * v2, 1e-9));
        }
        var dpa = r.pick([50, 100, 150, 200, 300, 500, 800]), rho = 1.2, v3 = Math.sqrt(2 * dpa / rho);
        return Q(t("Ein Prandtl-Rohr an einem Flugmodell misst einen dynamischen Druck von " + dpa + " Pa in Luft (ρ = 1,2 kg/m³). Wie schnell fliegt das Modell in km/h (auf 0,1)?", "A Pitot-static tube on a model aircraft measures a dynamic pressure of " + dpa + " Pa in air (ρ = 1.2 kg/m³). How fast is the model flying in km/h (to 0.1)?"),
            nm(v3 * 3.6, 1, "km/h"), t("Dynamischer Druck q = ½ ρ v², nach v auflösen.", "Dynamic pressure q = ½ ρ v², solve for v."), ["v = √(2 · " + dpa + " / " + t("1,2", "1.2") + ") = " + n(v3, 2) + " m/s", "= " + n(v3 * 3.6, 1) + " km/h"], M.near(0.5 * rho * v3 * v3, dpa, 1e-9));
    } });

    E.add({ id: "k-fl-reynolds", topic: "K-FL-5", title: t("Reynolds-Zahl", "Reynolds number"), gen: function (r, d) {
        var nuW = 1e-6;
        if (d === 1) {
            var v = r.pick([0.01, 0.02, 0.05, 0.1, 0.5, 1, 2]), D = r.pick([10, 20, 25, 50, 100]), Re = v * D / 1000 / nuW;
            return Q(t("Wasser (ν = 10<sup>−6</sup> m²/s) strömt mit " + n(v) + " m/s durch ein Rohr mit " + D + " mm Durchmesser. Berechne die Reynolds-Zahl.", "Water (ν = 10<sup>−6</sup> m²/s) flows at " + n(v) + " m/s through a pipe of " + D + " mm diameter. Compute the Reynolds number."),
                nm(Re, 0, ""), t("Re = v d / ν, Durchmesser in m einsetzen.", "Re = v d / ν, use the diameter in m."), ["Re = " + n(v) + " · " + n(D / 1000, 3) + " / 10<sup>−6</sup> = " + n(Re, 0)], M.near(Re * nuW, v * D / 1000, 1e-9));
        }
        if (d === 2) {
            var cases = [[0.02, 20], [0.05, 25], [0.1, 10], [0.2, 15], [0.5, 50], [1, 40], [0.08, 20], [2, 20], [0.15, 20], [0.1, 35], [0.3, 10], [0.12, 25]], c = r.pick(cases), Re2 = c[0] * c[1] / 1000 / nuW;
            var opts = [t("laminar", "laminar"), t("Übergangsbereich", "transitional"), t("turbulent", "turbulent")], k2 = Re2 < 2300 ? 0 : Re2 < 4000 ? 1 : 2;
            return Q(t("Wasser (ν = 10<sup>−6</sup> m²/s) strömt mit " + n(c[0]) + " m/s durch ein Rohr mit " + c[1] + " mm Durchmesser. Wie ist die Strömung einzuordnen?", "Water (ν = 10<sup>−6</sup> m²/s) flows at " + n(c[0]) + " m/s through a pipe of " + c[1] + " mm diameter. How should the flow be classified?"),
                A.choice(r, opts[k2], opts.filter(function (o, i) { return i !== k2; })), t("Re berechnen. Unter 2300 laminar, zwischen 2300 und 4000 Übergang, darüber turbulent.", "Compute Re. Below 2300 laminar, between 2300 and 4000 transitional, above that turbulent."), ["Re = " + n(Re2, 0), opts[k2]], Math.abs(Re2 - 2300) > 50 && Math.abs(Re2 - 4000) > 50);
        }
        var oil = r.pick([20, 30, 46, 68, 100]), D3 = r.pick([10, 12, 16, 20, 25, 32]), vmax = 2300 * oil * 1e-6 / (D3 / 1000);
        return Q(t("Hydrauliköl mit ν = " + oil + " mm²/s fließt durch eine Leitung mit " + D3 + " mm Innendurchmesser. Bis zu welcher Geschwindigkeit bleibt die Strömung laminar, also Re ≤ 2300 (auf 0,01 m/s)?", "Hydraulic oil with ν = " + oil + " mm²/s flows through a line with an inner diameter of " + D3 + " mm. Up to what speed does the flow stay laminar, i.e. Re ≤ 2300 (to 0.01 m/s)?"),
            nm(vmax, 2, "m/s"), t("Re = v d / ν = 2300 nach v auflösen. 1 mm²/s = 10<sup>−6</sup> m²/s.", "Solve Re = v d / ν = 2300 for v. 1 mm²/s = 10<sup>−6</sup> m²/s."), ["v = 2300 · " + oil + " · 10<sup>−6</sup> / " + n(D3 / 1000, 3) + " = " + n(vmax, 2) + " m/s"], M.near(vmax * D3 / 1000 / (oil * 1e-6), 2300, 1e-9));
    } });

    E.add({ id: "k-fl-verlust", topic: "K-FL-6", title: t("Druckverlust im Rohr", "Pressure loss in pipes"), gen: function (r, d) {
        if (d === 1) {
            var Re = r.pick([200, 400, 640, 800, 1000, 1280, 1600, 2000]), lam = 64 / Re;
            return Q(t("Eine laminare Rohrströmung hat Re = " + Re + ". Wie groß ist die Rohrreibungszahl λ (auf 0,0001)?", "A laminar pipe flow has Re = " + Re + ". What is the friction factor λ (to 0.0001)?"),
                nm(lam, 4, ""), t("Für laminare Strömung gilt λ = 64 / Re (Hagen-Poiseuille).", "For laminar flow λ = 64 / Re (Hagen-Poiseuille)."), ["λ = 64 / " + Re + " = " + n(lam, 4)], M.near(lam * Re, 64, 1e-9));
        }
        if (d === 2) {
            var l2 = r.pick([0.02, 0.025, 0.03, 0.035, 0.04]), L = r.pick([10, 20, 50, 100, 200]), D = r.pick([25, 40, 50, 80, 100]), v = r.pick([0.5, 1, 1.5, 2, 3]), dp = l2 * (L / (D / 1000)) * 0.5 * rhoW * v * v / 1e5;
            return Q(t("Wasser strömt mit " + n(v) + " m/s durch ein " + L + " m langes Rohr mit " + D + " mm Durchmesser, λ = " + n(l2) + ". Wie groß ist der Druckverlust in bar (auf 0,001)?", "Water flows at " + n(v) + " m/s through a " + L + " m long pipe of " + D + " mm diameter, λ = " + n(l2) + ". What is the pressure loss in bar (to 0.001)?"),
                nm(dp, 3, "bar"), t("Δp = λ · (L / d) · ½ ρ v².", "Δp = λ · (L / d) · ½ ρ v²."), ["L / d = " + n(L / (D / 1000), 0), "½ ρ v² = " + n(0.5 * rhoW * v * v, 0) + " Pa", "Δp = " + n(dp * 1e5, 0) + " Pa = " + n(dp, 3) + " bar"], M.near(dp * 1e5 / (0.5 * rhoW * v * v), l2 * L * 1000 / D, 1e-9));
        }
        var nu = r.pick([30, 46, 68, 100]) * 1e-6, D3 = r.pick([10, 12, 16, 20]), v3 = r.pick([0.5, 1, 1.5, 2, 3]), rho = 870, L3 = r.pick([2, 5, 10, 20]), Re3 = v3 * D3 / 1000 / nu, lam3 = 64 / Re3, dp3 = lam3 * (L3 / (D3 / 1000)) * 0.5 * rho * v3 * v3 / 1e5;
        var hp = 32 * rho * nu * L3 * v3 / Math.pow(D3 / 1000, 2) / 1e5;
        return Q(t("Hydrauliköl (ν = " + n(nu * 1e6) + " mm²/s, ρ = 870 kg/m³) fließt mit " + n(v3) + " m/s durch eine " + L3 + " m lange Leitung mit " + D3 + " mm Durchmesser. Bestimme Re, λ und den Druckverlust in bar.", "Hydraulic oil (ν = " + n(nu * 1e6) + " mm²/s, ρ = 870 kg/m³) flows at " + n(v3) + " m/s through a " + L3 + " m line of " + D3 + " mm diameter. Find Re, λ and the pressure loss in bar."),
            A.multi([{ l: "Re", a: nm(Re3, 0, "") }, { l: "λ", a: nm(lam3, 4, "") }, { l: "Δp", a: nm(dp3, 3, "bar") }]), t("Erst Re prüfen (laminar?), dann λ = 64 / Re, dann Δp = λ (L/d) ½ ρ v².", "First check Re (laminar?), then λ = 64 / Re, then Δp = λ (L/d) ½ ρ v²."), ["Re = " + n(Re3, 0) + " < 2300", "λ = 64 / " + n(Re3, 0) + " = " + n(lam3, 4), "Δp = " + n(dp3, 3) + " bar"], Re3 < 2300 && M.near(dp3, hp, 1e-9));
    } });

    // ================= Werkstoffe =================
    E.add({ id: "k-ws-zug", topic: "K-WS-1", title: t("Zugversuch", "Tensile test"), gen: function (r, d) {
        var d0 = r.pick([6, 8, 10, 12, 14]), S0 = Math.PI * d0 * d0 / 4;
        if (d === 1) {
            var F = r.int(8, 60) * 1000, sig = F / S0;
            return Q(t("Eine Rundprobe mit d<sub>0</sub> = " + d0 + " mm wird mit F = " + n(F / 1000) + " kN gezogen. Wie groß ist die Nennspannung in MPa (auf 0,1)?", "A round specimen with d<sub>0</sub> = " + d0 + " mm is pulled with F = " + n(F / 1000) + " kN. What is the nominal stress in MPa (to 0.1)?"),
                nm(sig, 1, "MPa"), t("σ = F / S<sub>0</sub>, N/mm² ist dasselbe wie MPa.", "σ = F / S<sub>0</sub>; N/mm² is the same as MPa."), ["S<sub>0</sub> = π · " + d0 + "² / 4 = " + n(S0, 2) + " mm²", "σ = " + F + " / " + n(S0, 2) + " = " + n(sig, 1) + " MPa"], M.near(sig * S0, F, 1e-9));
        }
        if (d === 2) {
            var mat = r.pick([[210000, t("Stahl", "steel")], [70000, t("Aluminium", "aluminium")], [110000, t("Titan", "titanium")], [120000, t("Kupfer", "copper")]]), L0 = r.pick([50, 80, 100]), F2 = r.int(5, 20) * 1000, eps = F2 / S0 / mat[0], dL = eps * L0;
            var dLr = M.round(dL * 1000, 1) / 1000, Ecalc = (F2 / S0) / (dLr / L0) / 1000;
            return Q(t("Im elastischen Bereich verlängert sich eine Probe (d<sub>0</sub> = " + d0 + " mm, L<sub>0</sub> = " + L0 + " mm) unter " + n(F2 / 1000) + " kN um " + n(dLr * 1000, 1) + " µm. Bestimme den E-Modul in GPa (auf 1).", "In the elastic range a specimen (d<sub>0</sub> = " + d0 + " mm, L<sub>0</sub> = " + L0 + " mm) extends by " + n(dLr * 1000, 1) + " µm under " + n(F2 / 1000) + " kN. Find Young's modulus in GPa (to 1)."),
                nm(Ecalc, 0, "GPa"), t("E = σ / ε mit ε = ΔL / L<sub>0</sub>. 1 GPa = 1000 MPa.", "E = σ / ε with ε = ΔL / L<sub>0</sub>. 1 GPa = 1000 MPa."), ["σ = " + n(F2 / S0, 1) + " MPa", "ε = " + n(dLr, 4) + " / " + L0 + " = " + n(dLr / L0 * 1e6, 0) + " · 10<sup>−6</sup>", "E = " + n(Ecalc, 0) + " GPa"], Math.abs(Ecalc * 1000 - mat[0]) / mat[0] < 0.08);
        }
        var L03 = r.pick([50, 60, 80, 100]), Lu = L03 * (1 + r.int(8, 45) / 100), Abr = (Lu - L03) / L03 * 100;
        return Q(t("Eine Zugprobe hat die Anfangsmesslänge L<sub>0</sub> = " + L03 + " mm. Nach dem Bruch misst man zusammengelegt L<sub>u</sub> = " + n(Lu, 1) + " mm. Wie groß ist die Bruchdehnung A in Prozent (auf 0,1)?", "A tensile specimen has an initial gauge length L<sub>0</sub> = " + L03 + " mm. After fracture the pieces put together measure L<sub>u</sub> = " + n(Lu, 1) + " mm. What is the elongation at fracture A in percent (to 0.1)?"),
            nm(Abr, 1, "%"), t("A = (L<sub>u</sub> − L<sub>0</sub>) / L<sub>0</sub> · 100 %.", "A = (L<sub>u</sub> − L<sub>0</sub>) / L<sub>0</sub> · 100%."), ["A = (" + n(Lu, 1) + " − " + L03 + ") / " + L03 + " · 100 % = " + n(Abr, 1) + " %"], M.near(L03 * (1 + Abr / 100), Lu, 1e-9));
    } });

    var MATS = function () { return [[t("Stahl", "steel"), 210, 7.85, 500], [t("Aluminium", "aluminium"), 70, 2.7, 300], [t("Titan", "titanium"), 110, 4.5, 900], [t("Magnesium", "magnesium"), 45, 1.74, 250], [t("CFK", "CFRP"), 140, 1.6, 1500]]; };
    E.add({ id: "k-ws-leicht", topic: "K-WS-2", title: t("Dichte und Leichtbau", "Density and lightweight design"), gen: function (r, d) {
        var mats = MATS(), a = r.pick(mats);
        if (d === 1) {
            var D = r.pick([10, 20, 30, 40, 50]), L = r.pick([0.5, 1, 1.5, 2, 3]), m = a[2] * 1000 * Math.PI * Math.pow(D / 1000, 2) / 4 * L;
            return Q(t("Eine Rundstange aus " + a[0] + " (ρ = " + n(a[2]) + " g/cm³) hat " + D + " mm Durchmesser und ist " + n(L) + " m lang. Wie schwer ist sie (auf 0,01 kg)?", "A round bar of " + a[0] + " (ρ = " + n(a[2]) + " g/cm³) has a diameter of " + D + " mm and a length of " + n(L) + " m. What is its mass (to 0.01 kg)?"),
                nm(m, 2, "kg"), t("m = ρ · V mit V = π d² / 4 · L. 1 g/cm³ = 1000 kg/m³.", "m = ρ · V with V = π d² / 4 · L. 1 g/cm³ = 1000 kg/m³."), ["V = π · " + n(D / 1000, 3) + "² / 4 · " + n(L) + " = " + n(m / (a[2] * 1000) * 1e6, 1) + " cm³", "m = " + n(m, 2) + " kg"], M.near(m / (a[2] * 1000) / L, Math.PI * Math.pow(D / 1000, 2) / 4, 1e-9));
        }
        var b = r.pick(mats.filter(function (x) { return x !== a; }));
        if (d === 2) {
            var ratio = (b[2] / b[1]) / (a[2] / a[1]);
            return Q(t("Ein Zugstab aus " + a[0] + " (E = " + a[1] + " GPa, ρ = " + n(a[2]) + " g/cm³) soll durch " + b[0] + " (E = " + b[1] + " GPa, ρ = " + n(b[2]) + " g/cm³) ersetzt werden, bei gleicher Länge und gleicher Zugsteifigkeit E · A. Wie groß ist das Massenverhältnis m<sub>neu</sub> / m<sub>alt</sub> (auf 0,01)?", "A tension rod of " + a[0] + " (E = " + a[1] + " GPa, ρ = " + n(a[2]) + " g/cm³) is to be replaced by " + b[0] + " (E = " + b[1] + " GPa, ρ = " + n(b[2]) + " g/cm³) with the same length and the same axial stiffness E · A. What is the mass ratio m<sub>new</sub> / m<sub>old</sub> (to 0.01)?"),
                nm(ratio, 2, ""), t("Gleiche Steifigkeit heißt A<sub>neu</sub> = A<sub>alt</sub> · E<sub>alt</sub> / E<sub>neu</sub>. Die Masse ist ρ A L.", "Equal stiffness means A<sub>new</sub> = A<sub>old</sub> · E<sub>old</sub> / E<sub>new</sub>. The mass is ρ A L."), ["A<sub>neu</sub> / A<sub>alt</sub> = ".replace("neu", t("neu", "new")).replace("alt", t("alt", "old")) + a[1] + " / " + b[1] + " = " + n(a[1] / b[1], 3), "m-Verhältnis = ".replace("m-Verhältnis", t("Massenverhältnis", "mass ratio")) + n(a[1] / b[1], 3) + " · " + n(b[2]) + " / " + n(a[2]) + " = " + n(ratio, 2)], M.near(ratio * a[2] * (1 / a[1]), b[2] * (1 / b[1]), 1e-9));
        }
        var LR = a[3] * 1e6 / (a[2] * 1000 * g) / 1000;
        return Q(t("Welche Reißlänge hat " + a[0] + " mit R<sub>m</sub> = " + a[3] + " MPa und ρ = " + n(a[2]) + " g/cm³? Gemeint ist die Länge in km, bei der ein frei hängender Faden unter seinem Eigengewicht reißt (auf 0,1).", "What is the breaking length of " + a[0] + " with R<sub>m</sub> = " + a[3] + " MPa and ρ = " + n(a[2]) + " g/cm³? This is the length in km at which a freely hanging thread breaks under its own weight (to 0.1)."),
            nm(LR, 1, "km"), t("Am oberen Ende gilt σ = ρ g L. Setze σ = R<sub>m</sub>.", "At the top end σ = ρ g L. Set σ = R<sub>m</sub>."), ["L = R<sub>m</sub> / (ρ g) = " + a[3] + " · 10<sup>6</sup> / (" + n(a[2] * 1000) + " · 9,81)".replace("9,81", t("9,81", "9.81")), "= " + n(LR, 1) + " km"], M.near(a[2] * 1000 * g * LR * 1000, a[3] * 1e6, 1e-9));
    } });

    E.add({ id: "k-ws-gitter", topic: "K-WS-3", title: t("Kristallgitter", "Crystal lattices"), gen: function (r, d) {
        var NA = 6.022e23;
        if (d === 1) {
            var kfz = r.int(0, 1) === 1, rr = r.int(120, 145), a = kfz ? 4 * rr / Math.SQRT2 : 4 * rr / Math.sqrt(3), name = kfz ? t("kubisch-flächenzentriert (kfz)", "face-centred cubic (fcc)") : t("kubisch-raumzentriert (krz)", "body-centred cubic (bcc)");
            return Q(t("Ein Metall kristallisiert " + name + ", der Atomradius ist r = " + rr + " pm. Wie groß ist die Gitterkonstante a in pm (auf 0,1)?", "A metal crystallises " + name + "; the atomic radius is r = " + rr + " pm. What is the lattice constant a in pm (to 0.1)?"),
                nm(a, 1, "pm"), kfz ? t("Im kfz-Gitter berühren sich die Atome entlang der Flächendiagonale: 4r = a √2.", "In fcc the atoms touch along the face diagonal: 4r = a √2.") : t("Im krz-Gitter berühren sich die Atome entlang der Raumdiagonale: 4r = a √3.", "In bcc the atoms touch along the body diagonal: 4r = a √3."), ["a = 4 · " + rr + " / " + (kfz ? "√2" : "√3") + " = " + n(a, 1) + " pm"], M.near(kfz ? a * a * 2 : a * a * 3, 16 * rr * rr, 1e-9));
        }
        if (d === 2) {
            var met = r.pick([[t("Eisen (krz)", "iron (bcc)"), 2, 55.85, 286.6], [t("Kupfer (kfz)", "copper (fcc)"), 4, 63.55, 361.5], [t("Aluminium (kfz)", "aluminium (fcc)"), 4, 26.98, 404.9], [t("Nickel (kfz)", "nickel (fcc)"), 4, 58.69, 352.4], [t("Chrom (krz)", "chromium (bcc)"), 2, 52.0, 288.5], [t("Wolfram (krz)", "tungsten (bcc)"), 2, 183.84, 316.5]]), aa = met[3] * (1 + r.int(-3, 3) / 1000), rho = met[1] * met[2] / (NA * Math.pow(aa * 1e-10, 3));
            return Q(t(met[0] + " hat die Molmasse M = " + n(met[2], 2) + " g/mol und die Gitterkonstante a = " + n(aa, 1) + " pm. Berechne die Dichte in g/cm³ (auf 0,01). N<sub>A</sub> = 6,022 · 10<sup>23</sup> 1/mol.", met[0] + " has the molar mass M = " + n(met[2], 2) + " g/mol and the lattice constant a = " + n(aa, 1) + " pm. Compute the density in g/cm³ (to 0.01). N<sub>A</sub> = 6.022 · 10<sup>23</sup> 1/mol."),
                nm(rho, 2, "g/cm³"), t("ρ = n M / (N<sub>A</sub> a³), mit n Atomen pro Elementarzelle und a in cm (1 pm = 10<sup>−10</sup> cm).", "ρ = n M / (N<sub>A</sub> a³), with n atoms per unit cell and a in cm (1 pm = 10<sup>−10</sup> cm)."), ["n = " + met[1], "a³ = " + n(Math.pow(aa * 1e-10, 3) * 1e24, 4) + " · 10<sup>−24</sup> cm³", "ρ = " + n(rho, 2) + " g/cm³"], rho > 2 && rho < 20 && M.near(rho * NA * Math.pow(aa * 1e-10, 3), met[1] * met[2], 1e-9));
        }
        var ak = r.int(2850, 2950) / 10, af = r.int(3560, 3680) / 10, Vk = Math.pow(ak, 3) / 2, Vf = Math.pow(af, 3) / 4, dv = (Vf - Vk) / Vk * 100;
        return Q(t("Eisen wandelt beim Erwärmen von krz (a = " + n(ak, 1) + " pm) in kfz (a = " + n(af, 1) + " pm) um. Um wie viel Prozent ändert sich das Volumen pro Atom (auf 0,01, Vorzeichen beachten)?", "On heating, iron transforms from bcc (a = " + n(ak, 1) + " pm) to fcc (a = " + n(af, 1) + " pm). By what percentage does the volume per atom change (to 0.01, mind the sign)?"),
            nm(dv, 2, "%"), t("Volumen pro Atom: krz a³ / 2, kfz a³ / 4.", "Volume per atom: bcc a³ / 2, fcc a³ / 4."), ["V<sub>krz</sub> = ".replace("krz", t("krz", "bcc")) + n(Vk / 1e6, 4) + " · 10<sup>6</sup> pm³", "V<sub>kfz</sub> = ".replace("kfz", t("kfz", "fcc")) + n(Vf / 1e6, 4) + " · 10<sup>6</sup> pm³", "Δ = " + n(dv, 2) + " %"], M.near(Vk * (1 + dv / 100), Vf, 1e-9));
    } });

    E.add({ id: "k-ws-hebel", topic: "K-WS-4", title: t("Hebelgesetz", "Lever rule"), gen: function (r, d) {
        var ca = r.int(2, 15), cb = r.int(40, 80), c0 = r.int(ca + 5, cb - 5), fa = (cb - c0) / (cb - ca);
        if (d === 1) return Q(t("Eine Legierung mit c<sub>0</sub> = " + c0 + " % B liegt im Zweiphasengebiet α + β. Bei dieser Temperatur hat α " + ca + " % B und β " + cb + " % B. Wie groß ist der Massenanteil der α-Phase in Prozent (auf 0,1)?", "An alloy with c<sub>0</sub> = " + c0 + "% B lies in the two-phase region α + β. At this temperature α contains " + ca + "% B and β " + cb + "% B. What is the mass fraction of the α phase in percent (to 0.1)?"),
            nm(fa * 100, 1, "%"), t("Hebelgesetz: der Anteil einer Phase ist der gegenüberliegende Hebelarm geteilt durch die ganze Länge.", "Lever rule: the fraction of a phase is the opposite lever arm divided by the whole length."), ["m<sub>α</sub> / m = (" + cb + " − " + c0 + ") / (" + cb + " − " + ca + ") = " + n(fa * 100, 1) + " %"], M.near(fa * ca + (1 - fa) * cb, c0, 1e-9));
        if (d === 2) {
            var m = r.pick([10, 20, 50, 100, 250]);
            return Q(t("Eine Schmelze von " + m + " kg mit " + c0 + " % B liegt im Zweiphasengebiet. Die Phasen haben " + ca + " % B (α) und " + cb + " % B (β). Wie viel kg α und wie viel kg β liegen vor?", "A melt of " + m + " kg with " + c0 + "% B lies in the two-phase region. The phases contain " + ca + "% B (α) and " + cb + "% B (β). How many kg of α and of β are present?"),
                A.multi([{ l: "m<sub>α</sub>", a: nm(m * fa, 2, "kg") }, { l: "m<sub>β</sub>", a: nm(m * (1 - fa), 2, "kg") }]), t("Erst die Anteile nach dem Hebelgesetz, dann mit der Gesamtmasse multiplizieren.", "First the fractions from the lever rule, then multiply by the total mass."), ["α: " + n(fa * 100, 1) + " % → " + n(m * fa, 2) + " kg", "β: " + n((1 - fa) * 100, 1) + " % → " + n(m * (1 - fa), 2) + " kg"], M.near(m * fa * ca + m * (1 - fa) * cb, m * c0, 1e-9));
        }
        var cc = r.int(10, 70) / 100, perl = (cc - 0.02) / (0.8 - 0.02) * 100;
        return Q(t("Ein unlegierter Stahl mit " + n(cc) + " % C kühlt langsam ab. Wie viel Prozent Perlit enthält das Gefüge bei Raumtemperatur? Nimm für Ferrit 0,02 % C und für Perlit 0,8 % C an (auf 0,1).", "A plain carbon steel with " + n(cc) + "% C cools slowly. What percentage of pearlite does the microstructure contain at room temperature? Assume 0.02% C for ferrite and 0.8% C for pearlite (to 0.1)."),
            nm(perl, 1, "%"), t("Hebelgesetz zwischen Ferrit und Perlit.", "Lever rule between ferrite and pearlite."), [t("Perlit", "Pearlite") + " = (" + n(cc) + " − 0,02) / (0,8 − 0,02)".replace(/0,02/g, t("0,02", "0.02")).replace("0,8", t("0,8", "0.8")) + " = " + n(perl, 1) + " %"], M.near(perl / 100 * 0.8 + (1 - perl / 100) * 0.02, cc, 1e-9));
    } });

    E.add({ id: "k-ws-kerb", topic: "K-WS-5", title: t("Kerbwirkung und Ermüdung", "Notches and fatigue"), gen: function (r, d) {
        if (d === 1) {
            var F = r.int(10, 60), Dn = r.pick([10, 12, 16, 20, 25]), ak = r.pick([1.5, 1.8, 2, 2.2, 2.5, 3]), sn = F * 1000 / (Math.PI * Dn * Dn / 4), sm = ak * sn;
            return Q(t("Ein gekerbter Rundstab hat im Kerbgrund d = " + Dn + " mm und wird mit F = " + F + " kN gezogen. Die Formzahl ist α<sub>k</sub> = " + n(ak) + ". Wie groß ist die Spannungsspitze im Kerbgrund in MPa (auf 0,1)?", "A notched round bar has d = " + Dn + " mm at the notch root and is pulled with F = " + F + " kN. The stress concentration factor is α<sub>k</sub> = " + n(ak) + ". What is the peak stress at the notch root in MPa (to 0.1)?"),
                nm(sm, 1, "MPa"), t("Erst die Nennspannung im Kerbquerschnitt, dann mal α<sub>k</sub>.", "First the nominal stress in the notch cross-section, then multiply by α<sub>k</sub>."), ["σ<sub>n</sub> = " + F * 1000 + " / " + n(Math.PI * Dn * Dn / 4, 2) + " = " + n(sn, 1) + " MPa", "σ<sub>max</sub> = " + n(ak) + " · " + n(sn, 1) + " = " + n(sm, 1) + " MPa"], M.near(sm / ak * Math.PI * Dn * Dn / 4, F * 1000, 1e-9));
        }
        if (d === 2) {
            var sD = r.pick([180, 220, 240, 280, 300, 350]), sa = r.int(60, 160), S = sD / sa;
            return Q(t("Ein Bauteil hat die Dauerfestigkeit σ<sub>D</sub> = " + sD + " MPa und wird mit der Spannungsamplitude σ<sub>a</sub> = " + sa + " MPa belastet. Wie groß ist die Sicherheit gegen Dauerbruch (auf 0,01)?", "A part has an endurance limit σ<sub>D</sub> = " + sD + " MPa and is loaded with a stress amplitude σ<sub>a</sub> = " + sa + " MPa. What is the safety factor against fatigue failure (to 0.01)?"),
                nm(S, 2, ""), t("S = σ<sub>D</sub> / σ<sub>a</sub>.", "S = σ<sub>D</sub> / σ<sub>a</sub>."), ["S = " + sD + " / " + sa + " = " + n(S, 2)], M.near(S * sa, sD, 1e-9));
        }
        var k = r.pick([5, 6, 8, 10]), s1 = r.int(25, 40) * 10, N1 = r.pick([1e4, 2e4, 5e4, 1e5]), s2 = s1 - r.int(3, 10) * 10, N2 = N1 * Math.pow(s1 / s2, k);
        return Q(t("Im Zeitfestigkeitsbereich hält eine Probe bei σ<sub>a</sub> = " + s1 + " MPa genau " + n(N1, 0) + " Lastwechsel. Die Wöhlerlinie hat die Neigung k = " + k + ". Wie viele Lastwechsel hält sie bei " + s2 + " MPa (auf 1)?", "In the finite-life range a specimen survives exactly " + n(N1, 0) + " cycles at σ<sub>a</sub> = " + s1 + " MPa. The S-N curve has slope k = " + k + ". How many cycles does it survive at " + s2 + " MPa (to 1)?"),
            A.num(N2, { dec: 0, unit: "", tol: N2 * 0.005 }), t("Auf der Wöhlerlinie gilt σ<sub>a</sub><sup>k</sup> · N = konst.", "On the S-N curve σ<sub>a</sub><sup>k</sup> · N = const."), ["N<sub>2</sub> = N<sub>1</sub> · (σ<sub>1</sub> / σ<sub>2</sub>)<sup>k</sup> = " + n(N1, 0) + " · (" + s1 + " / " + s2 + ")<sup>" + k + "</sup>", "= " + n(N2, 0)], M.near(Math.pow(s1, k) * N1, Math.pow(s2, k) * N2, 1e-9));
    } });
})(typeof window !== "undefined" ? window : globalThis);
