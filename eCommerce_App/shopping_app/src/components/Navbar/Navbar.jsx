import { Typography, Box, Toolbar, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFinalAmount } from '../../store/slices/cartSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import { setFilteredData } from '../../store/slices/cartSlice'
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';


const StyledBox = styled(Box)`
flexgrow:1;
padding-top:64px;
`

const TitleTypography = styled(Typography)`
    color: white;
    display: flex;
    align-items: center;
    font-style: italic;
    font-weight: bold;
`;


const StyledlToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-around;
`;


const HomeIconStyle = styled(HomeIcon)`
    font-size: 27px;
    color: black;
`;

const ShoppinIcon = styled(ShoppingCartOutlinedIcon)`
   font-size: 27px;
   color: white;
`;

const IconsDiv = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;

function Navbar() {

    const { cart, wishList } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setFinalAmount());
    }, [cart])


    return (
        <StyledBox>
            <AppBar position="fixed" >
                <StyledlToolbar >

                    <TitleTypography variant="h6">
                        Shoppers Stop...<AddBusinessIcon />
                    </TitleTypography>

                    <TextField
                        onChange={(e) => { dispatch(setFilteredData(e.target.value)) }}
                        variant="standard"
                        size="small"
                        placeholder="Search"
                        style={{
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            width: '300px',
                            outline: 'none',
                            padding: '5px',
                            paddingTop: '7px',
                            border: '1px solid #ccc',
                        }}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: 'black', marginBottom: '5px' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <IconsDiv>
                        <Link to='/'>
                            <HomeIconStyle>
                                <HomeIcon />
                            </HomeIconStyle>
                        </Link>

                        <Link to='/cart'>
                            <Badge badgeContent={cart.length} style={{ color: 'white' }}>
                                <ShoppinIcon>
                                    <ShoppingCartOutlinedIcon />
                                </ShoppinIcon>
                            </Badge>
                        </Link>

                        <Link to='/wishlist'>
                            <FavoriteIcon style={{ color: '#ec407a', fontSize: '27px' }}>
                                <Badge badgeContent={wishList.length} style={{ color: 'black' }} >
                                    <FavoriteIcon />
                                </Badge>
                            </FavoriteIcon>
                        </Link>

                    </IconsDiv>

                </StyledlToolbar>
            </AppBar>
        </StyledBox >
    );
}

export default Navbar;