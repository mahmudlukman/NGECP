import { useEffect, useState } from 'react'
import { useValue } from '../../../context/ContextProvider'
import { getGenerators } from '../../../actions/generator'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster';
import './cluster.css';
import GeocoderInput from './GeocoderInput';
import PopupGenerator from './PopupGenerator';
import Header from '../../../components/Header';


const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = ({ setSelectedLink, link }) => {
  const { state: { filteredGenerators }, dispatch, mapRef, containerRef } = useValue()

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null)

  useEffect(() => {
    setSelectedLink(link)
  }, [])

  useEffect(() => {
    getGenerators(dispatch)
  }, [])

  useEffect(() => {
    const points = filteredGenerators.map((generator) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        generatorId: generator._id,
        company: generator.company,
        usageType: generator.usageType,
        genType: generator.genType,
        power: generator.power,
        model: generator.model,
        serialNumber: generator.serialNumber,
        lng: generator.lng,
        lat: generator.lat,
        images: generator.images,
        uPhoto: generator.uPhoto,
        uName: generator.uName,
        uPhone: generator.uPhone
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(generator.lng), parseFloat(generator.lat)],
      },
    }))
    setPoints(points)
  }, [filteredGenerators])

  useEffect(() => {
    supercluster.load(points)
    setClusters(supercluster.getClusters(bounds, zoom))
  }, [points, zoom, bounds])

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CLUSTER MAP" subtitle="Find All Generators by Location" />
      <Box
        sx={{
          height: '83vh',
          position: 'relative'
        }}
      >
        <ReactMapGL
          initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
          mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAP_TOKEN}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          ref={mapRef}
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
          <Box sx={{ width: 240, p: 3 }}>
            <Box ref={containerRef}></Box>
          </Box>
          {clusters.map((cluster) => {
            const { cluster: isCluster, point_count } = cluster.properties;
            const [longitude, latitude] = cluster.geometry.coordinates;
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (point_count / points.length) * 20}px`,
                      height: `${10 + (point_count / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const zoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1,
                      });
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={`generator-${cluster.properties.generatorId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.uName}>
                  <Avatar
                    src={cluster.properties.uPhoto}
                    component={Paper}
                    elevation={2}
                    onClick={() => setPopupInfo(cluster.properties)}
                  />
                </Tooltip>
              </Marker>
            );
          })}
          <GeocoderInput />
          {popupInfo && (
            <Popup
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              maxWidth="auto"
              closeOnClick={false}
              focusAfterOpen={false}
              onClose={() => setPopupInfo(null)}
            >
              <PopupGenerator {...{ popupInfo }} />
            </Popup>
          )}
        </ReactMapGL>
      </Box>
    </Box>
  )
}

export default ClusterMap