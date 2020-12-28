import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';

export const CrushPanel = ({sample}) => {

  const {favorites, releaseFavorite, getFavorites} = useContext(SampleContext)

  const currentUser = parseInt(localStorage.getItem("user_number"))
  let thisUserFavorites = favorites.filter(faves => faves.user_id === currentUser)
  let foundFave = thisUserFavorites.find(fave => fave.sample_id === sample.id)
  if (foundFave === undefined) {foundFave= false}
  let isFavorite = foundFave.user_id === currentUser

        const downloadFile = () => {
          window.location.href = sample.audio_url
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
            preload="true"
            src={sample.audio_url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button5" onClick={removeFavorite}>Remove Favorite</button>
        <button class="button3" onClick={downloadFile}>Download Sample</button>
</section>
</>
)}

else{
return (
 null
  )}
}