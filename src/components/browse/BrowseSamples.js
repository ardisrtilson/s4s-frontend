// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'

export const BrowseSamples = (props) => {

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
            debugger
            let randomSamplesThatHaveNotBeenFavorited = randomSample.filter(comparer(thisUserFavorites))
            let randomSamplesThatHaveNotBeenSkippedOrFavorited = randomSamplesThatHaveNotBeenFavorited.filter(comparer(thisUserSkipped))
            console.log(randomSamplesThatHaveNotBeenSkippedOrFavorited)
            setitemsLeftToShow(randomSamplesThatHaveNotBeenSkippedOrFavorited)
            //Increment
        }
    }, [favorites, skipped, randomSample])

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

    if (noneLeft !== true) {
        return (
            <div class="sampleCard">
                <div class="link_card button4"><Link to={`/browse/${currentSample.id}`}>{currentSample.name}</Link></div>
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={currentSample.audio_url}
                    onPlay={e => console.log("onPlay")} />
                <button class="button5" onClick={addSampleToSkipped}>Nah</button>
                <button class="button2" onClick={getFavorites}>Skip</button>
                <button class="button3" onClick={addSampleToFavorites}>Love</button>
            </div>
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