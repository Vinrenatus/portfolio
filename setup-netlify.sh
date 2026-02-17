#!/bin/bash

# Netlify Quick Setup Script for Hamman Muraya's Portfolio
# Run this script to quickly set up Netlify deployment

echo "🚀 Netlify Quick Setup for Hamman Muraya's Portfolio"
echo "===================================================="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check if logged in
echo ""
echo "🔐 Checking Netlify authentication..."
if ! netlify api --endpoint /ping &> /dev/null; then
    echo "Please login to Netlify:"
    netlify login
fi

# Initialize site
echo ""
echo "⚙️  Initializing Netlify site..."
netlify init

# Deploy
echo ""
echo "🚀 Deploying to Netlify..."
netlify deploy --prod

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Push your code to GitHub"
echo "   2. Connect your GitHub repo to Netlify for auto-deploys"
echo "   3. Add custom domain (optional) in Netlify dashboard"
echo ""
echo "🎉 Your portfolio is live!"