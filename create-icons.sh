#!/bin/bash

# Create placeholder icon files
# Note: These are minimal placeholders. Replace with proper icons for production.

echo "Creating placeholder icons..."

# Create a simple SVG icon
cat > /tmp/icon.svg << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0c4a6e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#grad)"/>
  <path d="M 256 150 L 200 250 L 256 200 L 312 250 Z M 256 250 L 200 350 L 312 350 Z" fill="white" opacity="0.9"/>
</svg>
EOF

# Check if ImageMagick or other tools are available
if command -v convert &> /dev/null; then
    echo "Using ImageMagick to convert SVG to PNG..."
    convert -background none /tmp/icon.svg -resize 192x192 static/icons/icon-192.png
    convert -background none /tmp/icon.svg -resize 512x512 static/icons/icon-512.png
    convert -background none /tmp/icon.svg -resize 512x512 static/icons/icon-maskable.png
    echo "✓ Icons created successfully!"
elif command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert to convert SVG to PNG..."
    rsvg-convert -w 192 -h 192 /tmp/icon.svg -o static/icons/icon-192.png
    rsvg-convert -w 512 -h 512 /tmp/icon.svg -o static/icons/icon-512.png
    rsvg-convert -w 512 -h 512 /tmp/icon.svg -o static/icons/icon-maskable.png
    echo "✓ Icons created successfully!"
else
    echo "⚠️  No SVG converter found (ImageMagick or rsvg-convert)"
    echo "Please install one of the following:"
    echo "  - ImageMagick: brew install imagemagick"
    echo "  - librsvg: brew install librsvg"
    echo ""
    echo "Or create icons manually in static/icons/:"
    echo "  - icon-192.png (192x192)"
    echo "  - icon-512.png (512x512)"
    echo "  - icon-maskable.png (512x512)"
fi

rm -f /tmp/icon.svg
