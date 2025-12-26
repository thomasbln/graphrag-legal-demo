# Supabase Import Scripts

## Setup

### 1. Supabase Schema erstellen

1. Öffne Supabase Dashboard: https://supabase.com/dashboard
2. Wähle dein Projekt
3. Gehe zu **SQL Editor** (linkes Menü)
4. Kopiere den Inhalt von `supabase-schema.sql`
5. Führe das SQL aus (Run Button)

### 2. Environment Variables prüfen

Stelle sicher, dass `.env.local` folgende Variablen enthält:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xwlrmfytvrznnfgrhbmz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-proj-p_xxxxxxxxx
NEO4J_URI=neo4j+s://...
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=...
```

### 3. Import ausführen

```bash
npm run import:supabase
```

Das Script importiert zunächst 5 Contracts zum Testen (LIMIT 5).

### 4. Vollständiger Import

Nach erfolgreichem Test, entferne `LIMIT 5` in `import-neo4j-to-supabase.ts`:

```typescript
// Ändere diese Zeile:
LIMIT 5

// Zu:
// LIMIT entfernen für alle 415 Contracts
```

Dann erneut ausführen:

```bash
npm run import:supabase
```

## Troubleshooting

### "Missing Supabase credentials"
- Prüfe `.env.local` Datei
- Stelle sicher, dass `SUPABASE_SERVICE_ROLE_KEY` gesetzt ist

### "Missing OPENAI_API_KEY"
- Prüfe `.env.local` Datei
- Stelle sicher, dass `OPENAI_API_KEY` gesetzt ist

### "Neo4j connection error"
- Prüfe Neo4j Credentials in `.env.local`
- Warte 30s wenn Neo4j Aura pausiert war

### "Table does not exist"
- Führe `supabase-schema.sql` im Supabase SQL Editor aus
