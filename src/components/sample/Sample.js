import { SampleContext } from "./SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player'
import WaveSurfer from "wavesurfer.js";

export const Sample = ({sample}) => {
  

  const waveformRef = useRef(null);

  useEffect(() => {
    getSamples()
    getFavorites()
  }, [])

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({ 
      container: waveformRef.current,
      cursorColor: "transparent",
      backgroundColor: "black"
    });
    waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
    waveformRef.current.setWaveColor("red")
  }, []);

  const { users, favorites, getFavorites, getSamples, releaseSample} = useContext(SampleContext)
  const currentUser = parseInt(localStorage.getItem("user_number"))
  let thisUserFavorites = favorites.filter(faves => faves.user_id === parseInt(currentUser))
  let foundFave = thisUserFavorites.find(fave => fave.sample_id === sample.id)
  if (foundFave === undefined) {foundFave= false}
  const userName = users.find(customer => customer.id === sample.customerId) || {}

        const downloadFile = () => {
          window.location.href = sample.audio_url
        }
        const deleteSample = (sampleId) => {
          releaseSample(sampleId)
        }

return (
<>
<img class="img" src={sample.sample_image}></img>
<section>
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
  <div ref={waveformRef} />
        <AudioPlayer 
            preload="true"
            src={sample.audio_url}
            onPlay={e => console.log("onPlay")}/>
        <button class="button3" onClick={downloadFile}>Download Sample</button>
        <button class="button3" onClick={()=> deleteSample(sample.id)}>Delete Sample</button>
</section>
</>
)}