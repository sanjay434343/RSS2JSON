import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media", { keepArray: true }],
      ["media:thumbnail", "thumbnail"],
      ["description", "description"],
      ["content:encoded", "content"]
    ]
  }
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide an RSS feed URL ?url=https://..."
    });
  }

  try {
    const feed = await parser.parseURL(url);

    const items = feed.items.map((item, index) => ({
      sno: index + 1,
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      author: item.creator || item.author || "",
      categories: item.categories || [],
      description: item.description || "",
      content: item.content || "",
      thumbnail: item.thumbnail || (item.media && item.media[0]?.$.url) || "",
    }));

    res.status(200).json({
      success: true,
      feed: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        lastBuildDate: feed.lastBuildDate,
        totalItems: items.length
      },
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch or parse RSS feed",
      error: error.message
    });
  }
}
