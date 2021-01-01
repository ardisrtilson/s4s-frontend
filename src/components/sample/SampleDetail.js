// Organized
import React, { useContext, useEffect, useState, useRef } from "react"
import Rating from '@material-ui/lab/Rating';
import { SampleContext } from "../sample/SampleProvider"
import AudioPlayer from 'react-h5-audio-player'
import { Link } from "react-router-dom"
import "./Samples.css"
import WaveSurfer from "wavesurfer.js";
import 'react-h5-audio-player/lib/styles.css'
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";


export const SampleDetails = (props) => {

  const waveformRef = useRef(null);

    const {
        getUsers,
        singleSample,
        getSampleById,
    } = useContext(SampleContext)

    useEffect(() => {
        waveformRef.current = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black"
        });
        waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
        waveformRef.current.setWaveColor("red")
      }, []);

    useEffect(() => {
        let sampleId = parseInt(props.match.params.sampleId)
        getUsers().then(getSampleById(sampleId))
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
            <TextField></TextField>
            <Button onClick={() => {console.log("button") }}>Submit Comment</Button>
            </div>
            <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={singleSample.sample_image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={singleSample.sample_image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
            </>
        )
}