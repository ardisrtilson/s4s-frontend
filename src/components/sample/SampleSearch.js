import React, { useContext } from "react"
import { SampleContext } from "./SampleProvider"

export const SampleSearch = () => {
    const { setTerms } = useContext(SampleContext)
    return (
        <>
        <div class="sampleSearch">
            <div>Sample Search</div>
                <input type="text"
                    onChange={
                        (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }}
            placeholder="Enter search string here..." />
        </div>
        </>
    )
}