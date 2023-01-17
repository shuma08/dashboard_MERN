import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import Product from 'components/Product'
import React from 'react'
import { useGetProductsQuery } from 'redux/state/api'

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px")
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subTitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          justifyContent="space-between"
          rowGap="20px"
          gridTemplateColumns="repeat(4,minmax(0, 1fr))"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
          }}
        >
          {data.map(({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stat
          }) => (
            <Product
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              rating={rating}
              category={category}
              supply={supply}
              stat={stat}
            />
          )
          )}
        </Box>
      )
        : (
          <Box
            mt="20px"
            display="grid"
            justifyContent="space-between"
            rowGap="20px"
            gridTemplateColumns="repeat(4,minmax(0, 1fr))"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}
          >
            {Array.from(new Array(20)).map((item, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rectangular"
                width="100%"
                height={230}
                sx={{
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "0.55rem",
                }}
              />
            ))}
          </Box>
        )
      }
    </Box>
  )
}

export default Products