// Organized
import React, { useContext } from "react"
import { SampleContext } from "./SampleProvider"

export const SampleFilter = () => {

    const { setFilter } = useContext(SampleContext)

    return (
        <>
        <div class="sampleSearch">
        <div>Filters</div>

            <select
                onChange={
                    (changeEvent) => {
                        setFilter(changeEvent.target.value)
                    }
                }>
                <option value="0">Select a Filter</option>
                <option value="1">Date Added</option>
                <option value="2">ABC</option>
                <option value="3">Objective Gain</option>
                <option value="4">Subjective Loudness</option>
                <option value="5">Subjective Pan</option>
                <option value="6">Avg. Rating</option>
                <option value="7">Number of Downloads</option>
                <option value="8">Most Played</option>
                <option value="9">Least Played</option>
                <option value="10">Color</option>
                <option value="11">Shape</option>
            </select>
            </div>
        </>
    )
}