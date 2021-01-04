import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef, createRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import WaveSurfer from "wavesurfer.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const CrushPanel = ({sample}) => {

  const [ faves, setFaves ] = useState([])
  const [ sort, setSort ] = useState([])
  const [ thisUserFavorites, setThisUserFavorites ] = useState([])
  const [ currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))

  const lineRefs = useRef([])
  const waveformRef = useRef(null)
  const waveformRef2 = useRef(null)

  const handleControlledInputChange = (e) => {
    setSort(e.target.value)
}

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
    ratings,
  } = useContext(SampleContext)

  useEffect(() => {
    getUsers().then(
    getFavorites()).then(
    getRatings()).then(
    getSamples())
    console.log(ratings)
}, [])

useEffect(() => {
  lineRefs.current = samples.map((_, i) => lineRefs.current[i] ?? createRef())
}, [samples])

useEffect(() => {
  setThisUserFavorites(favorites.filter(faves => faves.user_id === currentUser))
}, [favorites, currentUser])

useEffect(() => {
  if(sort === 1){console.log("Rating Selected")}
  else if (sort === 2){console.log("Color Selected")}
  else if (sort === 3){console.log("Volume Selected")}
  else if (sort === 4){setFaves(faves.sort((a, b) => (a.names > b.names) ? 1 : -1))
  getRatings()}
  else if (sort === 5){setFaves(faves.sort((a, b) => (a.names < b.names) ? 1 : -1))
  getRatings()}
}, [sort])

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
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          onChange={handleControlledInputChange}
        >
          <MenuItem value={0}>Sort By</MenuItem>
          <MenuItem value={1}>Rating</MenuItem>
          <MenuItem value={2}>Color</MenuItem>
          <MenuItem value={3}>Subjective Volume</MenuItem>
          <MenuItem value={4}>Alphabetical</MenuItem>
          <MenuItem value={5}>Reverse Alphabetical</MenuItem>
        </Select>
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