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

export const Rate = (props) => {

    const [rSampleItem, setRSampleValue] = useState(0)
    const [value, setValue] = useState(null)
    const [volume, setVolume] = useState(null)
    const [currentSample, setCurrentSample] = useState({})
    const [noneLeft, setNoneLeft] = useState(false)
    const [zeroed, setZeroed] = useState(false)
    const [itemsLeftToShow, setitemsLeftToShow] = useState([])
    const [color, setColor] = useState("#aabbcc");

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
        waveformRef.current = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black"
        });
        waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
        waveformRef.current.setWaveColor(color)
      }, []);

      useEffect(() => {
        waveformRef.current.setWaveColor(color)
      }, [color]);

    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.sample_id == current.id
            }).length == 0
        }
    }

    const addSampleRatings = () => {
        addRatings({
            sample: currentSample.id,
            color: color,
            rating: value,
            loudness: volume
        })
    }
    
    useEffect(() => {
        getUsers().then(getSkipped).then(getFavorites).then(getRandomSample)
    }, [])

    useEffect(() => {
        if (itemsLeftToShow.length > 0){
        setCurrentSample(itemsLeftToShow[rSampleItem])
        }
    }, [rSampleItem, zeroed])

    useEffect(() => {
    if (randomSamplesLoaded && itemsLeftToShow.length > 0){
            console.log(itemsLeftToShow[rSampleItem])
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

        //Filtration
        let currentUser = parseInt(localStorage.getItem("user_number"))
        let thisUserFavorites = favorites.filter(faves => faves.user_id === currentUser)
        let thisUserSkipped = skipped.filter(skip => skip.user_id === currentUser)
        if (randomSample.length > 0) {
            let randomSamplesThatHaveNotBeenFavorited = randomSample.filter(comparer(thisUserFavorites))
            let randomSamplesThatHaveNotBeenSkippedOrFavorited = randomSamplesThatHaveNotBeenFavorited.filter(comparer(thisUserSkipped))
            console.log(randomSamplesThatHaveNotBeenSkippedOrFavorited)
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
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={currentSample.audio_url}
                    onPlay={e => console.log("onPlay")}
                    onVolumeChange={e => setVolume(e.target.volume)} />
                <HexColorPicker color={color} onChange={setColor} />
                <div className="value" style={{ color: color }}>
                Current color is {color}
                </div>
                <Rating 
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}/>
                    <button class="button5" onClick={addSampleRatings}>Submit Ratings</button>
                    <button class="button2" onClick={getRatings}>Skip</button>
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