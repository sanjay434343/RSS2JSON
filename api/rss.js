import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  const { rss_url } = req.query;

  if (!rss_url) {
    return res.status(400).json({ error: "rss_url parameter required" });
  }

  try {
    const feed = await parser.parseURL(rss_url);

    res.status(200).json({
      status: "ok",
      feed: {
        title: feed.title,
        link: feed.link,
        description: feed.description,
      },
      items: feed.items.map(item => ({
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        author: item.creator || item.author || "",
        categories: item.categories || [],
        content: item.content || "",
        contentSnippet: item.contentSnippet || "",
        guid: item.guid || "",
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS", details: error.message });
  }
}
