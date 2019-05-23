// let ingredient = 'chicken'

const searchTerm = document.querySelector('.search');
const submitBtn = document.querySelector('.submit');
const searchForm = document.querySelector('form');
const section = document.querySelector('section');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');


searchForm.addEventListener('submit', submitSearch);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);


function submitSearch(e) {
    let url = `https://api.edamam.com/search?q=' + ${searchTerm.value} + '&app_id=c1c9c02f&app_key=f1c8b135e7b82b0bf1fb80576b1d812b&from=0&to=45`
    e.preventDefault();
    document.getElementById('form')
    fetch(url)
        .then(result => {
            return result.json();
        })
        .then(json => {
            console.log(json)
            console.log('getting there!')
            displayRecipes(json)
        })
        .then(leggo => {
            console.log('it no work')
            displayRecipes()
        });

}

function displayRecipes(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    if (json.hits.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No food for you tonight.'
        section.appendChild(para);
    } else {
        for (var i = 0; i < json.count; i++) {
            var recipes = document.createElement('div');
            var heading = document.createElement('h2');
            var link = document.createElement('a');
            var img = document.createElement('img');
            var para1 = document.createElement('h3');
            var para2 = document.createElement('p');
            var current = json.hits[i].recipe;
            console.log(current);
            link.href = current.url;
            link.textContent = current.label;
            para1.textContent = current.healthLabels;
            para2.textContent = 'Other Ingredients: ' + current.ingredientLines;
            img.src = current.image;
            recipes.appendChild(heading);
            heading.appendChild(link);
            recipes.appendChild(img);
            recipes.appendChild(para1);
            recipes.appendChild(para2);
            recipes.setAttribute('class', 'col-4');
            section.setAttribute('class', 'row')
            section.appendChild(recipes);
            link.setAttribute('id', 'links')
            para2.setAttribute('id', 'otherIng')
            para1.setAttribute('id','healthLabels')
            heading.setAttribute('id', 'reciName')
            img.setAttribute('id', 'imges')
        }
    }
}

// /THIS WORKS DO NOT DELETE
// fetch('https://api.edamam.com/search?q='+ ingredient +'&app_id=c1c9c02f&app_key=f1c8b135e7b82b0bf1fb80576b1d812b')
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.log('yep')
//   })
//   console.log(response.json())