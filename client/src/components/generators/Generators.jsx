import { Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { useValue } from '../../context/ContextProvider'

const Generators = () => {
  const { state: { filteredGenerators }, dispatch } = useValue()
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{ height: 450, mt: 4, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        cols={3}
        rowHeight={164}
      >
        {filteredGenerators.map((generator) => (
          <Card key={generator._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={generator.company}
                actionIcon={
                  <Tooltip title={generator.uName} sx={{ mr: '5px' }}>
                    <Avatar src={generator.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={generator.images[0]}
                alt={generator.company}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'UPDATE_GENERATOR', payload: generator })}
              />
              <ImageListItemBar
                title={generator.usageType}
                subtitle={generator.genType}
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  )
}

export default Generators