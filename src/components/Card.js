import React from 'react'
import { useState } from 'react';

export default function Card({title, imageUrl, price, id, pId, onPlus, onFavorite, calcTotalPrice, setTotalPrice, favorited = false, favorites}) {
 
 const [isAddet, setIsAddet] = useState('/img/btn-plus.svg')
  const [isFavorite, setIsFavorite] = useState(favorited)
 
const onClickPlus = () => {
  setTotalPrice(calcTotalPrice(price))
  const dodo = () => {
    setIsAddet('/img/btn-plus.svg')
  }
  onPlus({title, imageUrl, price})
  setIsAddet('/img/btn-checked.svg')
  setTimeout(dodo, 300) 
  
  
}
const onClickFavorite = () => {
  onFavorite({title, imageUrl, price, pId, id})
  setIsFavorite(!isFavorite)
}

    return(
    <div className='card mb-30'>
        <div className='favorite' >
          <img onClick={onClickFavorite} src={favorites.some((obj) => obj.pId == pId ) ? '/img/liked.png' : '/img/unliked.svg' } alt="Unliked" />
        </div>
        <img className='cardImg' width={133} height={112} src={imageUrl} alt="card1" />
        <h5>{title}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column '>
            <span>Price:</span>
            <b>{price}$</b>
          </div>
          <img className='btn-Add' onClick={onClickPlus}  src={isAddet} alt="cardPlus" />
         
        </div>
    </div>
    )
}
   
