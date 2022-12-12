import React, {useEffect, useContext } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import restaurantsFinder from '../apis/restaurantsFinder'
import {RestaurantsContext}  from '../context/RestaurantsContext'
import StarRating from './StarRating';




const RestaurantsList = () => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const [currentPage,setCurrentPage]= useState(1)
    const [limit,setLimit]= useState(5)
    const [paginationLength,setPaginationLength]= useState(0)
    const [pagArr,setPageArr] = useState([])
    let history = useHistory();
    // console.log("pagiiii",pagArr);
    
    const fetchData = async(name='')=>{
        // console.log("namee",name);
        
        try{
            const response = await restaurantsFinder.get(`/restaurants?name=${name}`)

            setPaginationLength(Math.ceil(response.data.data.length/limit))
            setRestaurants(response.data.data)
        }catch(err){
            console.log("err from fetching All restaurants-->",err);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const indexOfLastPost = currentPage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    const currentRestaurants = restaurants.slice(indexOfFirstPost,indexOfLastPost)
    useEffect(()=>{
        handlePageArr(paginationLength)
    },[paginationLength]);
    
    const handlePageArr=(num)=>{
        let tempArr= [];
        for(let i=1;i<=num;i++){
            tempArr.push(i)
        }
        setPageArr([...tempArr])
    }
    const handleDelete = async(e,id)=>{
        e.stopPropagation();
        try{
            const response = await restaurantsFinder.delete(`/restaurants/${id}`);
            // console.log("sdjsd",response);
            setRestaurants(
                restaurants.filter((restaurant)=>{
                    return restaurant.id !== id
                })
            )
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate = (e,id)=>{
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    } 

    const handleRestaurantSelect = (id)=>{
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (restaurant)=>{
        if(!restaurant.count){
            return <span className='text-warning'>0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className='text-warning ml-1'>({restaurant.count})</span>
            </>
        )
    }
    const handleSearchRestaurant = (e)=>{
        fetchData(e.target.value)
    }
  return (
    <>
    <div className='d-flex justify-content-between'>
        <button onClick={()=>history.push("/addRestaurant")} className="btn btn-primary mb-2">Add Restaurant</button>
        <input onChange={handleSearchRestaurant} type="text" className='mb-2' placeholder='Serach Reataurant'/>
    </div>
    
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">restaurants</th>
                    <th scope="col">location</th>
                    <th scope="col">price_range</th>
                    <th scope="col">rating</th>
                    <th scope="col">edit</th>
                    <th scope="col">delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && currentRestaurants.map((restaurant)=>{
                    return (
                        <tr onClick={()=>handleRestaurantSelect(restaurant.id)}  key={restaurant.id} style={{"cursor":"pointer"}}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <div onClick={(e)=> {handleUpdate(e,restaurant.id)}} className="btn btn-warning">Update</div>
                        </td>
                        <td>
                            <div onClick={(e)=> {handleDelete(e,restaurant.id)}} className="btn btn-danger">Delete</div>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            { pagArr.length>0?pagArr.map((index)=>{
                if(index == currentPage){
                    return (
                        <li key={index}  className="page-item"><a className="page-link bg-primary text-white" onClick={()=>{setCurrentPage(index)}}>{index}</a></li>
                    )
                }else{
                    return (
                        <li key={index}  className="page-item"><a className="page-link" onClick={()=>{setCurrentPage(index)}}>{index}</a></li>
                    )
                }
                
            })  :<div>No Restaurants Available</div> 
            }
        </ul>
    </nav>
    </>
  )
}

export default RestaurantsList