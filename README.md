# Mensajeros del universo

A visual, mobile-friendly presentation in Spanish about neutrinos, the IceCube observatory and the 2026 Nobel Prize in Physics. Eight slides with large text, native SVG illustrations, animated explanations and a black background.

## Local development

Use Node.js 22 (see `.nvmrc`). No runtime or build dependencies are required.

```sh
npm ci --ignore-scripts
npm start
```

Open **http://localhost:7654**. Navigate using the arrows, keyboard, slide index or a horizontal swipe. Direct links use fragments `#1` through `#8`. Animation controls support pause/replay and reduced-motion preferences.

```sh
npm run check
npm run build
```

The build copies only the six public assets into `dist/` and adds `.nojekyll`. Source code, repository settings, the local server and development tools are excluded. Asset links are relative, so the same output works under a GitHub project path or at a custom domain's root. Fonts are requested from Google Fonts, with system font fallbacks.

## Push to GitHub

The local repository is initialized on `main` with an initial commit. No remote has been configured and nothing has been pushed.

1. Create an **empty** GitHub repository, without an initial README, license or `.gitignore`.
2. Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` below with your actual values:

```sh
git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

You can use the HTTPS repository URL instead if preferred. The commands above are instructions for you; repository preparation does not execute them.

## GitHub Pages

In the GitHub repository, select **Settings → Pages → Source → GitHub Actions**. The included workflow runs checks and builds on pull requests. Pushes to `main` and manual workflow runs also deploy `dist/` to Pages.

If the first run happens before Pages is enabled, enable it and rerun the workflow. The deployed address appears in the `github-pages` environment, normally `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

See [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Connect your Cloudflare-managed domain later

Hosting remains on GitHub Pages; Cloudflare manages the DNS. No domain is hardcoded in the site.

1. In GitHub **Settings → Pages → Custom domain**, save your chosen hostname before changing DNS.
2. For a subdomain such as `neutrinos.example.com`, add a Cloudflare **CNAME** named `neutrinos` targeting `YOUR-USERNAME.github.io` (no protocol, repository path or trailing path). Start with **DNS only** so GitHub can verify DNS and provision HTTPS directly.
3. Once DNS is verified and the certificate is ready, enable **Enforce HTTPS** in GitHub Pages.

For an apex domain such as `example.com`, use four **A** records named `@` instead of the subdomain CNAME:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

A custom domain is configured in GitHub's Pages settings for this Actions-based deployment; a repository `CNAME` file is not needed. Domain details remain unset until you choose the hostname. Follow [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for current DNS values and domain verification.

## Presentation content

The sources are linked from the presentation's index and final slide. Illustrations are schematic; particle sizes, geometry and animation times are not to scale. The solar-neutrino count uses an approximate fingernail area. Pauli's hypothesis and the first detection are presented as the historical milestones of 1930 and 1956.
