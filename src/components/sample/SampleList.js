import { SampleContext } from "../sample/SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useState, useEffect, useRef} from "react"
import "./Samples.css"
import AudioPlayer from 'react-h5-audio-player';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WaveSurfer from "wavesurfer.js";

export const SampleList = ({sample}) => {

  const [ sort, setSort ] = useState([])
  const [ thisUserSamples, setThisUserSamples ] = useState([])
  const [ currentUser, setCurrentUser ] = useState(parseInt(localStorage.getItem("user_number")))

  const waveformRef = useRef(null)

  const {
    favorites, 
    releaseFavorite, 
    getFavorites,
    filterValue, 
    getUsers,
    getSamples,
    samples,
    searchTerms,
    user,
    getRatings,
    getUserById,
    releaseSample
  } = useContext(SampleContext)

  useEffect(() => {
    getSamples()
    getUsers()
    getRatings()
    console.log(currentUser)
    getUserById(currentUser)
}, [])

useEffect(() => {
  if(sort === 1){console.log("Rating Selected")}
  else if (sort === 2){console.log("Color Selected")}
  else if (sort === 3){console.log("Volume Selected")}
  else if (sort === 4){setThisUserSamples(thisUserSamples.sort((a, b) => (a.names > b.names) ? 1 : -1))
  getRatings()}
  else if (sort === 5){setThisUserSamples(thisUserSamples.sort((a, b) => (a.names < b.names) ? 1 : -1))
  getRatings()}
}, [sort])

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({ 
      container: waveformRef.current,
      cursorColor: "transparent",
      backgroundColor: "black"
    });
    waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
    waveformRef.current.setWaveColor("white")
  }, [])
  const handleControlledInputChange = (e) => {
    setSort(e.target.value)
}

useEffect(() => {
  setThisUserSamples(samples.filter(sample => sample.uploader === currentUser))
  console.log(user)
}, [favorites, currentUser, samples])

        const downloadFile = () => {
        //   window.location.href = sample.audio_url
        console.log("")
        }

        const deleteSample = (sample) => {

          releaseSample(sample).then(getSamples)
        console.log("")
        }

return (
  <>
  <div className="samples">
  <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          onChange={handleControlledInputChange}
        >
          <MenuItem value={0}>Sort By</MenuItem>
          <MenuItem value={1}>Rating</MenuItem>
          <MenuItem value={2}>Color</MenuItem>
          <MenuItem value={3}>Subjective Volume</MenuItem>
          <MenuItem value={4}>Alphabetical</MenuItem>
          <MenuItem value={5}>Reverse Alphabetical</MenuItem>
        </Select>
                <div ref={waveformRef} />
                <div class="sampleCard">
                <img class="img" src={user.profile_image}></img>

                        </div> 
                {
                    thisUserSamples.map(sample => {
                        return (
                          <section>
                          <img class="img" src={sample.sample_image}></img>
                            <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
                                  <AudioPlayer 
                                      autoPlayAfterSrcChange={false}
                                      preload="true"
                                      src={sample.audio_url}
                                      onPlay={e => console.log("onPlay")}/>
                                  <button class="button5" onClick={()=>deleteSample(sample.id)}>Remove Favorite</button>
                                  <button class="button3" onClick={downloadFile}>Download Sample</button>
                          </section>)
                    })
                }
            </div> 
</>
)
}