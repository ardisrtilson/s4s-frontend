import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, { useContext, useState, useEffect, useRef, createRef } from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AvgRating from '@material-ui/lab/Rating';
import ReactColorSquare from "react-color-square";
import hexSorter from 'hexsorter';

export const CrushPanel = ({ sample }) => {

  const [faves, setFaves] = useState([])
  const [sort, setSort] = useState([])
  const [thisUserFavorites, setThisUserFavorites] = useState([])
  const [currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))

  const handleControlledInputChange = (e) => {
    setSort(e.target.value)
  }

  const {
    favorites,
    releaseFavorite,
    getFavorites,
    getUsers,
    users,
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
    if (sort === 1) {
      setFaves(faves.sort((a, b) => (a.averageRating < b.averageRating) ? 1 : -1))
      getRatings()
    }
    else if (sort === 2) {
      setFaves(faves.sort((a, b) => (a.averageLoudness > b.averageLoudness) ? 1 : -1))
      getRatings()
    }
    else if (sort === 3) {
      setFaves(faves.sort((a, b) => (a.name > b.name) ? 1 : -1))
      getRatings()
    }
    else if (sort === 4) {
      setFaves(faves.sort((a, b) => (a.name < b.name) ? 1 : -1))
      getRatings()
    }
    else if (sort === 5) {
      let hexArray = faves.map(faveHex => (faveHex.averageColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostSaturatedColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 6) {
      let hexArray = faves.map(faveHex => (faveHex.averageColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 7) {
      let hexArray = faves.map(faveHex => (faveHex.averageMascColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostSaturatedColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageMascColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageMascColorHex.substring(1) > b.averageMascColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 8) {
      let hexArray = faves.map(faveHex => (faveHex.averageMascColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageMascColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageMascColorHex.substring(1) > b.averageMascColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 9) {
      let hexArray = faves.map(faveHex => (faveHex.averageFemmeColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageFemmeColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageFemmeColorHex.substring(1) > b.averageFemmeColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 10) {
      let hexArray = faves.map(faveHex => (faveHex.averageFemmeColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
      let sortedHex = mostSaturatedColor.map(msc => faves.find(fave => fave.averageFemmeColorHex === msc))
      setFaves(sortedHex.sort((a, b) => (parseInt(a.averageFemmeColorHex.substring(1) > b.averageFemmeColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 11) {
      setFaves(faves.sort((a, b) => (a.averageMascLoudness > b.averageMascLoudness) ? 1 : -1))
      getRatings()
    }
    else if (sort === 12) {
      setFaves(faves.sort((a, b) => (a.averageFemmeLoudness > b.averageFemmeLoudness) ? 1 : -1))
      getRatings()
    }
    else if (sort === 13) {
      setFaves(faves.sort((a, b) => (a.averageMascRating < b.averageMascRating) ? 1 : -1))
      getRatings()
    }
    else if (sort === 14) {
      setFaves(faves.sort((a, b) => (a.averageFemmeRating < b.averageFemmeRating) ? 1 : -1))
      getRatings()
    }
  }, [sort])

  useEffect(() => {
    if (samples && samples.length) {
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
          <MenuItem value={2}>Subjective Volume(All)</MenuItem>
          <MenuItem value={3}>Alphabetical</MenuItem>
          <MenuItem value={4}>Reverse Alphabetical</MenuItem>
          <MenuItem value={5}>Color by Saturation(All)</MenuItem>
          <MenuItem value={6}>Color by Brightness(All)</MenuItem>
          <MenuItem value={7}>Saturation (Masc Users)</MenuItem>
          <MenuItem value={8}>Brightness (Masc Users)</MenuItem>
          <MenuItem value={9}>Brightness (Femme Users)</MenuItem>
          <MenuItem value={10}>Saturation (Femme Users)</MenuItem>
          <MenuItem value={11}>Subjective Volume(Masc Users)</MenuItem>
          <MenuItem value={12}>Subjective Volume (Femme Users)</MenuItem>
          <MenuItem value={13}>Avg. Rating (Masc Users)</MenuItem>
          <MenuItem value={14}>Avg. Rating (Femme Users)</MenuItem>
        </Select>
        <div class>
          {/* <div ref={lineRefs.current[1]} /> */}
        </div>
        {
          faves.map(sample => {
            let thisSampleFavorites = ratings.filter(rating => rating.sample.id === sample.id)
            let femmeRatings = ratings.filter(rating => rating.user.sex === 1)
            let mascRatings = ratings.filter(rating => rating.user.sex === 2)
            let thisSampleFemmeRatings = femmeRatings.filter(rating => rating.sample.id === sample.id)
            let thisSampleMascRatings = mascRatings.filter(rating => rating.sample.id === sample.id)
            let averageRating = thisSampleFavorites.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
            let averageMascRating = thisSampleMascRatings.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
            let averageFemmeRating = thisSampleFemmeRatings.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
            let averageMascLoudness = thisSampleMascRatings.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
            let averageFemmeLoudness = thisSampleFemmeRatings.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
            let averageLoudness = thisSampleFavorites.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
            let averageColor = thisSampleFavorites.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
            let averageMascColor = thisSampleMascRatings.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
            let averageFemmeColor = thisSampleFemmeRatings.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
            let averageColorHex = Math.round(averageColor).toString(16)
            let averageMascColorHex = Math.round(averageMascColor).toString(16)
            let averageFemmeColorHex = Math.round(averageFemmeColor).toString(16)
            averageColorHex = `#` + averageColorHex
            averageMascColorHex = `#` + averageMascColorHex
            averageFemmeColorHex = `#` + averageFemmeColorHex
            if (isNaN(averageLoudness)) { averageLoudness = 1.0 }
            if (isNaN(averageRating)) { averageRating = 0 }
            if (averageColorHex === "#NaN") { averageColorHex = '#ffffff' }
            if (isNaN(averageMascLoudness)) { averageMascLoudness = 1.0 }
            if (isNaN(averageMascRating)) { averageMascRating = 0 }
            if (averageMascColorHex === "#NaN") { averageMascColorHex = '#ffffff' }
            if (isNaN(averageFemmeLoudness)) { averageFemmeLoudness = 1.0 }
            if (isNaN(averageFemmeRating)) { averageFemmeRating = 0 }
            if (averageFemmeColorHex === "#NaN") { averageFemmeColorHex = '#ffffff' }
            sample.averageColorHex = averageColorHex
            sample.averageLoudness = averageLoudness
            sample.averageRating = averageRating
            sample.averageFemmeColorHex = averageFemmeColorHex
            sample.averageFemmeLoudness = averageFemmeLoudness
            sample.averageFemmeRating = averageFemmeRating
            sample.averageMascColorHex = averageMascColorHex
            sample.averageMascLoudness = averageMascLoudness
            sample.averageMascRating = averageMascRating
            return (
              <section class="playerContainer">
                <img class="img" src={sample.sample_image}></img>
                <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                <AvgRating
                  value={averageRating} />
                <ReactColorSquare height={100} width={558} color={averageColorHex} text="" />
                <AudioPlayer
                  autoPlayAfterSrcChange={false}
                  preload="true"
                  volume={averageLoudness}
                  src={sample.audio_url}
                  onPlay={e => console.log("onPlay")} />
                <button class="button5" onClick={() => removeFavorite(sample)}>Remove Favorite</button>
                <button class="button3" onClick={() => downloadFile(sample)}>Download Sample</button>
              </section>)
          })
        }
      </div>
    </>
  )
}