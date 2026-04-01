export const getFoodImage = (name, providedUrl) => {
  if (providedUrl && providedUrl.trim() !== '') {
    return providedUrl;
  }

  const lowercaseName = (name || '').toLowerCase();

  const imageMap = {
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    momo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg',
    pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
    maggi: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
    noodle: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
    briyani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    fries: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80',
    chicken: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Chicken_tikka_masala.jpg',
    lava: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    cake: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg',
    dessert: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg',
    salad: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
    coffee: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
    drink: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
    sandwich: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/BLT_sandwich_on_toast.jpg/800px-BLT_sandwich_on_toast.jpg',
    dosa: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg',
    idly: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG',
    idli: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG',
    roti: 'https://upload.wikimedia.org/wikipedia/commons/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
    naan: 'https://upload.wikimedia.org/wikipedia/commons/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
    sambar: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pumpkin_sambar.JPG',
    rice: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Cooked_white_rice.jpg',
    paneer: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Panir_Paneer_Indian_cheese_fresh.jpg',
    curry: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Panir_Paneer_Indian_cheese_fresh.jpg',
    thali: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Vegetarian_Curry.jpeg',
    panipuri: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Pani_Puri1.JPG',
    puri: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Pani_Puri1.JPG',
    meal: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Vegetarian_Curry.jpeg'
  };

  for (const [key, url] of Object.entries(imageMap)) {
    if (lowercaseName.includes(key)) {
      return url;
    }
  }

  // Safe fallback image (Wikimedia)
  return 'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg';
};
