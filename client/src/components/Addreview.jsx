import React from 'react'
import { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import restaurantsFinder from '../apis/restaurantsFinder';

const Addreview = () => {
    const {id} = useParams();
    const location = useLocation();
    const history = useHistory();
    // console.log("ye dekho bete",id);
    const [name,setName] = useState("")
    const [rating,setRating] = useState("Rating")
    const [reviewText,setReviewText] = useState("")

    const handleReviewSubmit = async()=>{
        try{
            const response = await restaurantsFinder.post(`/review/${id}`,{
                name,
                rating,
                reviewText
            })
            history.push('/');
            history.push(location.pathname)
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className='mb-2'>
        <form action="">
            <div className="form-row row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} className='form-control' type="text" name="" id="name" placeholder='name' />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">rating</label>
                    <select value={rating} onChange={(e)=> setRating(e.target.value)} placeholder="rating" id='rating' className='custom-selet form-control'>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)} id="review" className='form-control'></textarea>
            </div>
            <button onClick={handleReviewSubmit} className='btn btn-primary my-4'>Submit</button>
        </form>
    </div>
  )
}

export default Addreview