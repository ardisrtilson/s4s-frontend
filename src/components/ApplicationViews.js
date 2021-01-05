import React from "react"
import { Route } from "react-router-dom"
import { SampleProvider } from "./sample/SampleProvider"
import { SampleList } from "./sample/SampleList"
import { SampleForm } from "./upload/SampleForm"
import { SampleDetails} from "./sample/SampleDetail"
import { BrowseSamples } from "./browse/BrowseSamples"
import { Rate } from "./rate/Rate"
import "./sample/Samples.css"
import { CrushPanel } from "./crushes/CrushPanel"

export const ApplicationViews = (props) => {
    return (
        <>

            <SampleProvider>

            <Route exact path="/" render={
                        props => <SampleList {...props} />
                    } />

                    <Route exact path="/crushes" render={
                        props => <CrushPanel {...props} />
                    } />

                    <Route path="/browse/:sampleId(\d+)" render={
                        props => <SampleDetails {...props} />
                    } />

                    <Route exact path="/browse" render={
                        props => <BrowseSamples {...props} />}/>

                    <Route exact path="/upload" render={
                        props => <SampleForm {...props} />
                    } />

                    <Route exact path="/rate" render={
                        props => <Rate {...props} />
                    } />


            </SampleProvider>

            <Route path="/logout" render={
                    (props) => {
                    localStorage.removeItem("user_id")
                    localStorage.removeItem("user_number")
                    props.history.push("/login")
                }
            } />
        </>
    )
}