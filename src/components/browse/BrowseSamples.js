// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'

export const BrowseSamples = (props) => {
    const {favorites,  
        getUsers,
        getFavorites,
        getSamples,
        getRandomSample,
        randomSample,
        addFavorites,
    } = useContext(SampleContext)
    
    const [ filteredSamples, setFiltered ] = useState([])

    useEffect(() => {
        getSamples()
        getUsers()
        getRandomSample()
    }, [favorites])

    const addSampleToFavorites = () => {
        addFavorites({
          user: parseInt(localStorage.getItem("user_number")),
          sample: randomSample.id
      })
      getFavorites()
      }

    // JSX

        return (
            <>
<section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${randomSample.id}`}>{randomSample.name}</Link></div>
        <AudioPlayer 
            autoPlayAfterSrcChange={false}
            src={randomSample.audio_url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button5" onClick={getFavorites}>Skip</button>
        <button class="button3" onClick={addSampleToFavorites}>Love</button>
</section>
            </>     
        )}