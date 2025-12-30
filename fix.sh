#!/bin/bash

# 🔧 React Native Troubleshooting Script
# Gunakan script ini untuk fix error "Runtime Not Ready" dan masalah umum lainnya

echo "🔧 React Native Clean & Reset Script"
echo "===================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Ask user what to clean
echo "Pilih opsi:"
echo "1. Quick Fix - Reset Metro Cache (Recommended)"
echo "2. Clean Build - Android"
echo "3. Clean Build - iOS"
echo "4. Nuclear Clean - Clear Everything"
echo "5. Fix Port 8081 Issue"
echo ""
read -p "Masukkan pilihan (1-5): " choice

case $choice in
    1)
        print_info "Running Quick Fix..."
        echo ""
        
        # Stop Metro
        print_info "Stopping Metro bundler..."
        pkill -f "node.*metro" 2>/dev/null || true
        print_success "Metro stopped"
        
        # Clear Metro cache
        print_info "Clearing Metro cache..."
        rm -rf node_modules/.cache 2>/dev/null || true
        rm -rf $TMPDIR/react-* 2>/dev/null || true
        rm -rf $TMPDIR/metro-* 2>/dev/null || true
        print_success "Cache cleared"
        
        # Clear watchman
        if command -v watchman &> /dev/null; then
            print_info "Clearing Watchman cache..."
            watchman watch-del-all 2>/dev/null || true
            print_success "Watchman cleared"
        fi
        
        echo ""
        print_success "Quick Fix Done!"
        echo ""
        print_info "Now run: npx react-native start --reset-cache"
        ;;
        
    2)
        print_info "Cleaning Android Build..."
        echo ""
        
        # Stop Metro
        pkill -f "node.*metro" 2>/dev/null || true
        
        # Clean Android
        if [ -d "android" ]; then
            print_info "Cleaning Gradle..."
            cd android
            ./gradlew clean 2>/dev/null || print_warning "Gradle clean failed"
            ./gradlew cleanBuildCache 2>/dev/null || print_warning "Gradle cache clean failed"
            cd ..
            
            print_info "Removing build folders..."
            rm -rf android/app/build
            rm -rf android/.gradle
            print_success "Android build cleaned"
        else
            print_error "Android folder not found"
        fi
        
        # Clear Metro cache
        rm -rf node_modules/.cache 2>/dev/null || true
        rm -rf $TMPDIR/react-* 2>/dev/null || true
        
        echo ""
        print_success "Android Clean Done!"
        echo ""
        print_info "Now run:"
        print_info "1. Terminal 1: npx react-native start --reset-cache"
        print_info "2. Terminal 2: npx react-native run-android"
        ;;
        
    3)
        print_info "Cleaning iOS Build..."
        echo ""
        
        # Stop Metro
        pkill -f "node.*metro" 2>/dev/null || true
        
        # Clean iOS
        if [ -d "ios" ]; then
            print_info "Removing Pods..."
            rm -rf ios/Pods
            rm -rf ios/Podfile.lock
            rm -rf ios/build
            print_success "iOS build cleaned"
            
            print_info "Reinstalling Pods..."
            cd ios
            pod cache clean --all 2>/dev/null || print_warning "Pod cache clean failed"
            pod install || print_error "Pod install failed"
            cd ..
            print_success "Pods reinstalled"
        else
            print_error "iOS folder not found"
        fi
        
        # Clear Metro cache
        rm -rf node_modules/.cache 2>/dev/null || true
        rm -rf $TMPDIR/react-* 2>/dev/null || true
        
        echo ""
        print_success "iOS Clean Done!"
        echo ""
        print_info "Now run:"
        print_info "1. Terminal 1: npx react-native start --reset-cache"
        print_info "2. Terminal 2: npx react-native run-ios"
        ;;
        
    4)
        print_warning "Nuclear Clean - This will remove EVERYTHING!"
        read -p "Are you sure? (y/N): " confirm
        
        if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
            print_info "Cancelled"
            exit 0
        fi
        
        echo ""
        print_info "Starting Nuclear Clean..."
        echo ""
        
        # Stop Metro
        print_info "Stopping Metro..."
        pkill -f "node.*metro" 2>/dev/null || true
        print_success "Metro stopped"
        
        # Clear node_modules
        print_info "Removing node_modules..."
        rm -rf node_modules
        print_success "node_modules removed"
        
        # Clear iOS
        if [ -d "ios" ]; then
            print_info "Cleaning iOS..."
            rm -rf ios/Pods ios/Podfile.lock ios/build
            print_success "iOS cleaned"
        fi
        
        # Clear Android
        if [ -d "android" ]; then
            print_info "Cleaning Android..."
            rm -rf android/app/build android/.gradle
            print_success "Android cleaned"
        fi
        
        # Clear all caches
        print_info "Clearing all caches..."
        rm -rf $TMPDIR/react-* $TMPDIR/metro-* $TMPDIR/haste-*
        rm -rf ~/.gradle/caches/ 2>/dev/null || true
        
        if command -v watchman &> /dev/null; then
            watchman watch-del-all 2>/dev/null || true
        fi
        print_success "Caches cleared"
        
        echo ""
        print_success "Nuclear Clean Done!"
        echo ""
        print_info "Now run these commands:"
        print_info "1. npm install"
        print_info "2. cd ios && pod install && cd .. (for iOS)"
        print_info "3. npx react-native start --reset-cache"
        print_info "4. npx react-native run-android (or run-ios)"
        ;;
        
    5)
        print_info "Fixing Port 8081 Issue..."
        echo ""
        
        # Kill process on port 8081
        print_info "Killing process on port 8081..."
        lsof -ti:8081 | xargs kill -9 2>/dev/null || print_warning "No process found on port 8081"
        
        # Kill Metro processes
        pkill -f "node.*metro" 2>/dev/null || true
        
        print_success "Port 8081 cleared"
        echo ""
        print_info "Now run: npx react-native start"
        ;;
        
    *)
        print_error "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "===================================="
print_success "Script completed!"
echo ""
