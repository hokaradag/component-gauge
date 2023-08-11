// Gerekli kütüphaneleri ve fonksiyonları içeri al
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Gauge bileşeni oluştur. value ve label props'larını al.
function Gauge({ value, label }) {
  // gaugeRef adında bir referans oluştur
  const gaugeRef = useRef(null);

  // Bileşenin değerlerinden biri değiştiğinde aşağıdaki fonksiyon çalışacak
  useEffect(() => {
    // Bazı başlangıç değerlerini ayarla
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2 - 10;
    const needleLength = radius - 30;

    // Mevcut svg'yi temizle
    d3.select(gaugeRef.current).selectAll("svg").remove();

    // Yeni bir svg oluştur
    const svg = d3.select(gaugeRef.current)
      .append('svg')
      .attr('width', width-5)
      .attr('height', height-5)
      .style('background', '#f7f7f7')
      .style('border-radius', '50%')
      .style('box-shadow', '2px 2px 10px rgba(0,0,0,0.5)');

    // Merkezi bir grup oluştur
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Açı ve renk ölçekleri oluştur
    const scaleAngle = d3.scaleLinear()
      .domain([0, 100])
      .range([-Math.PI / 1.2, Math.PI / 1.2]);

    const colorScale = d3.scaleThreshold()
      .domain([20, 40, 100])
      .range(["red", "orange", "green"]);

    // Gösterge üzerindeki çizgileri çiz
    for (let i = 0; i <= 100; i += 5) {
      const angle = scaleAngle(i);
      const lineLength = i % 10 === 0 ? 15 : 7;

      g.append('line')
      .attr('x1', 0)
      .attr('y1', -radius + lineLength)
      .attr('x2', 0)
      .attr('y2', -radius)
      .attr('stroke', colorScale(i))
      .attr('stroke-width', 2)
      .attr('transform', `rotate(${angle * (180 / Math.PI)})`);
    }

    // Yüzdelik değeri ve label'ı ekle
    g.append('text')
    .attr('x', 0)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .text(`${value}%`);

    g.append('text')
    .attr('x', 0)
    .attr('y', -needleLength + 20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .text(label);

// Gösterge ibresinin ortasındaki büyük yuvarlağı ekle
g.append('circle')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', 8)
.attr('fill', '#555');

// Gösterge ibresinin ortasındaki daha küçük yuvarlağı ekle
g.append('circle')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', 4)
.attr('fill', '#333');

// Gösterge üzerindeki 0 ve 100 değerlerini ekle
const textRadius = radius - 25;
g.selectAll('.gauge-text')
  .data([0, 100])
  .enter().append('text')
  .attr('x', d => textRadius * Math.sin(scaleAngle(d)))
  .attr('y', d => -textRadius * Math.cos(scaleAngle(d)))
  .attr('text-anchor', 'middle')
  .attr('font-weight', 'bold')
  .text(d => d);

// Gösterge ibresini oluştur ve döndürerek değerin görsel temsilini ekle
g.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', -needleLength)
  .attr('stroke', colorScale(value))
  .attr('stroke-width', 3.5)
  .style('box-shadow', '2px 2px 10px rgba(0,0,0,0.4)')
  .attr("transform", `rotate(${scaleAngle(value) * (180 / Math.PI)})`);

}, [value, label]); // useEffect'in bağımlılıkları

// Renderlanacak div'i döndür (bu div içinde d3 ile svg oluşturulacak)
const [value, setValue] = useState(0);

return (
  <div className="App">
    {/* Başlıkta SoC ve değeri göster */}
    <h2>SoC {value}%</h2>
    
    {/* Gauge bileşenini değeri ve etiketiyle beraber renderle */}
    <Gauge value={value} label="SoC" />

    {/* Kullanıcının değeri ayarlayabileceği kaydırıcı input. Değer değiştiğinde state'i güncelle */}
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value} 
      onChange={(e) => setValue(Number(e.target.value))}
    />
  </div>
);}

export default Gauge;