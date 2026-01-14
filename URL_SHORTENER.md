# URL Shortener Website

A simple, elegant URL shortener web application that runs entirely in your browser. No server required!

## Features

- ✨ **Clean, Modern Interface** - Beautiful gradient design with smooth animations
- 🔗 **Instant URL Shortening** - Generate short URLs with a single click
- 📋 **One-Click Copy** - Copy shortened URLs to clipboard instantly
- 💾 **Local Storage** - Your URLs are saved in your browser (privacy-friendly)
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 📚 **History Tracking** - View and manage your recent shortened URLs
- 🔒 **No Backend Required** - All processing happens in your browser

## How to Use

1. **Open the Website**: Open `index.html` in your web browser
2. **Enter a URL**: Paste your long URL in the input field
3. **Click "Shorten URL"**: The app will generate a short URL for you
4. **Copy and Share**: Use the copy button to copy your shortened URL

## Installation

### Option 1: Direct Use
Simply clone this repository and open `index.html` in your browser:

```bash
git clone https://github.com/MansiSahu18/skills-introduction-to-github.git
cd skills-introduction-to-github
# Open index.html in your browser
```

### Option 2: GitHub Pages
This website can be hosted on GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch and root directory
4. Your site will be available at `https://yourusername.github.io/repository-name/`

### Option 3: Local Server
Run a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Features in Detail

### URL Shortening
- Generates unique 6-character codes for each URL
- Validates URLs before shortening (must be valid http:// or https://)
- Creates shareable short URLs based on your domain

### History Management
- Stores last 10 shortened URLs
- View original and shortened URLs side by side
- Copy any URL from history with one click
- Delete URLs you no longer need

### Privacy
- All data is stored locally in your browser's localStorage
- No data is sent to any server
- Complete privacy and security

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **Vanilla JavaScript** - No frameworks or dependencies
- **LocalStorage API** - Client-side data persistence

### Browser Support
Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## File Structure

```
.
├── index.html          # Main HTML file
├── style.css          # Styling and animations
├── script.js          # URL shortening logic
└── URL_SHORTENER.md   # This file
```

## Customization

### Change Color Scheme
Edit the gradient colors in `style.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Short Code Length
Modify the loop in `script.js`:

```javascript
for (let i = 0; i < 6; i++) {  // Change 6 to desired length
```

### Change History Limit
Update the limit in `script.js`:

```javascript
if (data.urls.length > 10) {  // Change 10 to desired limit
```

## Future Enhancements

Possible additions for the future:
- QR code generation for shortened URLs
- Analytics tracking (click counts)
- Custom short codes
- URL expiration dates
- Export/import URL history
- Dark mode toggle

## Contributing

Feel free to fork this repository and submit pull requests for any improvements!

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

Built with ❤️ for the GitHub community
