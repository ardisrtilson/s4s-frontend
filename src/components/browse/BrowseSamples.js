// Organized
import React, { useContext, useEffect, useState, useRef } from "react"
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import WaveSurfer from "wavesurfer.js";
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'

export const BrowseSamples = (props) => {

    const [rSampleItem, setRSampleValue] = useState(0)
    const [currentSample, setCurrentSample] = useState({})
    const [noneLeft, setNoneLeft] = useState(false)
    const [zeroed, setZeroed] = useState(false)
    const [itemsLeftToShow, setitemsLeftToShow] = useState([])

    const waveformRef = useRef(null);

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
        waveformRef.current = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black"
        });
        waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
        waveformRef.current.setWaveColor("white")
      }, [])

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
            if (rSampleItem < itemsLeftToShow.length-1) {
                let increment = rSampleItem + 1
                setRSampleValue(increment)
            } 
            else if(rSampleItem === 0 && itemsLeftToShow.length-1 === 0){
                setZeroed(true)
            }
            else {
                setRSampleValue(0)
            }
            setNoneLeft(false)
    }
    else if (randomSamplesLoaded && itemsLeftToShow.length === 0) {
        //data has been loaded from api, filtering done, no items left to show
        setNoneLeft(true)
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
            setitemsLeftToShow(randomSamplesThatHaveNotBeenSkippedOrFavorited)
            //Increment
        }
    }, [favorites, skipped, randomSample])

    if (noneLeft !== true && randomSamplesLoaded) {
        console.log(currentSample)
        return (
            <div>
                <div class="link_card button4"><Link to={`/browse/${currentSample.id}`}>{currentSample.name}</Link></div>
                <img class="img" src={currentSample.sample_image}></img>
                <div ref={waveformRef} />
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
                <div ref={waveformRef} />
                None Left
            </div>
        )
    }

}