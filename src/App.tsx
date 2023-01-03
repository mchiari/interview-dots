import React, { useEffect, useState } from 'react'

function App() {

  interface dot {
    x: number,
    y: number,
  }

  const [dots, setDots] = useState<dot[]>([])
  console.log('dots:  ',dots)
  const [undoDots, setUndoDots] = useState<dot[]>([])
  console.log('undoDots:  ',undoDots)

  const handlePaneClick = (e: React.MouseEvent) => {
    setDots([...dots, { x: e.pageX, y: e.pageY }])
  }

  const handleUndo = () => {

    let undo = dots.pop()
    if(undo){
      setUndoDots([...undoDots, undo])
    }
    
    setDots([...dots])
  }

  const handleRedo = () => {

    setDots([...dots,undoDots[undoDots.length-1]])
    undoDots.pop()
  }

  return (
    <div className="App">

      <div className='container' onClick={(e) => handlePaneClick(e)}>

        {dots.map((dot) => {
          return dot ? <div key={dot.x} className='dot' style={{ left: `${dot.x - 700}px`, top: `${dot.y - 180}px` }}></div> : null
        })}

      </div>
      <div className='buttonContainer'>
        <button className='button' onClick={handleUndo} disabled={dots.length <= 0 ? true : false}>Undo</button>
        <button className='button' onClick={handleRedo} disabled={undoDots.length <= 0 ? true : false}>Redo</button>
      </div>

    </div>
  )
}

export default App
