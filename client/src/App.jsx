import React from 'react'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetails from './routes/RestaurantDetails';
import RestaurantUpdate from './routes/RestaurantUpdate';
import AddRestaurants from './components/AddRestaurants';
const App = ()=>{
    return (
    <RestaurantsContextProvider>
        <div>
            <Router>
                <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/restaurants/:id/update' component={RestaurantUpdate}/>
                <Route exact path='/restaurants/:id' component={RestaurantDetails}/>
                <Route exact path='/addRestaurant' component={AddRestaurants}/>
                </Switch>
            </Router>
        </div>
    </RestaurantsContextProvider>
)}

export default App;

