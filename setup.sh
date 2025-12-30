#!/bin/bash

# Property Rental App - Setup Script

echo "🚀 Setting up Property Rental App..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
    echo "${GREEN}✅ Dependencies installed${NC}"
else
    echo "${GREEN}✅ Dependencies already installed${NC}"
fi

# Check platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "${YELLOW}Setting up iOS...${NC}"
    
    # Check if Pods directory exists
    if [ ! -d "ios/Pods" ]; then
        echo "${YELLOW}Installing CocoaPods...${NC}"
        cd ios
        pod install
        if [ $? -ne 0 ]; then
            echo "${RED}❌ Failed to install CocoaPods${NC}"
            cd ..
            exit 1
        fi
        cd ..
        echo "${GREEN}✅ CocoaPods installed${NC}"
    else
        echo "${GREEN}✅ CocoaPods already installed${NC}"
    fi
fi

# Setup Android
echo "${YELLOW}Checking Android setup...${NC}"
if [ -f "android/gradlew" ]; then
    chmod +x android/gradlew
    echo "${GREEN}✅ Android Gradle wrapper configured${NC}"
fi

# Check if constants file has been configured
if grep -q "your-api-url.com" "src/constants/index.ts"; then
    echo "${YELLOW}⚠️  Please update API_BASE_URL in src/constants/index.ts${NC}"
fi

echo ""
echo "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Update API_BASE_URL in src/constants/index.ts"
echo "2. Start Metro bundler: ${YELLOW}npm start${NC}"
echo "3. Run on iOS: ${YELLOW}npm run ios${NC}"
echo "4. Run on Android: ${YELLOW}npm run android${NC}"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: SETUP_GUIDE.md"
echo "- API Integration: API_INTEGRATION.md"
echo "- Checklist: CHECKLIST.md"
echo ""
