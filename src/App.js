import React, { useState } from 'react'
import './App.css'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

function App() {
  const [state, setState] = useState({ volume: 30, power: true, bank: false, displayText: "" })

  const handleVolumeChange = (event, newValue) => {
    setState({ ...state, volume: newValue });
  }

  const handlePowerChange = (event) => {
    setState({ ...state, power: event.target.checked });
  }

  const handleBankChange = (event) => {
    setState({ ...state, bank: event.target.checked });
  }

  return (
    <div id="drum-machine">
      <div class="box">
        <div className="drum-pad-container">
          <button className="drum-pad">Q</button>
          <button className="drum-pad">W</button>
          <button className="drum-pad">E</button>
          <button className="drum-pad">A</button>
          <button className="drum-pad">S</button>
          <button className="drum-pad">D</button>
          <button className="drum-pad">Z</button>
          <button className="drum-pad">X</button>
          <button className="drum-pad">C</button>
        </div>
        <div className="controls-container">
          <div className="power-container">
            <FormGroup row>
              <FormControlLabel
                control={<Switch
                  checked={state.power}
                  onChange={handlePowerChange}
                  color="primary"
                  name="checkedB"
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
            <VolumeDown />
            <Slider value={state.volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" width="50%" />
            <VolumeUp />
          </div>
          <div className="bank-container">
            <FormGroup row>
              <FormControlLabel
                control={<Switch
                  checked={state.bank}
                  onChange={handleBankChange}
                  color="primary"
                  name="checkedB"
                  width="50%"
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

export default App;
