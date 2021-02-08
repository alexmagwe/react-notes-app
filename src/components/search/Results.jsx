import React from 'react'
import Button from '@material-ui/core/Button'

function Results (props) {
  const { handleClose, results, desc } = { ...props.props }
  return (
    <div className='results-container'>
      <ul className='results-list'>
        {results.map((el, i) => (
          <Button key={i} onClick={() => handleClose(el)}>
            <li className='single-result result-text'>
              <small className='dark-grey'>{el['code']}</small>
              {el[desc]}
            </li>
          </Button>
        ))}
      </ul>
    </div>
  )
}
export default Results
