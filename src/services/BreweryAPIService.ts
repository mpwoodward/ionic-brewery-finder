/**
 * BreweryAPIService
 * 
 * Handles fetching brewery data from the Open Brewery DB API.
 * Provides methods to search for breweries by location, city, and zip.
 * Also handles fetching saved/favorite breweries from the FavoritesStore.
 */
import { Geolocation } from '@capacitor/geolocation'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import { Brewery } from '@/interfaces/interfaces'

const apiURL = 'https://api.openbrewerydb.org/breweries'
const favoritesStore = useFavoritesStore()

export const getBreweriesByLocation = async () => {
  // Get device location
  const loc = await Geolocation.getCurrentPosition()

  // Fetch breweries by location
  const breweries_res = await fetch(
      `${apiURL}?by_dist=${loc.coords.latitude},${loc.coords.longitude}l&per_page=20`
  )

  // Parse response
  const breweriesJSON = await breweries_res.json()
  
  return breweriesJSON
}

export const getBreweriesByCity = async (city: string) => {
  // Format city name
  const theCity = city.replaceAll('_', ' ')

  // Fetch breweries by city
  const breweries_res = await fetch(`${apiURL}?by_city=${theCity}&per_page=20`)

  // Parse response
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}

export const getBreweriesByZip = async (zip: string) => {
  // Fetch breweries by zip
  const breweries_res = await fetch(`${apiURL}?by_postal=${zip}&per_page=20`)

  // Parse response
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}

export const getFavoriteBreweries = async () => {
  // Fetch favorite brewery IDs from Store
  const favoriteIds = await favoritesStore.getFavorites

  const favoriteBreweries = [] as Brewery[]

  // Fetch each brewery by ID
  favoriteIds?.forEach(async (favoriteId: string) => {
    const brewery_res = await fetch(`${apiURL}/${favoriteId}`)
    const breweryJSON = await brewery_res.json()

    favoriteBreweries.push({
      id: breweryJSON['id'],
      name: breweryJSON['name'],
      address: breweryJSON['street'],
      city: breweryJSON['city'],
      state: breweryJSON['state'],
      zip: breweryJSON['zip'],
      phone: breweryJSON['phone'],
      website: breweryJSON['website_url'],
      latitude: parseFloat(breweryJSON['latitude']),
      longitude: parseFloat(breweryJSON['longitude'])
    } as Brewery)
  })

  return favoriteBreweries
}
