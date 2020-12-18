import React, { useRef, useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"

export const SampleDetails = (props) => {

    // Declarations 

    const customerName = customers.find(customer => customer.id === sample.customerId) || {}
    const theseComments = commentValue.filter(comment => sample.id === comment.sampleId)
    const userComment = useRef(null)
    const isUser = sample.customerId === parseInt(localStorage.getItem("customer"))
    const foundUser = customers.find(customer => customer.id === parseInt(localStorage.getItem("customer"))) || {}
    const currentUserName = foundUser.name

    // Context

    const {
        addComment,
        commentValue,
        customers, 
        getComments,
        getCustomers,
        getSampleById,
        releaseComment,
        releaseSample
        } = useContext(SampleContext)

    // State

    const [sample, setSample] = useState({})

    // Hooks

    useEffect(() => {
        getCustomers()
        getComments()
        const sampleId = parseInt(props.match.params.sampleId)
        getSampleById(sampleId)
            .then(setSample)
    }, [])

    // Functions

        const addCommentToApi = () => {
            let commenterName = customers.find(customer => customer.id === parseInt(localStorage.getItem("customer")))
            addComment({
                sampleId: sample.id,
                userId: commenterName.name,
                comment: userComment.current.value
            }).then(getComments)
            userComment.current.value = ""
        }

    // JSX

        if (isUser === true){
        return (
                <section className="sample">
                    <h3 className="sample__name">{sample.name} by {customerName.name}<button onClick={() => releaseSample(sample.id).then(() => props.history.push("/browse"))} >Delete Sample</button></h3>
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
                    <h3 className="sample__name">{sample.name} by {customerName.name}</h3>
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