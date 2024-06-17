import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, setProductData, addToWishList } from '../../store/slices/cartSlice';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { fetchProductData } from '../../api/dummyProductAPI';
import styled from 'styled-components';


const Grid1 = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 8px;
  margin-top: 8px; 
`;

// ---------------------------------------------

const CardGrid = styled(Grid)`
  margin:12px;
  background-color: #fafafa;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #eeeeee;
`;

const FavoriteIcon = styled(FavoriteBorderOutlinedIcon)`
  font-size: 20px;
  color: black;
  margin-left: 240px;
`;

// ---------------------------------------------

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  max-width: 95%;
  max-height: 95%;
  object-fit: cover;
  border-radius: 8px;
`;

// ---------------------------------------------

const PriceAndDiscount = styled.div`
display: flex;
justify-content: space-between;
`;

const PriceTypography = styled(Typography)`
margin-top: 4px;
margin-left: 8px;
font-weight: bold;
`;

const DiscountTypography = styled(Typography)`
margin-top: 4px;
margin-right: 20px;
color: green;
font-weight: bold;
font-family: sans-serif;
`;

// ---------------------------------------------

const TitleTypography = styled(Typography)`
  margin: 8px; 
  font-weight: bold;
`;

// ---------------------------------------------

const StockAndRatingDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StockTypography = styled(Typography)`
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 14px;
  color: green;
  font-weight: bolder;
`;

const RatingTypography = styled(Typography)`
  margin-top: 4px;
  margin-right: 20px;
`;


// ---------------------------------------------

const CartAndBuyDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CartButton = styled(Button)`
color:black;
border-color:black
`
// ---------------------------------------------

const DeliveryTypography = styled(Typography)`
font-size: 11px;
font-weight: bold;
font-style: italic;
margin-left: 12px;
margin-right: 12px;
`;

// ---------------------------------------------


const ProductCards = () => {

  const data = useSelector(state => state.cartReducer.items);
  const filteredData = useSelector(state => state.cartReducer.filteredData);

  const dispatch = useDispatch();

  async function getProductData() {
    const productData = await fetchProductData();
    dispatch(setProductData(productData));
  };

  useEffect(() => {
    if (data.length === 0) {
      getProductData();
    }
  }, []);

  return (
    <div style={{ minHeight: '759px' }}>

      <Grid1 container lg={12} >
        {filteredData && filteredData.map((product, index) => (

          <CardGrid item lg={2} key={index} m={1}>

            <FavoriteIcon onClick={() => dispatch(addToWishList(product))} />

            <ImgDiv>
              <StyledImg src={product.thumbnail} alt={product.title} />
            </ImgDiv>

            <TitleTypography>{product.title}</TitleTypography>

            <Typography m={1} fontSize={12}>
              {product.description.split(' ').slice(0, 4).join(' ')}
              {product.description.split(' ').length > 4 && '...'}
            </Typography>

            <PriceAndDiscount >
              <PriceTypography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />{product.price}</PriceTypography>

              <DiscountTypography><ArrowDownwardIcon style={{ fontSize: '15px', fontWeight: 'bolder' }} />{product.discountPercentage}%</DiscountTypography>
            </PriceAndDiscount>

            <StockAndRatingDiv>
              <StockTypography>In Stock..</StockTypography>
              <RatingTypography><Rating defaultValue={product.rating} readOnly size='small' /></RatingTypography>
            </StockAndRatingDiv>

            <CartAndBuyDiv >
              <CartButton variant='outlined' size='small' onClick={() => { dispatch(addToCart(product)) }}>
                Add to<AddShoppingCartIcon style={{ fontSize: '20px' }} />
              </CartButton>
              <Button variant='outlined' size="small">Buy now</Button>
            </CartAndBuyDiv>

            {product.price < 500 ? <DeliveryTypography>Free delivery</DeliveryTypography> :
              <DeliveryTypography>No free Delivery</DeliveryTypography>}

          </CardGrid>
        ))}
      </Grid1>
    </div>
  );
}

export default ProductCards;
