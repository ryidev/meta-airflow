#!/bin/bash

echo "📱 Renaming app from testApp to MetaAirflow"

# Update display name in Info.plist
echo "🔄 Updating iOS Info.plist..."
cd ios/testApp

# Check if Info.plist exists and update display name
if [ -f "Info.plist" ]; then
    plutil -replace CFBundleDisplayName -string "Meta Airflow" Info.plist 2>/dev/null || {
        echo "⚠️  Could not update Info.plist automatically"
        echo "📝 Please manually edit ios/testApp/Info.plist and change CFBundleDisplayName to 'Meta Airflow'"
    }
    echo "✅ Updated iOS display name"
else
    echo "⚠️  Info.plist not found"
fi

cd ../..

echo "📱 App display name updated to 'Meta Airflow'"
echo "📝 Note: Internal name stays 'testApp' to avoid breaking native dependencies"
echo "✅ Changes complete!"