import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import restaurantsFinder from '../apis/restaurantsFinder';
const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name,setName] = useState("")
    const [location,setLocation] = useState("")
    const [priceRange,setPriceRange] = useState("")
    let history = useHistory();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(id);
        const response = await restaurantsFinder.put(`restaurants/${id}`,{
            name,
            location,
            price_range:priceRange
        })
        console.log("update Restaurant", response.data);
        history.push('/')
    }


    useEffect(()=>{
        const fetchData = async(id)=>{
            const response = await restaurantsFinder.get(`/restaurants/${id}`)
            console.log("upate",response.data.data);
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData(id)
    },[])

  return (
    <div className='container'>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e)=> setName(e.target.value)} type="text" name="" id="name" className='form-control mb-4' />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={(e)=> setLocation(e.target.value)} type="text" name="" id="location" className='form-control mb-4' />
            </div>
            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <input value={priceRange} onChange={(e)=> setPriceRange(e.target.value)} type="number" name="" id="price_range" className='form-control mb-4' />
            </div>
            <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Update</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant