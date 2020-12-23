// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { CrushPanel } from "./CrushPanel"
import "./Samples.css"
import 'react-h5-audio-player/lib/styles.css'

export const Crushes = (props) => {

    // Context 

    const {favorites, 
        filterValue, 
        getFavorites,
        getUsers,
        getSamples,
        samples, 
        searchTerms,
    } = useContext(SampleContext)

    // State

    const [ filteredSamples, setFiltered ] = useState([])

    // Hooks

    useEffect(() => {
        getSamples()
        getUsers()
        getFavorites()
    }, [])

    useEffect(() => {
        let currentlyFiltered = samples
                const notUser = currentlyFiltered.filter(byUser => byUser.uploader != parseInt(localStorage.user_number))
                const userFaves = favorites.filter(faves => faves.user_id === parseInt(localStorage.user_number))
                let samplesToDisplay = notUser.filter(currentSamples => 
                    {return userFaves.some(favorite => 
                        favorite.sample_id === parseInt(currentSamples.id))})
    setFiltered(samplesToDisplay)
    }, [searchTerms, samples, filterValue])

    // JSX

        return (
            <>
            <div className="samples">
                <div class="sampleCard">
                        </div> 
                {
                    filteredSamples.map(sample => {
                        return <CrushPanel key={sample.id} sample={sample} />
                    })
                }
            </div> 
            </>
        )
    }