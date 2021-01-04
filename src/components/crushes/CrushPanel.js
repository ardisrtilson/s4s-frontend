import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef, createRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import WaveSurfer from "wavesurfer.js";

export const CrushPanel = ({sample}) => {

  const [ faves, setFaves ] = useState([])
  const [ thisUserFavorites, setThisUserFavorites ] = useState([])
  const [ currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))

  const lineRefs = useRef([])
  const waveformRef = useRef(null)
  const waveformRef2 = useRef(null)

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({ 
      container: waveformRef.current,
      cursorColor: "transparent",
      backgroundColor: "black"
    });
    waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
    waveformRef.current.setWaveColor("red")
  }, [])

  useEffect(() => {
    waveformRef2.current = WaveSurfer.create({ 
      container: waveformRef2.current,
      cursorColor: "transparent",
      backgroundColor: "black"
    });
    waveformRef2.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
    waveformRef2.current.setWaveColor("red")
  }, [])

  const {
    favorites, 
    releaseFavorite, 
    getFavorites,
    getUsers,
    getSamples,
    samples,
    getRatings,
  } = useContext(SampleContext)

  useEffect(() => {
    getUsers().then(
    getFavorites()).then(
    getRatings()).then(
    getSamples())
}, [])

useEffect(() => {
  lineRefs.current = samples.map((_, i) => lineRefs.current[i] ?? createRef())
  console.log(lineRefs.current)
}, [samples])

useEffect(() => {
  setThisUserFavorites(favorites.filter(faves => faves.user_id === currentUser))
}, [favorites, currentUser])

useEffect(() => {
  if (samples && samples.length){
    setFaves(thisUserFavorites.map(fave => samples.find(sample => fave.sample_id === sample.id)))
  }
}, [thisUserFavorites, samples])

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
                <div class>
                <div ref={waveformRef} />
                <div ref={waveformRef2} />
                {/* <div ref={lineRefs.current[1]} /> */}
                        </div>
                {
                    faves.map(sample => {
                        return (
                          <section>
                          <img class="img" src={sample.sample_image}></img>
                            <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
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