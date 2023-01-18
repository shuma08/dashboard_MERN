import { DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic } from '@mui/icons-material';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import React from 'react'
import { useGetDashboardQuery } from 'redux/state/api';
import StatBox from "components/StatBox";
import OverviewChart from 'components/OverviewChart';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px")
  const { data, isLoading } = useGetDashboardQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumns: isNonMediumScreens ? undefined : "span 12" }
        }}
      >
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >

          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />
      </Box>

    </Box>
  )
}

export default Dashboard