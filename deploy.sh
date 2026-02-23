#!/bin/bash

# Quick Deploy Script for Victor's Portfolio
# Run this to deploy to Netlify

echo "🚀 Deploying to Netlify..."

cd /home/la-patrona/portfolio

# Build the project
echo "📦 Building..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying..."
npx netlify deploy --prod --dir=dist --site=victornjoroge

echo "✅ Deploy complete!"
echo "🌍 Your site is live at: https://victornjoroge.netlify.app"