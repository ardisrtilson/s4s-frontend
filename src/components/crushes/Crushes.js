// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { CrushPanel } from "./CrushPanel"
import "./Samples.css"
import 'react-h5-audio-player/lib/styles.css'
import { Link } from "react-router-dom"
import AudioPlayer from 'react-h5-audio-player';


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
    setFiltered(samples)
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