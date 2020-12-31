// Organized
import React, { useContext, useEffect, useState } from "react"
import Rating from '@material-ui/lab/Rating';
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'
import { ColorPicker } from 'material-ui-color';
export const Rate = (props) => {

    const [rSampleItem, setRSampleValue] = useState(0)
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
        addSkipped,
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

    const addSampleToFavorites = () => {
        addFavorites({
            user: parseInt(localStorage.getItem("user_number")),
            sample: currentSample.id
        })
    }

    const addSampleToSkipped = () => {
        addSkipped({
            user: parseInt(localStorage.getItem("user_number")),
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
                <ColorPicker 
                defaultValue="transparent"
/>
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={currentSample.audio_url}
                    onPlay={e => console.log("onPlay")}
                    onVolumeChange={e => console.log(e.target.volume)} />
            </div>

            <div class="sampleCard">
            Drag the volume slider til the sound is just right.
            </div>

            <div class="sampleCard">
            What color is this sound?
            </div>

            <div class="sampleCard">
            What shape is this sound?
            </div>

            <div class="sampleCard">
            <Rating />
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