/*
 * Städte für die freiwillige Ortsangabe und die Weltkugel (welt.html).
 * Format je Eintrag: "id|Name|Breite|Länge|Land". Gespeichert wird nur die id.
 * Kleinere Orte wählen die nächstgelegene Stadt oder nur das Land (id "land-xx").
 */
(function (root) {
    "use strict";
    var RAW = [
        "berlin|Berlin|52.52|13.40|DE", "hamburg|Hamburg|53.55|9.99|DE", "muenchen|München|48.14|11.58|DE", "koeln|Köln|50.94|6.96|DE", "frankfurt|Frankfurt am Main|50.11|8.68|DE",
        "stuttgart|Stuttgart|48.78|9.18|DE", "duesseldorf|Düsseldorf|51.23|6.78|DE", "leipzig|Leipzig|51.34|12.37|DE", "dortmund|Dortmund|51.51|7.47|DE", "essen|Essen|51.46|7.01|DE",
        "bremen|Bremen|53.08|8.80|DE", "dresden|Dresden|51.05|13.74|DE", "hannover|Hannover|52.37|9.73|DE", "nuernberg|Nürnberg|49.45|11.08|DE", "duisburg|Duisburg|51.43|6.76|DE",
        "bochum|Bochum|51.48|7.22|DE", "wuppertal|Wuppertal|51.26|7.15|DE", "bielefeld|Bielefeld|52.02|8.53|DE", "bonn|Bonn|50.74|7.10|DE", "muenster|Münster|51.96|7.63|DE",
        "mannheim|Mannheim|49.49|8.47|DE", "karlsruhe|Karlsruhe|49.01|8.40|DE", "augsburg|Augsburg|48.37|10.90|DE", "wiesbaden|Wiesbaden|50.08|8.24|DE", "kiel|Kiel|54.32|10.14|DE",
        "aachen|Aachen|50.78|6.08|DE", "freiburg|Freiburg im Breisgau|47.99|7.84|DE", "mainz|Mainz|50.00|8.27|DE", "rostock|Rostock|54.09|12.10|DE", "kassel|Kassel|51.31|9.48|DE",
        "magdeburg|Magdeburg|52.13|11.63|DE", "erfurt|Erfurt|50.98|11.03|DE", "halle|Halle (Saale)|51.48|11.97|DE", "luebeck|Lübeck|53.87|10.69|DE", "oldenburg|Oldenburg|53.14|8.21|DE",
        "osnabrueck|Osnabrück|52.28|8.05|DE", "heidelberg|Heidelberg|49.40|8.69|DE", "darmstadt|Darmstadt|49.87|8.65|DE", "regensburg|Regensburg|49.01|12.10|DE", "ingolstadt|Ingolstadt|48.77|11.43|DE",
        "wuerzburg|Würzburg|49.79|9.95|DE", "ulm|Ulm|48.40|9.99|DE", "saarbruecken|Saarbrücken|49.24|6.99|DE", "potsdam|Potsdam|52.39|13.06|DE", "goettingen|Göttingen|51.54|9.93|DE",
        "trier|Trier|49.75|6.64|DE", "jena|Jena|50.93|11.59|DE", "chemnitz|Chemnitz|50.83|12.92|DE", "braunschweig|Braunschweig|52.27|10.52|DE", "schwerin|Schwerin|53.63|11.41|DE",
        "passau|Passau|48.57|13.43|DE", "landshut|Landshut|48.54|12.15|DE", "rosenheim|Rosenheim|47.86|12.12|DE", "bamberg|Bamberg|49.89|10.89|DE", "bayreuth|Bayreuth|49.94|11.58|DE",
        "kempten|Kempten|47.73|10.31|DE", "erlangen|Erlangen|49.60|11.00|DE", "fuerth|Fürth|49.48|10.99|DE", "freising|Freising|48.40|11.75|DE", "garching|Garching|48.25|11.65|DE",
        "wien|Wien|48.21|16.37|AT", "graz|Graz|47.07|15.44|AT", "linz|Linz|48.31|14.29|AT", "salzburg|Salzburg|47.80|13.04|AT", "innsbruck|Innsbruck|47.27|11.40|AT",
        "zuerich|Zürich|47.38|8.54|CH", "bern|Bern|46.95|7.45|CH", "basel|Basel|47.56|7.59|CH", "genf|Genf|46.20|6.14|CH", "luxemburg|Luxemburg|49.61|6.13|LU",
        "amsterdam|Amsterdam|52.37|4.90|NL", "bruessel|Brüssel|50.85|4.35|BE", "paris|Paris|48.86|2.35|FR", "lyon|Lyon|45.76|4.84|FR", "london|London|51.51|-0.13|GB",
        "dublin|Dublin|53.35|-6.26|IE", "edinburgh|Edinburgh|55.95|-3.19|GB", "kopenhagen|Kopenhagen|55.68|12.57|DK", "oslo|Oslo|59.91|10.75|NO", "stockholm|Stockholm|59.33|18.07|SE",
        "helsinki|Helsinki|60.17|24.94|FI", "warschau|Warschau|52.23|21.01|PL", "krakau|Krakau|50.06|19.94|PL", "prag|Prag|50.08|14.44|CZ", "budapest|Budapest|47.50|19.04|HU",
        "bratislava|Bratislava|48.15|17.11|SK", "ljubljana|Ljubljana|46.06|14.51|SI", "zagreb|Zagreb|45.82|15.98|HR", "belgrad|Belgrad|44.79|20.45|RS", "bukarest|Bukarest|44.43|26.10|RO",
        "sofia|Sofia|42.70|23.32|BG", "athen|Athen|37.98|23.73|GR", "istanbul|Istanbul|41.01|28.98|TR", "ankara|Ankara|39.93|32.86|TR", "rom|Rom|41.90|12.50|IT",
        "mailand|Mailand|45.46|9.19|IT", "madrid|Madrid|40.42|-3.70|ES", "barcelona|Barcelona|41.39|2.17|ES", "lissabon|Lissabon|38.72|-9.14|PT", "porto|Porto|41.15|-8.61|PT",
        "kiew|Kiew|50.45|30.52|UA", "vilnius|Vilnius|54.69|25.28|LT", "riga|Riga|56.95|24.11|LV", "tallinn|Tallinn|59.44|24.75|EE", "reykjavik|Reykjavík|64.15|-21.94|IS",
        "newyork|New York|40.71|-74.01|US", "boston|Boston|42.36|-71.06|US", "chicago|Chicago|41.88|-87.63|US", "sanfrancisco|San Francisco|37.77|-122.42|US", "losangeles|Los Angeles|34.05|-118.24|US",
        "toronto|Toronto|43.65|-79.38|CA", "montreal|Montréal|45.50|-73.57|CA", "vancouver|Vancouver|49.28|-123.12|CA", "mexiko|Mexiko-Stadt|19.43|-99.13|MX", "bogota|Bogotá|4.71|-74.07|CO",
        "lima|Lima|-12.05|-77.04|PE", "santiago|Santiago de Chile|-33.45|-70.67|CL", "buenosaires|Buenos Aires|-34.60|-58.38|AR", "saopaulo|São Paulo|-23.55|-46.63|BR", "rio|Rio de Janeiro|-22.91|-43.17|BR",
        "kairo|Kairo|30.04|31.24|EG", "lagos|Lagos|6.52|3.38|NG", "nairobi|Nairobi|-1.29|36.82|KE", "kapstadt|Kapstadt|-33.92|18.42|ZA", "johannesburg|Johannesburg|-26.20|28.05|ZA",
        "casablanca|Casablanca|33.57|-7.59|MA", "accra|Accra|5.60|-0.19|GH", "addisabeba|Addis Abeba|9.03|38.74|ET", "telaviv|Tel Aviv|32.09|34.78|IL", "dubai|Dubai|25.20|55.27|AE",
        "teheran|Teheran|35.69|51.39|IR", "delhi|Delhi|28.61|77.21|IN", "mumbai|Mumbai|19.08|72.88|IN", "bangalore|Bengaluru|12.97|77.59|IN", "singapur|Singapur|1.35|103.82|SG",
        "bangkok|Bangkok|13.76|100.50|TH", "jakarta|Jakarta|-6.21|106.85|ID", "manila|Manila|14.60|120.98|PH", "hongkong|Hongkong|22.32|114.17|HK", "shanghai|Shanghai|31.23|121.47|CN",
        "peking|Peking|39.90|116.41|CN", "seoul|Seoul|37.57|126.98|KR", "tokio|Tokio|35.68|139.69|JP", "osaka|Osaka|34.69|135.50|JP", "taipeh|Taipeh|25.03|121.57|TW",
        "sydney|Sydney|-33.87|151.21|AU", "melbourne|Melbourne|-37.81|144.96|AU", "auckland|Auckland|-36.85|174.76|NZ"
    ];
    var COUNTRIES = { DE: [51.2, 10.4, "Deutschland", "Germany"], AT: [47.6, 14.1, "Österreich", "Austria"], CH: [46.8, 8.2, "Schweiz", "Switzerland"], OTHER: [0, 0, "anderes Land", "other country"] };
    var list = RAW.map(function (s) { var p = s.split("|"); return { id: p[0], name: p[1], lat: +p[2], lon: +p[3], cc: p[4] }; });
    Object.keys(COUNTRIES).forEach(function (cc) { if (cc === "OTHER") return; var c = COUNTRIES[cc]; list.push({ id: "land-" + cc.toLowerCase(), name: (root.$t ? root.$t(c[2], c[3]) : c[2]) + (root.$t ? root.$t(" (nur Land)", " (country only)") : " (nur Land)"), lat: c[0], lon: c[1], cc: cc }); });
    var byId = {}; list.forEach(function (c) { byId[c.id] = c; });
    var api = { list: list, get: function (id) { return byId[id] || null; } };
    root.SOR_CITIES = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
