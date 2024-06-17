import { Routes, Route } from 'react-router-dom'
import Cart from '../components/Cart/Cart';
import ProductCards from '../components/ProductCards/ProductCards';
import WishList from '../components/WishList/WishList';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<ProductCards />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<WishList />} />
        </Routes>
    )
}

export default Router
