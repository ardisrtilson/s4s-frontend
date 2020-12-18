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
        getCustomers,
        getFavorites,
        getSamples,
        samples, 
        searchTerms,
        setFilter,
    } = useContext(SampleContext)

    // State

    const [ filteredSamples, setFiltered ] = useState([])

    // Hooks

    useEffect(() => {
        getSamples()
        getCustomers()
        getFavorites()
    }, [])

    useEffect(() => {
        let samplesToDisplay = samples
        let currentlyFiltered = samples

                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                const userFaves = favorites.filter(faves => faves.customerId === parseInt(localStorage.customer))
                const randInt = Math.floor(Math.random() * userFaves.length + 1);
                samplesToDisplay = notUser.filter(currentSamples => 
                    {return userFaves.some(favorite => 
                        favorite.sampleId === currentSamples.id)})
   
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