import { Box, CircularProgress, useTheme } from '@mui/material'
import Header from 'components/Header'
import React from 'react'
import { useGetGeographyQuery } from 'redux/state/api';
import MyResponsiveChoropleth from './geographyMap';

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subTitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <MyResponsiveChoropleth data={data} />
        ) :
          <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress color='inherit' />
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Geography