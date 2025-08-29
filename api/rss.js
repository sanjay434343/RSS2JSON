import Parser from "rss-parser";

// Advanced parser with comprehensive field extraction
const parser = new Parser({
  customFields: {
    feed: [
      ['language', 'language'],
      ['copyright', 'copyright'],
      ['managingEditor', 'managingEditor'],
      ['webMaster', 'webMaster'],
      ['generator', 'generator'],
      ['docs', 'docs'],
      ['cloud', 'cloud'],
      ['ttl', 'ttl'],
      ['rating', 'rating'],
      ['skipHours', 'skipHours'],
      ['skipDays', 'skipDays'],
      ['image', 'feedImage'],
      ['itunes:author', 'itunesAuthor'],
      ['itunes:summary', 'itunesSummary'],
      ['itunes:image', 'itunesImage']
    ],
    item: [
      // Content fields
      ["content:encoded", "contentEncoded"],
      ["description", "description"],
      ["summary", "summary"],
      ["content", "content"],
      
      // Media fields
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
      ["media:group", "mediaGroup"],
      ["media:description", "mediaDescription"],
      ["media:title", "mediaTitle"],
      ["enclosure", "enclosure"],
      
      // Image fields
      ["image", "image"],
      ["thumbnail", "thumbnail"],
      ["featuredImage", "featuredImage"],
      ["og:image", "ogImage"],
      ["twitter:image", "twitterImage"],
      
      // Author fields
      ["author", "author"],
      ["creator", "creator"],
      ["dc:creator", "dcCreator"],
      ["managingEditor", "managingEditor"],
      ["webMaster", "webMaster"],
      ["itunes:author", "itunesAuthor"],
      ["by", "by"],
      ["source", "source"],
      
      // Date fields
      ["pubDate", "pubDate"],
      ["published", "published"],
      ["updated", "updated"],
      ["lastBuildDate", "lastBuildDate"],
      ["date", "date"],
      
      // Category and tag fields
      ["category", "category", { keepArray: true }],
      ["categories", "categories", { keepArray: true }],
      ["tags", "tags", { keepArray: true }],
      ["keywords", "keywords"],
      ["subject", "subject"],
      
      // Additional metadata
      ["guid", "guid"],
      ["id", "id"],
      ["comments", "comments"],
      ["commentsCount", "commentsCount"],
      ["wfw:commentRss", "commentRss"],
      ["slash:comments", "slashComments"],
      
      // Social and sharing
      ["social:shares", "socialShares"],
      ["social:likes", "socialLikes"],
      ["social:comments", "socialComments"],
      
      // Custom fields for different platforms
      ["excerpt:encoded", "excerpt"],
      ["wp:post_id", "wpPostId"],
      ["wp:post_date", "wpPostDate"],
      ["wp:post_type", "wpPostType"],
      ["wp:status", "wpStatus"],
      ["wp:comment_status", "wpCommentStatus"],
      
      // iTunes podcast fields
      ["itunes:duration", "itunesDuration"],
      ["itunes:subtitle", "itunesSubtitle"],
      ["itunes:summary", "itunesSummary"],
      ["itunes:keywords", "itunesKeywords"],
      ["itunes:episode", "itunesEpisode"],
      ["itunes:season", "itunesSeason"]
    ]
  }
});

// Extract image from various sources
function extractImages(item) {
  const images = [];
  
  // Try different image sources
  const imageSources = [
    item.thumbnail,
    item.mediaThumbnail,
    item.mediaContent,
    item.image,
    item.featuredImage,
    item.ogImage,
    item.twitterImage,
    item.enclosure
  ];
  
  // Extract from media content
  if (item.mediaContent && Array.isArray(item.mediaContent)) {
    item.mediaContent.forEach(media => {
      if (media && media.$ && media.$.url) {
        const mediaType = media.$.type || '';
        if (mediaType.startsWith('image/') || media.$.medium === 'image') {
          images.push({
            url: media.$.url,
            type: 'media:content',
            width: media.$.width || null,
            height: media.$.height || null,
            size: media.$.fileSize || null
          });
        }
      }
    });
  }
  
  // Extract from media thumbnail
  if (item.mediaThumbnail) {
    const thumbnails = Array.isArray(item.mediaThumbnail) ? item.mediaThumbnail : [item.mediaThumbnail];
    thumbnails.forEach(thumb => {
      if (thumb && thumb.$ && thumb.$.url) {
        images.push({
          url: thumb.$.url,
          type: 'media:thumbnail',
          width: thumb.$.width || null,
          height: thumb.$.height || null
        });
      }
    });
  }
  
  // Extract from enclosure
  if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    images.push({
      url: item.enclosure.url,
      type: 'enclosure',
      size: item.enclosure.length || null
    });
  }
  
  // Extract from simple fields
  [item.thumbnail, item.image, item.featuredImage, item.ogImage, item.twitterImage].forEach((imgUrl, index) => {
    if (imgUrl && typeof imgUrl === 'string') {
      const types = ['thumbnail', 'image', 'featuredImage', 'og:image', 'twitter:image'];
      images.push({
        url: imgUrl,
        type: types[index]
      });
    }
  });
  
  // Extract images from content
  const contentSources = [item.contentEncoded, item.content, item.description];
  contentSources.forEach(content => {
    if (content && typeof content === 'string') {
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        images.push({
          url: match[1],
          type: 'content-extracted'
        });
      }
    }
  });
  
  // Remove duplicates and return
  const uniqueImages = [];
  const seenUrls = new Set();
  
  images.forEach(img => {
    if (img.url && !seenUrls.has(img.url)) {
      seenUrls.add(img.url);
      uniqueImages.push(img);
    }
  });
  
  return uniqueImages;
}

// Extract author information
function extractAuthor(item) {
  const authors = [];
  
  const authorSources = [
    { value: item.creator, type: 'creator' },
    { value: item.author, type: 'author' },
    { value: item.dcCreator, type: 'dc:creator' },
    { value: item.managingEditor, type: 'managingEditor' },
    { value: item.itunesAuthor, type: 'itunes:author' },
    { value: item.by, type: 'by' },
    { value: item.source, type: 'source' }
  ];
  
  authorSources.forEach(source => {
    if (source.value && typeof source.value === 'string') {
      // Clean email addresses from author names
      const cleanAuthor = source.value.replace(/\s*\([^)]*\)\s*/, '').replace(/\s*<[^>]*>\s*/, '').trim();
      if (cleanAuthor && !authors.some(a => a.name === cleanAuthor)) {
        authors.push({
          name: cleanAuthor,
          type: source.type,
          raw: source.value
        });
      }
    }
  });
  
  return authors;
}

// Extract and clean content
function extractContent(item) {
  const contentSources = [
    { value: item.contentEncoded, type: 'content:encoded', priority: 1 },
    { value: item.content, type: 'content', priority: 2 },
    { value: item.summary, type: 'summary', priority: 3 },
    { value: item.description, type: 'description', priority: 4 }
  ];
  
  const contents = contentSources
    .filter(c => c.value && typeof c.value === 'string' && c.value.trim())
    .sort((a, b) => a.priority - b.priority)
    .map(c => ({
      text: c.value.replace(/<[^>]*>/g, '').trim(),
      html: c.value,
      type: c.type,
      length: c.value.replace(/<[^>]*>/g, '').trim().length
    }));
  
  return contents;
}

// Extract categories and tags
function extractCategories(item) {
  const categories = new Set();
  
  // Extract from different category fields
  [item.categories, item.category, item.tags].forEach(catSource => {
    if (Array.isArray(catSource)) {
      catSource.forEach(cat => {
        if (typeof cat === 'string') {
          categories.add(cat.trim());
        } else if (cat && cat._) {
          categories.add(cat._.trim());
        }
      });
    } else if (typeof catSource === 'string') {
      // Split comma-separated categories
      catSource.split(',').forEach(cat => {
        categories.add(cat.trim());
      });
    }
  });
  
  // Extract from keywords
  if (item.keywords) {
    item.keywords.split(',').forEach(keyword => {
      categories.add(keyword.trim());
    });
  }
  
  return Array.from(categories).filter(cat => cat.length > 0);
}

// Parse and normalize dates
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  try {
    const date = new Date(dateStr);
    return {
      iso: date.toISOString(),
      unix: date.getTime(),
      formatted: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      relative: getRelativeTime(date)
    };
  } catch (error) {
    return { raw: dateStr, error: 'Invalid date format' };
  }
}

// Get relative time string
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { url, sort, limit, offset } = req.query;
  
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide an RSS feed URL using ?url=https://...",
      example: "/api/rss?url=https://feeds.bbci.co.uk/news/rss.xml&sort=date&limit=10"
    });
  }

  try {
    console.log(`Fetching RSS feed: ${url}`);
    const feed = await parser.parseURL(url);
    
    // Process items with advanced data extraction
    let items = feed.items.map((item, index) => {
      const images = extractImages(item);
      const authors = extractAuthor(item);
      const contents = extractContent(item);
      const categories = extractCategories(item);
      
      // Get the best date available
      const dates = [item.pubDate, item.published, item.updated, item.date].filter(Boolean);
      const bestDate = dates[0];
      
      return {
        sno: index + 1,
        id: item.guid || item.id || item.link || `item-${index + 1}`,
        
        // Basic info
        title: item.title || "Untitled",
        link: item.link || "",
        
        // Dates
        pubDate: parseDate(bestDate),
        dates: {
          published: parseDate(item.pubDate || item.published),
          updated: parseDate(item.updated),
          lastBuild: parseDate(item.lastBuildDate)
        },
        
        // Authors
        authors: authors,
        primaryAuthor: authors.length > 0 ? authors[0].name : "Unknown",
        
        // Content
        contents: contents,
        description: contents.find(c => c.type === 'description')?.text || "",
        summary: contents.find(c => c.type === 'summary')?.text || "",
        fullContent: contents.find(c => c.type === 'content:encoded')?.html || 
                    contents.find(c => c.type === 'content')?.html || "",
        
        // Images
        images: images,
        thumbnail: images.length > 0 ? images[0].url : "",
        allThumbnails: images.map(img => img.url),
        
        // Categories and tags
        categories: categories,
        primaryCategory: categories.length > 0 ? categories[0] : "",
        
        // Metadata
        comments: item.comments || "",
        commentsCount: parseInt(item.commentsCount || item.slashComments || "0"),
        
        // Social metrics (if available)
        social: {
          shares: parseInt(item.socialShares || "0"),
          likes: parseInt(item.socialLikes || "0"),
          comments: parseInt(item.socialComments || "0")
        },
        
        // Media info
        enclosure: item.enclosure || null,
        mediaType: item.enclosure?.type || "text",
        
        // Podcast specific (if applicable)
        podcast: {
          duration: item.itunesDuration || "",
          episode: item.itunesEpisode || "",
          season: item.itunesSeason || "",
          subtitle: item.itunesSubtitle || ""
        },
        
        // WordPress specific (if applicable)
        wordpress: {
          postId: item.wpPostId || "",
          postType: item.wpPostType || "",
          status: item.wpStatus || ""
        },
        
        // Content metrics
        metrics: {
          contentLength: contents.reduce((max, c) => Math.max(max, c.length), 0),
          imageCount: images.length,
          categoryCount: categories.length,
          authorCount: authors.length
        }
      };
    });
    
    // Apply sorting
    if (sort) {
      switch (sort.toLowerCase()) {
        case 'date':
        case 'newest':
          items.sort((a, b) => {
            const dateA = a.pubDate?.unix || 0;
            const dateB = b.pubDate?.unix || 0;
            return dateB - dateA; // Newest first
          });
          break;
        case 'oldest':
          items.sort((a, b) => {
            const dateA = a.pubDate?.unix || 0;
            const dateB = b.pubDate?.unix || 0;
            return dateA - dateB; // Oldest first
          });
          break;
        case 'title':
          items.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          items.sort((a, b) => a.primaryAuthor.localeCompare(b.primaryAuthor));
          break;
        case 'category':
          items.sort((a, b) => a.primaryCategory.localeCompare(b.primaryCategory));
          break;
        case 'content-length':
          items.sort((a, b) => b.metrics.contentLength - a.metrics.contentLength);
          break;
        case 'images':
          items.sort((a, b) => b.metrics.imageCount - a.metrics.imageCount);
          break;
        case 'comments':
          items.sort((a, b) => b.commentsCount - a.commentsCount);
          break;
      }
    }
    
    // Apply pagination
    const startIndex = parseInt(offset || "0");
    const maxItems = parseInt(limit || "0");
    const totalItems = items.length;
    
    if (maxItems > 0) {
      items = items.slice(startIndex, startIndex + maxItems);
    } else if (startIndex > 0) {
      items = items.slice(startIndex);
    }
    
    // Enhanced feed metadata
    const feedMetadata = {
      title: feed.title || "Untitled Feed",
      description: feed.description || "",
      link: feed.link || "",
      language: feed.language || "en",
      lastBuildDate: parseDate(feed.lastBuildDate),
      generator: feed.generator || "",
      copyright: feed.copyright || "",
      managingEditor: feed.managingEditor || "",
      webMaster: feed.webMaster || "",
      
      // Feed statistics
      stats: {
        totalItems: totalItems,
        returnedItems: items.length,
        offset: startIndex,
        limit: maxItems || totalItems,
        hasMore: startIndex + items.length < totalItems,
        
        // Content analysis
        avgContentLength: Math.round(
          items.reduce((sum, item) => sum + item.metrics.contentLength, 0) / items.length
        ),
        totalImages: items.reduce((sum, item) => sum + item.metrics.imageCount, 0),
        uniqueAuthors: new Set(items.map(item => item.primaryAuthor)).size,
        uniqueCategories: new Set(items.flatMap(item => item.categories)).size,
        
        // Date range
        dateRange: {
          oldest: items.length > 0 ? Math.min(...items.map(item => item.pubDate?.unix || 0)) : null,
          newest: items.length > 0 ? Math.max(...items.map(item => item.pubDate?.unix || 0)) : null
        }
      },
      
      // Feed image
      image: feed.feedImage || feed.itunesImage || null
    };
    
    res.status(200).json({
      success: true,
      feed: feedMetadata,
      items: items,
      query: {
        url: url,
        sort: sort || "default",
        limit: maxItems || "all",
        offset: startIndex
      }
    });
    
  } catch (error) {
    console.error("RSS parsing error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch or parse RSS feed",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
