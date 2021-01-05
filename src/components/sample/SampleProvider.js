import React, { useState } from "react"

export const SampleContext = React.createContext()

export const SampleProvider = (props) => {

    const [commentValue, setComments] = useState([])
    const [users, setUsers] = useState([])
    const [randomSample, setRandomSample] = useState([])
    const [favorites, setFavorites] = useState([])
    const [filterValue, setFilter] = useState([])
    const [ratings, setRatings] = useState([])
    const [samples, setSamples] = useState([])
    const [singleSample, setSingleSample] = useState({})
    const [skipped, setSkipped] = useState([])
    const [searchTerms, setTerms] = useState("")
    const [user, setUser] = useState({})
    const [randomSamplesLoaded, setRandomSamplesLoaded] = useState(false)
    const [singleSampleLoaded, setSingleSampleLoaded] = useState(false)

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
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
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

    const addRatings = rating => {
        return fetch("http://localhost:8000/sampleRatings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }

    const getRatings = () => {
        return fetch("http://localhost:8000/sampleRatings", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
            .then(res => res.json())
            .then(setRatings)
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
        return fetch("http://localhost:8000/comments", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            }})
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
            .then(setSingleSample)
            .then(setSingleSampleLoaded(true))
    }
    
    const releaseComment = (commentId) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_id")}`
            },
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
        return fetch(`http://localhost:8000/samples/${sampleId}`, {
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
                commentValue,
                users,
                favorites, 
                filterValue,
                ratings,
                randomSample,
                singleSampleLoaded,
                samples,
                singleSample,
                skipped,
                searchTerms,
                randomSamplesLoaded,
                user,
                addComment,
                addFavorites,
                addSample,
                addSkipped,
                addRatings,
                getRatings,
                getComments,
                getUsers,
                getFavorites,
                getSamples, 
                getSampleById,
                getRandomSample,
                getSkipped,
                getUserById,
                releaseSample, 
                releaseComment,
                releaseFavorite,
                setSkipped,
                setComments,
                setFavorites, 
                setFilter,
                setRatings,
                setTerms,
                setUser,
                updateSample,
            }}>
        {props.children}
        </SampleContext.Provider>
        )
    }