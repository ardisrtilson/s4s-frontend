import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect} from "react"
import "../sample/Samples.css"
import AudioPlayer from 'react-h5-audio-player'

export const Browse = ({sample}) => {
  
  useEffect(() => {
    getSamples()
    getFavorites()
  }, [])

  const { users, addFavorites, favorites, releaseFavorite, getFavorites, getSamples} = useContext(SampleContext)
  const currentUser = parseInt(localStorage.getItem("user_number"))
  let thisUserFavorites = favorites.filter(faves => faves.user_id === parseInt(currentUser))
  let foundFave = thisUserFavorites.find(fave => fave.sample_id === sample.id)
  if (foundFave === undefined) {foundFave= false}
  let isFavorite = foundFave.user_id === currentUser
  

        const downloadFile = () => {
          window.location.href = sample.url
        }
        const addSampleToFavorites = () => {
          addFavorites({
            user: parseInt(localStorage.getItem("user_number")),
            sample: sample.id
        })
        }
        const removeFavorite = () => {
          releaseFavorite(foundFave.id).then(getFavorites)
        }

if (isFavorite){
return (
<>
<section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
        <AudioPlayer 
            preload
            src={sample.audio_url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button5" onClick={removeFavorite}>Remove Favorite</button>
        <button class="button3" onClick={downloadFile}>Download Sample</button>
</section>
</>
)}

else{
return (
<section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
        <AudioPlayer 
            preload
            src={sample.audio_url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button2" onClick={addSampleToFavorites}>Add Favorite</button>
        <button class="button3" onClick={downloadFile}>Download Sample</button>
</section>
  )}
}