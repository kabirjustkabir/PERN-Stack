const db = require('../db');
const addReview = async(req,res)=>{
    try{
        const result = await db.query(`INSERT INTO reviews (restaurants_id, name, review, rating) values($1, $2, $3, $4) returning *`
        ,[req.params.restuarant_id, req.body.name, req.body.reviewText, req.body.rating]);
        console.log(result);
        res.status(200).json({
            status:"success",
            data:result['rows'][0]
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            err:err
        })
    }

}

module.exports={
    addReview
}