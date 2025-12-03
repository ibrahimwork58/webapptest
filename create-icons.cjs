const fs = require('fs');
const path = require('path');

// Create a simple base64 encoded PNG (1x1 blue pixel)
// This is just a placeholder - users should replace with real icons
const createPlaceholderIcon = (size) => {
    // Simple blue square as base64 PNG
    const bluePNG = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
    );

    return bluePNG;
};

const iconsDir = path.join(__dirname, 'static', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Create placeholder icons
const sizes = [
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'icon-maskable.png', size: 512 }
];

sizes.forEach(({ name }) => {
    const iconPath = path.join(iconsDir, name);
    const placeholder = createPlaceholderIcon();
    fs.writeFileSync(iconPath, placeholder);
    console.log(`✓ Created ${name}`);
});

console.log('\n⚠️  Note: These are minimal placeholders.');
console.log('Replace with proper icons for production using:');
console.log('  npx pwa-asset-generator source-icon.png static/icons --icon-only --type png');
