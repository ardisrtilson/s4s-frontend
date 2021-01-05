// Organized
import React, { useContext, useEffect, useState, useRef } from "react"
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Samples.css"
import WaveSurfer from "wavesurfer.js";
import 'react-h5-audio-player/lib/styles.css'
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

export const SampleDetails = (props) => {

  const [localState, setLocalState] = useState({})

  const handleControlledInputChange = (e) => {
    const newComment = Object.assign({}, localState)
    newComment[e.target.name] = e.target.value
    setLocalState(newComment)
}

const deleteComment = (id) => {
  releaseComment(id)
  getComments()
}

const submitComment = () => {
  addComment({
    content: localState.content,
    user: localStorage.getItem("user_number"),
    date_added: "4",
    sample: props.match.params.sampleId
})
  getComments()
}

  const waveformRef = useRef(null);

    const {
        getUsers,
        singleSample,
        getSampleById,
        getComments,
        commentValue,
        addComment,
        releaseComment
    } = useContext(SampleContext)

    useEffect(() => {
        waveformRef.current = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black",
          barWidth: 1,
          fillParent: true
        });
        waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
        waveformRef.current.setWaveColor("red")
      }, [])

    useEffect(() => {
        let sampleId = parseInt(props.match.params.sampleId)
        getUsers()
        getComments().then(res => setLocalState(res))
        getSampleById(sampleId)
    }, [])

        return (
            <>
            <div class="sampleContainer">
            <img class="img" src={singleSample.sample_image}></img>
                <div class="link_card button4"><Link to={`/browse/${singleSample.id}`}>{singleSample.name}</Link></div>
                <div ref={waveformRef} />
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={singleSample.audio_url}
                    onPlay={e => console.log("onPlay")}/>
            <TextField name="content" onChange={handleControlledInputChange}></TextField>
            <Button onClick={() => {submitComment()}}>Submit Comment</Button>
            </div>
            <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      {
      commentValue.map(comment => {
      return(
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={comment.user.profile_image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.user.username}</h4>
            <p style={{ textAlign: "left" }}>
              {comment.content}
            </p>
            <Button onClick={() => {deleteComment(comment.id)}}>Delete Comment</Button>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
      )}
      )
      }
    </div>
            </>
        )
}