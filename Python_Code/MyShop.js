
// Method to show the Product List
function get_productList(product) {
    console.log("product name : Price");
    for (const Pname in product){
        console.log(Pname, ":" ,product[Pname])
    }
}

// Collecting order details from the user
function get_product_details(Number_of_product, product) {
    const count = parseInt(prompt("Please Enter How many products you want to buy : ").trim());
    const cartList = [];
    console.log(Number_of_product, count,"NUm")
    if (count <= Number_of_product){

        for (let i = 0; i < count; i++) {
            let PName = prompt("Enter the product Name you want to buy : ").trim();

            // cheking that enterd product is present or not 
            if( ! product.hasOwnProperty(PName)){
                  alert("Please Enter a vailid product")
                  PName = prompt("Enter the product Name you want to buy : ").trim();
 
            }
            let Pquant = parseInt(prompt("Please enter the number of units you want to buy : ").trim());

            // cheking that number or units is greater then 0 or not
            if(Pquant <= 0){
                alert("Please enter a valid Units ")
                Pquant = parseInt(prompt("Please enter the number of units you want to buy : ").trim());
            }
            const isgiftwrap = parseInt(prompt("Do we have to wrap it as a gift? Please enter 1 for yes and 0 for No : ").trim());

            cartList.push([PName, Pquant, Boolean(isgiftwrap)]);
        }
    }else{
        alert("Please enter the vailid number of product")
    }
    return cartList;
}

// Here we are proccesing the order details entered odered by user 
function calculateDetails(detailList, product) {

    // Created dictionry to structure the data 
    const detail_dict = {
        total_cost: 0,
        total_quantity: 0,
        individual_Product_quantity: {},
        individual_Product_bool: {},
        individual_total_price: {},
    };

    for (const Pdetails of detailList) {
        const [Pname, Pquantity, isgiftwrap] = Pdetails;
        const unitPrice = product[Pname];
        const totalPrice = unitPrice * Pquantity;

        detail_dict.individual_total_price[Pname] = totalPrice;
        detail_dict.total_cost += totalPrice;
        detail_dict.total_quantity += Pquantity;
        detail_dict.individual_Product_quantity[Pname] = Pquantity;
        detail_dict.individual_Product_bool[Pname] = isgiftwrap;
    }

    return detail_dict;
}

// Here we are calculating the total discount we will get ont he product
function discountCalculator(details, originalProduct) {
    const total_cost = details.total_cost;
    const total_quantity = details.total_quantity;
    const individul_quanity = details.individual_Product_quantity;
    const individual_value = details.individual_Product_bool;
    const individual_total_price = details.individual_total_price;
     

    const discountRule = {
        flat_10_discount: total_cost > 200,
        bulk_5_discount: Object.values(individul_quanity).some(quantity => quantity > 10),
        bulk_10_discount: total_quantity > 20,
        tiered_50_discount: total_quantity > 30 && Object.values(individul_quanity).some(quantity => quantity > 15),
    };

    // created list to store the same type of discount of each product 
    const flat_10_discountList = [];
    const bulk_5_discountList = [];
    const bulk_10_discountList = [];
    const tiered_50_discountList = [];
    
    // here we creating the list of all applicable discount 
    const applicableDiscounts = Object.keys(discountRule).filter(rule => discountRule[rule]);
    if (!applicableDiscounts.length) {
        console.log("not applocable")
        return 0;
    }
   // here we are calculating applicable discount in each product and storing it in list 
    for (const rule of applicableDiscounts) {
        switch (rule) {
            case 'flat_10_discount':
                flat_10_discountList.push(10);
                break;
            case 'bulk_5_discount':
                for (const [product, quantity] of Object.entries(individul_quanity)) {
                    if (quantity > 10) {
                        bulk_5_discountList.push(0.05 * individual_total_price[product]);
                    }
                }
                break;
            case 'bulk_10_discount':
                bulk_10_discountList.push(0.1 * total_cost);
                break;
            case 'tiered_50_discount':
                for (const [product, quantity] of Object.entries(individul_quanity)) {
                    if (quantity > 15) {
                        const above15Amount = (quantity - 15) * originalProduct[product];
                        tiered_50_discountList.push(0.5 * above15Amount);
                    }
                }
                break;
        }
    }

    
    //  here we are calculating the maxdiscount in each type of discount from all product 
    const discountAmount = {
        flat_10_discount: Math.max(...flat_10_discountList),
        bulk_5_discount: Math.max(...bulk_5_discountList),
        bulk_10_discount: Math.max(...bulk_10_discountList),
        tiered_50_discount: Math.max(...tiered_50_discountList),
    }; 

    // here we are calculating the max discount from all the discount
    let max_discount = 0;
    let applicableRule = '';
    for (const [discountRule, amount] of Object.entries(discountAmount)) {
        if (amount > max_discount) {
            max_discount = amount;
            applicableRule = discountRule;
        }
    }
    return [max_discount, applicableRule];
}

// Calculate shipping and gift wrap fee
function calculate_page_and_giftrap_charge(total_quantity, isgiftwrap, individual_product_quantity) {
    const gift_wrap_fee = 1;
    const number_Of_Unit_InPackage = 10;
    const shipping_Fee = 5;
    let sum = 0;
    for (const [product, unit] of Object.entries(isgiftwrap)) {
        if (unit) {
            sum += individual_product_quantity[product];
        }
    }

    const total_Gift_Wrap_Fee = sum * gift_wrap_fee;
    const total_Shipping_Fee = total_quantity <= 10 ? 10 : (total_quantity / number_Of_Unit_InPackage) * shipping_Fee;
    return [total_Gift_Wrap_Fee, total_Shipping_Fee];
}

// Print the Order Summary
function ShowSummary(details, discount, fee) {
    const individual_product_quantity = details.individual_Product_quantity;
    const individual_total_price = details.individual_total_price;
    let subTotal = 0;
    console.log("******* Your Order Summary *********");
    for (const [product, value] of Object.entries(individual_product_quantity)) {
        console.log("Product Name", ":", product);
        console.log("Units Bought: ", value);
        console.log("Total amount of the product:", individual_total_price[product]);
        subTotal += individual_total_price[product];
    }

    console.log("Sub Total: ", subTotal);

    // validating the discount 

    if (discount == 0){
        alert("please Buy some more product to get the discount")
    }else{
        console.log("Applied Discount : ", discount[1], ", total discount : ", discount[0]);
    }
    console.log("Gift wrapping fee: ", fee[0]);
    console.log("Shipping Charge: ", fee[1]);
    console.log("Total : ", subTotal - discount[0]);
}

// ############# function calling starts from here  ########## 
console.log("+++++++++ Welcome to our Shop ++++++++++");

// product list 
const product = { ProductA: 20, ProductB: 40, ProductC: 50 };

// number of product in the shop 
const Number_of_product = Object.keys(product).length; 

get_productList(product);
const detailList = get_product_details(Number_of_product, product);
const details = calculateDetails(detailList, product);
const max_discount = discountCalculator(details, product);
const fee = calculate_page_and_giftrap_charge(
    details.total_quantity,
    details.individual_Product_bool,
    details.individual_Product_quantity
);
ShowSummary(details, max_discount, fee);
console.log("+++++++++ Thank you for Shopping. Please visit again! ++++++++++");

