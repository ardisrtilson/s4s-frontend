import React, { useState } from "react"

export const SampleContext = React.createContext()

export const SampleProvider = (props) => {
    const [commentValue, setComments] = useState([])
    const [users, setUsers] = useState([])
    const [randomSample, setRandomSample] = useState([])
    const [favorites, setFavorites] = useState([])
    const [filterValue, setFilter] = useState([])
    const [ratingValue, setRating] = useState([])
    const [samples, setSamples] = useState([])
    const [skipped, setSkipped] = useState([])
    const [searchTerms, setTerms] = useState("")
    const [user, setUser] = useState("")
    const [randomSamplesLoaded, setRandomSamplesLoaded] = useState(false)

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setUser)
    }

    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getSamples)
    }
    const addFavorites = favorite => {
        return fetch("http://localhost:8000/userFavorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
            body: JSON.stringify(favorite)
        })
            .then(getFavorites)
    }

    const addSkipped = skipped => {
        return fetch("http://localhost:8000/userSkipped", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
            body: JSON.stringify(skipped)
        })
            .then(getSkipped)
    }

    const addSample = sample => {
        return fetch("http://localhost:8000/samples", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
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
    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setUsers)
    }

    const getRandomSample = () => {
        return fetch("http://localhost:8000/randomSample", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then((data) => {
                setRandomSample(data)
                setRandomSamplesLoaded(true)
            })
    }

    const getSkipped = () => {
        return fetch("http://localhost:8000/userSkipped", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setSkipped)
    }

    const getFavorites = () => {
        return fetch("http://localhost:8000/userFavorites", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setFavorites)
    }
    const getSamples = () => {
        return fetch("http://localhost:8000/samples", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setSamples)
    }

    const getSampleById = (id) => {
        return fetch(`http://localhost:8000/samples/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setSamples)
    }
    
    const releaseComment = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }
    const releaseFavorite = (sampleId) => {
        return fetch(`http://localhost:8000/userFavorites/${sampleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
        })
            .then(getFavorites)
    }
    const releaseSample = (sampleId) => {
        return fetch(`http://localhost:8000/userFavorites/${sampleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
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
                addSkipped,
                commentValue,
                users,
                favorites, 
                filterValue, 
                getComments,
                getUsers,
                getFavorites,
                getSamples, 
                getSampleById,
                getRandomSample,
                randomSample,
                releaseSample, 
                ratingValue,
                releaseComment,
                releaseFavorite,
                samples,
                skipped,
                getSkipped,
                setSkipped,
                searchTerms,
                setComments,
                setFavorites, 
                setFilter,
                setRating,
                randomSamplesLoaded,
                setTerms,
                updateSample,
                user,
                setUser,
                getUserById,
            }}>
        {props.children}
        </SampleContext.Provider>
        )
    }