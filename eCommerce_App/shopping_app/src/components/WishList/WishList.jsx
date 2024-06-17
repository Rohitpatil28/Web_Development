import React, { useEffect } from 'react'
import { Grid, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Rating from '@mui/material/Rating';
import { removeFromWishList } from '../../store/slices/cartSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { setFinalAmount } from '../../store/slices/cartSlice';
import './wishList.css'


function WishList() {

    const { cart, wishList } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFinalAmount());
    }, [cart])

    return (
        <Grid container lg={12} id='Grid1'>
            <Grid item lg={11} id="Grid2">
                {
                    wishList.length ?
                        <Typography>Wish list items:{wishList.length}</Typography>
                        :
                        <Typography>Please add items to wish list</Typography>
                }
                <hr />
                <Grid container lg={12} id='Grid3'>

                    {wishList.map((product, index) => (
                        <Grid item lg={2} key={index} id='cardGrid'>

                            <DeleteIcon fontSize='small' style={{ paddingLeft: '225px' }} onClick={() => { dispatch(removeFromWishList(product.id)) }} />

                            <div id='imgDiv'>
                                <img src={product.thumbnail} alt={product.title} id='imgTag' />
                            </div>

                            <Typography id='productTitle'>{product.title}</Typography>

                            <Typography id='descriptionTypography'>
                                {product.description.split(' ').slice(0, 4).join(' ')}
                                {product.description.split(' ').length > 4 && '...'}
                            </Typography>

                            <div id='pricenAndDiscountDiv'>
                                <Typography id='priceTypography'><CurrencyRupeeIcon fontSize='10px' />{product.price}</Typography>

                                <Typography id="discountTypography"><ArrowDownwardIcon id='discountIcon' />{product.discountPercentage}%</Typography>
                            </div>

                            <div id="stockAndRatingDiv">
                                <Typography id='stockTypography'>In Stock..</Typography>
                                <Typography id="ratingTypography"><Rating defaultValue={product.rating} readOnly size='small' /></Typography>
                            </div>

                            <div id='cartAndBuyButtonDiv'>
                                <Button variant='outlined' size='small' id='cartButton' onClick={() => { dispatch(addToCart(product)) }}>
                                    <AddShoppingCartIcon fontSize='small' />
                                </Button>
                                <Button variant='outlined' size="small">Buy now</Button>
                            </div>

                            {
                                product.price < 500 ?
                                    <Typography id='deliveryTypography'>No Free delivery</Typography>
                                    :
                                    <Typography id='deliveryTypography'>Free Delivery</Typography>
                            }

                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default WishList


