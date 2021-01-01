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
        ratings,
        searchTerms,
        getRatings,
    } = useContext(SampleContext)

    const [ filteredSamples, setFiltered ] = useState([])

    // Hooks

    useEffect(() => {
        getSamples()
        getUsers()
        getFavorites()
        getRatings()
    }, [])

    useEffect(() => {
    setFiltered(samples)
    console.log(ratings.sort((a, b) => (a.rating > b.rating) ? 1 : -1))
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