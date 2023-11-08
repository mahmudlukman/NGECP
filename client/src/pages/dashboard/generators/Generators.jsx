import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getGenerators } from '../../../actions/generator';
import GeneratorsActions from './GeneratorsActions';
import isAdmin from '../utils/isAdmin';
import Header from '../../../components/Header';
import FlexBetween from '../../../components/FlexBetween'

// eslint-disable-next-line react/prop-types
const Generators = ({ setSelectedLink, link }) => {
  const {
    state: { generators, currentUser },
    dispatch,
  } = useValue();
  const id = 'NGECP/FCT/0'

  const theme = useTheme();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (generators.length === 0) getGenerators(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        sortable: true,
        field: 'lineNo',
        headerName: 'Id',
        width: 150,
        flex: 0,
        editable: false,
        renderCell: (params) =>
         id + params.api.getRowIndex(params.row._id),
      },
      {
        field: 'images',
        headerName: 'Photo',
        width: 70,
        renderCell: (params) => <Avatar src={params.row.images[0]} variant='rounded' />,
        sortable: false,
        filterable: false,
      },
      { field: 'company', headerName: 'User', width: 170 },
      { field: 'usageType', headerName: 'Usage Type', width: 130 },
      { field: 'genType', headerName: 'Generator Type', width: 130 },
      { field: 'power', headerName: 'Capacity', width: 100 },
      { field: 'model', headerName: 'Model', width: 120 },
      // { field: 'serialNumber', headerName: 'Serial Number', width: 150 },
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
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="GENERATORS" subtitle="List of All Generators" />
        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => dispatch({ type: 'UPDATE_SECTION', payload: 1 })}
          >
            <AddCircle sx={{ mr: "10px" }} />
            Add New
          </Button>
        </Box> */}
      </FlexBetween>
      <Box
        mt="40px"
        height="65vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "5rem"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          }
        }}
      >
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
        />
      </Box>
    </Box>
  );
};

export default Generators;