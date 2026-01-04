import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';

interface MapTilerViewProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect?: (latitude: number, longitude: number) => void;
  height?: number;
  showLocationPicker?: boolean;
}

const MapTilerView: React.FC<MapTilerViewProps> = ({
  latitude = 3.1390,
  longitude = 101.6869,
  onLocationSelect,
  height = 250,
  showLocationPicker = false,
}) => {
  const { theme } = useTheme();
  const webViewRef = useRef<WebView>(null);
  const isDark = theme === 'dark';

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    html, body { height: 100%; width: 100%; }
    #map { height: 100%; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    (function() {
      const lat = ${latitude};
      const lng = ${longitude};
      const isDark = ${isDark};
      const showPicker = ${showLocationPicker};

      const map = L.map('map', {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });

      const tileUrl = 'https://api.maptiler.com/maps/' +
        (isDark ? 'streets-v2-dark' : 'streets-v2') +
        '/{z}/{x}/{y}.png?key=pgR2s5GhaTpw9T2OsPGv';

      L.tileLayer(tileUrl, {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 19
      }).addTo(map);

      let marker;

      if (showPicker) {
        marker = L.marker([lat, lng], { draggable: true }).addTo(map);

        marker.on('dragend', function() {
          const pos = marker.getLatLng();
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'location',
            latitude: pos.lat,
            longitude: pos.lng
          }));
        });

        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'location',
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          }));
        });
      } else {
        L.marker([lat, lng]).addTo(map);
      }

      window.updateLocation = function(newLat, newLng) {
        if (marker) {
          marker.setLatLng([newLat, newLng]);
        }
        map.setView([newLat, newLng], 14);
      };

      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'loaded' }));
    })();
  </script>
</body>
</html>`;

  useEffect(() => {
    if (webViewRef.current && latitude && longitude) {
      webViewRef.current.injectJavaScript(`
        if (typeof updateLocation !== 'undefined') {
          updateLocation(${latitude}, ${longitude});
        }
        true;
      `);
    }
  }, [latitude, longitude]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'location' && onLocationSelect) {
        onLocationSelect(data.latitude, data.longitude);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webView}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={['*']}
        mixedContentMode="compatibility"
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0F6980" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default MapTilerView;
