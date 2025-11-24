# GitHub Pages Frontend

This directory contains the GitHub Pages frontend for browsing the Vibe Coding Rules.

## Structure

- `index.html` - Main page with stack overview
- `styles.css` - Professional styling
- `app.js` - Interactive functionality
- `data/guides.json` - Generated data file (created by build script)

## Building

The `guides.json` file is generated from the `.mdc` files in the repository. To build it:

```bash
npm run build
```

This runs the `scripts/build-guides-data.mjs` script which:
1. Scans all stack directories
2. Parses `.mdc` files and extracts frontmatter
3. Generates structured JSON data
4. Saves to `docs/data/guides.json`

## GitHub Pages Setup

1. Go to your repository Settings → Pages
2. Select "GitHub Actions" as the source
3. The workflow (`.github/workflows/pages.yml`) will automatically:
   - Build the guides data on every push to `main`
   - Deploy to GitHub Pages

## Local Development

To preview locally, you have several options:

### Option 1: Using npm scripts (Recommended)

```bash
# Build and serve in one command
npm run dev

# Or separately:
npm run build    # Build the guides data
npm run serve    # Start local server on http://localhost:8080
```

The server will automatically serve files from the `docs` directory and reload when you make changes.

### Option 2: Using other static servers

1. Build the data: `npm run build`
2. Serve the `docs` directory with any static file server:
   ```bash
   # Using Python
   cd docs && python3 -m http.server 8000
   
   # Using Node.js (if you have serve installed)
   npx serve docs
   
   # Using PHP
   cd docs && php -S localhost:8000
   ```
3. Open the URL in your browser (default: `http://localhost:8080` for npm serve, or `http://localhost:8000` for others)

## Features

- **Stack Overview**: Browse all technology stacks with key statistics
- **Guide Browser**: Click on any stack card to see all guides
- **Guide Viewer**: Click on individual guides to read full content
- **Markdown Rendering**: Guides are rendered with proper formatting
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional UI**: Clean, modern design matching the quality of the guidelines

