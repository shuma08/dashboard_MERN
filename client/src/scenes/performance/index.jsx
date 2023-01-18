import React from 'react'
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useGetUserPerformanceQuery } from 'redux/state/api';
import { PerformanceColumns } from './performanceColumns';
import CustomColumnMenu from 'components/CustomColumnMenu'
import { useSelector } from 'react-redux';

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector(state => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subTitle="Track your Affiliate Sales Performance Here" />
      <Box mt="40px" height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
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
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={PerformanceColumns}
          components={{
            ColumnMenu: CustomColumnMenu
          }}
        />
      </Box>
    </Box>
  )
}

export default Performance;