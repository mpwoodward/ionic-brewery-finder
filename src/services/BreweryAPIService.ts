import { Geolocation } from '@capacitor/geolocation'

const apiURL = 'https://api.openbrewerydb.org/breweries'

export const getBreweriesByLocation = async () => {
  const loc = await Geolocation.getCurrentPosition()
  const breweries_res = await fetch(
      `${apiURL}?by_dist=${loc.coords.latitude},${loc.coords.longitude}l&per_page=10`
  )
  const breweriesJSON = await breweries_res.json()
  
  return breweriesJSON
}

export const getBreweriesByCity = async (city: string) => {
  const theCity = city.replaceAll('_', ' ')
  const breweries_res = await fetch(`${apiURL}?by_city=${theCity}&per_page=10`)
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}

export const getBreweriesByZip = async (zip: string) => {
  const breweries_res = await fetch(`${apiURL}?by_postal=${zip}&per_page=10`)
  const breweriesJSON = await breweries_res.json()

  return breweriesJSON
}
