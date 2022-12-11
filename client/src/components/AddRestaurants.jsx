import React ,{useContext, useState ,useEffect}from 'react'
import { useHistory } from 'react-router';
import restaurantsFinder from '../apis/restaurantsFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurants = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const initialValues = { username: "", location: "", priceRange: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    let history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value);
        setFormValues({ ...formValues, [name]: value });
      };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            try{
                const response = await restaurantsFinder.post('/restaurants/',{
                    name:formValues.username,
                    location:formValues.location,
                    price_range:parseInt(formValues.priceRange)
                })
                addRestaurants(response.data.data)
                console.log(response);
            }catch(err){
                console.log(err);
                // const error = err.response.data.error.details;
                // if(error){
                //     setErrModel([])
                //     error.map((data)=>{
                //         console.log(data);
                //         setErrModel((errModel)=>[...errModel,data.message])
                //     })
                // }
                // return;
            }
            history.push('/')
        }
    }
    const validate = (values) => {
        const errors = {};
        if (!values.username) {
          errors.name = "Name is required!";
        } else if (values.username.length < 5) {
            errors.name = "Name must be greater than 5 characters";
          }
        if (!values.location) {
          errors.location = "Location is required!";
        } else if (values.location.length < 5) {
          errors.location = "Location must be greater than 5 characters";
        }
        if (!values.priceRange) {
          errors.priceRange = "Price Range is required";
        } else if (values.priceRange < 1) {
          errors.priceRange = "Price Range must be more than 1 $";
        } else if (values.priceRange > 5) {
          errors.priceRange = "Price Range cannot exceed more than 5 $";
        }

        return errors;
      };
  return (
    
        <div className='container'>
        <h1 className="text-center">Add Restaurant</h1>
        <form action="">
            <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input  onChange={handleChange} name="username" value={formValues.username} type="text" className='form-control' placeholder='name'/>
                <p className='text-danger'>{formErrors.name}</p>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="location">Location</label>
                <input onChange={handleChange} name="location" value={formValues.location} type="text"  className='form-control' placeholder='location'/>
                <p className='text-danger'>{formErrors.location}</p>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="priceRange">Price Range</label>
                <input onChange={handleChange} name="priceRange" value={formValues.priceRange} type="number"  className='form-control' placeholder='price range'/>
                <p className='text-danger'>{formErrors.priceRange}</p>
            </div>
            <button onClick={handleSubmit} type='submit' className="mx-4 btn btn-primary">Add</button>
        </form>
    </div> 
  )
}

export default AddRestaurants