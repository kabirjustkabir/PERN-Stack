const db = require('../db');

const getAllRestaurants = async(req,res)=>{
    let {name} = req.query;
    console.log(name);
    if(name === undefined){
        name = ''
    }
    try{
        const results  = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurants_id) reviews ON restaurants.id = reviews.restaurants_id WHERE name LIKE $1",[
            `${name}%`,
        ])
        res.status(200).json({
            status:"success",
            length:results['rows'].length,
            data:results['rows']
        }) 
    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }
}

const getSingleRestaurant = async(req,res)=>{
    console.log(req.params.id);
    try{
        const restaurant  = await db.query(`SELECT * FROM restaurants left join (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews group by restaurants_id) reviews on restaurants.id = reviews.restaurants_id where id=$1`,[
            req.params.id
        ])
        const reviews = await db.query(`select * from reviews where restaurants_id = $1`,[
            req.params.id
        ])
        res.status(200).json({
            status:"success",
            data:{
                restaurant:restaurant['rows'][0],
                reviews:reviews['rows']
            }
        })

    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }
}

const postRestaurant = async(req,res)=>{
    try{
        const results  = await db.query(`insert into restaurants (name,location,price_range) values($1,$2,$3) returning *`,[
            req.body.name,
            req.body.location,
            req.body.price_range
        ])
        console.log(results);
        res.status(200).json({
            status:"success",
            data:results['rows'][0]
        })

    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }
}

const updateRestaurant = async(req,res)=>{
    try{
        const results  = await db.query(
            'UPDATE "restaurants" SET "name" = $1, "location" = $2, "price_range" = $3 WHERE "id" = $4 returning *',[
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.params.id
        ])
        console.log(results);
        res.status(200).json({
            status:"success",
            data:results['rows'][0]
        })

    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }
}

const deleteRestaurant = async(req,res)=>{
    try{
        const results  = await db.query(
            'DELETE FROM "restaurants" WHERE "id" = $1',[
            req.params.id
        ])
        console.log(results);
        res.status(200).json({
            status:"success",
        })

    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }
}

const searchRestaurant = async(req,res)=>{
    res.send(req.query)
}

module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurant
}