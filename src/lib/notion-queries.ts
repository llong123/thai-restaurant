import { notion, DATABASE_ID } from "./notion";

// Get one page of results (max page_size 100)
export async function queryDatabaseOnce(start_cursor?: string) {
  return notion.databases.query({
    database_id: DATABASE_ID,
    page_size: 100,
    start_cursor,
  });
}

// Fetch all pages (concatenate results)
export async function getAllDatabaseItems() {
  let all: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const resp = await queryDatabaseOnce(cursor);
    all = all.concat(resp.results);
    cursor = resp.has_more ? (resp.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return all;
}
