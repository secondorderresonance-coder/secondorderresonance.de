/*
 * Verbindung zu Supabase (dauerhafte Konten, Fortschritt, Weltkugel).
 * Leer lassen = alles bleibt wie bisher nur im Browser.
 * url: Project URL, zum Beispiel "https://abcdefgh.supabase.co"
 * key: der öffentliche Schlüssel ("anon public" oder "publishable", beginnt mit "eyJ" oder "sb_publishable_").
 *      Dieser Schlüssel darf öffentlich im Code stehen, die Daten schützt die Row Level Security in supabase/setup.sql.
 *      Den "service_role"- oder "secret"-Schlüssel NIE hier eintragen.
 */
window.SOR_CLOUD_CONFIG = { url: "", key: "" };
