#!/bin/bash

echo "🔧 Configuring iOS development team for MetaAirflow..."

# Navigate to iOS directory
cd "$(dirname "$0")/ios"

# Check if Xcode is installed
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Xcode command line tools not found. Please install Xcode."
    exit 1
fi

# Get available development teams
echo "🔍 Checking for available development teams..."
TEAMS=$(security find-identity -v -p codesigning | grep "iPhone Developer" | head -5)

if [ -z "$TEAMS" ]; then
    echo "⚠️  No development certificates found."
    echo ""
    echo "🎯 Quick fixes:"
    echo "1. For simulator only (recommended): npx react-native run-ios --simulator"
    echo "2. Open Xcode and sign in with Apple ID for device builds"
    echo "3. Or disable code signing in Xcode project settings"
    echo ""
    
    # Try to configure for simulator-only builds
    echo "🔄 Configuring for simulator builds..."
    sed -i '' 's/DEVELOPMENT_TEAM = ""/DEVELOPMENT_TEAM = "";/g' testApp.xcodeproj/project.pbxproj
    sed -i '' 's/"CODE_SIGN_IDENTITY\[sdk=iphoneos\*\]" = "iPhone Developer"/"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "";/g' testApp.xcodeproj/project.pbxproj
    
    echo "✅ Configured for simulator-only builds"
    echo "📱 Run: npx react-native run-ios --simulator=\"iPhone 17 Pro\""
    exit 0
fi

echo "✅ Found development certificates:"
echo "$TEAMS"

# Try to get the team ID from the first available certificate
TEAM_ID=$(echo "$TEAMS" | head -1 | grep -o '[A-Z0-9]\{10\}' | head -1)

if [ ! -z "$TEAM_ID" ]; then
    echo "🔧 Configuring project with Team ID: $TEAM_ID"
    sed -i '' "s/DEVELOPMENT_TEAM = \"\";/DEVELOPMENT_TEAM = \"$TEAM_ID\";/g" testApp.xcodeproj/project.pbxproj
    echo "✅ Development team configured successfully!"
    echo "📱 You can now try: npx react-native run-ios"
else
    echo "⚠️  Could not extract Team ID automatically."
    echo "📝 Please open testApp.xcworkspace in Xcode and configure signing manually."
fi