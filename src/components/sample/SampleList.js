// react imports
import React, { useContext, useState, useEffect } from "react";
import { SampleContext } from "../sample/SampleProvider";
import MenuItem from '@material-ui/core/MenuItem';
import ReactColorSquare from "react-color-square";
import AvgRating from '@material-ui/lab/Rating';
import AudioPlayer from 'react-h5-audio-player';
import Select from '@material-ui/core/Select';
import { Link } from "react-router-dom";
import hexSorter from 'hexsorter';
import "./Samples.css";

export const SampleList = ({ sample }) => {

  const [sort, setSort] = useState([])
  const [thisUserSamples, setThisUserSamples] = useState([])
  const [currentUser, setCurrentUser] = useState(parseInt(localStorage.getItem("user_number")))
  const [thisUser, setThisUser] = useState([])

  const {
    favorites,
    getUsers,
    getSamples,
    samples,
    user,
    ratings,
    getRatings,
    getUserById,
    releaseSample
  } = useContext(SampleContext)

  const delete_prompt = (id) => {
    var retVal = window.confirm("Are you sure you want to delete your comment?");
    if( retVal == true ) {
        deleteSample(id)
        return true;
    } else {
        return false;
    }
}

  useEffect(() => {
    getSamples()
    getUsers()
    getRatings()
    getUserById(currentUser)
  }, [])

  useEffect(() => {

    if (sort === 1) {
      setThisUserSamples(thisUserSamples.sort((a, b) => (a.averageRating < b.averageRating) ? 1 : -1))
      getRatings()
    }
    else if (sort === 2) {
      setThisUserSamples(thisUserSamples.sort((a, b) => (a.averageLoudness > b.averageLoudness) ? 1 : -1))
      getRatings()
    }
    else if (sort === 3) {
      setThisUserSamples(thisUserSamples.sort((a, b) => (a.name > b.name) ? 1 : -1))
      getRatings()
    }
    else if (sort === 4) {
      setThisUserSamples(thisUserSamples.sort((a, b) => (a.name < b.name) ? 1 : -1))
      getRatings()
    }

    else if (sort === 5) {
      let hexArray = thisUserSamples.map(faveHex => (faveHex.averageColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostSaturatedColor')
      let sortedHex = mostSaturatedColor.map(msc => thisUserSamples.find(fave => fave.averageColorHex === msc))
      setThisUserSamples(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }
    else if (sort === 6) {
      let hexArray = thisUserSamples.map(faveHex => (faveHex.averageColorHex))
      var mostSaturatedColor = hexSorter.sortColors(hexArray, 'mostBrightColor')
      let sortedHex = mostSaturatedColor.map(msc => thisUserSamples.find(fave => fave.averageColorHex === msc))
      setThisUserSamples(sortedHex.sort((a, b) => (parseInt(a.averageColorHex.substring(1) > b.averageColorHex.substring(1)) ? 1 : -1)))
      getRatings()
    }

  }, [sort])

  const handleControlledInputChange = (e) => {
    setSort(e.target.value)
  }

  useEffect(() => {
    setThisUserSamples(samples.filter(sample => sample.uploader === currentUser))
  }, [favorites, currentUser, samples])

  const downloadFile = (sample) => {
      window.location.href = sample.audio_url
    console.log("")
  }

  const deleteSample = (sample) => {

    releaseSample(sample).then(getSamples)
    console.log("")
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
        <div class="sampleCard">
          <img class="img" src={user.profile_image}></img>
          <div>{thisUser}</div>
        </div>
        {
          thisUserSamples.map(sample => {
            let thisSampleFavorites = ratings.filter(rating => rating.sample.id === sample.id)
            let averageRating = thisSampleFavorites.reduce((total, next) => total + parseInt(next.rating), 0) / thisSampleFavorites.length;
            let averageLoudness = thisSampleFavorites.reduce((total, next) => total + parseFloat(next.loudness), 0) / thisSampleFavorites.length;
            let averageColor = thisSampleFavorites.reduce((total, next) => total + parseInt(next.color.substring(1), 16), 0) / thisSampleFavorites.length;
            let averageColorHex = Math.round(averageColor).toString(16)
            averageColorHex = `#` + averageColorHex
            if (isNaN(averageLoudness)) { averageLoudness = 1.0 }
            if (isNaN(averageRating)) { averageRating = 0 }
            if (averageColorHex === "#NaN") { averageColorHex = '#ffffff' }
            sample.averageColorHex = averageColorHex
            sample.averageLoudness = averageLoudness
            sample.averageRating = averageRating
            return (
              <section class="playerContainer">
                <img class="img" src={sample.sample_image}></img>
                <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                <AvgRating
                  value={averageRating} />
                <ReactColorSquare height={100} width={568} color={averageColorHex} text="" />
                <AudioPlayer
                  autoPlayAfterSrcChange={false}
                  preload="true"
                  volume={averageLoudness}
                  src={sample.audio_url}
                  onPlay={e => console.log("onPlay")} />
                <button class="button5" onClick={() => delete_prompt(sample.id)}>Delete Sample</button>
                <button class="button3" onClick={()=>downloadFile(sample)}>Download Sample</button>
              </section>)
          })
        }
      </div>
    </>
  )
}