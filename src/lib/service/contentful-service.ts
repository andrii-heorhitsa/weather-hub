import { HeaderContent, FooterContent } from "@/types/contentful";

const BASE_URL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`;

async function fetchContentfulEntries<TDto>(
  contentType: string,
): Promise<TDto[]> {
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("CONTENTFUL_ACCESS_TOKEN is not set");
  }

  const params = new URLSearchParams({
    content_type: contentType,
    access_token: accessToken,
  });

  const result = await fetch(`${BASE_URL}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch ${contentType} content: ${result.status}`);
  }

  const rawData: { items?: { fields: TDto }[] } = await result.json();
  return (rawData.items ?? []).map((item) => item.fields);
}

// --- Header ---

type HeaderDto = {
  siteTitle: string;
  tagline?: string;
};

function mapHeaderDtoToDomain(dto: HeaderDto): HeaderContent {
  return {
    siteTitle: dto.siteTitle,
    tagline: dto.tagline,
  };
}

export async function getHeaderContent(): Promise<HeaderContent | null> {
  const items = await fetchContentfulEntries<HeaderDto>("header");
  return items.length > 0 ? mapHeaderDtoToDomain(items[0]) : null;
}

// --- Footer ---

type FooterDto = {
  copyrightText: string;
  footerNote?: string;
};

function mapFooterDtoToDomain(dto: FooterDto): FooterContent {
  return {
    copyrightText: dto.copyrightText,
    footerNote: dto.footerNote,
  };
}

export async function getFooterContent(): Promise<FooterContent | null> {
  const items = await fetchContentfulEntries<FooterDto>("footer");
  return items.length > 0 ? mapFooterDtoToDomain(items[0]) : null;
}
