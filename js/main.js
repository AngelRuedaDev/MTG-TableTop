const CARD = 'https://api.scryfall.com/cards/named?fuzzy=aust+com'
const API_SEARCH_NAME_LINK='https://api.scryfall.com/cards/search?q='
const IMG_PLACEHOLDER="https://c1.scryfall.com/file/scryfall-cards/normal/front/d/1/d19fbfe6-69bb-452a-be3c-b9c625e23193.jpg?1557576145"
const CARD_CONTAINER=  document.getElementById('main');
const DECK_CONTAINER = document.getElementById('side');
const CARD_LIST = [];
const USER_DECK = new Array();

let cardList = [];
 

document.getElementById('searchButton').addEventListener('click', searchCard);

function resetCardGrid(){
    while(CARD_CONTAINER.lastElementChild){
        CARD_CONTAINER.removeChild(CARD_CONTAINER.lastElementChild);
    }
}

function resetUserDeckList(){
    while(DECK_CONTAINER.lastElementChild){
        DECK_CONTAINER.removeChild(DECK_CONTAINER.lastElementChild);
    }
}

let onUserCardClick = function(e){
    for (let i = 0; i < USER_DECK.length; i++) {
        if(USER_DECK[i].id=== e.target.getAttribute('user-card-id')){
            USER_DECK.splice(i,1);
            break;
        }        
    }
    addUserDeck();
    console.log(USER_DECK)
}

function addUserDeck(){ 

    resetUserDeckList()


    USER_DECK.forEach(element =>{
        let div = document.createElement('div');
        let name = document.createElement('p');
            
        div.className = 'userCard'
        div.addEventListener('click', onUserCardClick);
        name.setAttribute('user-card-id', element.id);
        name.textContent = element.name;
        div.appendChild(name);
        DECK_CONTAINER.appendChild(div);
    })   
}

let addCard = function(e){
    let cardId = e.target.getAttribute('card-id');
    
    cardList.forEach(element =>{
        if (element.id == cardId){            
            USER_DECK.push(element)            
        }
    })
    
    addUserDeck();

}

function searchCard(){

    resetCardGrid();

    let card = (document.getElementById('cardSearch').value).replaceAll(" ","+");

    fetch(API_SEARCH_NAME_LINK + card)
    .then(response => response.json())
    .then(data => {
        cardList =  data.data;     
        
        cardList.forEach(card => {
            let div = document.createElement('div');
            let img = document.createElement('img');
            div.className = 'card';            
            div.addEventListener('click', addCard);
            if(card.image_uris){
                img.setAttribute('card-id', card.id);
                img.src = card.image_uris.normal;
            }

            else if(card.card_faces[0].image_uris.normal){
                img.setAttribute('card-id', card.id);
                img.src = card.card_faces[0].image_uris.normal;
            }

            else{
                img.setAttribute('card-id', card.id);
                img.src = IMG_PLACEHOLDER;
            }

            div.appendChild(img);
            CARD_CONTAINER.appendChild(div)
        });
    })
}

