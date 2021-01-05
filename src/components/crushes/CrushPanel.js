import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef, createRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AvgRating from '@material-ui/lab/Rating';
import ReactColorSquare from "react-color-square";
import hexSorter from 'hexsorter';

export const CrushPanel = ({sample}) => {

  const [ faves, setFaves ] = useState([])
  const [ sort, setSort ] = useState([])
  const [ thisUserFavorites, setThisUserFavorites ] = useState([])
  const [ currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))

  const handleControlledInputChange = (e) => {
    setSort(e.target.value)
}

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
  setThisUserFavorites(favorites.filter(faves => faves.user_id === currentUser))
}, [favorites, currentUser])

useEffect(() => {
  if(sort === 1){setFaves(faves.sort((a, b) => (a.averageRating < b.averageRating) ? 1 : -1))
  getRatings()}
  else if (sort === 2){setFaves(faves.sort((a, b) => (a.averageLoudness > b.averageLoudness) ? 1 : -1))
    getRatings()}
  else if (sort === 3){setFaves(faves.sort((a, b) => (a.name > b.name) ? 1 : -1))
  getRatings()}
  else if (sort === 4){setFaves(faves.sort((a, b) => (a.name < b.name) ? 1 : -1))
  getRatings()}
  else if (sort === 5){
    let hexArray = faves.map(faveHex => (faveHex.averageColorHex))
    var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostSaturatedColor')
    let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageColorHex === msc))
    setFaves(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
    getRatings()}
  else if (sort === 6){
    let hexArray = faves.map(faveHex => (faveHex.averageColorHex))
    var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
    let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageColorHex === msc))
    setFaves(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
    getRatings()}
}, [sort])

useEffect(() => {
  if (samples && samples.length){
    setFaves(thisUserFavorites.map(fave => samples.find(sample => fave.sample_id === sample.id)))
  }
}, [thisUserFavorites, samples])

        const downloadFile = (sample) => {
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
          <MenuItem value={2}>Subjective Volume</MenuItem>
          <MenuItem value={3}>Alphabetical</MenuItem>
          <MenuItem value={4}>Reverse Alphabetical</MenuItem>
          <MenuItem value={5}>Color by Saturation</MenuItem>
          <MenuItem value={6}>Color by Brightness</MenuItem>
        </Select>
                <div class>
                {/* <div ref={lineRefs.current[1]} /> */}
                        </div>
                {
                    faves.map(sample => {
                      let thisSampleFavorites = ratings.filter(rating => rating.sample.id === sample.id)
                      let averageRating = thisSampleFavorites.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
                      let averageLoudness = thisSampleFavorites.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
                      let averageColor = thisSampleFavorites.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
                      let averageColorHex = Math.round(averageColor).toString(16)
                      averageColorHex = `#` + averageColorHex
                      if(isNaN(averageLoudness)){averageLoudness = 1.0}
                      if(isNaN(averageRating)){averageRating = 0}
                      if(averageColorHex === "#NaN"){averageColorHex = '#ffffff'}
                      sample.averageColorHex = averageColorHex
                      sample.averageLoudness = averageLoudness 
                      sample.averageRating = averageRating
                        return (
                          <section class="playerContainer">
                          <img class="img" src={sample.sample_image}></img>
                            <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                            <AvgRating 
                            value={averageRating}/>
                            <ReactColorSquare height={100} width={558} color={averageColorHex} text="" />
                                  <AudioPlayer 
                                      autoPlayAfterSrcChange={false}
                                      preload="true"
                                      volume={averageLoudness}
                                      src={sample.audio_url}
                                      onPlay={e => console.log("onPlay")}/>
                                  <button class="button5" onClick={()=>removeFavorite(sample)}>Remove Favorite</button>
                                  <button class="button3" onClick={()=>downloadFile(sample)}>Download Sample</button>
                          </section>)
                    })
                  }
            </div> 
</>
)
}