import React, { useEffect } from 'react';
import { useState } from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Card from './components/Card'
import Header from './components/Header';
import Drawer from './components/Drawer';



function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [itemsCart, setItemCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [totalPrice, setTotalPrice] = useState(localStorage.getItem('totalPrice'))

  
useEffect(() => {
  axios.get('https://63440edd2dadea1175b3d2e4.mockapi.io/items').then((res) => {
    setItems(res.data)
  })
  axios.get('https://63440edd2dadea1175b3d2e4.mockapi.io/cart').then((res) => {
    setItemCart(res.data)
  })
  axios.get('https://63440edd2dadea1175b3d2e4.mockapi.io/favorites').then((res) => {
    setFavorites(res.data)
  })
  
  
},[])

 
  const handleToggleCart = (event) => {
    axios.get('https://63440edd2dadea1175b3d2e4.mockapi.io/cart').then((res) => {
    setItemCart(res.data)
  })
    return setCartOpened(!cartOpened)
  }

  const onAddToCart = (obj) => {
    axios.post('https://63440edd2dadea1175b3d2e4.mockapi.io/cart', obj);
    setItemCart(prev => [...prev, obj])
  }

  const onAddToFavorite = (obj) => {
    if (favorites.find((favObj) => favObj.pId == obj.pId)) {
      favorites.map((elem) => {
        if(elem.pId == obj.pId) {
          axios.delete(`https://63440edd2dadea1175b3d2e4.mockapi.io/favorites/${elem.id}`)
          setFavorites(prev => prev.filter((item) => item.pId !== obj.pId))
        } 
      })
    } 
    else {
      axios.post('https://63440edd2dadea1175b3d2e4.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, obj])
    }
  }

  const onRemoveToFavorite = (obj) => {
    axios.delete(`https://63440edd2dadea1175b3d2e4.mockapi.io/favorites/${obj.id}`)
    setFavorites(prev => prev.filter((item) => item.pId !== obj.pId))
  }

  const onRemoveItem = (obj) => {
    axios.delete(`https://63440edd2dadea1175b3d2e4.mockapi.io/cart/${obj.id}`);
    setItemCart(prev => prev.filter((item) => item.id !== obj.id))
    minusTotalPrice(obj.price)
  }


  const  onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const calcTotalPrice = (price) => {
    let res = Number(price)
    itemsCart.map((elem) => {
      res = res + Number(elem.price)
    })
   localStorage.setItem('totalPrice', res.toString())
    return res
  }
  const minusTotalPrice = (price) => {
    let res = 0
    itemsCart.map((elem) => {
      res = res + Number(elem.price)
    })
    res = res - price
   localStorage.setItem('totalPrice', res.toString())
   setTotalPrice(res)
    return res
  }


  return (
    <div className="wrapper clear">
      {cartOpened && 
      <Drawer 
      handleToggleCart={handleToggleCart} 
      itemsCart={itemsCart}
      onRemove={onRemoveItem}
      calcTotalPrice={calcTotalPrice}
      setTotalPrice={setTotalPrice}
      totalPrice={totalPrice}
      
      
      
      />}
      <Header
       handleToggleCart={handleToggleCart}
       itemsCart={itemsCart.length}
       itemsFav={favorites.length}
       totalPrice={totalPrice}
       />

      <Routes>
          <Route path='/Sneakers-App/' element={
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                  <h1 >{searchValue ? `Search by request "${searchValue}"` : 'All sneakres' }</h1>
                  <div className='search-block'>
                    <img src="./img/search.svg" alt="Search" />
                    <img onClick={() => setSearchValue('')} className='removeInput cu-p' src="./img/btn-remove.svg" alt="Remove" />

                    <input onChange={onChangeSearchInput} value={searchValue} placeholder='Search... ' />
                  </div>
                </div>

                <div className='d-flex flex-wrap cont'>

                  {
                    items
                    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((obj) => (
                      <Card 
                      key={obj.index}
                      pId={obj.pId}
                      title={obj.title}
                      price={obj.price}
                      imageUrl={obj.imageUrl}
                      onPlus={(obj) => onAddToCart(obj)}
                      favorites={favorites}
                      onFavorite={(obj) => onAddToFavorite(obj)}
                      calcTotalPrice={calcTotalPrice}
                      setTotalPrice={setTotalPrice}
                      totalPrice={totalPrice}
                      />
                    ))
                  }
                </div>
            </div>
          }/>
          <Route path='/favorites' element={
            favorites.length ? 
                <div className='content p-40'>
                  <div className='routeIcon'></div>
                  <div className='d-flex align-center justify-between mb-40'>
                    <h1>Watchlist</h1>
                  </div>

                  <div className='d-flex flex-wrap'>

                    {
                      favorites
                      .map((obj) => (
                        <Card 
                        key={obj.index}
                        id={obj.id}
                        pId={obj.pId}
                        title={obj.title}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        onPlus={(obj) => onAddToCart(obj)}
                        favorites={favorites}
                        onFavorite={(obj) => onRemoveToFavorite(obj)}
                        calcTotalPrice={calcTotalPrice}
                        setTotalPrice={setTotalPrice}
                        totalPrice={totalPrice}
                        favorited={true}
                        />
                      ))
                    }
                  </div>
                </div>
            :
                <div className='emptyFav'>
                  <img  src="./img/bigHeart.svg" alt="cart" />
                  <h1>You have no items in your Watchlist.</h1>
                  <span>
                    Start adding items to your Watchlist today! 
                    Simply tap ‘Add to watchlist button’ next to the item you want to keep a close eye on.
                  </span>
                  <Link to='/'>
                    <button className='greenButton'>
                      <img src="./img/arrow.svg" alt="arrow" />
                      Back to products
                    </button>
                  </Link>
                </div>
          }/>
          <Route path='/checkout' element={
            <div className='emptyFav'>
              <img  src="./img/checkout.png" alt="cart" />
                  <h1 className='mb-30'>Checkout feature coming soon</h1>
                  
                  <Link to='/'>
                    <button className='green greenButton'>
                      <img src="./img/arrow.svg" alt="arrow" />
                      Back to products
                    </button>
                  </Link>
            </div>
          }/>
      </Routes>
    </div>
  );
}

export default App;
