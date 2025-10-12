export function getTitle(prop: any) {
  return prop?.title?.[0]?.plain_text ?? "";
}
export function getRichText(prop: any) {
  return prop?.rich_text?.map((t: any) => t.plain_text).join("") ?? "";
}
export function getNumber(prop: any) {
  return typeof prop?.number === "number" ? prop.number : null;
}
export function getCheckbox(prop: any) {
  return prop?.checkbox ?? false;
}
export function getSelect(prop: any) {
  return prop?.select?.name ?? null;
}
export function getMultiSelect(prop: any) {
  return prop?.multi_select?.map((m: any) => m.name) ?? [];
}
export function getDate(prop: any) {
  return prop?.date?.start ?? null;
}

export function parsePage(page: any) {
  const p = page.properties;
  return {
    id: page.id,
    name: getTitle(p.Name),
    description: getRichText(p.Description),
    date: getDate(p.Date),
    price: getNumber(p.Price),
    tags: getMultiSelect(p.Tags),
    raw: page,
  };
}
