import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-brewery-finder',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    'url': 'http://localhost:8100'
  }
};

export default config;
