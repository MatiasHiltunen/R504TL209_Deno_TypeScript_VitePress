-- SELECT valitsee luettavat sarakkeet, jotta tulosteessa näkyvät tunniste, teksti ja luontihetki.
SELECT id, label, created_at
-- FROM kertoo, mistä taulusta rivit luetaan.
FROM lab_notes
-- ORDER BY näyttää rivit aina tunnisteen mukaisessa nousevassa järjestyksessä.
ORDER BY id;
