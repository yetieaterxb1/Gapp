import React from 'react'

const randomRGB = () => {

}
const randomRingColors = () => {

}
const makeRings = (n, styles) => {
  const N = Array.from({length:n},(v,i)=>i+1)
  return N.map(r => <div key={r} className={'ring ' + 'ring' + r} style={styles[n]}></div>)
}
const WhirlpoolLoader = props => {
  return (
    <div id='loader' style={{display: props.display ? 'initial' : 'none' }}>
      <div className="whirlpool">
        {
          makeRings(9, null)
        }
      </div>
    </div>
  )
}

