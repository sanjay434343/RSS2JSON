<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📡 RSS News Reader & API Tester</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            padding: 20px 0;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .sidebar {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            height: fit-content;
            position: sticky;
            top: 20px;
        }

        .content {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .section-title {
            font-size: 1.4em;
            margin-bottom: 20px;
            color: #4a5568;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }

        .rss-feeds {
            margin-bottom: 30px;
        }

        .feed-item {
            display: flex;
            align-items: center;
            padding: 12px;
            margin-bottom: 10px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f8fafc;
        }

        .feed-item:hover {
            border-color: #667eea;
            background: #edf2f7;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .feed-item.active {
            border-color: #667eea;
            background: #e6fffa;
        }

        .feed-icon {
            font-size: 1.2em;
            margin-right: 10px;
            width: 30px;
            text-align: center;
        }

        .feed-info h4 {
            color: #2d3748;
            margin-bottom: 5px;
        }

        .feed-info p {
            color: #718096;
            font-size: 0.9em;
        }

        .custom-feed {
            margin-top: 20px;
        }

        .input-group {
            display: flex;
            margin-bottom: 15px;
        }

        input[type="text"] {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 8px 0 0 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus {
            border-color: #667eea;
        }

        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }

        .btn-primary {
            background: #667eea;
            color: white;
            border-radius: 0 8px 8px 0;
        }

        .btn-primary:hover {
            background: #5a67d8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
            background: #718096;
            color: white;
            margin-left: 10px;
        }

        .btn-secondary:hover {
            background: #4a5568;
        }

        .loading {
            display: none;
            text-align: center;
            padding: 40px;
            color: #718096;
        }

        .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error {
            background: #fed7d7;
            border: 2px solid #fc8181;
            color: #c53030;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }

        .news-grid {
            display: grid;
            gap: 20px;
        }

        .news-item {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            background: #fafafa;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .news-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-color: #667eea;
        }

        .news-item h3 {
            color: #2d3748;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        .news-item h3 a {
            text-decoration: none;
            color: inherit;
            transition: color 0.3s;
        }

        .news-item h3 a:hover {
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
        }

        .news-thumbnail {
            width: 100px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            float: right;
            margin-left: 15px;
            margin-bottom: 10px;
        }

        .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
        }

        .category-tag {
            background: #e2e8f0;
            color: #4a5568;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
        }

        .api-info {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .api-info h3 {
            color: #2d3748;
            margin-bottom: 15px;
        }

        .api-endpoint {
            background: #2d3748;
            color: #e2e8f0;
            padding: 10px 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
            word-break: break-all;
        }

        .raw-data {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-height: 400px;
            overflow-y: auto;
            margin-top: 20px;
            white-space: pre-wrap;
            display: none;
        }

        .toggle-raw {
            margin-top: 15px;
        }

        .feed-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }

        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .sidebar {
                position: static;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .feed-stats {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📡 RSS News Reader & API Tester</h1>
            <p>Convert RSS feeds to JSON and browse news from multiple sources</p>
        </div>

        <div class="main-content">
            <div class="sidebar">
                <div class="rss-feeds">
                    <h2 class="section-title">📰 News Sources</h2>
                    
                    <div class="feed-item" data-url="https://feeds.bbci.co.uk/news/rss.xml">
                        <div class="feed-icon">🇬🇧</div>
                        <div class="feed-info">
                            <h4>BBC News</h4>
                            <p>Latest news from BBC</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://rss.cnn.com/rss/edition.rss">
                        <div class="feed-icon">🇺🇸</div>
                        <div class="feed-info">
                            <h4>CNN</h4>
                            <p>Breaking news and updates</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://www.reddit.com/r/worldnews/.rss">
                        <div class="feed-icon">🌍</div>
                        <div class="feed-info">
                            <h4>Reddit World News</h4>
                            <p>Global news from Reddit</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://techcrunch.com/feed/">
                        <div class="feed-icon">💻</div>
                        <div class="feed-info">
                            <h4>TechCrunch</h4>
                            <p>Latest tech news</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://www.theverge.com/rss/index.xml">
                        <div class="feed-icon">🔧</div>
                        <div class="feed-info">
                            <h4>The Verge</h4>
                            <p>Technology and culture</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://feeds.feedburner.com/oreilly/radar">
                        <div class="feed-icon">📚</div>
                        <div class="feed-info">
                            <h4>O'Reilly Radar</h4>
                            <p>Tech insights and trends</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://www.wired.com/feed/rss">
                        <div class="feed-icon">⚡</div>
                        <div class="feed-info">
                            <h4>Wired</h4>
                            <p>Future technology</p>
                        </div>
                    </div>

                    <div class="feed-item" data-url="https://rss.slashdot.org/Slashdot/slashdotMain">
                        <div class="feed-icon">🔥</div>
                        <div class="feed-info">
                            <h4>Slashdot</h4>
                            <p>News for nerds</p>
                        </div>
                    </div>
                </div>

                <div class="custom-feed">
                    <h3 class="section-title">🔗 Custom RSS Feed</h3>
                    <div class="input-group">
                        <input type="text" id="customUrl" placeholder="Enter RSS feed URL...">
                        <button class="btn btn-primary" onclick="loadCustomFeed()">Test</button>
                    </div>
                </div>

                <div class="api-info">
                    <h3>🔌 API Endpoint</h3>
                    <p>Use this endpoint to convert any RSS feed to JSON:</p>
                    <div class="api-endpoint">/api/rss?url=RSS_FEED_URL</div>
                    <button class="btn btn-secondary toggle-raw" onclick="toggleRawData()">Show Raw JSON</button>
                </div>
            </div>

            <div class="content">
                <div class="error" id="errorDiv"></div>
                
                <div class="loading" id="loadingDiv">
                    <div class="spinner"></div>
                    <p>Loading RSS feed...</p>
                </div>

                <div id="feedContent" style="display: none;">
                    <div class="feed-stats" id="feedStats"></div>
                    <div class="news-grid" id="newsGrid"></div>
                    <div class="raw-data" id="rawData"></div>
                </div>

                <div id="welcomeMessage">
                    <h2 style="color: #4a5568; margin-bottom: 20px;">Welcome to RSS News Reader!</h2>
                    <p style="color: #718096; font-size: 1.1em; line-height: 1.8;">
                        Select a news source from the sidebar to start reading the latest news, or enter your own RSS feed URL to test the API. 
                        This tool converts RSS feeds into clean JSON format and displays them in a beautiful, readable interface.
                    </p>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #f0f8ff; border-radius: 10px; border-left: 4px solid #667eea;">
                        <h3 style="color: #2d3748; margin-bottom: 10px;">✨ Features:</h3>
                        <ul style="color: #4a5568; line-height: 2;">
                            <li>🔄 Real-time RSS feed parsing</li>
                            <li>📱 Responsive design for all devices</li>
                            <li>🎨 Clean, modern interface</li>
                            <li>📊 Feed statistics and metadata</li>
                            <li>🔍 Raw JSON data inspection</li>
                            <li>🌐 CORS-enabled API for developers</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentFeedData = null;

        // Add click listeners to all feed items
        document.querySelectorAll('.feed-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                loadFeed(url);
                setActiveFeed(item);
            });
        });

        function setActiveFeed(activeItem) {
            document.querySelectorAll('.feed-item').forEach(item => {
                item.classList.remove('active');
            });
            activeItem.classList.add('active');
        }

        function loadCustomFeed() {
            const url = document.getElementById('customUrl').value.trim();
            if (!url) {
                showError('Please enter a valid RSS feed URL');
                return;
            }
            
            // Remove active class from predefined feeds
            document.querySelectorAll('.feed-item').forEach(item => {
                item.classList.remove('active');
            });
            
            loadFeed(url);
        }

        async function loadFeed(feedUrl) {
            showLoading();
            hideError();
            document.getElementById('welcomeMessage').style.display = 'none';

            try {
                const apiUrl = `/api/rss?url=${encodeURIComponent(feedUrl)}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to load feed');
                }

                currentFeedData = data;
                displayFeed(data);
                hideLoading();

            } catch (error) {
                console.error('Error loading feed:', error);
                showError(`Failed to load RSS feed: ${error.message}`);
                hideLoading();
            }
        }

        function displayFeed(data) {
            const { feed, items } = data;
            
            // Show feed stats
            const statsHtml = `
                <div class="stat-card">
                    <div class="stat-number">${items.length}</div>
                    <div class="stat-label">Articles</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${feed.title ? '✓' : '✗'}</div>
                    <div class="stat-label">Feed Title</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${new Date(feed.lastBuildDate || Date.now()).toLocaleDateString()}</div>
                    <div class="stat-label">Last Updated</div>
                </div>
            `;
            document.getElementById('feedStats').innerHTML = statsHtml;

            // Display news items
            const newsHtml = items.map(item => {
                const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'No date';
                const author = item.author || 'Unknown author';
                const thumbnail = item.thumbnail ? 
                    `<img src="${item.thumbnail}" alt="News thumbnail" class="news-thumbnail" onerror="this.style.display='none'">` : '';
                
                const categories = item.categories && item.categories.length > 0 ? 
                    `<div class="categories">${item.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}</div>` : '';

                return `
                    <div class="news-item">
                        ${thumbnail}
                        <h3><a href="${item.link}" target="_blank">${item.title || 'Untitled'}</a></h3>
                        <div class="news-meta">
                            <span>📅 ${pubDate}</span>
                            <span>✍️ ${author}</span>
                        </div>
                        <div class="news-description">
                            ${item.description || 'No description available.'}
                        </div>
                        ${categories}
                    </div>
                `;
            }).join('');

            document.getElementById('newsGrid').innerHTML = newsHtml;
            document.getElementById('feedContent').style.display = 'block';

            // Update raw data
            document.getElementById('rawData').textContent = JSON.stringify(data, null, 2);
        }

        function toggleRawData() {
            const rawDataDiv = document.getElementById('rawData');
            const button = document.querySelector('.toggle-raw');
            
            if (rawDataDiv.style.display === 'none' || rawDataDiv.style.display === '') {
                rawDataDiv.style.display = 'block';
                button.textContent = 'Hide Raw JSON';
            } else {
                rawDataDiv.style.display = 'none';
                button.textContent = 'Show Raw JSON';
            }
        }

        function showLoading() {
            document.getElementById('loadingDiv').style.display = 'block';
            document.getElementById('feedContent').style.display = 'none';
        }

        function hideLoading() {
            document.getElementById('loadingDiv').style.display = 'none';
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorDiv');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        function hideError() {
            document.getElementById('errorDiv').style.display = 'none';
        }

        // Allow Enter key to submit custom feed
        document.getElementById('customUrl').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loadCustomFeed();
            }
        });

        // Load BBC News by default
        window.addEventListener('load', () => {
            const firstFeed = document.querySelector('.feed-item');
            if (firstFeed) {
                setTimeout(() => {
                    firstFeed.click();
                }, 500);
            }
        });
    </script>
</body>
</html>
