import React, { useState } from "react"

export const SampleContext = React.createContext()

export const SampleProvider = (props) => {
    const [commentValue, setComments] = useState([])
    const [customers, setCustomers] = useState([])
    const [favorites, setFavorites] = useState([])
    const [filterValue, setFilter] = useState([])
    const [ratingValue, setRating] = useState([])
    const [samples, setSamples] = useState([])
    const [searchTerms, setTerms] = useState("")

    const addComment = comment => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getSamples)
    }
    const addFavorites = sample => {
        return fetch("http://localhost:8088/userFavorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sample)
        })
            .then(getFavorites)
    }
    const addSample = sample => {
        return fetch("http://localhost:8088/samples", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sample)
        })
            .then(getSamples)
    }
    const getComments = () => {
        return fetch("http://localhost:8088/comments")
            .then(res => res.json())
            .then(setComments)
    }
    const getCustomers = () => {
        return fetch("http://localhost:8088/customers")
            .then(res => res.json())
            .then(setCustomers)
    }
    const getFavorites = () => {
        return fetch("http://localhost:8088/userFavorites")
            .then(res => res.json())
            .then(setFavorites)
    }
    const getSamples = () => {
        return fetch("http://localhost:8088/samples")
            .then(res => res.json())
            .then(setSamples)
    }
    const getSampleById = (id) => {
        return fetch(`http://localhost:8088/samples/${id}`)
            .then(res => res.json())
    }
    const releaseComment = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }
    const releaseFavorite = (favoriteId) => {
        return fetch(`http://localhost:8088/userFavorites/${favoriteId}`, {
            method: "DELETE"
        })
            .then(getFavorites)
    }
    const releaseSample = (sampleId) => {
        return fetch(`http://localhost:8088/samples/${sampleId}`, {
            method: "DELETE"
        })
            .then(getSamples)
    }
    const updateSample = sample => {
        return fetch(`http://localhost:8088/samples/${sample.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sample)
        })
            .then(getSamples)
    }

    return (
        <SampleContext.Provider value={
            {
                addComment,
                addFavorites,
                addSample,
                commentValue,
                customers,
                favorites, 
                filterValue, 
                getComments,
                getCustomers,
                getFavorites,
                getSamples, 
                getSampleById,
                releaseSample, 
                ratingValue,
                releaseComment,
                releaseFavorite,
                samples,
                searchTerms,
                setComments,
                setFavorites, 
                setFilter,
                setRating,
                setTerms,
                updateSample,
            }}>
        {props.children}
        </SampleContext.Provider>
        )
    }