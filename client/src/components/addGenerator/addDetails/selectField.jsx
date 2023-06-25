import React from 'react'

const selectField = ({mainProps}) => {
  return (
    <TextField 
      onChange={handleUsage} 
      sx={{ width: 229 }}
    >
      <MenuItem value='MDA'>MDA</MenuItem>
      <MenuItem value='Commercial'>Commercial</MenuItem>
      <MenuItem value='Industrial'>Industrial</MenuItem>
      <MenuItem value='Personal'>Personal</MenuItem>
    </TextField>
  )
}

export default selectField