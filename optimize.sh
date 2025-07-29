#!/bin/bash

# Walking Store - Performance Optimization Build Script
# This script minifies CSS and JavaScript files for production

echo "🚀 Starting Walking Store optimization build..."

# Check if required tools are available
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        echo "   npm install -g $2"
        exit 1
    fi
}

# Check for required tools (optional - will warn if not available)
echo "🔍 Checking for optimization tools..."

if command -v csso &> /dev/null; then
    echo "✅ CSSO found - will minify CSS"
    MINIFY_CSS=true
else
    echo "⚠️  CSSO not found - CSS will not be minified"
    echo "   Install with: npm install -g csso-cli"
    MINIFY_CSS=false
fi

if command -v terser &> /dev/null; then
    echo "✅ Terser found - will minify JavaScript"
    MINIFY_JS=true
else
    echo "⚠️  Terser not found - JavaScript will not be minified"
    echo "   Install with: npm install -g terser"
    MINIFY_JS=false
fi

# Create dist directory
echo "📁 Creating dist directory..."
mkdir -p dist

# Copy HTML file
echo "📄 Copying HTML file..."
cp index.html dist/

# Process CSS
echo "🎨 Processing CSS..."
if [ "$MINIFY_CSS" = true ]; then
    csso styles.css --output dist/styles.min.css
    echo "✅ CSS minified: styles.css → dist/styles.min.css"
    
    # Update HTML to reference minified CSS
    sed -i 's/styles\.css/styles.min.css/g' dist/index.html
else
    cp styles.css dist/
    echo "📋 CSS copied (not minified): styles.css → dist/styles.css"
fi

# Process JavaScript
echo "⚙️  Processing JavaScript..."
if [ "$MINIFY_JS" = true ]; then
    terser animations.js --compress --mangle --output dist/animations.min.js
    echo "✅ JavaScript minified: animations.js → dist/animations.min.js"
    
    # Update HTML to reference minified JS
    sed -i 's/animations\.js/animations.min.js/g' dist/index.html
else
    cp animations.js dist/
    echo "📋 JavaScript copied (not minified): animations.js → dist/animations.js"
fi

# Copy other necessary files (if they exist)
echo "📋 Copying additional files..."
[ -f main.css ] && cp main.css dist/
[ -f main.js ] && cp main.js dist/
[ -f cart.js ] && cp cart.js dist/
[ -f dialog.js ] && cp dialog.js dist/

# Calculate file sizes
echo "📊 File size comparison:"
echo "=================================="

if [ -f index.html ]; then
    original_html=$(wc -c < index.html)
    optimized_html=$(wc -c < dist/index.html)
    echo "HTML: $(($original_html / 1024))KB → $(($optimized_html / 1024))KB"
fi

if [ -f styles.css ]; then
    original_css=$(wc -c < styles.css)
    if [ "$MINIFY_CSS" = true ]; then
        optimized_css=$(wc -c < dist/styles.min.css)
        echo "CSS:  $(($original_css / 1024))KB → $(($optimized_css / 1024))KB"
    else
        echo "CSS:  $(($original_css / 1024))KB (not minified)"
    fi
fi

if [ -f animations.js ]; then
    original_js=$(wc -c < animations.js)
    if [ "$MINIFY_JS" = true ]; then
        optimized_js=$(wc -c < dist/animations.min.js)
        echo "JS:   $(($original_js / 1024))KB → $(($optimized_js / 1024))KB"
    else
        echo "JS:   $(($original_js / 1024))KB (not minified)"
    fi
fi

echo "=================================="

# Performance recommendations
echo ""
echo "🎯 Performance Recommendations:"
echo "=================================="
echo "1. Enable gzip/brotli compression on your server"
echo "2. Set appropriate cache headers for static assets"
echo "3. Consider using a CDN for better global performance"
echo "4. Monitor Core Web Vitals after deployment"
echo "5. Implement a service worker for offline support"
echo ""

# Server configuration examples
echo "📋 Server Configuration Examples:"
echo "=================================="
echo ""
echo "Apache (.htaccess):"
echo "-------------------"
cat << 'EOF'
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
EOF

echo ""
echo "Nginx:"
echo "------"
cat << 'EOF'
# Enable compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Set cache headers
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
EOF

echo ""
echo "✅ Build complete! Your optimized files are in the 'dist' directory."
echo "🚀 Deploy the contents of the 'dist' directory to your web server."
echo ""

# Final checklist
echo "🔍 Deployment Checklist:"
echo "========================"
echo "□ Test the optimized site locally"
echo "□ Verify all images and assets load correctly"
echo "□ Check animations and interactive features"
echo "□ Test on mobile devices"
echo "□ Validate HTML and CSS"
echo "□ Configure server compression and caching"
echo "□ Set up performance monitoring"
echo "□ Update DNS and deploy to production"
echo ""

echo "💡 Pro tip: Use Chrome DevTools to audit performance after deployment!"