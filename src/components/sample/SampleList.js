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
        getUsers,
        user,
        getUserById,
    } = useContext(SampleContext)

    // Hooks
    let currentUser = parseInt(localStorage.getItem("user_number"))

    useEffect(() => {
        getSamples()
        getUsers()
        getUserById(currentUser)
    }, [])

    // JSX

        return (
            <>
            <img class="img" src={user.profile_image}></img>
            <div className="samples">
                <div class="sampleCard">
                        </div> 
                {
                    samples.map(sample => {
                        return <Sample key={sample.id} sample={sample} />
                    })
                }
            </div> 
            </>
        )
}