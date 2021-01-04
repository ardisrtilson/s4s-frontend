// Organized
import React, { useContext, useEffect, useState, useRef } from "react"
import Rating from '@material-ui/lab/Rating';
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Browse.css"
import WaveSurfer from "wavesurfer.js";
import 'react-h5-audio-player/lib/styles.css'
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

export const Rate = () => {

    const [rSampleItem, setRSampleValue] = useState(0)
    const [value, setValue] = useState(null)
    const [volume, setVolume] = useState(null)
    const [currentSample, setCurrentSample] = useState({})
    const [noneLeft, setNoneLeft] = useState(false)
    const [zeroed, setZeroed] = useState(false)
    const [itemsLeftToShow, setitemsLeftToShow] = useState([])
    const [audio_url, setAudioURL] = useState('https://firebasestorage.googleapis.com/v0/b/selektor-b0fc6.appspot.com/o/Audio%2FKick.wav?alt=media&token=61384403-e6c8-4874-9062-1527d920dfe3')
    const [color, setColor] = useState("#aabbcc")
    const [wavesurf, setWavesurf] = useState(false)

    const waveformRef = useRef(null);

    const { favorites,
        getUsers,
        getFavorites,
        getRandomSample,
        randomSample,
        skipped,
        addRatings,
        getRatings,
        ratings,
        getSkipped,
        randomSamplesLoaded,
    } = useContext(SampleContext)

    useEffect(() => {
        if (waveformRef.current && wavesurfCreated === false){
        let wavesurfer = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black",
          barWidth: 1,
          fillParent:true
        })
        wavesurfer.load('https://firebasestorage.googleapis.com/v0/b/selektor-b0fc6.appspot.com/o/Audio%2FKick.wav?alt=media&token=61384403-e6c8-4874-9062-1527d920dfe3')
        wavesurfer.setWaveColor(color)
      }
    }, [color, currentSample])

    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.sample_id == current.id
            }).length == 0
        }
    }

    const addSampleRatings = () => {
        console.log(color)
        if (volume !== null && value != null){
        addRatings({
            sample: currentSample.id,
            color: color,
            rating: value,
            loudness: volume
        })
    }
        else{
            if (volume === null && value !== null) {alert("Please drag the volume slider until the sound is just right")}
            else if (value === null && volume !== null) {alert("Please rate the sample on a scale from 1-5 stars")}
            else if (value === null && volume === null){alert("Please rate the sample on a scale from 1-5 stars and drag the volume slider until the sound is just right")}
    }}
    
    useEffect(() => {
        getUsers().then(getSkipped).then(getFavorites).then(getRandomSample)
    }, [])

    useEffect(() => {
        if (itemsLeftToShow.length > 0){
        setCurrentSample(itemsLeftToShow[rSampleItem])
        }
    }, [rSampleItem, zeroed])

    useEffect(() => {
        if (currentSample !== {}){
        setAudioURL(currentSample.audio_url)
        }
    }, [currentSample])


    useEffect(() => {
    if (randomSamplesLoaded && itemsLeftToShow.length > 0){
            if (rSampleItem < itemsLeftToShow.length - 1) {
                let increment = rSampleItem + 1
                setRSampleValue(increment)
            } else {
                setRSampleValue(0)
                setZeroed(true)
            }
            setNoneLeft(false)
    }
    else if (randomSamplesLoaded && itemsLeftToShow.length === 0) {
        //data has been loaded from api, filtering done, no items left to show
        setNoneLeft(true)
    }
    else {
        
    }
    }, [itemsLeftToShow, randomSample, randomSamplesLoaded])

    useEffect(() => {

        //Filtrationxs
        let currentUser = parseInt(localStorage.getItem("user_number"))
        let thisUserFavorites = favorites.filter(faves => faves.user_id === currentUser)
        let thisUserSkipped = skipped.filter(skip => skip.user_id === currentUser)
        if (randomSample.length > 0) {
            let randomSamplesThatHaveNotBeenFavorited = randomSample.filter(comparer(thisUserFavorites))
            let randomSamplesThatHaveNotBeenSkippedOrFavorited = randomSamplesThatHaveNotBeenFavorited.filter(comparer(thisUserSkipped))
            setitemsLeftToShow(randomSamplesThatHaveNotBeenSkippedOrFavorited)
            //Increment
        }
    }, [randomSample, ratings])

    if (noneLeft !== true) {
        return (
            <>
            <div class ="sampleContainer">
            <img class="img" src={currentSample.sample_image}></img>
            <div class="link_card button4"><Link to={`/browse/${currentSample.id}`}>{currentSample.name}</Link></div>
            <div ref={waveformRef} />
                <Rating 
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}/>

                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={currentSample.audio_url}
                    onPlay={e => console.log("onPlay")}
                    onVolumeChange={e => setVolume(e.target.volume)} />
                    <button class="button5" onClick={addSampleRatings}>Submit Ratings</button>
                    <button class="button2" onClick={getRatings}>Skip</button>
                <HexColorPicker color={color} onChange={setColor} />
            </div>
            </>
        )
    }
    else {
        return (
            <div class="sampleCard">
                None Left
            </div>
        )
    }

}