import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getGenerators } from '../../../actions/generator';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import GeneratorsActions from './GeneratorsActions';
import isAdmin from '../utils/isAdmin';
// import isAdmin from '../utils/isAdmin';

// eslint-disable-next-line react/prop-types
const Generators = ({ setSelectedLink, link }) => {
  const {
    state: { generators, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (generators.length === 0) getGenerators(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'Photo',
        width: 70,
        renderCell: (params) => <Avatar src={params.row.images[0]} variant='rounded' />,
        sortable: false,
        filterable: false,
      },
      { field: 'company', headerName: 'Company', width: 170 },
      { field: 'usageType', headerName: 'Usage Type', width: 130 },
      { field: 'genType', headerName: 'Generator Type', width: 130 },
      { field: 'power', headerName: 'Power', width: 100 },
      { field: 'model', headerName: 'Model', width: 120 },
      { field: 'serialNumber', headerName: 'Serial Number', width: 150 },
      { field: 'lng', headerName: 'Longitude', width: 110 },
      { field: 'lat', headerName: 'Latitude', width: 110 },
      {
        field: 'uName',
        headerName: 'Added by',
        width: 80,
        renderCell: params => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        )
      },
      // {
      //   field: 'createdAt',
      //   headerName: 'Created At',
      //   width: 200,
      //   renderCell: (params) =>
      //     moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
      // },
      { field: '_id', hide: true },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        renderCell: (params) => (
          <GeneratorsActions {...{ params }} />
        ),
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Generators
      </Typography>
      <DataGrid
        columns={columns}
        rows={isAdmin(currentUser)
           ? generators
           : generators.filter((generator) => generator.uid === currentUser.id)}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Generators;