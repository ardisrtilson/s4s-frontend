// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import "../sample/Samples.css"
import 'react-h5-audio-player/lib/styles.css'
import { BrowseSamples } from "./BrowseSamples"


export const Browse = (props) => {

    // Context

    const {
        getUsers,
        getFavorites,
        getRandomSample,
        getSkipped,
    } = useContext(SampleContext)

    // Hooks

    useEffect(() => {
        getFavorites()
        getUsers()
        getRandomSample()
        getSkipped()
    }, [])

    // JSX

        return (
            <>
                <div class="sampleCard">
                    <BrowseSamples />
            </div> 
            </>
        )
    }