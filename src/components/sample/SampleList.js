// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"
import "./Samples.css"

export const SampleList = (props) => {

    // Context

    const {favorites, 
        filterValue, 
        getSamples,
        samples, 
        searchTerms,
    } = useContext(SampleContext)

    // State

    const [ filteredSamples, setFiltered ] = useState([])

    // Hooks

    useEffect(() => {
        getSamples()
    }, [])
    
    useEffect(() => {
        let samplesToDisplay = samples
        let currentlyFiltered = samples
        console.log(samples)

            if (props.history.location.pathname === "/"){
            samplesToDisplay = currentlyFiltered.filter(byUser => byUser.uploader === parseInt(localStorage.user_number))
            console.log(currentlyFiltered)
            currentlyFiltered = samplesToDisplay
            }

            if (props.history.location.pathname === "/browse"){
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                samplesToDisplay = notUser
                currentlyFiltered = samplesToDisplay
                }

            if (searchTerms !== "") {
                samplesToDisplay = currentlyFiltered.filter(sample => sample.name.toLowerCase().includes(searchTerms))
                currentlyFiltered = samplesToDisplay
            }

            if (filterValue === "2" && props.history.location.pathname === "/browse"){
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                const userFaves = favorites.filter(faves => faves.customerId === parseInt(localStorage.customer))
                samplesToDisplay = notUser.filter(currentSamples => 
                    {return userFaves.some(favorite => 
                        favorite.sampleId === currentSamples.id)})
            }
   
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
                        return <Sample key={sample.id} sample={sample} />
                    })
                }
            </div> 
            </>
        )
}