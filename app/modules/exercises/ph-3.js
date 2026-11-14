/* SOR Aufgaben Physik 3: Schwingungen, Wellen, Optik, Akustik (K-PI-26 bis K-PI-38), Aufgabentypen nach Hering, Martin, Stohrer. Braucht ph-1.js (E.PHU) */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    if (!E.PHU && typeof require !== "undefined") require("./ph-1.js");
    var A = E.A, M = E.M, t = E.tr, near = M.near, U = E.PHU, Q = U.Q, P = U.P, f = U.f, rel = U.rel, sim = U.sim, simpson = M.simpson;
    var g = 9.81, PI = Math.PI, hP = 6.626e-34, c0 = 2.998e8, qe = 1.602e-19, me = 9.109e-31, mn = 1.675e-27, e0 = 8.854e-12, DEG = PI / 180;
    function add(nr, key, de, en, gen) { E.add({ id: "k-pi" + nr + "-" + key, topic: "K-PI-" + nr, title: t(de, en), gen: gen }); }
    var deg = function (x) { return A.num(x, { dec: 2, unit: "°", tol: 0.05 }); };

    // =============== 5.1 freie und gedämpfte Schwingungen ===============
    add(26, "schwingung", "Eigenfrequenz und Dämpfung", "Natural frequency and damping", function (r, d) {
        if (d === 1) {
            var dd = r.pick([1, 1.2, 1.5, 2]), m = r.pick([20, 30, 40, 50]) / 1000, Aa = PI * Math.pow(dd / 100, 2) / 4, k = 1000 * g * Aa, T = 2 * PI * Math.sqrt(m / k);
            var y = sim(function (s, z) { return [z[1], -k / m * z[0]]; }, [0.01, 0], T, 400);
            return Q(t("Ein Reagenzglas (d = " + f(dd) + " cm, Gesamtmasse " + f(m * 1000) + " g) schwimmt aufrecht in Wasser. Es wird etwas eingetaucht und losgelassen. Mit welcher Periodendauer schwingt es (ohne Dämpfung)?", "A test tube (d = " + f(dd) + " cm, total mass " + f(m * 1000) + " g) floats upright in water. It is pushed down slightly and released. With which period does it oscillate (no damping)?"),
                P(T, "s"), t("Die Rückstellkraft ist der zusätzliche Auftrieb ρ g A x, also k = ρ g A.", "The restoring force is the extra buoyancy ρ g A x, so k = ρ g A."), ["k = ρ g A = " + f(k) + " N/m", "T = 2π √(m/k) = " + f(T) + " s"], near(y[0], 0.01, 1e-6));
        }
        if (d === 2) {
            var x0 = r.pick([10, 20, 30]), N = r.pick([5, 10, 15, 20]), Lam = Math.log(2) / N, D = Lam / Math.sqrt(4 * PI * PI + Lam * Lam);
            return Q(t("Bei einer gedämpften Schwingung sinkt die Amplitude von " + x0 + " cm nach " + N + " Schwingungen auf die Hälfte. Wie groß sind das logarithmische Dekrement Λ und der Dämpfungsgrad D?", "In a damped oscillation the amplitude drops from " + x0 + " cm to half after " + N + " oscillations. Find the logarithmic decrement Λ and the damping ratio D."),
                A.multi([{ l: "Λ", a: P(Lam) }, { l: "D", a: P(D) }]), "Λ = ln(x<sub>n</sub>/x<sub>n+1</sub>),  D = Λ / √(4π² + Λ²).", ["Λ = ln 2 / " + N + " = " + f(Lam), "D = " + f(D)], rel(Math.exp(-N * 2 * PI * D / Math.sqrt(1 - D * D)), 0.5, 1e-9));
        }
        var L = r.pick([10, 20, 50, 100]) / 1000, C = r.pick([1, 2, 5, 10]) * 1e-6, f0 = 1 / (2 * PI * Math.sqrt(L * C)), Rk = 2 * Math.sqrt(L / C);
        return Q(t("Ein Schwingkreis hat L = " + f(L * 1000) + " mH und C = " + f(C * 1e6) + " µF. Wie groß sind die Eigenfrequenz ohne Dämpfung und der Widerstand R, bei dem der aperiodische Grenzfall eintritt?", "An LC circuit has L = " + f(L * 1000) + " mH and C = " + f(C * 1e6) + " µF. Find the undamped natural frequency and the resistance R at which critical damping occurs."),
            A.multi([{ l: "f<sub>0</sub> in Hz", a: P(f0) }, { l: "R in Ω", a: P(Rk) }]), "f<sub>0</sub> = 1/(2π √(LC)),  Grenzfall δ = R/(2L) = ω<sub>0</sub>.", ["f<sub>0</sub> = " + f(f0) + " Hz", "R = 2 √(L/C) = " + f(Rk) + " Ω"], rel(Rk / (2 * L), 2 * PI * f0, 1e-12));
    });

    // =============== 5.1 erzwungene und überlagerte Schwingungen ===============
    add(27, "resonanz", "Überlagerung, Resonanz, Fourier", "Superposition, resonance, Fourier", function (r, d) {
        if (d === 1) {
            var a1 = r.pick([3, 5, 6, 8]), a2 = r.pick([4, 5, 8, 10]), p1 = r.pick([0, 30, 45, 60]), p2 = r.pick([90, 120, 150, 180, -60]), x = a1 * Math.cos(p1 * DEG) + a2 * Math.cos(p2 * DEG), y = a1 * Math.sin(p1 * DEG) + a2 * Math.sin(p2 * DEG), amp = Math.hypot(x, y), ph = Math.atan2(y, x) / DEG;
            var tt = 0.37, w = 4, sum = a1 * Math.cos(w * tt + p1 * DEG) + a2 * Math.cos(w * tt + p2 * DEG);
            return Q(t("Zwei gleichfrequente Schwingungen y<sub>1</sub> = " + a1 + " cm · cos(ωt + " + p1 + "°) und y<sub>2</sub> = " + a2 + " cm · cos(ωt + " + p2 + "°) überlagern sich. Bestimme Amplitude und Nullphase (−180° < φ ≤ 180°) der Summe.", "Two oscillations of equal frequency y<sub>1</sub> = " + a1 + " cm · cos(ωt + " + p1 + "°) and y<sub>2</sub> = " + a2 + " cm · cos(ωt + " + p2 + "°) are superposed. Find the amplitude and phase (−180° < φ ≤ 180°) of the sum."),
                A.multi([{ l: "ŷ in cm", a: P(amp) }, { l: "φ in °", a: A.num(ph, { dec: 1, unit: "°", tol: 0.2 }) }]), t("Zeigeraddition: Komponenten in x- und y-Richtung addieren.", "Phasor addition: add the x and y components."), ["ŷ cos φ = " + f(x) + ", ŷ sin φ = " + f(y), "ŷ = " + f(amp) + " cm, φ = " + f(ph, 1) + "°"], near(amp * Math.cos(w * tt + ph * DEG), sum, 1e-9));
        }
        if (d === 2) {
            var m = r.pick([0.5, 1, 1.5, 2]) * 1000, k = r.pick([1, 2, 3]) * 1e4, nF = r.pick([4, 6, 8]), D = r.pick([0.05, 0.1, 0.2]), w0 = Math.sqrt(nF * k / m), nn = r.pick([200, 300, 600, 900]), Om = 2 * PI * nn / 60, eta = Om / w0, V = 1 / Math.sqrt(Math.pow(1 - eta * eta, 2) + Math.pow(2 * D * eta, 2));
            var Fz = Math.pow(1 - eta * eta, 2) + Math.pow(2 * D * eta, 2);
            return Q(t("Eine Maschine (" + f(m / 1000) + " t) steht auf " + nF + " gleichen Federn mit je k = " + f(k / 1e4) + " · 10⁴ N/m, der Dämpfungsgrad ist D = " + f(D) + ". Wie groß sind die Eigenfrequenz und der Vergrößerungsfaktor der Amplitude bei der Betriebsdrehzahl " + nn + " min⁻¹ (Krafterregung)?", "A machine (" + f(m / 1000) + " t) stands on " + nF + " equal springs with k = " + f(k / 1e4) + " · 10⁴ N/m each, the damping ratio is D = " + f(D) + ". Find the natural frequency and the amplitude magnification factor at the operating speed " + nn + " rpm (force excitation)."),
                A.multi([{ l: "f<sub>0</sub> in Hz", a: P(w0 / (2 * PI)) }, { l: "V", a: P(V) }]), "V = 1/√((1 − η²)² + (2Dη)²),  η = Ω/ω<sub>0</sub>.", ["k<sub>ges</sub> = " + f(nF * k / 1e4) + " · 10⁴ N/m", "f<sub>0</sub> = " + f(w0 / (2 * PI)) + " Hz, η = " + f(eta), "V = " + f(V)], rel(V * V * Fz, 1, 1e-12));
        }
        var Uh = r.pick([1, 2, 5, 10]), kk = r.int(1, 6), bk = 2 * Uh / (PI * kk);
        var num = Math.abs(2 * simpson(function (s) { return Uh * (2 * s - 1) * Math.sin(2 * PI * kk * s); }, 0, 1, 2000));
        return Q(t("Eine Sägezahnspannung steigt in jeder Periode linear von −" + Uh + " V auf +" + Uh + " V und springt dann zurück. Wie groß ist die Amplitude der " + kk + ". Harmonischen in ihrer Fourierreihe?", "A sawtooth voltage rises linearly from −" + Uh + " V to +" + Uh + " V in each period and then jumps back. What is the amplitude of harmonic " + kk + " in its Fourier series?"),
            P(bk, "V"), t("Der Sägezahn enthält nur Sinusanteile mit b<sub>k</sub> = 2Û/(πk).", "The sawtooth has only sine terms with b<sub>k</sub> = 2Û/(πk)."), ["|b<sub>" + kk + "</sub>| = 2 · " + Uh + " / (" + kk + "π) = " + f(bk) + " V"], near(num, bk, 1e-6));
    });

    // =============== 5.2 harmonische Wellen ===============
    add(28, "wellen", "Wellengleichung, Seilwelle, Intensität", "Wave equation, string wave, intensity", function (r, d) {
        if (d === 1) {
            var om = r.pick([1980, 3140, 2500, 6280, 4000]), k = Math.round(om / r.pick([335, 340, 345]) * 100) / 100, fr = om / (2 * PI), la = 2 * PI / k, c = om / k;
            return Q(t("Eine Schallwelle wird durch y = 5 · 10⁻⁴ m · sin(" + om + " s⁻¹ · t − " + f(k) + " m⁻¹ · x) beschrieben. Wie groß sind Frequenz, Wellenlänge und Ausbreitungsgeschwindigkeit?", "A sound wave is described by y = 5 · 10⁻⁴ m · sin(" + om + " s⁻¹ · t − " + f(k) + " m⁻¹ · x). Find the frequency, wavelength and speed."),
                A.multi([{ l: "f in Hz", a: P(fr) }, { l: "λ in m", a: P(la) }, { l: "c in m/s", a: P(c) }]), "ω = 2π f,  k = 2π/λ,  c = ω/k.", ["f = " + f(fr) + " Hz", "λ = " + f(la) + " m", "c = " + f(c) + " m/s"], rel(fr * la, c, 1e-12));
        }
        if (d === 2) {
            var F = r.pick([20, 50, 80, 100]), mu = r.pick([10, 20, 50, 100]), fr2 = r.pick([2, 5, 10, 20]), c2 = Math.sqrt(F / (mu / 1000)), la2 = c2 / fr2;
            return Q(t("Ein Seil mit " + f(mu) + " g pro Meter ist mit " + F + " N gespannt. Ein Ende wird mit " + fr2 + " Hz sinusförmig bewegt. Wie groß sind Wellengeschwindigkeit und Wellenlänge?", "A rope with " + f(mu) + " g per metre is tensioned with " + F + " N. One end is moved sinusoidally at " + fr2 + " Hz. Find the wave speed and the wavelength."),
                A.multi([{ l: "c in m/s", a: P(c2) }, { l: "λ in m", a: P(la2) }]), "c = √(F/μ),  λ = c/f.", ["μ = " + f(mu / 1000) + " kg/m", "c = " + f(c2) + " m/s", "λ = " + f(la2) + " m"], rel(c2 * c2 * mu / 1000, F, 1e-9));
        }
        var Pw = r.pick([10, 50, 100, 500]), rr = r.pick([1, 10, 50, 100]), I = Pw * 1000 / (4 * PI * rr * rr * 1e6), Eh = Math.sqrt(2 * I / (c0 * e0));
        return Q(t("Ein Sender strahlt " + Pw + " kW gleichmäßig in alle Richtungen ab. Wie groß sind die Intensität und die Amplitude der elektrischen Feldstärke in " + rr + " km Entfernung?", "A transmitter radiates " + Pw + " kW uniformly in all directions. Find the intensity and the amplitude of the electric field " + rr + " km away."),
            A.multi([{ l: "I in µW/m²", a: P(I * 1e6) }, { l: "Ê in mV/m", a: P(Eh * 1000) }]), "I = P / (4π r²),  I = ½ c ε<sub>0</sub> Ê².", ["I = " + f(I * 1e6) + " µW/m²", "Ê = √(2I/(c ε<sub>0</sub>)) = " + f(Eh * 1000) + " mV/m"], rel(0.5 * c0 * e0 * Eh * Eh * 4 * PI * rr * rr * 1e6, Pw * 1000, 1e-9));
    });

    // =============== 5.2 Doppler, Interferenz ===============
    add(29, "doppler", "Doppler-Effekt, Machkegel, stehende Wellen", "Doppler effect, Mach cone, standing waves", function (r, d) {
        var cs = 340;
        if (d === 1) {
            var fS = r.pick([400, 440, 500, 800, 1000]), v = r.pick([60, 90, 120, 150]), appr = r.bool(), fB = fS * cs / (cs + (appr ? -1 : 1) * v / 3.6);
            return Q(t("Ein Zug fährt mit " + v + " km/h " + (appr ? "auf einen stehenden Beobachter zu" : "von einem stehenden Beobachter weg") + " und pfeift mit " + fS + " Hz. Welche Frequenz hört der Beobachter (c = 340 m/s)?", "A train moving at " + v + " km/h " + (appr ? "towards" : "away from") + " a stationary observer whistles at " + fS + " Hz. Which frequency does the observer hear (c = 340 m/s)?"),
                A.num(fB, { dec: 1, unit: "Hz", tol: 0.5 }), t("Bewegter Sender: f<sub>B</sub> = f<sub>S</sub> c / (c ∓ v).", "Moving source: f<sub>B</sub> = f<sub>S</sub> c / (c ∓ v)."), ["v = " + f(v / 3.6) + " m/s", "f<sub>B</sub> = " + f(fB, 1) + " Hz"], (fB > fS) === appr);
        }
        if (d === 2) {
            var Ma = r.pick([1.2, 1.5, 2, 2.5, 3]), h = r.pick([1, 2, 5, 10]), al = Math.asin(1 / Ma) / DEG, tt = h * 1000 / Math.tan(al * DEG) / (Ma * cs);
            return Q(t("Ein Flugzeug fliegt mit Ma = " + f(Ma) + " in " + h + " km Höhe (c = 340 m/s). Wie groß ist der halbe Öffnungswinkel des Mach'schen Kegels, und wie lange nach dem Überflug hört man den Knall?", "An aircraft flies at Ma = " + f(Ma) + " at an altitude of " + h + " km (c = 340 m/s). What is the half-angle of the Mach cone, and how long after the overflight is the bang heard?"),
                A.multi([{ l: "α in °", a: deg(al) }, { l: "t in s", a: P(tt) }]), t("sin α = 1/Ma. Der Kegel erreicht den Beobachter, wenn das Flugzeug h/tan α weiter ist.", "sin α = 1/Ma. The cone reaches the observer when the aircraft is h/tan α further on."), ["α = arcsin(1/" + f(Ma) + ") = " + f(al) + "°", "t = h / (tan α · Ma c) = " + f(tt) + " s"], rel(Math.sin(al * DEG) * Ma, 1, 1e-12));
        }
        var mat = r.pick([[t("Stahl", "steel"), 210e9, 7850], [t("Aluminium", "aluminium"), 70e9, 2700], [t("Kupfer", "copper"), 120e9, 8960]]), l = r.pick([0.5, 1, 1.5, 2]), c = Math.sqrt(mat[1] / mat[2]), f1 = c / (2 * l);
        return Q(t("Ein Stab aus " + mat[0] + " (E = " + f(mat[1] / 1e9) + " GPa, ρ = " + mat[2] + " kg/m³, l = " + f(l) + " m) ist in der Mitte eingespannt und wird zu Längsschwingungen angeregt. Wie groß sind Schallgeschwindigkeit im Stab und Grundfrequenz?", "A rod of " + mat[0] + " (E = " + f(mat[1] / 1e9) + " GPa, ρ = " + mat[2] + " kg/m³, l = " + f(l) + " m) is clamped in the middle and excited to longitudinal vibrations. Find the speed of sound in the rod and the fundamental frequency."),
            A.multi([{ l: "c in m/s", a: P(c) }, { l: "f<sub>1</sub> in Hz", a: P(f1) }]), t("Freie Enden sind Bäuche, die Mitte ein Knoten: l = λ/2.", "Free ends are antinodes, the middle is a node: l = λ/2."), ["c = √(E/ρ) = " + f(c) + " m/s", "f<sub>1</sub> = c/(2l) = " + f(f1) + " Hz"], rel(f1 * 2 * l, c, 1e-12));
    });

    // =============== 6.2 Reflexion, Brechung ===============
    add(30, "brechung", "Brechungsgesetz, Totalreflexion, Prisma", "Snell's law, total reflection, prism", function (r, d) {
        var mats = [[t("Wasser", "water"), 1.33], [t("Kronglas", "crown glass"), 1.52], [t("Plexiglas", "acrylic"), 1.49], [t("Flintglas", "flint glass"), 1.65], [t("Diamant", "diamond"), 2.42]];
        if (d === 1) {
            var m = r.pick(mats), a1 = r.pick([20, 30, 40, 45, 60, 70]), a2 = Math.asin(Math.sin(a1 * DEG) / m[1]) / DEG;
            return Q(t("Licht fällt aus Luft unter " + a1 + "° gegen das Lot auf " + m[0] + " (n = " + f(m[1]) + "). Wie groß ist der Brechungswinkel?", "Light falls from air at " + a1 + "° to the normal onto " + m[0] + " (n = " + f(m[1]) + "). What is the angle of refraction?"),
                deg(a2), "n<sub>1</sub> sin α<sub>1</sub> = n<sub>2</sub> sin α<sub>2</sub>.", ["sin α<sub>2</sub> = sin " + a1 + "° / " + f(m[1]) + " = " + f(Math.sin(a2 * DEG)), "α<sub>2</sub> = " + f(a2) + "°"], rel(m[1] * Math.sin(a2 * DEG), Math.sin(a1 * DEG), 1e-12));
        }
        if (d === 2) {
            var m2 = r.pick(mats), n2 = r.pick([1, 1, 1.33]), ag = Math.asin(n2 / m2[1]) / DEG;
            if (n2 >= m2[1]) n2 = 1;
            ag = Math.asin(n2 / m2[1]) / DEG;
            return Q(t("Wie groß ist der Grenzwinkel der Totalreflexion für " + m2[0] + " (n = " + f(m2[1]) + ") gegen " + (n2 === 1 ? t("Luft", "air") : t("Wasser (n = 1,33)", "water (n = 1.33)")) + "?", "What is the critical angle of total internal reflection for " + m2[0] + " (n = " + f(m2[1]) + ") against " + (n2 === 1 ? "air" : "water (n = 1.33)") + "?"),
                deg(ag), "sin α<sub>g</sub> = n<sub>2</sub> / n<sub>1</sub>.", ["α<sub>g</sub> = arcsin(" + f(n2) + "/" + f(m2[1]) + ") = " + f(ag) + "°"], rel(Math.sin(ag * DEG) * m2[1], n2, 1e-12));
        }
        var gam = r.pick([45, 60, 60, 30]), dmin = r.pick([30, 35, 40, 47.2, 50]), nn = Math.sin((dmin + gam) / 2 * DEG) / Math.sin(gam / 2 * DEG);
        if (gam === 30 && dmin > 25) dmin = r.pick([15, 18, 20, 24]);
        nn = Math.sin((dmin + gam) / 2 * DEG) / Math.sin(gam / 2 * DEG);
        var a1s = (dmin + gam) / 2, a2s = Math.asin(Math.sin(a1s * DEG) / nn) / DEG;
        return Q(t("Für ein Prisma mit brechendem Winkel γ = " + gam + "° misst man die minimale Ablenkung δ<sub>min</sub> = " + f(dmin) + "°. Wie groß ist die Brechzahl des Glases?", "For a prism with apex angle γ = " + gam + "° the minimum deviation is measured as δ<sub>min</sub> = " + f(dmin) + "°. What is the refractive index of the glass?"),
            A.num(nn, { dec: 4, tol: 0.001 }), t("Bei minimaler Ablenkung läuft der Strahl symmetrisch durch das Prisma.", "At minimum deviation the ray passes symmetrically through the prism."), ["n = sin((δ<sub>min</sub> + γ)/2) / sin(γ/2) = " + f(nn)], rel(2 * a2s, gam, 1e-9));
    });

    // =============== 6.2 Linsen ===============
    add(31, "linsen", "Abbildungsgleichung, Brille, Mikroskop", "Lens equation, glasses, microscope", function (r, d) {
        if (d === 1) {
            var fl = r.pick([5, 10, 15, 20]), a = fl * r.pick([1.5, 2.5, 3, 4, 6]), b = 1 / (1 / fl - 1 / a), be = b / a;
            return Q(t("Ein Gegenstand steht " + f(a) + " cm vor einer dünnen Sammellinse (f = " + fl + " cm). Wo entsteht das Bild, und wie groß ist der Abbildungsmaßstab |β|?", "An object stands " + f(a) + " cm in front of a thin converging lens (f = " + fl + " cm). Where is the image formed, and what is the magnification |β|?"),
                A.multi([{ l: "b in cm", a: P(b) }, { l: "|β|", a: P(be) }]), "1/f = 1/a + 1/b,  |β| = b/a.", ["b = " + f(b) + " cm", "|β| = " + f(be)], rel(1 / a + 1 / b, 1 / fl, 1e-12));
        }
        if (d === 2) {
            var hyper = r.bool(), aN = r.pick([40, 50, 60, 75, 100]), aF = r.pick([25, 40, 50, 80, 100]), D = hyper ? 1 / 0.25 - 100 / aN : -100 / aF;
            return Q(hyper ? t("Der Nahpunkt eines weitsichtigen Auges liegt bei " + aN + " cm. Welche Brechkraft braucht eine (augennahe) Brille, damit er auf 25 cm rückt?", "The near point of a far-sighted eye is at " + aN + " cm. Which refractive power must (close-fitting) glasses have to bring it to 25 cm?")
                : t("Der Fernpunkt eines kurzsichtigen Auges liegt " + aF + " cm vor dem Auge. Welche Brechkraft braucht eine (augennahe) Brille, damit er wieder bis unendlich sieht?", "The far point of a short-sighted eye is " + aF + " cm in front of the eye. Which refractive power must (close-fitting) glasses have so that it sees to infinity again?"),
                P(D, "dpt"), t("Die Brille bildet die gewünschte Gegenstandsweite auf den Nah- bzw. Fernpunkt ab (virtuelles Bild).", "The glasses image the desired object distance onto the near or far point (virtual image)."), ["D = " + f(D) + " dpt"], hyper ? D > 0 : D < 0);
        }
        var fOb = r.pick([4, 8, 16, 20]), fOk = r.pick([10, 20, 25, 40]), tt = r.pick([150, 160, 180]), G = tt * 250 / (fOb * fOk);
        return Q(t("Ein Mikroskop hat ein Objektiv mit f = " + fOb + " mm, ein Okular mit f = " + fOk + " mm und die optische Tubuslänge " + tt + " mm. Wie groß ist die Vergrößerung (Bezugssehweite 250 mm)?", "A microscope has an objective with f = " + fOb + " mm, an eyepiece with f = " + fOk + " mm and an optical tube length of " + tt + " mm. What is the magnification (reference distance 250 mm)?"),
            P(G), "Γ = (t / f<sub>Ob</sub>) · (250 mm / f<sub>Ok</sub>).", ["β<sub>Ob</sub> = " + f(tt / fOb), "Γ<sub>Ok</sub> = " + f(250 / fOk), "Γ = " + f(G)], rel(G, (tt / fOb) * (250 / fOk), 1e-12));
    });

    // =============== 6.3 Fotometrie ===============
    add(32, "fotometrie", "Lichtstärke, Beleuchtungsstärke, Bestrahlung", "Luminous intensity, illuminance, irradiance", function (r, d) {
        if (d === 1) {
            var Ev = r.pick([300, 500, 750, 1000]), rr = r.pick([1, 1.5, 2, 2.5]), eps = r.pick([0, 0, 20, 30]), Iv = Ev * rr * rr / Math.cos(eps * DEG);
            return Q(t("Eine Lampe hängt " + f(rr) + " m vom Arbeitsplatz entfernt, das Licht fällt unter " + eps + "° gegen das Lot ein. Welche Lichtstärke braucht sie für " + Ev + " lx?", "A lamp hangs " + f(rr) + " m from a workplace, the light falls at " + eps + "° to the normal. Which luminous intensity does it need for " + Ev + " lx?"),
                P(Iv, "cd"), "E<sub>v</sub> = I<sub>v</sub> cos ε / r².", ["I<sub>v</sub> = E<sub>v</sub> r² / cos ε = " + f(Iv) + " cd"], rel(Iv * Math.cos(eps * DEG) / (rr * rr), Ev, 1e-12));
        }
        if (d === 2) {
            var col = r.pick([[t("grünes", "green"), 555, 1], [t("gelbes", "yellow"), 590, 0.757], [t("rotes", "red"), 630, 0.265], [t("blaues", "blue"), 470, 0.091]]), Pe = r.pick([5, 10, 20, 50]), Phi = 683 * col[2] * Pe / 1000;
            return Q(t("Eine LED sendet " + col[1] + " nm Licht (" + col[0] + ", V(λ) = " + f(col[2]) + ") mit der Strahlungsleistung " + Pe + " mW aus. Wie groß ist der Lichtstrom?", "An LED emits " + col[1] + " nm light (" + col[0] + ", V(λ) = " + f(col[2]) + ") with a radiant power of " + Pe + " mW. What is the luminous flux?"),
                P(Phi, "lm"), "Φ<sub>v</sub> = 683 lm/W · V(λ) · Φ<sub>e</sub>.", ["Φ<sub>v</sub> = " + f(Phi) + " lm"], rel(Phi / col[2] / 683, Pe / 1000, 1e-12));
        }
        var fl = r.pick([50, 100, 150, 200]), dl = r.pick([30, 40, 50, 60]), S = 1000, th = 0.53 * DEG, dB = fl * th, Pin = S * PI * dl * dl / 4 * 1e-6, Ee = Pin / (PI * dB * dB / 4 * 1e-6) / 1e6;
        return Q(t("Mit einer Sammellinse (f = " + fl + " mm, Durchmesser " + dl + " mm) wird die Sonne (Sehwinkel 0,53°, Bestrahlungsstärke 1000 W/m²) auf Papier abgebildet. Wie groß sind Bilddurchmesser und Bestrahlungsstärke im Bild?", "A converging lens (f = " + fl + " mm, diameter " + dl + " mm) images the Sun (angular size 0.53°, irradiance 1000 W/m²) onto paper. Find the image diameter and the irradiance in the image."),
            A.multi([{ l: "d<sub>B</sub> in mm", a: P(dB) }, { l: "E<sub>e</sub> in MW/m²", a: P(Ee) }]), t("Bilddurchmesser = f · Sehwinkel (im Bogenmaß). Die gesammelte Leistung verteilt sich auf das Bild.", "Image diameter = f · angular size (in radians). The collected power spreads over the image."), ["d<sub>B</sub> = " + f(dB) + " mm", "P = " + f(Pin) + " W", "E<sub>e</sub> = " + f(Ee) + " MW/m²"], rel(Ee * 1e6 / S, Math.pow(dl / dB, 2), 1e-9));
    });

    // =============== 6.4 Wellenoptik ===============
    add(33, "wellenoptik", "Gitter, Entspiegelung, Polarisation", "Grating, anti-reflection, polarisation", function (r, d) {
        if (d === 1) {
            var N = r.pick([300, 500, 600, 1000, 1200]), la = r.pick([450, 550, 589, 633]), gk = 1e6 / N, m = r.int(1, 2), mmax = Math.floor(gk / la);
            if (m > mmax) m = 1;
            var al = Math.asin(m * la / gk) / DEG;
            return Q(t("Ein Gitter mit " + N + " Strichen pro mm wird senkrecht mit Licht der Wellenlänge " + la + " nm beleuchtet. Unter welchem Winkel erscheint die " + m + ". Ordnung, und welches ist die höchste beobachtbare Ordnung?", "A grating with " + N + " lines per mm is illuminated normally with light of wavelength " + la + " nm. At which angle does order " + m + " appear, and what is the highest observable order?"),
                A.multi([{ l: "α in °", a: deg(al) }, { l: "m<sub>max</sub>", a: A.num(mmax) }]), "g sin α = m λ, sin α ≤ 1.", ["g = " + f(gk) + " nm", "α = arcsin(" + m + " · " + la + " / " + f(gk) + ") = " + f(al) + "°", "m<sub>max</sub> = ⌊g/λ⌋ = " + mmax], rel(gk * Math.sin(al * DEG), m * la, 1e-12) && (mmax + 1) * la > gk);
        }
        if (d === 2) {
            var la2 = r.pick([500, 550, 589, 633]), nf = r.pick([1.38, 1.33, 1.45]), dd = la2 / (4 * nf);
            return Q(t("Eine Glasplatte (n = 1,5) wird mit einer dünnen Schicht (n = " + f(nf) + ") entspiegelt. Wie dick muss die Schicht mindestens sein, damit Licht der Wellenlänge " + la2 + " nm bei senkrechtem Einfall nicht reflektiert wird?", "A glass plate (n = 1.5) gets an anti-reflective film (n = " + f(nf) + "). How thick must the film be at least so that light of wavelength " + la2 + " nm is not reflected at normal incidence?"),
                P(dd, "nm"), t("Beide Reflexe haben einen Phasensprung, der Gangunterschied 2 n d muss λ/2 sein.", "Both reflections have a phase jump, the path difference 2 n d must be λ/2."), ["d = λ / (4n) = " + f(dd) + " nm"], rel(2 * nf * dd, la2 / 2, 1e-12));
        }
        var Np = r.int(2, 4), th = r.pick([20, 30, 45]), I = 0.5 * Math.pow(Math.pow(Math.cos(th * DEG), 2), Np - 1) * 100;
        var x = 0.5; for (var i = 1; i < Np; i += 1) x *= Math.cos(th * DEG) * Math.cos(th * DEG);
        return Q(t("Natürliches Licht fällt auf " + Np + " hintereinander stehende Polarisatoren, die jeweils um " + th + "° gegeneinander verdreht sind. Wie viel Prozent der Intensität kommen durch?", "Unpolarised light falls on " + Np + " polarisers in a row, each rotated by " + th + "° relative to the previous one. What percentage of the intensity gets through?"),
            A.num(I, { dec: 2, unit: "%", tol: 0.05 }), t("Der erste Polarisator halbiert, jeder weitere multipliziert mit cos² θ (Malus).", "The first polariser halves, each further one multiplies by cos² θ (Malus)."), ["I/I<sub>0</sub> = ½ · (cos² " + th + "°)<sup>" + (Np - 1) + "</sup> = " + f(I) + " %"], rel(x * 100, I, 1e-12));
    });

    // =============== 6.5 Quantenoptik ===============
    add(34, "quantenoptik", "Fotoeffekt, Photonenzahl, Materiewellen", "Photoelectric effect, photon number, matter waves", function (r, d) {
        if (d === 1) {
            var met = r.pick([[t("Cäsium", "caesium"), 2.14], [t("Kalium", "potassium"), 2.3], [t("Natrium", "sodium"), 2.36], [t("Zink", "zinc"), 4.3]]), la = r.pick([200, 253.7, 300, 365, 400]), Eph = hP * c0 / (la * 1e-9) / qe, Ek = Eph - met[1];
            if (Ek <= 0.1) { la = 200; Eph = hP * c0 / (la * 1e-9) / qe; Ek = Eph - met[1]; }
            return Q(t("UV-Licht (λ = " + f(la) + " nm) fällt auf " + met[0] + " (Austrittsarbeit " + f(met[1]) + " eV). Wie groß ist die größte kinetische Energie der Fotoelektronen, und welche Gegenspannung stoppt sie?", "UV light (λ = " + f(la) + " nm) falls on " + met[0] + " (work function " + f(met[1]) + " eV). What is the largest kinetic energy of the photoelectrons, and which retarding voltage stops them?"),
                A.multi([{ l: "E<sub>kin</sub> in eV", a: P(Ek) }, { l: "U in V", a: P(Ek) }]), "E<sub>kin</sub> = h c/λ − W<sub>A</sub>,  e U = E<sub>kin</sub>.", ["h c/λ = " + f(Eph) + " eV", "E<sub>kin</sub> = " + f(Ek) + " eV, U = " + f(Ek) + " V"], rel(Eph * la, 1239.8, 2e-3));
        }
        if (d === 2) {
            var la2 = r.pick([405, 532, 633, 647, 1064]), Pw = r.pick([1, 5, 10, 100]), N = Pw / 1000 / (hP * c0 / (la2 * 1e-9)) / 1e16;
            return Q(t("Ein Laser (λ = " + la2 + " nm) hat die Leistung " + Pw + " mW. Wie viele Photonen sendet er pro Sekunde aus (in 10¹⁶)?", "A laser (λ = " + la2 + " nm) has a power of " + Pw + " mW. How many photons does it emit per second (in 10¹⁶)?"),
                P(N), "N = P / (h f) = P λ / (h c).", ["E<sub>Ph</sub> = " + f(hP * c0 / (la2 * 1e-9) / qe) + " eV", "N = " + f(N) + " · 10¹⁶ s⁻¹"], rel(N * 1e16 * hP * c0 / (la2 * 1e-9), Pw / 1000, 1e-12));
        }
        var part = r.pick([[t("Neutron", "neutron"), mn, "meV", 1e-3, [25, 50, 100]], [t("Elektron", "electron"), me, "eV", 1, [10, 50, 100, 1000]]]), Ev = r.pick(part[4]), la3 = hP / Math.sqrt(2 * part[1] * Ev * part[3] * qe) * 1e9;
        return Q(t("Wie groß ist die De-Broglie-Wellenlänge eines " + part[0] + "s mit der kinetischen Energie " + Ev + " " + part[2] + " (nicht relativistisch)?", "What is the de Broglie wavelength of a " + part[0] + " with kinetic energy " + Ev + " " + part[2] + " (non-relativistic)?"),
            P(la3, "nm"), "λ = h / p,  p = √(2 m E).", ["p = " + f(Math.sqrt(2 * part[1] * Ev * part[3] * qe) * 1e24) + " · 10⁻²⁴ kg m/s", "λ = " + f(la3) + " nm"], rel(Math.pow(hP / (la3 * 1e-9), 2) / (2 * part[1]), Ev * part[3] * qe, 1e-9));
    });

    // =============== 6.6 Auflösung ===============
    add(35, "aufloesung", "Beugungsbegrenzte Auflösung", "Diffraction-limited resolution", function (r, d) {
        if (d === 1) {
            var D = r.pick([2, 3, 4, 5]), la = 550, phi = 1.22 * la * 1e-9 / (D / 1000), s = phi * 384400;
            return Q(t("Die Augenpupille hat " + D + " mm Durchmesser (λ = 550 nm). Wie groß ist der kleinste auflösbare Winkel in Bogenminuten, und wie groß müssen Strukturen auf dem Mond (384 400 km) mindestens sein?", "The eye pupil has a diameter of " + D + " mm (λ = 550 nm). What is the smallest resolvable angle in arcminutes, and how large must structures on the Moon (384,400 km) be at least?"),
                A.multi([{ l: "φ in '", a: P(phi / DEG * 60) }, { l: "s in km", a: P(s) }]), "sin φ ≈ φ = 1,22 λ / D.", ["φ = " + f(phi * 1e6) + " µrad = " + f(phi / DEG * 60) + "'", "s = φ · r = " + f(s) + " km"], rel(s / 384400 * D / 1000, 1.22 * la * 1e-9, 1e-9));
        }
        if (d === 2) {
            var la2 = r.pick([400, 450, 500, 550, 650]), NA = r.pick([0.25, 0.65, 0.9, 1.25, 1.4]), dmin = 0.61 * la2 / NA;
            return Q(t("Welchen kleinsten Abstand zweier Punkte kann ein Mikroskop mit der numerischen Apertur " + f(NA) + " bei " + la2 + " nm auflösen?", "Which smallest distance between two points can a microscope with numerical aperture " + f(NA) + " resolve at " + la2 + " nm?"),
                P(dmin, "nm"), "d<sub>min</sub> = 0,61 λ / NA.", ["d<sub>min</sub> = " + f(dmin) + " nm"], rel(dmin * NA, 0.61 * la2, 1e-12));
        }
        var la3 = r.pick([532, 633, 1064]), D3 = r.pick([1, 2, 3, 5]), fl = r.pick([50, 100, 150, 200]), w = 4 * la3 * 1e-6 * fl / (PI * D3) * 1000;
        return Q(t("Ein Laserstrahl (λ = " + la3 + " nm, Durchmesser " + D3 + " mm) wird mit einer Linse (f = " + fl + " mm) fokussiert. Wie groß ist der Durchmesser des Brennflecks (Gauß'scher Strahl)?", "A laser beam (λ = " + la3 + " nm, diameter " + D3 + " mm) is focused with a lens (f = " + fl + " mm). What is the diameter of the focal spot (Gaussian beam)?"),
            P(w, "µm"), "d<sub>F</sub> = 4 λ f / (π D).", ["d<sub>F</sub> = " + f(w) + " µm"], rel(w * PI * D3, 4 * la3 * fl * 1e-3, 1e-12));
    });

    // =============== 7.2 Schallwellen ===============
    add(36, "schall", "Schallgeschwindigkeit, Intensität, Reflexion", "Speed of sound, intensity, reflection", function (r, d) {
        if (d === 1) {
            var th = r.pick([-20, 0, 10, 20, 30, 40]), c = 331.3 * Math.sqrt((th + 273.15) / 273.15), fr = r.pick([100, 440, 1000, 4000]), la = c / fr;
            return Q(t("Wie groß ist die Schallgeschwindigkeit in Luft bei " + th + " °C (331,3 m/s bei 0 °C), und welche Wellenlänge hat dann ein " + fr + "-Hz-Ton?", "What is the speed of sound in air at " + th + " °C (331.3 m/s at 0 °C), and what is the wavelength of a " + fr + " Hz tone then?"),
                A.multi([{ l: "c in m/s", a: P(c) }, { l: "λ in m", a: P(la) }]), "c ∝ √T.", ["c = 331,3 m/s · √(" + f(th + 273.15) + "/273,15) = " + f(c) + " m/s", "λ = c/f = " + f(la) + " m"], rel(c * c / (331.3 * 331.3), (th + 273.15) / 273.15, 1e-12));
        }
        if (d === 2) {
            var pe = r.pick([0.02, 0.2, 1, 2, 20]), Z = 413, I = pe * pe / Z, L = 10 * Math.log10(I / 1e-12);
            return Q(t("Eine ebene Schallwelle hat in Luft (Z = ρ c = 413 kg/(m² s)) den effektiven Schalldruck " + f(pe) + " Pa. Wie groß sind Schallintensität und Schallpegel?", "A plane sound wave in air (Z = ρ c = 413 kg/(m² s)) has an rms sound pressure of " + f(pe) + " Pa. Find the intensity and the sound level."),
                A.multi([{ l: "I in µW/m²", a: P(I * 1e6) }, { l: "L in dB", a: A.num(L, { dec: 1, unit: "dB", tol: 0.15 }) }]), "I = p̃² / (ρ c),  L = 10 lg(I / 10⁻¹² W/m²) dB.", ["I = " + f(I * 1e6) + " µW/m²", "L = " + f(L, 1) + " dB"], rel(20 * Math.log10(pe / Math.sqrt(413e-12)), L, 1e-9));
        }
        var pair = r.pick([[t("Wasser", "water"), 1.48e6, t("Stahl", "steel"), 45.7e6], [t("Luft", "air"), 413, t("Wasser", "water"), 1.48e6], [t("Wasser", "water"), 1.48e6, t("Aluminium", "aluminium"), 17.3e6], [t("Öl", "oil"), 1.3e6, t("Stahl", "steel"), 45.7e6]]), rr = Math.pow((pair[3] - pair[1]) / (pair[3] + pair[1]), 2), tr = (1 - rr) * 100;
        return Q(t("Schall trifft senkrecht von " + pair[0] + " (Z = " + f(pair[1] / 1e6) + " · 10⁶ kg/(m² s)) auf " + pair[2] + " (Z = " + f(pair[3] / 1e6) + " · 10⁶ kg/(m² s)). Wie viel Prozent der Intensität werden durchgelassen?", "Sound hits " + pair[2] + " (Z = " + f(pair[3] / 1e6) + " · 10⁶ kg/(m² s)) perpendicularly from " + pair[0] + " (Z = " + f(pair[1] / 1e6) + " · 10⁶ kg/(m² s)). What percentage of the intensity is transmitted?"),
            P(tr, "%"), "r = ((Z<sub>2</sub> − Z<sub>1</sub>)/(Z<sub>2</sub> + Z<sub>1</sub>))²,  τ = 1 − r.", ["r = " + f(rr), "τ = " + f(tr) + " %"], rel(tr / 100, 4 * pair[1] * pair[3] / Math.pow(pair[1] + pair[3], 2), 1e-9));
    });

    // =============== 7.3 Pegel ===============
    add(37, "pegel", "Pegeladdition und Abstandsgesetz", "Adding levels and distance law", function (r, d) {
        if (d === 1) {
            var N = r.int(2, 4), Ls = []; for (var i = 0; i < N; i += 1) Ls.push(r.int(55, 90));
            var Lg = 10 * Math.log10(Ls.reduce(function (s, x) { return s + Math.pow(10, x / 10); }, 0)), Imax = Math.max.apply(null, Ls);
            return Q(t("An einem Arbeitsplatz wirken " + N + " Schallquellen mit den Einzelpegeln " + Ls.join(" dB, ") + " dB. Wie groß ist der Gesamtpegel?", "At a workplace " + N + " sound sources act with individual levels of " + Ls.join(" dB, ") + " dB. What is the total level?"),
                A.num(Lg, { dec: 1, unit: "dB", tol: 0.15 }), t("Pegel nicht addieren, sondern die Intensitäten 10<sup>L/10</sup>.", "Do not add levels, add the intensities 10<sup>L/10</sup>."), ["L = 10 lg Σ 10<sup>L<sub>i</sub>/10</sup> = " + f(Lg, 1) + " dB"], Lg >= Imax && Lg <= Imax + 10 * Math.log10(N) + 1e-9);
        }
        if (d === 2) {
            var L1 = r.int(70, 110), r1 = r.pick([1, 2, 5]), r2 = r1 * r.pick([2, 4, 5, 10, 20]), L2 = L1 - 20 * Math.log10(r2 / r1);
            return Q(t("Eine punktförmige Schallquelle erzeugt im Freien in " + r1 + " m Abstand " + L1 + " dB. Welcher Pegel herrscht in " + r2 + " m Abstand?", "A point source in the open produces " + L1 + " dB at a distance of " + r1 + " m. Which level exists at " + r2 + " m?"),
                A.num(L2, { dec: 1, unit: "dB", tol: 0.15 }), t("Kugelwelle: I ∝ 1/r², also 6 dB weniger je Abstandsverdopplung.", "Spherical wave: I ∝ 1/r², so 6 dB less per doubling of distance."), ["ΔL = 20 lg(" + r2 + "/" + r1 + ") = " + f(L1 - L2, 1) + " dB", "L = " + f(L2, 1) + " dB"], rel(Math.pow(10, (L1 - L2) / 10), Math.pow(r2 / r1, 2), 1e-9));
        }
        var k = r.int(-9, 15); if (k === 0) k = 12;
        var fr = 440 * Math.pow(2, k / 12);
        return Q(t("In gleichstufiger Stimmung hat a' 440 Hz. Welche Frequenz hat der Ton " + Math.abs(k) + " Halbtöne " + (k > 0 ? "darüber" : "darunter") + "?", "In equal temperament a' is 440 Hz. What is the frequency of the note " + Math.abs(k) + " semitones " + (k > 0 ? "above" : "below") + "?"),
            A.num(fr, { dec: 2, unit: "Hz", tol: 0.05 }), t("Ein Halbton ist das Frequenzverhältnis 2<sup>1/12</sup>, eine Oktave 2.", "A semitone is the frequency ratio 2<sup>1/12</sup>, an octave is 2."), ["f = 440 Hz · 2<sup>" + k + "/12</sup> = " + f(fr, 2) + " Hz"], rel(Math.log2(fr / 440) * 12, k, 1e-9));
    });

    // =============== 7.4 technische Akustik ===============
    add(38, "raumakustik", "Nachhall, Schalldämmung, Ultraschallprüfung", "Reverberation, sound insulation, ultrasonic testing", function (r, d) {
        if (d === 1) {
            var Ll = r.pick([10, 15, 20, 25]), B = r.pick([8, 10, 12, 15]), Hh = r.pick([3, 4, 6, 7]), aW = r.pick([0.03, 0.05, 0.1]), aB = r.pick([0.1, 0.3, 0.5]), aD = r.pick([0.05, 0.2, 0.6]);
            var V = Ll * B * Hh, Aw = 2 * (Ll + B) * Hh * aW + Ll * B * aB + Ll * B * aD, T = 0.163 * V / Aw;
            return Q(t("Ein Raum (" + Ll + " m × " + B + " m × " + Hh + " m) hat Wände mit α = " + f(aW) + ", einen Boden mit α = " + f(aB) + " und eine Decke mit α = " + f(aD) + ". Wie groß ist die Nachhallzeit nach Sabine?", "A room (" + Ll + " m × " + B + " m × " + Hh + " m) has walls with α = " + f(aW) + ", a floor with α = " + f(aB) + " and a ceiling with α = " + f(aD) + ". What is the reverberation time by Sabine?"),
                P(T, "s"), "T = 0,163 s/m · V / A,  A = Σ α<sub>i</sub> S<sub>i</sub>.", ["V = " + V + " m³", "A = " + f(Aw) + " m²", "T = " + f(T) + " s"], rel(T * Aw, 0.163 * V, 1e-12));
        }
        if (d === 2) {
            var s = r.pick([4, 6, 8, 10, 12]), rho = r.pick([2500, 2300, 7850]), fr = r.pick([250, 500, 1000, 2000]), mpp = rho * s / 1000, Rr = 20 * Math.log10(mpp * fr) - 47;
            return Q(t("Eine einschalige Platte (Dicke " + s + " mm, ρ = " + rho + " kg/m³) soll schalltechnisch abgeschätzt werden. Wie groß sind ihre flächenbezogene Masse und das Schalldämmmaß bei " + fr + " Hz nach dem Massengesetz?", "A single-leaf panel (thickness " + s + " mm, ρ = " + rho + " kg/m³) is to be assessed acoustically. Find its mass per area and the sound reduction index at " + fr + " Hz by the mass law."),
                A.multi([{ l: "m'' in kg/m²", a: P(mpp) }, { l: "R in dB", a: A.num(Rr, { dec: 1, unit: "dB", tol: 0.15 }) }]), "R = 20 lg(m'' f) − 47 dB (m'' in kg/m², f in Hz).", ["m'' = ρ s = " + f(mpp) + " kg/m²", "R = " + f(Rr, 1) + " dB"], rel(Math.pow(10, (Rr + 47) / 20), mpp * fr, 1e-9));
        }
        var mat = r.pick([[t("Stahl", "steel"), 5920], [t("Aluminium", "aluminium"), 6320], [t("Kupfer", "copper"), 4660]]), dd = r.pick([20, 35, 50, 80, 120]), tt = 2 * dd / 1000 / mat[1] * 1e6;
        return Q(t("Bei der Ultraschallprüfung eines Werkstücks aus " + mat[0] + " (c = " + mat[1] + " m/s) kommt ein Echo von einer Fehlstelle " + f(tt) + " µs nach dem Sendeimpuls zurück. In welcher Tiefe liegt der Fehler?", "In ultrasonic testing of a " + mat[0] + " workpiece (c = " + mat[1] + " m/s) an echo from a flaw returns " + f(tt) + " µs after the transmitted pulse. At which depth is the flaw?"),
            P(dd, "mm"), t("Der Schall läuft hin und zurück: s = c t / 2.", "The sound travels there and back: s = c t / 2."), ["s = " + mat[1] + " m/s · " + f(tt) + " µs / 2 = " + f(dd) + " mm"], rel(mat[1] * tt / 2 / 1000, dd, 1e-9));
    });
})(typeof window !== "undefined" ? window : globalThis);
