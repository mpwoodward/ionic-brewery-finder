# Ionic Brewery Finder

This is a basic Ionic Vue.js application that helps users locate breweries based on their location, as well as save favorite breweries and add photos and tasting notes.

Leverages the [Open Brewery DB API](https://openbrewerydb.org/) for brewery data.

I stopped work on this before I got as far as adding sharing and other social features since it was mostly built for demo and learning purposes, so there's some features in here that aren't fully completed.

In addition, I didn't fully build out saving some of the data to Firestore, so some of the data, e.g., photos and tasting notes, is currently only saved in the Pinia store.

## Project Structure

 * `src/components` - Contains reusable Vue components
 * `src/views` - Contains page component files for each app view
 * `src/router` - Vue router setup
 * `src/store` - Pinia store setup

## Main App Pages/Features

 * `src/views/TabsPage` - Main app page with tab navigation
 * `src/views/Tab1Page` - Map view to search for nearby breweries using Capacitor Geolocation and Google Maps
 * `src/views/Tab2Page` - Simple map view of breweries
 * `src/views/Tab3Page` - Form to add tasting notes and photos for a brewery
 * `src/views/Tab4Page` - List of favorite breweries

## Capacitor Plugins Used

 * `@capacitor/camera` - Take photos
 * `@capacitor/geolocation` - Get user's location
 * `@capacitor/google-maps` - Display map and markers

To use the Google Maps features you'll need to get an API key from the [Google Cloud Platform](https://cloud.google.com/) and add it to an environment variable named `GOOGLE_MAPS_API_KEY`. See the `.env.example` file for reference.

## Firebase Integration

The Firebase SDK is used for authentication and storing brewery data in Firestore. The app is also configured for Firebase hosting.

`src/firebaseConfigSample.ts` contains a sample Firebase configuration file that you'll need to rename to `src/firebaseConfig.ts` and fill in with your own Firebase project's details.

# Getting Started

```
npm install
npm run serve
```
