  import React, { useContext} from 'react';
  import FoodContext from '../../context/Foodcontext';
  import Fooditem from '../Fooditem/Fooditem';
  import "./FoodList.css"
  function FoodList({category}) {
    const {fooditem}=useContext(FoodContext);
    const getHeading = () => {
      switch (category) {
        case "All":
          return {
            title: "Welcome to a World Full of Flavors!",
            subtitle: "From sizzling Indian curries to cheesy pizzas, refreshing beverages to indulgent desserts — every bite is crafted with love."
          };
        case "Cake":
          return {
            title: "Delicious Cakes for Every Celebration",
            subtitle: "Moist, creamy, and full of joy — perfect for birthdays, anniversaries, or just because!"
          };
        case "Chinese":
          return {
            title: "Indo-Chinese Flavours You’ll Crave",
            subtitle: "Crispy Manchurian, spicy noodles, and saucy stir-fries to satisfy your desi-Chinese hunger."
          };
        case "Main Course":
          return {
            title: "Wholesome Meals to Fill Your Soul",
            subtitle: "Rich gravies, flavorful sabjis, and rice dishes that taste just like home."
          };
        case "Thali":
          return {
            title: "Complete Thalis Packed with Taste",
            subtitle: "Balanced, delicious, and loaded with variety—our thalis are perfect for a full meal."
          };
        case "Deserts":
          return {
            title: "Sweet Treats You Can’t Resist",
            subtitle: "From gulab jamun to ice creams, satisfy your sweet tooth with every spoon."
          };
        case "Bread":
          return {
            title: "Freshly Made Indian Breads",
            subtitle: "Soft rotis, buttery naans, and stuffed parathas served hot and fresh."
          };
        case "Quick Meals":
          return {
            title: "Quick Bites for Instant Hunger",
            subtitle: "Pizzas, burgers, pav bhaji, and wraps — ready fast and full of flavor."
          };
        case "Beverages":
          return {
            title: "Refreshing Drinks to Sip & Chill",
            subtitle: "From coolers to hot chai, we’ve got the perfect drink for every mood."
          };
        default:
          return {
            title: `Delicious ${category} Just for You`,
            subtitle: "Handpicked and made with quality ingredients to serve you the best of taste."
          };
      }
    };  
    const heading=getHeading();
    if (!fooditem) return <p>Loading foods...</p>;
    return (
      <div className='food-display' id='food-display'>
        <h2>{heading.title}</h2>
        <br></br>
        <p>{heading.subtitle}</p>
        <div className='food-display-list'>
          {fooditem.filter((item) => category === "All" || item.category === category).map((item,index) => (
              <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            ))}
        </div>
      </div>
    );
  }

  export default FoodList;
