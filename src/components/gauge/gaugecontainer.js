import React, { useState } from 'react';
import Gauge from './gauge';
import * as d3 from 'd3';

function GaugeContainer() {

  const colorScales = {
    "SoC": d3.scaleThreshold().domain([15, 30, 100]).range(["red", "orange", "green"]),
    "SoH": d3.scaleThreshold().domain([80, 90, 100]).range(["red", "orange", "green"]),
    "Akım": d3.scaleThreshold().domain([50, 100]).range(["orange", "green"]),
  };

  const [socValue, setSocValue] = useState(0);
  const [sohValue, setSohValue] = useState(0);
  const [akimValue, setAkimValue] = useState(0); 

  const [displaySoC, setDisplaySoC] = useState(true); 
  const [displaySoH, setDisplaySoH] = useState(true);
  const [displayAkim, setDisplayAkim] = useState(true); 

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div>
        {displaySoC && (
          <>
            <h2>SoC {socValue}%</h2>
            <Gauge value={socValue} label="SoC" colorScales={colorScales}/>
          </>
        )}
        <div>
          <button onClick={() => setDisplaySoC(!displaySoC)}>SoC Göster/ Gizle</button>
          <input 
            type="number" 
            value={socValue} 
            onChange={(e) => setSocValue(Math.min(Math.max(Number(e.target.value), 0), 100))} 
            placeholder="SoC Değeri"
          />
        </div>
      </div>
      <div>
        {displaySoH && (
          <>
            <h2>SoH {sohValue}%</h2>
            <Gauge value={sohValue} label="SoH" colorScales={colorScales}/>
          </>
        )}
        <div>
          <button onClick={() => setDisplaySoH(!displaySoH)}>SoH Göster/ Gizle</button>
          <input 
            type="number" 
            value={sohValue} 
            onChange={(e) => setSohValue(Math.min(Math.max(Number(e.target.value), 0), 100))} 
            placeholder="SoH Değeri"
          />
        </div>
      </div>
      <div>
        {displayAkim && (
          <>
            <h2>Paket Akımı {akimValue} A</h2>
            <Gauge value={akimValue} label="Akım" colorScales={colorScales} />
          </>
        )}
        <div>
          <button onClick={() => setDisplayAkim(!displayAkim)}>Paket Akımı Göster/ Gizle</button>
          <input 
            type="number" 
            value={akimValue} 
            onChange={(e) => setAkimValue(Math.min(Math.max(Number(e.target.value), 0), 100))} 
            placeholder="Paket Akımı Değeri"
          />
        </div>
      </div>
    </div>
  );
  }  

export default GaugeContainer;
