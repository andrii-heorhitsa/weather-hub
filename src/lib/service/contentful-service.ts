import { HeaderContent } from "@/types/contentful";

const BASE_URL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`;

type ContentfulEntryDto = {
  fields: {
    siteTitle: string;
    tagline?: string;
  };
};

export function mapEntryDtoToDomain(dto: ContentfulEntryDto): HeaderContent {
  return {
    siteTitle: dto.fields.siteTitle,
    tagline: dto.fields.tagline,
  };
}

export async function getHeaderContent(): Promise<HeaderContent | null> {
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("CONTENTFUL_ACCESS_TOKEN is not set");
  }

  const params = new URLSearchParams({
    content_type: "header",
    access_token: accessToken,
  });

  const result = await fetch(`${BASE_URL}?${params.toString()}`, {
    next: { revalidate: 0 },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch header content: ${result.status}`);
  }

  const rawData: { items?: ContentfulEntryDto[] } = await result.json();
  const items = rawData.items ?? [];

  return items.length > 0 ? mapEntryDtoToDomain(items[0]) : null;
}
