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

    const [rSampleItem, setRSampleValue] = useState(0)
    const [value, setValue] = useState(null)
    const [volume, setVolume] = useState(null)
    const [currentSample, setCurrentSample] = useState({})
    const [noneLeft, setNoneLeft] = useState(false)
    const [zeroed, setZeroed] = useState(false)
    const [itemsLeftToShow, setitemsLeftToShow] = useState([])
    const [color, setColor] = useState("#aabbcc");

    const waveformRef = useRef(null);

    const { favorites,
        getUsers,
        getFavorites,
        getRandomSample,
        randomSample,
        skipped,
        addRatings,
        getRatings,
        singleSample,
        ratings,
        getSkipped,
        randomSamplesLoaded,
        getSampleById,
    } = useContext(SampleContext)

    useEffect(() => {
        waveformRef.current = WaveSurfer.create({ 
          container: waveformRef.current,
          cursorColor: "transparent",
          backgroundColor: "black"
        });
        waveformRef.current.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
        waveformRef.current.setWaveColor(color)
      }, []);

      useEffect(() => {
        waveformRef.current.setWaveColor(color)
      }, [color]);

    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.sample_id == current.id
            }).length == 0
        }
    }

    const addComment = () => {
        addRatings({
            sample: currentSample.id,
            color: color,
            rating: value,
            loudness: volume
        })
    }
    
    useEffect(() => {
        let sampleId = parseInt(props.match.params.sampleId)
        getUsers().then(getSkipped).then(getFavorites).then(getSampleById(sampleId))
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
                    onPlay={e => console.log("onPlay")}
                    onVolumeChange={e => setVolume(e.target.volume)} />
            <TextField></TextField>
            <Button color="red">Submit Comment</Button>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
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