import React, { useRef, useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"

export const SampleDetails = (props) => {

    const [sample, setSample] = useState({})

    const {
        addComment,
        commentValue,
        getUsers,
        users,
        getComments,
        getSampleById,
        releaseComment,
        releaseSample
        } = useContext(SampleContext)
    // Declarations 

    useEffect(() => {
        getComments()
        getUsers()
        const sampleId = parseInt(props.match.params.sampleId)
        getSampleById(sampleId)
    }, [])

    const user = users.find(user => user.id === sample.uploader) || {}
    const theseComments = commentValue.filter(comment => sample.id === comment.sampleId)
    const userComment = useRef(null)
    const isUser = sample.user_id === parseInt(localStorage.getItem("user_number"))
    const foundUser = users.find(user => user.id === parseInt(localStorage.getItem("user_number"))) || {}
    const currentUserName = foundUser.name


    // Functions

        const addCommentToApi = () => {
            let commenterName = users.find(user => user.id === parseInt(localStorage.getItem("user_number")))
            addComment({
                sampleId: sample.id,
                userId: commenterName.name,
                comment: userComment.current.value
            }).then(getComments)
            userComment.current.value = ""
        }

        if (isUser === true){
        return (
                <section className="sample">
                    <h3 className="sample__name">{sample.name} by {user.name}<button onClick={() => releaseSample(sample.id).then(() => props.history.push("/browse"))} >Delete Sample</button></h3>
                    <div className="sample__description"><h3>Description:</h3>{sample.description}</div>
                    <div className="sample__submitter"> <h3>Comments:</h3>{
                        theseComments.map(comment => {
                        if (currentUserName === comment.userId){
                        return <>
                        <fieldset>
                        <div className= "comment__user">
                        <div>{comment.userId}</div>
                        <div>{comment.comment}</div>
                        <button onClick={() => releaseComment(comment.id)}>Delete Comment</button>
                        </div>
                        </fieldset>
                        </>
                        }
                        else {
                            return <>
                            <fieldset>
                            <div className= "comment__user">
                            <div>{comment.userId}</div>
                            <div>{comment.comment}</div>
                            </div>
                            </fieldset>
                            </>
                            }
                        })}
                </div>
                    <div className="entry__field">
                    <input type="text" ref={userComment} id="sampleName" required autoFocus className="form-control" placeholder="Enter Comment" />
                    <button onClick={addCommentToApi}>Add Comment</button>
                    </div>
                </section>
        )
    } 
        else{
            return (
                <section className="sample">
                    <h3 className="sample__name">{sample.name} by {user.name}</h3>
                    <div className="sample__description">{sample.description}</div>
                    <div className="sample__submitter"> <h3>Comments:</h3>{
                        theseComments.map(comment => {
                        if (currentUserName === comment.userId){
                        return <>
                        <fieldset>
                        <div className= "comment__user">
                        <div>{comment.userId}</div>
                        <div>{comment.comment}</div>
                        <button onClick={() => releaseComment(comment.id)}>Delete Comment</button>
                        </div>
                        </fieldset>
                        </>
                        }
                        else {
                            return <>
                            <fieldset>
                            <div className= "comment__user">
                            <div>{comment.userId}</div>
                            <div>{comment.comment}</div>
                            </div>
                            </fieldset>
                            </>
                            }
                        })}
                </div>
                    <div className="entry__field">
                    <input type="text" ref={userComment} id="sampleName" required autoFocus className="form-control" placeholder="Enter Comment" />
                    <button onClick={addCommentToApi}>Add Comment</button>
                    </div>
                </section>
        )}
    }