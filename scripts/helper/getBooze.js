

 
export async function ingredientList (link){

    if(!localStorage.getItem('ingredientList')){
        let ingredientList =[]
        const resp =  await fetch(link)
        const data =  await resp.json()
        console.log(data)

        data.drinks.forEach((ingredient)=>{
        ingredientList.push(ingredient.strIngredient1)
        }) 

        localStorage.setItem('ingredientList',JSON.stringify(ingredientList))
    }
    
} 



// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552


function indexCategory(category){
    const licores = ['Cider','Aperitif','Rum', 'Gin', 'Liqueur','Spirit','Vodka','Beverage','Liquor']
    const whiskies = ['Whisky', 'Brandy']
    const varios = ['Bitters', 'Syrup']
    const bebidas = ['Soft Drinks', 'Soda', 'Juice', 'Water']
    const vinos = ['Wine', 'Fortified Wine']
    const cervezas = ['Beer']
    const comidas = ['Fruit']

    if (cervezas.includes(category)) {
        return 'cervezas'
    }else if (vinos.includes(category)){
        return 'vinos'

    }else if (varios.includes(category)){
        return 'varios'
    }else if (whiskies.includes(category)){
        return 'whiskies'
    }else if (licores.includes(category)){
        return 'licores'
    }else if (bebidas.includes(category)){
        return 'bebidas'
    }else if (comidas.includes(category)){
        return 'comida'
    }else{
        return 'none'
    }
}

export async function getBooze(link,pm) {
     
    await ingredientList('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

    while(!localStorage.getItem('categories')){          
        let data = localStorage.getItem('ingredientList')
        let categories = []
        let products =[]
        let arr = JSON.parse(data)
        console.log(arr)

        
        for( const ing of arr) {
            let ingredient = {}
            let ingLink = link+`${ing.toLowerCase()}`
            const resp =  await fetch(ingLink)
            const data =  await resp.json()
            ingredient = data.ingredients[0]
            console.log(ingredient)
            products.push(ingredient)
            
            if(!categories.includes(ingredient.strType)){
                categories.push(ingredient.strType)
                
            }
            
            ingredient.strType = indexCategory(ingredient.strType)
            console.log(ingredient)
            console.log(categories)
            pm.addProduct(ingredient.strIngredient,`${ingredient.strDescription? ingredient.strDescription.split('.')[0]:ingredient.strIngredient}`, `${ingredient.strABV?ingredient.strABV:""}` , getRndInteger(3500, 14000),getRndInteger(5, 30), ingredient.strType, `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient.toLowerCase()}.png`,'coktaildb' )
        }
        
        localStorage.setItem('categories',JSON.stringify(categories))
        console.log(categories)
        window.location.reload();
        break
    }
    
         
}

