import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

 const Home = () => {
    const [citySearched,setCitySearched]=useState("")
    const [getWeather,{loading,data,error}]=useLazyQuery(GET_WEATHER_QUERY,{
        variables:{name:citySearched},
    })
    if(error)
    {
        return <h1>Error Found</h1>
    }
    if(data)
    {
        console.log(data)
    }
  return (
    <div className='home'>
        <h1>Search for weather</h1>
        <input type="text" placeholder="City name" onChange={e=>setCitySearched(e.target.value)}></input>
        <button onClick={()=>getWeather()}>Search</button>
        <div className='weather'>
            {data && (
                <>
                <h1>{data.getCityByName.name}</h1>
                </>
            )}
        </div>
    </div>
  )
}

export default Home