const CARD = 'https://api.scryfall.com/cards/named?fuzzy=aust+com'
const API_SEARCH_NAME_LINK='https://api.scryfall.com/cards/search?q='
const IMG_PLACEHOLDER="https://c1.scryfall.com/file/scryfall-cards/normal/front/d/1/d19fbfe6-69bb-452a-be3c-b9c625e23193.jpg?1557576145"

document.getElementById('searchButton').addEventListener('click', searchCard);

function cardTemplade(card){
    
    
    if (card.image_uris){
        return `
        <div class="card">
            <img class="card-img" src="${card.image_uris.normal}">            
        </div>
        `;
    }
    else if(card.card_faces[0].image_uris.normal){
        return `
        <div class="card">
            <img class="card-img" src="${card.card_faces[0].image_uris.normal}">            
        </div>
        `;
    }
    else {
        return `
        <div class="card">
            <img class="card-img" src="${IMG_PLACEHOLDER}">            
        </div>
        `;
    }
    
}

function searchCard(){
    let card = (document.getElementById('cardSearch').value).replaceAll(" ","+");

    fetch(API_SEARCH_NAME_LINK + card)
    .then(response => response.json())
    .then(data => {
        const cardList =  data.data;
        console.log(cardList)      
        
        document.getElementById("main").innerHTML = `
            ${cardList.map(cardTemplade).join("")}
        `
    })
}

