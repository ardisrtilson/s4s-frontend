// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"
import "./Samples.css"

export const SampleList = (props) => {

    // Context

    const { 
        getSamples,
        samples, 
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
        console.log(user.id, samples)
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
                        if(user.id === sample.uploader){
                        return <Sample key={sample.id} sample={sample} />}
                    })
                }
            </div> 
            </>
        )
}