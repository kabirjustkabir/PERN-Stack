CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range int NOT NULL check(price_range >=1 and price_range <=5)
);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurants_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating<=5) 
);

INSERT INTO restaurants (name, location,price_range) values ('mcdonals','vegas',12);

INSERT INTO reviews (restaurants_id, name,review,rating) values (6,'sana','very good',5);




--  to collect all the data from table
SELECT * FROM restaurants;


-- to collect specific rows
SELECT * FROM restaurants WHERE id = 2;

--  to collect specific data from two tables using left join

SELECT * FROM restaurants left join (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews group by restaurants_id) reviews on restaurants.id = reviews.restaurants_id;

-- to collect specific data from two table for a single restaurant using left join

ELECT * FROM restaurants left join (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews group by restaurants_id) reviews on restaurants.id = reviews.restaurants_id where id=6;

