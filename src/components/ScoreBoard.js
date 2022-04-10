import React from 'react'

const ScoreBoard = ({ score }) => {
    return (
        <div className='app-score-board'>
            <h3>Score: {score}</h3>
        </div>
    )
}

export default ScoreBoard