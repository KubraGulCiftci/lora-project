import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CircularProgressbar from 'react-circular-progressbar';
import { LineChart, Line, CartesianGrid, XAxis, 
  YAxis, Tooltip, Label } from 'recharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactAudioPlayer from 'react-audio-player';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Emoji from 'react-emoji-render';
import './App.css';

const data = [
  { name: '8 bytes', Jitter: 114 },
  { name: '16 bytes', Jitter: 123 },
  { name: '32 bytes', Jitter: 143 },
  { name: '64 bytes', Jitter: 191 },
  { name: '128 bytes', Jitter: 289 },
  { name: '250 bytes', Jitter: 369 }
];

let dataRates = [
  {
    spreading: 12,
    bandwidth: 125,
    bitRate: 250
  },
  {
    spreading: 11,
    bandwidth: 125,
    bitRate: 440
  },
  {
    spreading: 10,
    bandwidth: 125,
    bitRate: 980
  },
  {
    spreading: 9,
    bandwidth: 125,
    bitRate: 1760
  },
  {
    spreading: 8,
    bandwidth: 125,
    bitRate: 3125
  },
  {
    spreading: 7,
    bandwidth: 125,
    bitRate: 5470
  }
];

const colorArray = ["red", "blue", "green", "yellow", "lightblue", "darkblue", "lightgreen", "darkgrey"];

let normalizedFontSize = window.innerWidth < 800 ? 18 : 25;

class App extends Component {
  /* kubra-didem-back.herokuapp.com/data POST. */

  state = {
    data: '',
    progress: 0,
    backgroundColor: 1,
  };

  componentDidMount() {
    setInterval(
      () => {
        if(this.state.progress !== 100) {
          this.setState({ progress: this.state.progress + 1 });
        }
        else {
          return;
        }
      }, 30
    );

    setInterval(
      () => {
        fetch('https://kubra-didem-back.herokuapp.com/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((response) => {
          return response.json();
        }).then((responseJson) => {
          this.setState({ data: responseJson.data });
        });

      }, 1000
    );

    setInterval(
      () => {
        let randomColor = Math.floor(Math.random() * (colorArray.length + 1));
        this.setState({ backgroundColor: randomColor });
      }, 6000
    )
  }

  render() {
    return (
      <div className="App">
      <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
        <header className="App-header" style={{ backgroundColor: colorArray[this.state.backgroundColor] }} >
          <h1 className="App-title">Kubra & Didem LoRa {/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Web'} App.</h1>
          {window.innerWidth > 800 ? <h1><Emoji text="❤" /> LoRa</h1> : null}
        </header>
        <div>
          <CircularProgressbar percentage={this.state.progress} />
        </div>
        <h1 className="regular-text">Received data: {this.state.data}</h1>
        <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize }}>We had used Dragino LoRa shield which has Semtech SX1276 LoRa transceiver.</h1>
        <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize }}>It has built-in 250 bytes FIFO buffer for both receive and transmit side.</h1>
        <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize }}>All software we had written here is open source. You can find it in GitHub.</h1>
        <br /><br />
        <div>
          <LineChart width={window.innerWidth < 800 ? window.innerWidth - 50 : window.innerWidth * 2 / 4} 
          height={window.innerWidth < 800 ? window.innerWidth / 2 : window.innerHeight * 2 / 4} 
          data={data} style={{ marginLeft: window.innerWidth < 800 ? 0 : window.innerWidth * 4 / 16 }}>
            <Line type="monotone" dataKey="Jitter" stroke={colorArray[this.state.backgroundColor]} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" label={window.innerWidth < 800 ? "" : "Bytes"} />
            <YAxis>
              <Label value="ms" position="insideBottom" />
            </YAxis>
            <Tooltip />
          </LineChart>
          <h3 style={{ fontWeight: 300 }}>Tested on 0 dBm with 250 bytes TX buffer on 100 meters line of sight.</h3>
          <br />
          <hr style={{ width: window.innerWidth / 2, borderColor: colorArray[this.state.backgroundColor] }} />
          <br />
          <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize }}>We also tried to transmit audio with compression.</h1>
          <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize }}>Due to LoRa's enhance on long range, the data rate is not eligible for real-time send.</h1>
          <br /><br />
          <BootstrapTable data={dataRates} hover tableStyle={{ width: window.innerWidth < 800 ? window.innerWidth - 30 : window.innerWidth / 2, 
            marginLeft: window.innerWidth < 800 ? 15 : window.innerWidth / 4, fontSize: normalizedFontSize }}>
            <TableHeaderColumn isKey dataField='spreading'>SF</TableHeaderColumn>
            <TableHeaderColumn dataField='bandwidth'>BW</TableHeaderColumn>
            <TableHeaderColumn dataField='bitRate'>Bit/s</TableHeaderColumn>
          </BootstrapTable>
          <br />
          <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize - 2 }}>That is what we transmitted.</h1>
          <br />
          <ReactAudioPlayer
            src="KubraDidem.m4a"
            style={{ width: window.innerWidth / 2 }}
            controls
          />
          <br /><br />
          <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize - 2 }}>That is what we got with -32 RSSI and we had to wait approximately 9 seconds even for 109 kB, 5 second duration raw voice .m4a file with Heatshrink compression!.</h1>
          <br />
          <ReactAudioPlayer 
            src="KubraDidem_LoRaSec.m4a"
            style={{ width: window.innerWidth / 2 }}
            controls
          />
          <br /><br />
          <img src="RawSound.jpg" width={window.innerWidth < 800 ? window.innerWidth - 20 : window.innerWidth / 2} alt="Picture of hex outputs." />
          <br />
          <h1 style={{ fontWeight: 300, fontSize: normalizedFontSize -2 }}>We had a SD card module which was talking with SPI directly connected to Arduino Mega 2560, inside it we put our voice which you had listened right before. We read data as raw binary format which we printed as hex values, then sent it with LoRa.
          Afterwards, we sent data to our backend server to serve it in here.</h1>
        </div>
        <br /><br /><br /><br />
        
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
