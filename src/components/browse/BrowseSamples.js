// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { Browse } from "./Browse"
import "./Browse.css"
import 'react-h5-audio-player/lib/styles.css'

export const BrowseSamples = (props) => {

    // Context
    const {favorites,  
        getCustomers,
        getFavorites,
        getSamples,
        samples, 
    } = useContext(SampleContext)
    
    // State 

    const [ filteredSamples, setFiltered ] = useState([])

    // Hooks

    useEffect(() => {
        getSamples()
        getCustomers()
        getFavorites()
        let currentlyFiltered = samples
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                const finalFilter = notUser.filter(sample => {
                    let matchingFave = favorites.find(favorite => favorite.customerId === parseInt(localStorage.customer) && sample.id === favorite.sampleId)
                    return matchingFave == undefined})
                console.log(finalFilter)

                const randInt = Math.floor(Math.random() * notUser.length + 1)
                let randomSample = [finalFilter.find(randomSample => randomSample.id == randInt)]
                
    setFiltered(randomSample)
    }, [])

    // JSX

        return (
            <>
            <div className="samples">
                <div class="sampleCard">
                        </div> 
                {
                    filteredSamples.map(sample => {
                        return <Browse key={sample.id} sample={sample} />
                    })
                }
            </div> 
            </>     
        )
    }