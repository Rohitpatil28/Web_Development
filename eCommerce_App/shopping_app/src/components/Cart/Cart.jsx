import React, { useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, setFinalAmount } from '../../store/slices/cartSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Rating from '@mui/material/Rating';
import styled from 'styled-components';

// ---------------------------------------------

const Grid1 = styled(Grid)`
padding:20px;
justify-content:space-around;
`
const Grid2 = styled(Grid)`
  background-color: white;
  min-height: 726px;
  padding: 8px;
`;

const Grid3 = styled(Grid)`
  display: flex;
  overflow-y: auto;
  max-height: 650px;
  padding: 8px;
`;

const CardGrid = styled(Grid)`
  background-color: #fafafa;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #eeeeee;
  margin: 6px 12px;
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

const QuantityDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 8px;
`;

// ---------------------------------------------

const SummaryGrid = styled(Grid)`
  background-color: #fafafa;
  padding: 15px;
  max-height: 200px;
  border-radius: 15px;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// ---------------------------------------------


function Cart() {

    const { cart, totalQuantity, totalPrice } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFinalAmount());
    }, [cart])

    return (
        <>
            <Grid1 container lg={12}>
                <Grid2 item lg={9}>
                    {
                        cart.length ? <Typography style={{ fontWeight: 'bolder' }}>Cart Items:{cart.length}</Typography> : <Typography style={{ fontWeight: 'bolder' }}>Please add items to cart</Typography>
                    }
                    <hr />
                    <Grid3 container lg={12}>
                        {cart.map((product, index) => (

                            <CardGrid item lg={2.6} key={index}>
                                <DeleteIcon fontSize='small' style={{ paddingLeft: '225px' }} onClick={() => { dispatch(removeFromCart(product.id)) }} />

                                <ImgDiv>
                                    <StyledImg src={product.thumbnail} alt={product.title} />
                                </ImgDiv>

                                <Typography m={1} style={{ fontWeight: 'bold' }}>{product.title}</Typography>

                                <Typography m={1} fontSize={12}>
                                    {product.description.split(' ').slice(0, 4).join(' ')}
                                    {product.description.split(' ').length > 4 && '...'}
                                </Typography>

                                <PriceAndDiscount>
                                    <PriceTypography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />{product.price}</PriceTypography>
                                    <DiscountTypography><ArrowDownwardIcon style={{ fontSize: '15px', fontWeight: 'bolder' }} />{product.discountPercentage}%</DiscountTypography>
                                </PriceAndDiscount>

                                <StockAndRatingDiv>
                                    <StockTypography >In Stock..</StockTypography>
                                    <RatingTypography><Rating defaultValue={product.rating} readOnly size='small' /></RatingTypography>
                                </StockAndRatingDiv>

                                <QuantityDiv>
                                    <Button variant='outlined' size='small'
                                        onClick={() => { dispatch(increaseQuantity(product.id)) }}
                                    ><AddIcon fontSize='small' /></Button>
                                    <Typography >Quantity:<b>{product.quantity}</b></Typography>
                                    <Button variant='outlined' size='small'
                                        onClick={() => { dispatch(decreaseQuantity(product.id)) }}
                                    ><RemoveIcon fontSize='small' /></Button>
                                </QuantityDiv>

                            </CardGrid>

                        ))}
                    </Grid3>

                </Grid2>

                <SummaryGrid item lg={2.5}>
                    <Typography variant='h6'>Summary</Typography>
                    <hr />
                    <Typography variant="subtitle1" m={1}>Total Items: <b>{totalQuantity}</b></Typography>
                    <Typography variant="subtitle1" m={1}>Total Price: <CurrencyRupeeIcon style={{ fontSize: '15px' }} /><b>{totalPrice}</b></Typography>
                    <Button variant='contained' fontSize='small' style={{ margin: '8px', backgroundColor: '#2e7d32' }}>Buy Now</Button>
                </SummaryGrid>

            </Grid1 >
        </>
    )
}

export default Cart
