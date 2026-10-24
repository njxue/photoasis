-- Add the nullable column first so existing albums can be backfilled.
ALTER TABLE "Album" ADD COLUMN "slug" TEXT;

UPDATE "Album"
SET "slug" = COALESCE(
  NULLIF(
    TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(TRIM("name")), '[^[:alnum:]]+', '-', 'g')),
    ''
  ),
  'album'
);

-- Existing same-user names that normalize to the same slug must be resolved
-- rather than silently changing their URLs.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "Album"
    GROUP BY "uid", "slug"
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'Duplicate album names exist for one or more users; rename them before applying this migration.';
  END IF;
END $$;

ALTER TABLE "Album" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Album_uid_slug_key" ON "Album"("uid", "slug");
