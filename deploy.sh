#!/bin/bash

# Quick Deploy Script for Hamman's Portfolio
# Run this to deploy to Netlify

echo "🚀 Deploying to Netlify..."

cd /home/la-patrona/portfolio

# Build the project
echo "📦 Building..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying..."
npx netlify deploy --prod --dir=dist --site=hamanmuraya

echo "✅ Deploy complete!"
echo "🌍 Your site is live at: https://hamanmuraya.netlify.app"