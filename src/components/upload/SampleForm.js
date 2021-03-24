// Organized
import React, { useContext, useRef, useState} from "react"
import { SampleContext } from "../sample/SampleProvider"
import "./Upload.css"
import firebase from '../../firebase'

export const SampleForm = (props) => {
    const [ postImage, setPostImage ] = useState("")
    let db = firebase.firestore();
    let thingsRef = db.collection('Samples')
    let url
    let file
    let image

    const { addSample } = useContext(SampleContext)
    const name = useRef(null)
    const description = useRef(null)

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createPostImageJSON = (event) => {
        
        getBase64(event.target.files[0], (base64ImageString) => {
            setPostImage({'sample_image':base64ImageString})
        });
    }

    const constructNewSample = () => {
        if (file){
        let fileRef = firebase.storage().ref("Audio/" + file.name)    
        let imageRef = firebase.storage().ref("Images/" + image.name)   
        fileRef.put(file).then(() => {
            imageRef.put(image).then(() => {
            async function getURL(){
            url = await fileRef.getDownloadURL()
            }
                getURL().then(() => {
                    addSample({
                        name: name.current.value,
                        audio_url: url,
                        date_added: "2020-7-7", 
                        sample_image: postImage.sample_image
                    }).then(() => props.history.push("/"))
                    thingsRef.add({
                        name: name.current.value,
                        uploader: localStorage.getItem("user_number"),
                        audio_url: url,
                        date_added: "2020-7-7"
                    })
                })
            })
        })
        }
        else {window.confirm("Sample is still loading. Try again in a moment.")}
}

    return (
        <form className="sampleForm">
            <h1 class="heading">Upload Sample</h1>
                <div className="form-group1">
                    <label htmlFor="sampleName"><h3>Sample Name:</h3></label>
                    <input type="text" id="sampleName" ref={name} required autoFocus className="form-control" placeholder="Sample Name" />
                </div>
                <div className="form-group2">
                    <label htmlFor="sampleName"><h3>Description:</h3> </label>
                    <input type="text" id="sampleDescription" ref={description} required autoFocus className="form-control" placeholder="Enter Description Here" />
                </div>
                <div className="uploadButtons">
                            <input type="file" id="post_image" onChange={evt => {
                    image = evt.target.files[0]
                }}/>
                        </div>
                <div className="upload-group">
            <input class="button3" type="file" id="fileButton" 
                onChange={evt => {
                    file = evt.target.files[0]
                }}/>
            <button class="button4" type="submit"
                onClick={evt => {
                    console.log(name.current.value)
                    if(name.current.value != ""){
                        if(description.current.value != ""){
                    evt.preventDefault()
                    constructNewSample()}
                    else{window.alert("Please Enter a Description For Your Sample")}
                    }
                else{window.alert("Please Enter a Name For Your Sample")}
                }}
                class="button6">
                Upload
            </button>
            </div>
        </form>
    )
}