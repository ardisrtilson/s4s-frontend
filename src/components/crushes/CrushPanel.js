import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
// import WaveSurfer from "wavesurfer.js";

export const CrushPanel = ({sample}) => {

  const [ filteredSamples, setFiltered ] = useState([])

  // const waveformRef = useRef(null)

  const {
    favorites, 
    releaseFavorite, 
    getFavorites,
    filterValue, 
    getUsers,
    getSamples,
    samples,
    ratings,
    searchTerms,
    getRatings,
  } = useContext(SampleContext)

  useEffect(() => {
    getSamples()
    getUsers()
    getFavorites()
    getRatings()
}, [])

  // useEffect(() => {
  //   waveformRef.current = WaveSurfer.create({ 
  //     container: waveformRef.current,
  //     cursorColor: "transparent",
  //     backgroundColor: "black"
  //   });
  //   waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
  //   waveformRef.current.setWaveColor("white")
  // }, [])

  const currentUser = parseInt(localStorage.getItem("user_number"))
  let thisUserFavorites = favorites.filter(faves => faves.user_id === currentUser)
  let faves = thisUserFavorites.map(fave => samples.find(sample => fave.sample_id === sample.id))

        const downloadFile = () => {
          window.location.href = sample.audio_url
        }

        const removeFavorite = (sample) => {
          let favId = thisUserFavorites.find(favorite => favorite.sample_id === sample.id)
          releaseFavorite(favId.id).then(getFavorites)
        }

return (
  <>
  <div className="samples">
                <div class="sampleCard">
                        </div> 
                {
                    faves.map(sample => {
                        return (
                          <section>
                          <img class="img" src={sample.sample_image}></img>
                            <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                            {/* <div ref={waveformRef} /> */}
                                  <AudioPlayer 
                                      autoPlayAfterSrcChange={false}
                                      preload="true"
                                      src={sample.audio_url}
                                      onPlay={e => console.log("onPlay")}/>
                                  <button class="button5" onClick={()=>removeFavorite(sample)}>Remove Favorite</button>
                                  <button class="button3" onClick={downloadFile}>Download Sample</button>
                          </section>)
                    })
                }
            </div> 
</>
)
}