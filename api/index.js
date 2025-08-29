export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🚀 Advanced RSS News Platform</title>
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
            padding: 120px 0;
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
            background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 1;
          }

          .hero h1 {
            font-size: 4.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: slideInDown 1s ease-out;
          }

          .hero .subtitle {
            font-size: 1.4em;
            margin-bottom: 15px;
            opacity: 0.95;
            animation: slideInUp 1s ease-out 0.2s both;
          }

          .hero .description {
            font-size: 1.1em;
            margin-bottom: 40px;
            opacity: 0.9;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            animation: slideInUp 1s ease-out 0.4s both;
          }

          .hero-buttons {
            display: flex;
            gap: 25px;
            justify-content: center;
            flex-wrap: wrap;
            animation: slideInUp 1s ease-out 0.6s both;
          }

          .btn {
            padding: 18px 35px;
            border: none;
            border-radius: 50px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
          }

          .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .btn:hover::before {
            left: 100%;
          }

          .btn-primary {
            background: white;
            color: #667eea;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            background: #f7fafc;
          }

          .btn-secondary {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
          }

          .btn-secondary:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }

          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Stats Banner */
          .stats-banner {
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            margin: -60px auto 0;
            max-width: 1000px;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
            z-index: 2;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            text-align: center;
          }

          .stat-item h3 {
            font-size: 2.5em;
            color: #667eea;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .stat-item p {
            color: #718096;
            font-weight: 500;
          }

          /* Main Content */
          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .section {
            padding: 100px 0;
          }

          .section-title {
            text-align: center;
            font-size: 3em;
            margin-bottom: 20px;
            color: #2d3748;
            position: relative;
          }

          .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
          }

          .section-subtitle {
            text-align: center;
            font-size: 1.3em;
            color: #718096;
            margin-bottom: 70px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          /* Advanced Controls */
          .controls-section {
            background: white;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }

          .controls-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
          }

          .control-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .control-group label {
            font-weight: 600;
            color: #4a5568;
            font-size: 0.95em;
          }

          .control-group select,
          .control-group input {
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1em;
            transition: border-color 0.3s;
            background: white;
          }

          .control-group select:focus,
          .control-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          /* News Carousels */
          .news-section {
            background: white;
            margin-bottom: 50px;
            border-radius: 25px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            overflow: hidden;
            position: relative;
          }

          .news-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(135deg, #667eea, #764ba2);
          }

          .news-header {
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            padding: 35px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
          }

          .news-header h3 {
            font-size: 2em;
            margin-bottom: 10px;
            color: #2d3748;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }

          .news-header p {
            color: #718096;
            font-size: 1.1em;
            margin-bottom: 20px;
          }

          .feed-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            max-width: 600px;
            margin: 0 auto;
          }

          .feed-stat {
            background: white;
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }

          .feed-stat-number {
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
          }

          .feed-stat-label {
            font-size: 0.9em;
            color: #718096;
          }

          .carousel-container {
            position: relative;
            padding: 35px;
          }

          .carousel {
            display: flex;
            gap: 25px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding-bottom: 15px;
          }

          .carousel::-webkit-scrollbar {
            height: 10px;
          }

          .carousel::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }

          .carousel::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #cbd5e0, #a0aec0);
            border-radius: 10px;
          }

          .carousel::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #a0aec0, #718096);
          }

          .news-card {
            flex: 0 0 380px;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 25px;
            background: #fafafa;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .news-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
            opacity: 0;
            transition: opacity 0.3s;
          }

          .news-card:hover::before {
            opacity: 1;
          }

          .news-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            border-color: #667eea;
          }

          .news-image-container {
            position: relative;
            margin-bottom: 20px;
            border-radius: 15px;
            overflow: hidden;
            background: #e2e8f0;
            height: 200px;
          }

          .news-thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }

          .news-card:hover .news-thumbnail {
            transform: scale(1.05);
          }

          .image-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 500;
          }

          .multiple-images-indicator {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 500;
          }

          .news-card h4 {
            color: #2d3748;
            margin-bottom: 15px;
            line-height: 1.5;
            font-size: 1.2em;
            font-weight: 600;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            position: relative;
            z-index: 2;
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
            position: relative;
            z-index: 2;
          }

          .author-info {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .author-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            font-weight: bold;
          }

          .date-info {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .news-description {
            color: #4a5568;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.95em;
            line-height: 1.6;
            position: relative;
            z-index: 2;
          }

          .news-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            position: relative;
            z-index: 2;
          }

          .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .category-tag {
            background: linear-gradient(135deg, #edf2f7, #e2e8f0);
            color: #4a5568;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.8em;
            font-weight: 500;
            border: 1px solid transparent;
            transition: all 0.3s;
          }

          .category-tag:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            transform: translateY(-1px);
          }

          .content-metrics {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.85em;
            color: #718096;
          }

          .metric-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .loading-carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 250px;
            color: #718096;
          }

          .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1.5s linear infinite;
            margin-right: 20px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .error-carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 250px;
            color: #e53e3e;
            flex-direction: column;
            gap: 15px;
          }

          .retry-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
          }

          .retry-btn:hover {
            background: #5a67d8;
          }

          /* Testing Section */
          .testing-section {
            background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
            color: white;
            padding: 100px 0;
            position: relative;
            overflow: hidden;
          }

          .testing-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
          }

          .testing-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 1;
          }

          .testing-title {
            text-align: center;
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }

          .testing-subtitle {
            text-align: center;
            font-size: 1.3em;
            opacity: 0.9;
            margin-bottom: 60px;
          }

          .api-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
          }

          .api-card {
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 35px;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: transform 0.3s ease;
          }

          .api-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
          }

          .api-card h3 {
            font-size: 1.6em;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .api-card ul {
            list-style: none;
            padding: 0;
          }

          .api-card li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
          }

          .api-card li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #68d391;
            font-weight: bold;
          }

          .api-endpoint {
            background: rgba(0,0,0,0.4);
            color: #e2e8f0;
            padding: 20px;
            border-radius: 12px;
            font-family: 'Courier New', monospace;
            font-size: 0.95em;
            margin: 20px 0;
            word-break: break-all;
            border-left: 5px solid #667eea;
            position: relative;
            overflow-x: auto;
          }

          .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #667eea;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s;
          }

          .copy-btn:hover {
            opacity: 1;
          }

          .test-form {
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 50px;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.2);
            margin-bottom: 40px;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .form-group label {
            font-weight: 600;
            color: #e2e8f0;
            font-size: 1em;
          }

          .form-group input,
          .form-group select {
            padding: 15px;
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 1em;
            transition: all 0.3s;
          }

          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #667eea;
            background: rgba(255,255,255,0.15);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
          }

          .form-group input::placeholder {
            color: rgba(255,255,255,0.6);
          }

          .test-result {
            margin-top: 30px;
            padding: 25px;
            background: rgba(0,0,0,0.4);
            border-radius: 12px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
            max-height: 500px;
            overflow-y: auto;
            display: none;
            border-left: 5px solid #667eea;
            position: relative;
          }

          .result-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }

          .response-example {
            background: rgba(0,0,0,0.4);
            color: #e2e8f0;
            padding: 25px;
            border-radius: 12px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            overflow-x: auto;
            white-space: pre;
            border-left: 5px solid #48bb78;
            margin-top: 30px;
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .hero h1 { font-size: 3.5em; }
            .news-card { flex: 0 0 340px; }
            .api-features { grid-template-columns: 1fr; }
          }

          @media (max-width: 768px) {
            .hero {
              padding: 80px 0;
            }
            
            .hero h1 {
              font-size: 2.8em;
            }
            
            .hero .subtitle {
              font-size: 1.2em;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }
            
            .btn {
              padding: 15px 30px;
              font-size: 1em;
            }
            
            .section {
              padding: 60px 0;
            }
            
            .section-title {
              font-size: 2.2em;
            }
            
            .news-card {
              flex: 0 0 300px;
            }
            
            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .controls-grid {
              grid-template-columns: 1fr;
            }
            
            .form-grid {
              grid-template-columns: 1fr;
            }
            
            .testing-title {
              font-size: 2.5em;
            }
          }

          @media (max-width: 480px) {
            .hero h1 {
              font-size: 2.2em;
            }
            
            .news-card {
              flex: 0 0 280px;
            }
            
            .stats-banner {
              margin: -40px 20px 0;
              padding: 30px 20px;
            }
            
            .carousel-container {
              padding: 20px;
            }
            
            .news-header {
              padding: 25px 20px;
            }
          }

          /* Utility Classes */
          .hidden { display: none; }
          .error { color: #fc8181; }
          .success { color: #68d391; }
          .text-center { text-align: center; }
          .mb-20 { margin-bottom: 20px; }
          .mt-30 { margin-top: 30px; }
        </style>
      </head>
      <body>
        <!-- Testing Section -->
        <section id="testing" class="testing-section">
          <div class="testing-container">
            <h2 class="testing-title">🧪 Advanced API Testing</h2>
            <p class="testing-subtitle">Test our advanced RSS to JSON conversion API with comprehensive data extraction</p>

            <div class="api-features">
              <div class="api-card">
                <h3>🔍 Advanced Parsing</h3>
                <ul>
                  <li>Multiple image extraction methods</li>
                  <li>Author identification from various fields</li>
                  <li>Content extraction with HTML cleaning</li>
                  <li>Category and tag normalization</li>
                  <li>Date parsing and formatting</li>
                  <li>Social metrics extraction</li>
                </ul>
              </div>

              <div class="api-card">
                <h3>📊 Sorting & Filtering</h3>
                <ul>
                  <li>Sort by date (newest/oldest)</li>
                  <li>Sort by title, author, category</li>
                  <li>Sort by content length</li>
                  <li>Sort by image count</li>
                  <li>Sort by comment count</li>
                  <li>Pagination with limit & offset</li>
                </ul>
              </div>

              <div class="api-card">
                <h3>🎯 Rich Metadata</h3>
                <ul>
                  <li>Multiple content versions (HTML/Text)</li>
                  <li>Image metadata (dimensions, type)</li>
                  <li>Author information with sources</li>
                  <li>Comprehensive date information</li>
                  <li>Feed statistics and analysis</li>
                  <li>Content metrics and insights</li>
                </ul>
              </div>
            </div>

            <!-- API Endpoints -->
            <div class="api-card">
              <h3>🔌 API Endpoints</h3>
              <p>Basic Usage:</p>
              <div class="api-endpoint">
                <button class="copy-btn" onclick="copyToClipboard(this.nextElementSibling.textContent)">📋 Copy</button>
                <code>/api/rss?url=https://feeds.bbci.co.uk/news/rss.xml</code>
              </div>
              
              <p>With Sorting:</p>
              <div class="api-endpoint">
                <button class="copy-btn" onclick="copyToClipboard(this.nextElementSibling.textContent)">📋 Copy</button>
                <code>/api/rss?url=FEED_URL&sort=date&limit=10&offset=0</code>
              </div>
              
              <p>Advanced Example:</p>
              <div class="api-endpoint">
                <button class="copy-btn" onclick="copyToClipboard(this.nextElementSibling.textContent)">📋 Copy</button>
                <code>/api/rss?url=https://techcrunch.com/feed/&sort=content-length&limit=5</code>
              </div>
            </div>

            <!-- Live Testing Form -->
            <div class="test-form">
              <h3 style="margin-bottom: 25px; text-align: center;">🚀 Live API Testing</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="testUrl">RSS Feed URL:</label>
                  <input 
                    type="text" 
                    id="testUrl" 
                    placeholder="https://example.com/feed.xml"
                    value="https://feeds.bbci.co.uk/news/rss.xml"
                  >
                </div>
                <div class="form-group">
                  <label for="testSort">Sort By:</label>
                  <select id="testSort">
                    <option value="">Default Order</option>
                    <option value="date">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="author">Author A-Z</option>
                    <option value="content-length">Content Length</option>
                    <option value="images">Most Images</option>
                    <option value="comments">Most Comments</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="testLimit">Limit Results:</label>
                  <input type="number" id="testLimit" placeholder="10" min="1" max="100">
                </div>
                <div class="form-group">
                  <label for="testOffset">Offset (Skip):</label>
                  <input type="number" id="testOffset" placeholder="0" min="0">
                </div>
              </div>
              <div class="text-center">
                <button class="btn btn-primary" onclick="testAdvancedAPI()" style="width: 100%; max-width: 300px; margin: 0 auto;">
                  🧪 Test Advanced API
                </button>
              </div>
              <div id="testResult" class="test-result">
                <div class="result-header">
                  <h4>📊 API Response</h4>
                  <button class="copy-btn" onclick="copyToClipboard(document.getElementById('testResult').textContent)">📋 Copy</button>
                </div>
                <div id="testContent"></div>
              </div>
            </div>

            <!-- Sample Response -->
            <div style="text-align: center;">
              <h3 style="margin-bottom: 25px; color: #e2e8f0;">📋 Enhanced Response Format</h3>
              <div class="response-example">{
  "success": true,
  "feed": {
    "title": "BBC News - Home",
    "description": "BBC News - Home",
    "link": "https://www.bbc.co.uk/news/",
    "language": "en",
    "lastBuildDate": {
      "iso": "2024-01-20T10:30:00.000Z",
      "formatted": "January 20, 2024 at 10:30 AM",
      "relative": "2 hours ago"
    },
    "stats": {
      "totalItems": 25,
      "returnedItems": 10,
      "avgContentLength": 847,
      "totalImages": 15,
      "uniqueAuthors": 8,
      "uniqueCategories": 12
    }
  },
  "items": [
    {
      "id": "https://www.bbc.co.uk/news/article-123",
      "title": "Breaking: Major news headline here",
      "link": "https://www.bbc.co.uk/news/article-123",
      
      "pubDate": {
        "iso": "2024-01-20T09:30:00.000Z",
        "formatted": "January 20, 2024 at 09:30 AM",
        "relative": "3 hours ago"
      },
      
      "authors": [
        {
          "name": "John Smith",
          "type": "creator",
          "raw": "John Smith (BBC News)"
        }
      ],
      "primaryAuthor": "John Smith",
      
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "type": "media:content",
          "width": "1200",
          "height": "675"
        },
        {
          "url": "https://example.com/thumb.jpg",
          "type": "media:thumbnail",
          "width": "300",
          "height": "169"
        }
      ],
      "thumbnail": "https://example.com/image.jpg",
      
      "contents": [
        {
          "text": "Clean text version of the article...",
          "html": "<p>Full HTML content...</p>",
          "type": "content:encoded",
          "length": 1247
        }
      ],
      
      "categories": ["World News", "Politics", "Breaking"],
      "primaryCategory": "World News",
      
      "metrics": {
        "contentLength": 1247,
        "imageCount": 2,
        "categoryCount": 3,
        "authorCount": 1
      },
      
      "social": {
        "shares": 156,
        "likes": 89,
        "comments": 23
      }
    }
  ]
}</div>
            </div>
          </div>
        </section>

        <script>
          // RSS feeds configuration with advanced parameters
          const RSS_FEEDS = {
            'bbc': 'https://feeds.bbci.co.uk/news/rss.xml',
            'cnn': 'https://rss.cnn.com/rss/edition.rss',
            'techcrunch': 'https://techcrunch.com/feed/',
            'verge': 'https://www.theverge.com/rss/index.xml',
            'reddit': 'https://www.reddit.com/r/worldnews/.rss',
            'wired': 'https://www.wired.com/feed/rss'
          };

          let refreshInterval = null;
          let totalArticlesProcessed = 0;
          let totalImagesExtracted = 0;

          // Load all feeds on page load
          window.addEventListener('load', function() {
            updateAllFeeds();
            updateStats();
          });

          // Update all feeds with current settings
          function updateAllFeeds() {
            const sort = document.getElementById('sortSelect').value;
            const limit = document.getElementById('limitSelect').value;
            const imageMode = document.getElementById('imageMode').value;

            Object.keys(RSS_FEEDS).forEach(feedKey => {
              loadAdvancedFeedCarousel(feedKey, RSS_FEEDS[feedKey], { sort, limit, imageMode });
            });
          }

          // Refresh all feeds
          function refreshAllFeeds() {
            totalArticlesProcessed = 0;
            totalImagesExtracted = 0;
            updateAllFeeds();
            updateStats();
          }

          // Set refresh rate
          function setRefreshRate() {
            const rate = parseInt(document.getElementById('refreshRate').value);
            
            if (refreshInterval) {
              clearInterval(refreshInterval);
              refreshInterval = null;
            }
            
            if (rate > 0) {
              refreshInterval = setInterval(() => {
                refreshAllFeeds();
              }, rate);
            }
          }

          // Load individual feed carousel with advanced parsing
          async function loadAdvancedFeedCarousel(feedKey, feedUrl, options = {}) {
            const carouselId = feedKey + '-carousel';
            const carousel = document.getElementById(carouselId);
            const statsContainer = document.getElementById(feedKey + '-stats');
            
            // Build API URL with parameters
            let apiUrl = '/api/rss?url=' + encodeURIComponent(feedUrl);
            if (options.sort) apiUrl += '&sort=' + options.sort;
            if (options.limit) apiUrl += '&limit=' + options.limit;
            
            try {
              const startTime = Date.now();
              const response = await fetch(apiUrl);
              const data = await response.json();
              const responseTime = Date.now() - startTime;
              
              if (data.success && data.items) {
                renderAdvancedCarousel(carousel, data.items, options);
                updateFeedStats(statsContainer, data.feed.stats, responseTime);
                
                // Update global stats
                totalArticlesProcessed += data.feed.stats.returnedItems;
                totalImagesExtracted += data.feed.stats.totalImages;
                updateStats();
              } else {
                showCarouselError(carousel, data.message || 'Failed to load feed');
                clearFeedStats(statsContainer);
              }
            } catch (error) {
              console.error('Error loading ' + feedKey + ':', error);
              showCarouselError(carousel, 'Network error: ' + error.message);
              clearFeedStats(statsContainer);
            }
          }

          // Render carousel with advanced news cards
          function renderAdvancedCarousel(carousel, items, options = {}) {
            const cardsHtml = items.map(item => {
              // Get the best image based on mode
              let imageHtml = '';
              if (options.imageMode !== 'none' && item.images.length > 0) {
                let selectedImage;
                
                switch (options.imageMode) {
                  case 'best':
                    selectedImage = item.images.find(img => img.width && parseInt(img.width) > 500) || item.images[0];
                    break;
                  case 'multiple':
                    selectedImage = item.images[0];
                    break;
                  default:
                    selectedImage = item.images[0];
                }
                
                if (selectedImage) {
                  imageHtml = '<div class="news-image-container">' +
                    '<img src="' + selectedImage.url + '" alt="News image" class="news-thumbnail" onerror="this.parentElement.style.display=\\'none\\'">' +
                    '<div class="image-overlay">' + selectedImage.type + '</div>' +
                    (item.images.length > 1 ? '<div class="multiple-images-indicator">+' + (item.images.length - 1) + ' more</div>' : '') +
                    '</div>';
                }
              }

              // Format date
              const dateInfo = item.pubDate ? 
                '<span>📅 ' + item.pubDate.relative + '</span>' : 
                '<span>📅 No date</span>';

              // Author info with avatar
              const authorName = item.primaryAuthor || 'Unknown';
              const authorInitial = authorName.charAt(0).toUpperCase();
              const authorHtml = '<div class="author-info">' +
                '<div class="author-avatar">' + authorInitial + '</div>' +
                '<span>' + authorName + '</span>' +
                '</div>';

              // Categories
              const categories = item.categories.slice(0, 3).map(cat => 
                '<span class="category-tag">' + cat + '</span>'
              ).join('');

              // Content metrics
              const metrics = '<div class="content-metrics">' +
                '<div class="metric-item"><span>📝</span><span>' + item.metrics.contentLength + ' chars</span></div>' +
                '<div class="metric-item"><span>🖼️</span><span>' + item.metrics.imageCount + '</span></div>' +
                (item.commentsCount > 0 ? '<div class="metric-item"><span>💬</span><span>' + item.commentsCount + '</span></div>' : '') +
                '</div>';

              return '<div class="news-card">' +
                imageHtml +
                '<h4><a href="' + item.link + '" target="_blank">' + (item.title || 'Untitled') + '</a></h4>' +
                '<div class="news-meta">' +
                  authorHtml +
                  '<div class="date-info">' + dateInfo + '</div>' +
                '</div>' +
                '<div class="news-description">' + (item.description || item.summary || 'No description available.') + '</div>' +
                '<div class="news-footer">' +
                  '<div class="categories">' + categories + '</div>' +
                  metrics +
                '</div>' +
              '</div>';
            }).join('');

            carousel.innerHTML = cardsHtml;
          }

          // Update feed statistics
          function updateFeedStats(container, stats, responseTime) {
            if (!container) return;
            
            const statElements = container.querySelectorAll('.feed-stat-number');
            if (statElements.length >= 4) {
              statElements[0].textContent = stats.returnedItems;
              statElements[1].textContent = stats.totalImages;
              statElements[2].textContent = stats.uniqueAuthors;
              statElements[3].textContent = stats.uniqueCategories;
            }
          }

          // Clear feed statistics
          function clearFeedStats(container) {
            if (!container) return;
            
            const statElements = container.querySelectorAll('.feed-stat-number');
            statElements.forEach(el => el.textContent = '-');
          }

          // Update global statistics
          function updateStats() {
            document.getElementById('totalArticles').textContent = totalArticlesProcessed;
            document.getElementById('totalImages').textContent = totalImagesExtracted;
          }

          // Show error in carousel
          function showCarouselError(carousel, message) {
            carousel.innerHTML = '<div class="error-carousel">' +
              '<span>❌ ' + message + '</span>' +
              '<button class="retry-btn" onclick="refreshAllFeeds()">🔄 Retry</button>' +
              '</div>';
          }

          // Test advanced API
          async function testAdvancedAPI() {
            const testUrl = document.getElementById('testUrl').value.trim();
            const testSort = document.getElementById('testSort').value;
            const testLimit = document.getElementById('testLimit').value;
            const testOffset = document.getElementById('testOffset').value;
            const resultDiv = document.getElementById('testResult');
            const contentDiv = document.getElementById('testContent');
            
            if (!testUrl) {
              resultDiv.style.display = 'block';
              contentDiv.className = 'error';
              contentDiv.textContent = 'Please enter a valid RSS feed URL';
              return;
            }

            // Build API URL
            let apiUrl = '/api/rss?url=' + encodeURIComponent(testUrl);
            if (testSort) apiUrl += '&sort=' + testSort;
            if (testLimit) apiUrl += '&limit=' + testLimit;
            if (testOffset) apiUrl += '&offset=' + testOffset;

            resultDiv.style.display = 'block';
            contentDiv.className = '';
            contentDiv.textContent = 'Testing advanced API... Please wait...';

            try {
              const startTime = Date.now();
              const response = await fetch(apiUrl);
              const data = await response.json();
              const responseTime = Date.now() - startTime;
              
              // Add response time to data
              data._responseTime = responseTime + 'ms';
              
              contentDiv.className = 'success';
              contentDiv.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              contentDiv.className = 'error';
              contentDiv.textContent = 'Error: ' + error.message;
            }
          }

          // Copy to clipboard function
          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
              // Show temporary feedback
              const btn = event.target;
              const originalText = btn.textContent;
              btn.textContent = '✅ Copied!';
              setTimeout(() => {
                btn.textContent = originalText;
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          }

          // Smooth scroll functions
          function scrollToNews() {
            document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
          }

          function scrollToTesting() {
            document.getElementById('testing').scrollIntoView({ behavior: 'smooth' });
          }

          // Allow Enter key in test inputs
          ['testUrl', 'testLimit', 'testOffset'].forEach(id => {
            document.getElementById(id).addEventListener('keypress', function(e) {
              if (e.key === 'Enter') {
                testAdvancedAPI();
              }
            });
          });

          // Auto-update stats every 30 seconds
          setInterval(updateStats, 30000);
        </script>
      </body>
    </html>
  `);
} Hero Section -->
        <section class="hero">
          <div class="hero-container">
            <h1>🚀 Advanced RSS Platform</h1>
            <p class="subtitle">Next-Generation RSS to JSON Conversion</p>
            <p class="description">Transform any RSS feed into beautiful, structured JSON with advanced parsing, image extraction, sorting capabilities, and comprehensive metadata analysis</p>
            <div class="hero-buttons">
              <a href="#news" class="btn btn-primary" onclick="scrollToNews()">
                📰 Explore News
              </a>
              <a href="#testing" class="btn btn-secondary" onclick="scrollToTesting()">
                🧪 Test API
              </a>
            </div>
          </div>
        </section>

        <!-- Stats Banner -->
        <div class="container">
          <div class="stats-banner">
            <div class="stats-grid">
              <div class="stat-item">
                <h3 id="totalArticles">0</h3>
                <p>Articles Processed</p>
              </div>
              <div class="stat-item">
                <h3 id="totalImages">0</h3>
                <p>Images Extracted</p>
              </div>
              <div class="stat-item">
                <h3 id="activeSources">6</h3>
                <p>News Sources</p>
              </div>
              <div class="stat-item">
                <h3 id="avgResponse">~2s</h3>
                <p>Response Time</p>
              </div>
            </div>
          </div>
        </div>

        <!-- News Section -->
        <section id="news" class="section">
          <div class="container">
            <h2 class="section-title">🌍 Latest News</h2>
            <p class="section-subtitle">Browse the latest news from top sources worldwide with advanced parsing and rich media extraction</p>

            <!-- Advanced Controls -->
            <div class="controls-section">
              <h3 class="mb-20">⚙️ Advanced Controls</h3>
              <div class="controls-grid">
                <div class="control-group">
                  <label for="sortSelect">Sort By</label>
                  <select id="sortSelect" onchange="updateAllFeeds()">
                    <option value="date">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="author">Author A-Z</option>
                    <option value="content-length">Content Length</option>
                    <option value="images">Most Images</option>
                    <option value="comments">Most Comments</option>
                  </select>
                </div>
                <div class="control-group">
                  <label for="limitSelect">Articles Per Feed</label>
                  <select id="limitSelect" onchange="updateAllFeeds()">
                    <option value="5">5 Articles</option>
                    <option value="10" selected>10 Articles</option>
                    <option value="15">15 Articles</option>
                    <option value="20">20 Articles</option>
                    <option value="0">All Articles</option>
                  </select>
                </div>
                <div class="control-group">
                  <label for="refreshRate">Auto Refresh</label>
                  <select id="refreshRate" onchange="setRefreshRate()">
                    <option value="0">Disabled</option>
                    <option value="300000">5 Minutes</option>
                    <option value="600000">10 Minutes</option>
                    <option value="1800000">30 Minutes</option>
                  </select>
                </div>
                <div class="control-group">
                  <label for="imageMode">Image Display</label>
                  <select id="imageMode" onchange="updateAllFeeds()">
                    <option value="first" selected>First Image</option>
                    <option value="best">Best Quality</option>
                    <option value="multiple">Show Multiple</option>
                    <option value="none">No Images</option>
                  </select>
                </div>
              </div>
              <div class="text-center">
                <button class="btn btn-primary" onclick="refreshAllFeeds()">
                  🔄 Refresh All Feeds
                </button>
              </div>
            </div>

            <!-- BBC News -->
            <div class="news-section">
              <div class="news-header">
                <h3>🇬🇧 BBC News</h3>
                <p>Latest news from the British Broadcasting Corporation</p>
                <div class="feed-stats" id="bbc-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="bbc-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading BBC News with advanced parsing...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CNN -->
            <div class="news-section">
              <div class="news-header">
                <h3>🇺🇸 CNN</h3>
                <p>Breaking news and updates from CNN</p>
                <div class="feed-stats" id="cnn-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="cnn-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading CNN with media extraction...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TechCrunch -->
            <div class="news-section">
              <div class="news-header">
                <h3>💻 TechCrunch</h3>
                <p>Latest technology and startup news</p>
                <div class="feed-stats" id="techcrunch-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="techcrunch-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading TechCrunch with content analysis...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Verge -->
            <div class="news-section">
              <div class="news-header">
                <h3>🔧 The Verge</h3>
                <p>Technology, science, art, and culture</p>
                <div class="feed-stats" id="verge-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="verge-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading The Verge with metadata extraction...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reddit World News -->
            <div class="news-section">
              <div class="news-header">
                <h3>🌍 Reddit World News</h3>
                <p>Global news discussions from Reddit community</p>
                <div class="feed-stats" id="reddit-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="reddit-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading Reddit with social metrics...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wired -->
            <div class="news-section">
              <div class="news-header">
                <h3>⚡ Wired</h3>
                <p>Ideas, breakthroughs, and the future of technology</p>
                <div class="feed-stats" id="wired-stats">
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Articles</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Images</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Authors</div>
                  </div>
                  <div class="feed-stat">
                    <div class="feed-stat-number">-</div>
                    <div class="feed-stat-label">Categories</div>
                  </div>
                </div>
              </div>
              <div class="carousel-container">
                <div id="wired-carousel" class="carousel">
                  <div class="loading-carousel">
                    <div class="spinner"></div>
                    <span>Loading Wired with advanced image processing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!--
