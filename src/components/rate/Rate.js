// Organized
import React, { useContext, useEffect, useState } from "react"
import Rating from '@material-ui/lab/Rating';
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'
export const Rate = (props) => {

    const [rSampleItem, setRSampleValue] = useState(0)
    const [value, setValue] = useState(null)
    const [volume, setVolume] = useState(null)
    const [currentSample, setCurrentSample] = useState({})
    const [noneLeft, setNoneLeft] = useState(false)
    const [zeroed, setZeroed] = useState(false)
    const [itemsLeftToShow, setitemsLeftToShow] = useState([])
    const { favorites,
        getUsers,
        getFavorites,
        getRandomSample,
        randomSample,
        addFavorites,
        skipped,
        addRatings,
        getSkipped,
        randomSamplesLoaded,
    } = useContext(SampleContext)

    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.sample_id == current.id
            }).length == 0
        }
    }

    const addSampleRatings = () => {
        addRatings({
            sample: currentSample.id
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
        console.log(value)
        console.log(volume)
    }, [value, volume])

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
    }, [favorites, skipped, randomSample])

    if (noneLeft !== true) {
        return (
            <>
            <div class="sampleCard">
            <img class="img" src={currentSample.sample_image}></img>
                <div class="link_card button4"><Link to={`/browse/${currentSample.id}`}>{currentSample.name}</Link></div>
                <Rating 
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}/>
                
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={currentSample.audio_url}
                    onPlay={e => console.log("onPlay")}
                    onVolumeChange={e => setVolume(e.target.volume)} />
                    <button class="button5" onClick={addSampleRatings}>Submit Ratings</button>
                    <button class="button2" onClick={getFavorites}>Skip</button>
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