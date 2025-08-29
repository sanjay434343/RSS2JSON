export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <html>
      <head>
        <title>RSS → JSON API</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background:#f9f9f9; }
          code { background:#eee; padding:3px 6px; border-radius:4px; }
          h1 { color:#333; }
        </style>
      </head>
      <body>
        <h1>📡 RSS to JSON API</h1>
        <p>This API converts any RSS feed into JSON format.</p>
        
        <h2>Endpoints</h2>
        <ul>
          <li><code>/api/rss?url=RSS_FEED_URL</code> → Get JSON response</li>
        </ul>
        
        <h2>Example</h2>
        <p>
          <code>/api/rss?url=https://feeds.bbci.co.uk/news/rss.xml</code>
        </p>
        
        <h2>Response</h2>
        <pre>{
  "success": true,
  "feed": {
    "title": "...",
    "description": "...",
    "link": "...",
    "totalItems": 50
  },
  "items": [
    {
      "sno": 1,
      "title": "...",
      "link": "...",
      "pubDate": "...",
      "author": "...",
      "categories": [...],
      "description": "...",
      "content": "...",
      "thumbnail": "..."
    }
  ]
}</pre>
      </body>
    </html>
  `);
}
