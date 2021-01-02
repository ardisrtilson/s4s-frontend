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

                    <Route exact path="/" render={(props) => {
                        return <>
                        <div class="heading"><h1>Your Samples</h1></div>
                        <div class="filters">
                        </div>
                            <SampleList history={props.history} />
                    </>
                    }} />

                    <Route exact path="/crushes" render={(props) => {
                        return <>
                        <div class="heading"><h1>Your Crushes</h1></div>
                            <CrushPanel />
                    </>
                    }} />

                    <Route path="/browse/:sampleId(\d+)" render={
                        props => <SampleDetails {...props} />
                    } />

                    <Route exact path="/browse" render={(props) => {
                                        return <>
                                        <div class="heading"><h1>Lookin 4 Samples</h1></div>
                                        <div class="filters">
                                        </div>
                                            <BrowseSamples history={props.history} />
                                    </>
                                    }} />

                    <Route path="/upload" render={(props) => {
                        return <>
                                <SampleForm {...props} />
                        </>
                    }} />

                    <Route path="/rate" render={(props) => {
                        return <>
                                <Rate {...props} />
                        </>
                    }} />

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