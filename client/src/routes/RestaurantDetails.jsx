import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import restaurantsFinder from '../apis/restaurantsFinder';
import Addreview from '../components/Addreview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext'
const RestaurantDetails = () => {
    const {id}= useParams();
    const {seletedRestaurant,setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(()=>{
      const fetchData = async(id)=>{
        try{
          const response = await restaurantsFinder.get(`/restaurants/${id}`)
          setSelectedRestaurant(response.data.data)
      }catch(err){
          console.log(err);
      }
      }
        fetchData(id);
    },[])
    console.log("mainhu",seletedRestaurant && seletedRestaurant);
  return (
    <div className='container'>
    <div className='font-weight-light display-1 text-center mb-4'>{seletedRestaurant && seletedRestaurant.restaurant.name}</div>
    <div className="text-center mb-2">
      <StarRating rating={seletedRestaurant && seletedRestaurant.restaurant.average_rating}/>
    </div>
    <Reviews reviews={seletedRestaurant && seletedRestaurant.reviews}/>
    <Addreview/>
    </div>
  )
}

export default RestaurantDetails