import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef, createRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import WaveSurfer from "wavesurfer.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AvgRating from '@material-ui/lab/Rating';
import ReactColorSquare from "react-color-square";

export const CrushPanel = ({sample}) => {

  const [ faves, setFaves ] = useState([])
  const [ sort, setSort ] = useState([])
  const [ thisUserFavorites, setThisUserFavorites ] = useState([])
  const [ currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))

  const lineRefs = useRef([])
  const waveformRef = useRef(null)
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
}, [])

useEffect(() => {
  lineRefs.current = samples.map((_, i) => lineRefs.current[i] ?? createRef())
}, [samples])

useEffect(() => {
  setThisUserFavorites(favorites.filter(faves => faves.user_id === currentUser))
}, [favorites, currentUser])

useEffect(() => {
  if(sort === 1){setFaves(faves.sort((a, b) => (a.averageRating > b.averageRating) ? 1 : -1))}
  else if (sort === 2){setFaves(faves.sort((a, b) => (a.averageColor > b.averageColor) ? 1 : -1))}
  else if (sort === 3){setFaves(faves.sort((a, b) => (a.averageLoudness > b.averageLoudness) ? 1 : -1))}
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
          <MenuItem value={1}>Avg. Rating</MenuItem>
          <MenuItem value={2}>Color</MenuItem>
          <MenuItem value={3}>Subjective Volume</MenuItem>
          <MenuItem value={4}>Alphabetical</MenuItem>
          <MenuItem value={5}>Reverse Alphabetical</MenuItem>
        </Select>
                <div class>
                <div ref={waveformRef} />
                {/* <div ref={lineRefs.current[1]} /> */}
                        </div>
                {
                    faves.map(sample => {
                      let thisSampleFavorites = ratings.filter(rating => rating.sample.id === sample.id)
                      let averageRating = thisSampleFavorites.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
                      let averageLoudness = thisSampleFavorites.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
                      let averageColor = thisSampleFavorites.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
                      let averageColorHex = Math.round(averageColor).toString(16)
                      if(isNaN(averageColorHex)){averageColorHex = "ffffff"}
                      averageColorHex = '#' + averageColorHex
                      if(isNaN(averageLoudness)){averageLoudness = 1.0}
                      if(isNaN(averageRating)){averageRating = 0}
                      sample.averageColorHex = averageColorHex
                      sample.averageLoudness = averageLoudness 
                      sample.averageRating = averageRating
                        return (
                          <section>
                          <img class="img" src={sample.sample_image}></img>
                            <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                            <AvgRating 
                            value={averageRating}/>
                            <ReactColorSquare height={150} color={averageColorHex} text="Average Color" />
                                  <AudioPlayer 
                                      autoPlayAfterSrcChange={false}
                                      preload="true"
                                      volume={averageLoudness}
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