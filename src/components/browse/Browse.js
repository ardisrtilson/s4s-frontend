import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState} from "react"
import "./Browse.css"
import AudioPlayer from 'react-h5-audio-player';

export const Browse = ({sample}) => {
  const { customers, addFavorites, favorites, releaseFavorite, getFavorites} = useContext(SampleContext)
  const currentUser = parseInt(localStorage.getItem("customer"))
  let thisUserFavorites = favorites.filter(faves => faves.customerId === currentUser)
  let foundFave = thisUserFavorites.find(fave => fave.sampleId === sample.id)
  if (foundFave === undefined) {foundFave= false}
  let isFavorite = foundFave.customerId === currentUser
  const customerName = customers.find(customer => customer.id === sample.customerId) || {}

        const downloadFile = () => {
          window.location.href = sample.url
        }
        const addSampleToFavorites = () => {
          addFavorites({
            customerId: parseInt(localStorage.getItem("customer")),
            sampleId: sample.id
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
            src={sample.url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button2" onClick={removeFavorite}>Skip</button>
</section>
</>
)}

else{
return (
<section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
        <AudioPlayer 
            preload
            src={sample.url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button2" onClick={removeFavorite}>Skip</button>
        <button class="button2" onClick={addSampleToFavorites}>Crush</button>
</section>
  )}
}