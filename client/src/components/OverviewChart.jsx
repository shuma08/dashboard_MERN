import React, { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useGetSalesQuery } from 'redux/state/api';
import { useTheme, Box, CircularProgress, } from '@mui/material';

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  console.log("🚀 ~ OverviewChart ~ data", data)
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: []
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: []
    };

    Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
      const curSales = acc.sales + totalSales;
      const curUnits = acc.units + totalUnits;

      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: curSales }
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: curUnits }
      ];
      return { sales: curSales, units: curUnits }
    }, { sales: 0, units: 0 })

    return [[totalSalesLine], [totalUnitsLine]]
  }, [data]);

  if (!data || isLoading) return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color='inherit' />
    </Box>
  )
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200]
            }
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200]
            }
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1
            },
            text: {
              fill: theme.palette.secondary[200]
            }
          }
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200]
          }
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main
          }
        }
      }}
      margin={{ top: 10, right: 20, bottom: 50, left: 70 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.2f"
      curve='catmullRom'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => isDashboard ? v.slice(0, 3) : v,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickValues:5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : `Total ${view === 'sales' ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: 'middle'
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={
        !isDashboard ? [
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 30,
            translateY: -50,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ] : undefined}
    />

  )
}

export default OverviewChart