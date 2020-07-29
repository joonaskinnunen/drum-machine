import React, { useState } from 'react'
import './App.css'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const App = () => {
  const [state, setState] = useState({ volume: 50, power: true, bank: false, displayText: "" })

  const sounds = {
    bankOneSounds: {
      Q: { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", name: "Heater 1" },
      W: { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", name: "Heater 2" },
      E: { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", name: "Heater 3" },
      A: { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", name: "Heater 4" },
      S: { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", name: "Clap" },
      D: { url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", name: "Open HH" },
      Z: { url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", name: "Kick-n' Hat" },
      X: { url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", name: "Kick" },
      C: { url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", name: "Closed HH" }
    },
    bankTwoSounds: {
      Q: { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", name: "Chord 1" },
      W: { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", name: "Chord 2" },
      E: { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", name: "Chord 3" },
      A: { url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", name: "Shaker" },
      S: { url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", name: "Open HH" },
      D: { url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", name: "Closed HH" },
      Z: { url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", name: "Punchy Kick" },
      X: { url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", name: "Side Stick" },
      C: { url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", name: "Snare" }
    }
  }

  const handleVolumeChange = (event, newValue) => {
    state.power && setState({ ...state, volume: newValue })
  }

  const handlePowerChange = (event) => {
    const isChecked = event.target.checked, newDisplayText = isChecked ? state.displayText : ""
    let newVolume = state.volume, newBank = state.bank
    if (state.power && !isChecked) {
      newVolume = 0
      newBank = false
    } else {
      newVolume = 50
    }
    setState({ ...state, power: isChecked, displayText: newDisplayText, volume: newVolume, bank: newBank });
  }

  const handleBankChange = (event) => {
    if (state.power) {
      const newDisplayText = event.target.checked ? "Smooth Piano Kit" : "Heater Kit"
      setState({ ...state, bank: event.target.checked, displayText: newDisplayText })
    }
  }

  const buttonOnClick = (sound) => {
    if (state.power) {
      const bank = state.bank ? "bankTwoSounds" : "bankOneSounds"
      setState({ ...state, displayText: sounds[bank][sound].name })
      const audio = new Audio(sounds[bank][sound].url)
      audio.volume = state.volume / 100
      audio.play()
    }
  }

  return (
    <div id="drum-machine">
      <div className="box">
        <div className="drum-pad-container">
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("Q")}>Q</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("W")}>W</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("E")}>E</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("A")}>A</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("S")}>S</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("D")}>D</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("Z")}>Z</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("X")}>X</button>
          <button className={state.power ? "drum-pad-power-on" : "drum-pad"} onClick={() => buttonOnClick("C")}>C</button>
        </div>
        <div className="controls-container">
          <div className="power-container">
            <FormGroup row>
              <FormControlLabel
                control={<Switch
                  checked={state.power}
                  onChange={handlePowerChange}
                  color="primary"
                  width="50%"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Power"
                labelPlacement="top"
              />
            </FormGroup>
          </div>
          <div id="display">
            <h3>{state.displayText}</h3>
          </div>
          <div className="volume-container">
            <VolumeDown style={{ marginRight: "5px" }} />
            <Slider value={state.volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" width="50%" />
            <VolumeUp style={{ marginLeft: "5px" }} />
          </div>
          <div className="bank-container">
            <FormGroup row>
              <FormControlLabel
                control={<Switch
                  checked={state.bank}
                  onChange={handleBankChange}
                  color="primary"
                  width="50%"
                  className="bankSwitch"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Bank"
                labelPlacement="top"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App