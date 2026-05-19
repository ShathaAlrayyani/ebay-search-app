import { getEbayToken } from "@/app/lib/ebay";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const token = await getEbayToken();

  const res = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=12`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  const simplified = data.itemSummaries?.map((item: any) => ({
    id: item.itemId,
    title: item.title,
    price: item.price?.value,
    image: item.image?.imageUrl,
    condition: item.condition,
    link: item.itemWebUrl,
  }));

  return NextResponse.json(simplified || []);
}