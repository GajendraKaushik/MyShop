
# MyShop

Myshop is an online store where user can buy the product by simply entering the product details, also they will get discounts on the products if they meet the discount condition. 





## Tech Stack 

I have created MyShop Application in two Programming Languages: 

-> Python 

-> JavaScript

## Approch Used to Solve the Problem
 Divide And Conqure 
     
    First, I have Divided the problem statement into sub-problems
    like: 
        -> First we have to show the product list 
        -> Then we have to take the order details
        -> After tacking the order details we need to process the data and make it in a structured way 
        -> Then we need to calculate the discount amount   
        -> After that we have to print the order summary  

    And then I solved each sub-problem and implemented it as functions and after that, I combined all the functions.  


## How it works 

The MyShop application works in below manner:

    -> When we will start the application all the available products will be prompted in the sacreen>
    -> Then we have to enter how many products we want to buy 
    -> After that we will get the option to enter the product name
    -> Number of units we want to buy and whether we need to wrap them in gift paper or not
    -> After that the application will calculate all the details including the discount also 
    -> Then it will prompt the Oder summary at the end of the program 
   
   
## Validation 
I have added some validation also in the MyShop application: 
    
    -> If the product we enter is not in the cart then we will show some warning.
    -> The number of units should be greater than Zero, else warning will be shown. 
    -> If no discount rule is applicable then we will show a prompt that please buy some more products to get a discount.

## Discount Calculation 

For discount calculation, I have created a separate array for each discount rule

Example:

productA : 20  units: 30

ProductB : 40  units: 20 

so the last discount rule will apply

tiered_50_discount = []
 
tiered_50_discount": If the total quantity exceeds 30 units & any single product quantity is greater than 15, then apply a 50% discount on products which are above  15 quantities. The first 15 quantities have the original price and units above 15 will get a 50% discount.

so the total product quantity is more than 30

Both the product quantities are greater than 15

so for the productA 30 - 15 so last 15 units will be available for a 50 % discount

discount amount : 15 * 20 = 300 * 0.5 = 150

tiered_50_discount = [150]

same for ProductB for from 20 products last 5 units will be applicable for a 50 % discount.

discount amount : 5 * 40 = 200 * 0.5 = 100

tiered_50_discount = [150, 100]. 

from the above list, I will select the maximum discount.

From all the discount lists I have selected max_discount and 
stored the maximum discounts in #discount_amount dict 
and from that I will select the most beneficial discount. 

As mentioned in the Problem statement. 


