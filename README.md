# Nicholas Caro Photography

Portfolio and client gallery website for Nicholas Caro Photography.

**Live site:** https://nicholascarophotography.co.uk

Built as a single-page HTML site, deployed via GitHub Pages with a custom domain.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Main site — portfolio, galleries, about, services |
| `404.html` | Branded 404 error page |
| `CNAME` | Custom domain configuration for GitHub Pages |
| `.nojekyll` | Disables Jekyll processing |

## Deploying changes

1. Edit `index.html` locally or directly in GitHub
2. Commit and push to the `main` branch
3. GitHub Pages rebuilds automatically within ~60 seconds

## Adding a new event gallery

In `index.html`, find the relevant portfolio section (`#portfolio-equestrian`, `#portfolio-country`, or `#portfolio-sport`) and add a new event card following the pattern in the file. Replace the `openPublicEvent()` or `openPrivateModal()` call with your Pixieset gallery URL.
