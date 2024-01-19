# Method to show the Product List
def get_productList(product):
    print("product name : Price")
    print()
    for key, value in product.items():
        print(key, ":", value)
    print()


# Here we are colleting the oder details from the user
def get_product_Details(num_product, product):
    count = int(input("please Enter How many product you want to buy : ").strip())
    cartList = []
    if count <= num_product:
        for i in range(count):
            PName = input("Enter the product Name you want to buy : ").strip()
            if PName not in product:
                print("please enter valid product Name")
                print()
                PName = input("Enter the product Name you want to buy : ").strip()
            print()
            Pquant = input("Please inter the number of unites you want to buy : ").strip()

            if int(Pquant) <= 0:
                print("plese enter the valid number of unit")
                print()
                Pquant = input("Please inter the number of unites you want to buy : ").strip()
            print()
            isgiftwrap = int(
                input(
                    "Do we have to wrap it as gift please enter 1 for yes and 0 for No : "
                ).strip()
            )
            print()
            cartList.append([PName, int(Pquant), bool(isgiftwrap)])
    
        return cartList
    else:
        print("Please enter valid number of product")
        return 0 


# Here we are calculating processing the oder details
def calculateDetails(detailList, product):
    detail_dict = {
        "total_cost": 0,
        "total_quantity": 0,
        "individual_Product_quantity": {},
        "individual_Product_bool": {},
        "individual_total_price": {},
    }

    for p_details in detailList:
        Pname, Pquantity, isgiftwrap = p_details
        unit_price = product.get(Pname)
        total_price = unit_price * Pquantity

        detail_dict["individual_total_price"][Pname] = total_price
        detail_dict["total_cost"] += total_price
        detail_dict["total_quantity"] += Pquantity
        detail_dict["individual_Product_quantity"][Pname] = Pquantity
        detail_dict["individual_Product_bool"][Pname] = isgiftwrap

    return detail_dict


# here we are calculating the maximum discount on the product
def discountCalculator(details, Original_product):
    total_cost = details["total_cost"]
    total_quantity = details["total_quantity"]
    individu_quanity = details["individual_Product_quantity"]
    individual_value = details["individual_Product_bool"]
    individual_total_price = details["individual_total_price"]

    discount_rule = {
        "flat_10_discount": total_cost > 200,
        "bulk_5_discount": any(quantity > 10 for quantity in individu_quanity.values()),
        "bulk_10_discount": total_quantity > 20,
        "tiered_50_discount": total_quantity > 30
        and any(quantity > 15 for quantity in individu_quanity.values()),
    }
    flat_10_discount_list = []
    bulk_5_discount_list = []
    bulk_10_discount_list = []
    tiered_50_discount_list = []

    applicable_discounts = [
        rule for rule, apply_condition in discount_rule.items() if apply_condition
    ]

    if not applicable_discounts:
        return 0

    for rule in applicable_discounts:
        if rule == "flat_10_discount":
            flat_10_discount_list.append(10)
            # discount_amount.append({"flat_10_discount": 10})
        elif rule == "bulk_5_discount":
            for product, quantity in individu_quanity.items():
                if quantity > 10:
                    bulk_5_discount_list.append(0.05 * individual_total_price[product])
                    # discount_amount.append({"bulk_5_discount": 0.05 * individual_total_price[product]})
        elif rule == "bulk_10_discount":
            bulk_10_discount_list.append(0.1 * total_cost)
            # discount_amount.append({"bulk_10_discount":0.1 * total_cost})
        elif rule == "tiered_50_discount":
            for product, quantity in individu_quanity.items():
                if quantity > 15:
                    above_15_amount = (quantity - 15) * Original_product[product]
                    tiered_50_discount_list.append(0.5 * above_15_amount)
                    # discount_amount.append({"tiered_50_discount":0.5 * individual_total_price[product]})
    discount_amount= {}
    # some discount list may be empty also if we are selecting one product 
    if flat_10_discount_list :
        discount_amount["flat_10_discount"]  = max(flat_10_discount_list)
        
    if bulk_5_discount_list:
        discount_amount["bulk_5_discount"] = max(bulk_5_discount_list)
    if bulk_10_discount_list:
        discount_amount["bulk_10_discount"] = max(bulk_10_discount_list)
    if tiered_50_discount_list :
        discount_amount["tiered_50_discount"] = max(tiered_50_discount_list) 

    # discount_amount = {
    #     "flat_10_discount": max(flat_10_discount_list),
    #     "bulk_5_discount": max(bulk_5_discount_list),
    #     "bulk_10_discount": max(bulk_10_discount_list),
    #     "tiered_50_discount": max(tiered_50_discount_list),
    # }
    max_discount = 0
    applicable_rule = ""
    for dicount_rule, amount in discount_amount.items():
        if amount > max_discount:
            max_discount = amount
            applicable_rule = dicount_rule
    return [max_discount, applicable_rule]


# here we are shipping and figtwrap fee
def calculate_page_and_giftrap_charge(total_quantity, isgiftwrap, individual_Product_quantity):
    gift_wrap_fee = 1
    Number_of_unit_inPackage = 10
    shipping_fee = 5
    sum = 0
    for product, unit in isgiftwrap.items():
        if unit:
            sum += individual_Product_quantity[product]

    total_gift_wrap_fee = sum * gift_wrap_fee
    if total_quantity <= 10:
        total_shipping_fee = 10
    else:
        total_shipping_fee = (total_quantity / Number_of_unit_inPackage) * shipping_fee
    return [total_gift_wrap_fee, total_shipping_fee]


#  here we are printing the Oder Summary
def ShowSummary(details, discount, fee):
    individual_Product_quantity = details["individual_Product_quantity"]
    individual_total_price = details["individual_total_price"]
    sub_total = 0
    print("******* Your Oder Summery *********")
    print()
    for product, value in individual_Product_quantity.items():
        print("Product Name", ":", product)
        print("Units Bought: ", value)
        print("total amount of the product:", individual_total_price[product])
        print()
        sub_total += individual_total_price[product]

    print("Sub TOtal: ", sub_total)
    print()

    # validating the discount 
    if discount == 0:
        print("please buy some more products to get Discount")
    else:
        print("Applied Discount : ", discount[1], ", total discount : ", discount[0])
    print()
    print("gift wraping fee: ", fee[0])
    print()
    print("Shipping Charge: ", fee[1])
    print()
    if discount == 0:
        print("Total : ", sub_total)
    else:
        print("Total : ", sub_total - discount[0])
    print()


if __name__ == "__main__":
    print()
    
    print("+++++++++ Welcome To Our Shop ++++++++++")

    product = {"ProductA": 20, "ProductB": 40, "ProductC": 50}
    num_product = len(product)
    get_productList(product)
    detailList = get_product_Details(num_product, product)

    details = calculateDetails(detailList, product)

    max_discount = discountCalculator(details, product)

    fee = calculate_page_and_giftrap_charge(
        details["total_quantity"],
        details["individual_Product_bool"],
        details["individual_Product_quantity"],
    )

    ShowSummary(details, max_discount, fee)

    print("+++++++++ Thank You For Shoping Please Visit Again ++++++++++")
    print()
