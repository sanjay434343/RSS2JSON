import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "thumbnail"],
      ["media:content", "mediaContent"],
      ["image", "image"]
    ]
  }
});

export default async function handler(req, res) {
  const { rss_url, count } = req.query;

  if (!rss_url) {
    return res.status(400).json({ error: "rss_url parameter required" });
  }

  try {
    const feed = await parser.parseURL(rss_url);

    // limit results if count is passed
    let items = feed.items;
    if (count) {
      const limit = parseInt(count, 10);
      if (!isNaN(limit)) {
        items = items.slice(0, limit);
      }
    }

    res.status(200).json({
      status: "ok",
      total: items.length, // 👈 total news count
      feed: {
        title: feed.title,
        link: feed.link,
        description: feed.description,
      },
      items: items.map(item => {
        // try to detect a thumbnail image
        let thumbnail =
          item.thumbnail ||
          (item.enclosure && item.enclosure.url) ||
          (item.mediaContent && item.mediaContent.url) ||
          "";

        return {
          title: item.title || "",
          link: item.link || "",
          pubDate: item.pubDate || "",
          author: item.creator || item.author || "",
          categories: item.categories || [],
          content: item["content:encoded"] || item.content || "", // 👈 exact content
          thumbnail: thumbnail, // 👈 image/thumbnail
          guid: item.guid || ""
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS", details: error.message });
  }
}
