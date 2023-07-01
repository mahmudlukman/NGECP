import React, { useEffect } from 'react'

const Generators = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])
  return (
    <div>Generators</div>
  )
}

export default Generators