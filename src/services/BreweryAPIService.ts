import { Geolocation } from '@capacitor/geolocation'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import { Brewery } from '@/interfaces/interfaces'

const apiURL = 'https://api.openbrewerydb.org/breweries'

export const getBreweriesByLocation = async () => {
  const loc = await Geolocation.getCurrentPosition()
  const breweries_res = await fetch(
      `${apiURL}?by_dist=${loc.coords.latitude},${loc.coords.longitude}l&per_page=20`
  )
  const breweriesJSON = await breweries_res.json()
  
  return breweriesJSON
}

export const getBreweriesByCity = async (city: string) => {
  const theCity = city.replaceAll('_', ' ')
  const breweries_res = await fetch(`${apiURL}?by_city=${theCity}&per_page=20`)
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}

export const getBreweriesByZip = async (zip: string) => {
  const breweries_res = await fetch(`${apiURL}?by_postal=${zip}&per_page=20`)
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}

export const getFavoriteBreweries = async () => {
  const favoritesStore = useFavoritesStore()
  const favoriteIds = favoritesStore.getFavorites
  const favoriteBreweries = [] as Brewery[]

  console.log(favoriteIds)

  favoriteIds?.forEach(async (favoriteId: string) => {
    const brewery_res = await fetch(`${apiURL}/${favoriteId}`)
    const breweryJSON = await brewery_res.json()

    console.log(breweryJSON)

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

  console.log(favoriteBreweries)

  return favoriteBreweries
}
