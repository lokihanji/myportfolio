# My Portfolio

A modern portfolio website built with Laravel, React, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+
- Node.js 18+
- Composer
- SQLite (or MySQL/PostgreSQL)

### Local Development
1. Clone the repository
2. Install PHP dependencies: `composer install`
3. Install Node.js dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure your database
5. Run migrations: `php artisan migrate`
6. Start the development server: `php artisan serve`
7. In another terminal, start Vite: `npm run dev`

### Building for Production
```bash
npm run build
```

## 🌐 GitHub Pages Deployment

This project is configured to deploy the frontend to GitHub Pages automatically.

### Setup Steps:
1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main branch** - The GitHub Action will automatically:
   - Build the React frontend
   - Deploy to GitHub Pages

3. **Access your site** at: `https://yourusername.github.io/yourrepository`

### Manual Deployment
If you prefer to deploy manually:
```bash
npm run build
# Then upload the contents of public/build to GitHub Pages
```

## 📁 Project Structure

- `app/` - Laravel backend (Models, Controllers, etc.)
- `resources/js/` - React frontend components
- `resources/css/` - Tailwind CSS styles
- `database/` - Database migrations and seeders
- `public/` - Built assets and entry point

## 🛠️ Built With

- **Backend**: Laravel 11
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Database**: SQLite (default)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
