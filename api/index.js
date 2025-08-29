export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>📡 RSS News Reader & API Platform</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
          }

          /* Hero Section */
          .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }

          .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 1;
          }

          .hero h1 {
            font-size: 4em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: fadeInUp 1s ease-out;
          }

          .hero p {
            font-size: 1.3em;
            margin-bottom: 40px;
            opacity: 0.95;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 1s ease-out 0.2s both;
          }

          .hero-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.4s both;
          }

          .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }

          .btn-primary {
            background: white;
            color: #667eea;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }

          .btn-secondary {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
          }

          .btn-secondary:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Main Content */
          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .section {
            padding: 80px 0;
          }

          .section-title {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #2d3748;
          }

          .section-subtitle {
            text-align: center;
            font-size: 1.2em;
            color: #718096;
            margin-bottom: 60px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          /* News Carousels */
          .news-section {
            background: white;
            margin-bottom: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
          }

          .news-header {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 30px;
            text-align: center;
          }

          .news-header h3 {
            font-size: 1.8em;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }

          .news-header p {
            opacity: 0.9;
            font-size: 1.1em;
          }

          .carousel-container {
            position: relative;
            padding: 30px;
          }

          .carousel {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding-bottom: 10px;
          }

          .carousel::-webkit-scrollbar {
            height: 8px;
          }

          .carousel::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .carousel::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 10px;
          }

          .carousel::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }

          .news-card {
            flex: 0 0 350px;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            padding: 20px;
            background: #fafafa;
            transition: all 0.3s ease;
            position: relative;
          }

          .news-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            border-color: #667eea;
          }

          .news-card h4 {
            color: #2d3748;
            margin-bottom: 15px;
            line-height: 1.4;
            font-size: 1.1em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .news-card h4 a {
            text-decoration: none;
            color: inherit;
            transition: color 0.3s;
          }

          .news-card h4 a:hover {
            color: #667eea;
          }

          .news-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 0.9em;
            color: #718096;
          }

          .news-description {
            color: #4a5568;
            margin-bottom: 15px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.95em;
            line-height: 1.5;
          }

          .news-thumbnail {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
          }

          .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
          }

          .category-tag {
            background: #edf2f7;
            color: #4a5568;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 500;
          }

          .loading-carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            color: #718096;
          }

          .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-right: 15px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Testing Section */
          .testing-section {
            background: #2d3748;
            color: white;
            padding: 80px 0;
          }

          .testing-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .testing-title {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 20px;
          }

          .testing-subtitle {
            text-align: center;
            font-size: 1.2em;
            opacity: 0.8;
            margin-bottom: 50px;
          }

          .api-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
          }

          .api-card {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .api-card h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .api-endpoint {
            background: rgba(0,0,0,0.3);
            color: #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            margin: 15px 0;
            word-break: break-all;
            border-left: 4px solid #667eea;
          }

          .response-example {
            background: rgba(0,0,0,0.3);
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.8em;
            overflow-x: auto;
            white-space: pre;
            border-left: 4px solid #48bb78;
          }

          .test-form {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 40px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #e2e8f0;
          }

          .form-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 1em;
            transition: border-color 0.3s;
          }

          .form-group input:focus {
            outline: none;
            border-color: #667eea;
          }

          .form-group input::placeholder {
            color: rgba(255,255,255,0.6);
          }

          .test-result {
            margin-top: 30px;
            padding: 20px;
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
            max-height: 400px;
            overflow-y: auto;
            display: none;
            border-left: 4px solid #667eea;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero h1 {
              font-size: 2.5em;
            }
            
            .hero p {
              font-size: 1.1em;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }
            
            .btn {
              padding: 12px 25px;
              font-size: 1em;
            }
            
            .section {
              padding: 50px 0;
            }
            
            .section-title {
              font-size: 2em;
            }
            
            .news-card {
              flex: 0 0 280px;
            }
            
            .api-grid {
              grid-template-columns: 1fr;
            }
          }

          /* Utility Classes */
          .hidden { display: none; }
          .error { color: #fc8181; }
          .success { color: #68d391; }
        </style>
      </head>
      <body>
        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-container">
            <h1>📡 RSS News Platform</h1>
            <p>Transform any RSS feed into beautiful JSON format and explore news from multiple sources with our powerful API and elegant interface</p>
            <div class="hero-buttons">
              <a href="#news" class="btn btn-primary" onclick="scrollToNews()">
                🗞️ Browse News
              </a>
              <a href="#testing" class="btn btn-secondary" onclick="scrollToTesting()">
                🔧 Test API
              </a>
            </div>
          </div>
        </section>

        <!-- News Carousels Section -->
        <section id="news" class="section">
          <div class="container">
            <h2 class="section-title">🌍 Latest News</h2>
            <p class="section-subtitle">Browse the latest news from top sources around the world</p>

            <!-- BBC News -->
            <div class="news-section">
              <div class="news-header">
                <h3>🇬🇧 BBC News</h3>
                <p>Latest news from the British Broadcasting Corporation</p>
              </div>
              <div class="carousel-container">
                <div id="bbc-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading BBC News...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CNN -->
            <div class="news-section">
              <div class="news-header">
                <h3>🇺🇸 CNN</h3>
                <p>Breaking news and updates from CNN</p>
              </div>
              <div class="carousel-container">
                <div id="cnn-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading CNN...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TechCrunch -->
            <div class="news-section">
              <div class="news-header">
                <h3>💻 TechCrunch</h3>
                <p>Latest technology and startup news</p>
              </div>
              <div class="carousel-container">
                <div id="techcrunch-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading TechCrunch...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Verge -->
            <div class="news-section">
              <div class="news-header">
                <h3>🔧 The Verge</h3>
                <p>Technology, science, art, and culture</p>
              </div>
              <div class="carousel-container">
                <div id="verge-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading The Verge...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reddit World News -->
            <div class="news-section">
              <div class="news-header">
                <h3>🌍 Reddit World News</h3>
                <p>Global news discussions from Reddit community</p>
              </div>
              <div class="carousel-container">
                <div id="reddit-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading Reddit World News...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wired -->
            <div class="news-section">
              <div class="news-header">
                <h3>⚡ Wired</h3>
                <p>Ideas, breakthroughs, and the future</p>
              </div>
              <div class="carousel-container">
                <div id="wired-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading Wired...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Testing Section -->
        <section id="testing" class="testing-section">
          <div class="testing-container">
            <h2 class="testing-title">🧪 API Testing</h2>
            <p class="testing-subtitle">Test our RSS to JSON conversion API with any feed</p>

            <div class="api-grid">
              <div class="api-card">
                <h3>🔌 API Endpoint</h3>
                <p>Convert any RSS feed to clean JSON format</p>
                <div class="api-endpoint">/api/rss?url=RSS_FEED_URL</div>
              </div>

              <div class="api-card">
                <h3>📝 Example Usage</h3>
                <p>Try with popular RSS feeds</p>
                <div class="api-endpoint">/api/rss?url=https://feeds.bbci.co.uk/news/rss.xml</div>
              </div>

              <div class="api-card">
                <h3>✨ Features</h3>
                <ul style="list-style: none; padding: 0; margin-top: 15px;">
                  <li style="margin-bottom: 8px;">🔄 Real-time parsing</li>
                  <li style="margin-bottom: 8px;">🌐 CORS enabled</li>
                  <li style="margin-bottom: 8px;">📱 Mobile optimized</li>
                  <li style="margin-bottom: 8px;">🚀 Fast response</li>
                </ul>
              </div>
            </div>

            <div class="test-form">
              <h3 style="margin-bottom: 20px;">🚀 Test Live API</h3>
              <div class="form-group">
                <label for="testUrl">RSS Feed URL:</label>
                <input 
                  type="text" 
                  id="testUrl" 
                  placeholder="https://example.com/feed.xml"
                  value="https://feeds.bbci.co.uk/news/rss.xml"
                >
              </div>
              <button class="btn btn-primary" onclick="testAPI()" style="width: 100%;">
                🧪 Test API
              </button>
              <div id="testResult" class="test-result"></div>
            </div>

            <div style="margin-top: 50px; text-align: center;">
              <h3 style="margin-bottom: 20px;">📋 Sample Response</h3>
              <div class="response-example">{
  "success": true,
  "feed": {
    "title": "BBC News - Home",
    "description": "BBC News - Home",
    "link": "https://www.bbc.co.uk/news/",
    "lastBuildDate": "2024-01-20T10:30:00Z",
    "totalItems": 25
  },
  "items": [
    {
      "sno": 1,
      "title": "Breaking: Latest news headline",
      "link": "https://www.bbc.co.uk/news/article-123",
      "pubDate": "2024-01-20T09:30:00Z",
      "author": "BBC News",
      "categories": ["World", "Politics"],
      "description": "Brief description of the news...",
      "content": "Full article content...",
      "thumbnail": "https://example.com/image.jpg"
    }
  ]
}</div>
            </div>
          </div>
        </section>

        <script>
          // RSS feeds configuration
          const RSS_FEEDS = {
            'bbc': 'https://feeds.bbci.co.uk/news/rss.xml',
            'cnn': 'https://rss.cnn.com/rss/edition.rss',
            'techcrunch': 'https://techcrunch.com/feed/',
            'verge': 'https://www.theverge.com/rss/index.xml',
            'reddit': 'https://www.reddit.com/r/worldnews/.rss',
            'wired': 'https://www.wired.com/feed/rss'
          };

          // Load all news feeds on page load
          window.addEventListener('load', function() {
            Object.keys(RSS_FEEDS).forEach(feedKey => {
              loadFeedCarousel(feedKey, RSS_FEEDS[feedKey]);
            });
          });

          // Load individual feed carousel
          async function loadFeedCarousel(feedKey, feedUrl) {
            const carouselId = feedKey + '-carousel';
            const carousel = document.getElementById(carouselId);
            
            try {
              const response = await fetch('/api/rss?url=' + encodeURIComponent(feedUrl));
              const data = await response.json();
              
              if (data.success && data.items) {
                renderCarousel(carousel, data.items.slice(0, 10)); // Show first 10 items
              } else {
                showCarouselError(carousel, 'Failed to load feed');
              }
            } catch (error) {
              console.error('Error loading ' + feedKey + ':', error);
              showCarouselError(carousel, 'Network error');
            }
          }

          // Render carousel with news items
          function renderCarousel(carousel, items) {
            const cardsHtml = items.map(item => {
              const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'No date';
              const author = item.author || 'Unknown';
              const thumbnail = item.thumbnail ? 
                '<img src="' + item.thumbnail + '" alt="News thumbnail" class="news-thumbnail" onerror="this.style.display=\\'none\\';">' : '';
              
              const categories = item.categories && item.categories.length > 0 ? 
                '<div class="categories">' + item.categories.map(cat => '<span class="category-tag">' + cat + '</span>').join('') + '</div>' : '';

              return '<div class="news-card">' +
                thumbnail +
                '<h4><a href="' + item.link + '" target="_blank">' + (item.title || 'Untitled') + '</a></h4>' +
                '<div class="news-meta">' +
                  '<span>📅 ' + pubDate + '</span>' +
                  '<span>✍️ ' + author + '</span>' +
                '</div>' +
                '<div class="news-description">' + (item.description || 'No description available.') + '</div>' +
                categories +
              '</div>';
            }).join('');

            carousel.innerHTML = cardsHtml;
          }

          // Show error in carousel
          function showCarouselError(carousel, message) {
            carousel.innerHTML = '<div class="loading-carousel"><span class="error">❌ ' + message + '</span></div>';
          }

          // Smooth scroll functions
          function scrollToNews() {
            document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
          }

          function scrollToTesting() {
            document.getElementById('testing').scrollIntoView({ behavior: 'smooth' });
          }

          // Test API function
          async function testAPI() {
            const testUrl = document.getElementById('testUrl').value.trim();
            const resultDiv = document.getElementById('testResult');
            
            if (!testUrl) {
              resultDiv.style.display = 'block';
              resultDiv.className = 'test-result error';
              resultDiv.textContent = 'Please enter a valid RSS feed URL';
              return;
            }

            resultDiv.style.display = 'block';
            resultDiv.className = 'test-result';
            resultDiv.textContent = 'Testing API... Please wait...';

            try {
              const response = await fetch('/api/rss?url=' + encodeURIComponent(testUrl));
              const data = await response.json();
              
              resultDiv.className = 'test-result success';
              resultDiv.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              resultDiv.className = 'test-result error';
              resultDiv.textContent = 'Error: ' + error.message;
            }
          }

          // Allow Enter key in test input
          document.getElementById('testUrl').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              testAPI();
            }
          });
        </script>
      </body>
    </html>
  `);
}
