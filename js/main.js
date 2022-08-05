// let elMovieWrapper = document.querySelector(".movie__wrapper");
// let elTemplate = document.querySelector("#movie_card").content;
// const elMovieInputRating = document.querySelector('.movie-input__rating')
// const elMovieCount = document.querySelector('.count__span')
// const elFormfilter = document.querySelector('.form')
// const elMovieBtn = document.querySelector('.btn__search')
// const elMovieYear = document.querySelector('.movie-input__year')

// let moviesArray = movies.slice(0, 70);

// function normolize(array) {
//     let newArray = [];

//     array.forEach(item => {
//         let newObject = {}

//         newObject.title = item.Title.toString();
//         newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
//         newObject.categories = item.Categories.split("|");
//         newObject.movieYear = item.movie_year;
//         newObject.rating = item.imdb_rating;
//         newObject.image = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;

//         newArray.push(newObject)
//     });
    


//     return newArray
// }


// let newArray = normolize(moviesArray);

// function renderMovies(array, wrapper) {
//     wrapper.innerHTML = null

//     elMovieCount.textContent = array.length

//     let tempFragment = document.createDocumentFragment()

//     for (const item of array) {
//         let templateItem = elTemplate.cloneNode(true)

//         templateItem.querySelector(".movie__img").src = item.image;
//         templateItem.querySelector(".movie__title").textContent = item.title;
//         templateItem.querySelector(".movie__year").textContent = item.movieYear;
//         templateItem.querySelector(".movie__rating").textContent = item.rating;
//         templateItem.querySelector(".movie__url").href = item.videoUrl;

//         tempFragment.appendChild(templateItem)
//     }
//     wrapper.appendChild(tempFragment)  
// }

// renderMovies(newArray, elMovieWrapper);


// // Catigories
// const categoriesArray = [];

// newArray.forEach(item => {
//     const catigoriesMovies = item.categories;
    
//     catigoriesMovies.forEach(item => {
//         const elMoviesCatigories = categoriesArray.includes(item);

//         if(!elMoviesCatigories) {
//             categoriesArray.push(item)
//         }
//     })
    
// })

// const elFormSelect = document.querySelector('.select__categories')

// function getCotegories(array) {
//     const selectFragment = document.createDocumentFragment();
//     array.forEach((item) => {
//         const selectOption = document.createElement('option')
//         selectOption.textContent = item
//         selectOption.setAttribute('value', `${item}`)
//         selectFragment.append(selectOption)

//     })
//     elFormSelect.append(selectFragment)
// }
// getCotegories(categoriesArray.sort())


// // categories filter

// function filteredCategories(event) {
//     event.preventDefault()

//     const selectYear = elMovieYear.value
//     const selectCategories = elFormSelect.value
//     const InputValueRating = Number(elMovieInputRating.value.trim())

//     const newMovieArray = []
//     newMovieArray.innerHTML = ''

//     if(selectCategories == "All") {
//         newArray.forEach((item, index) => {
//             if(InputValueRating <= newArray[index].rating && selectYear <= newArray[index].movieYear) {
//                 newMovieArray.push(newArray[index]) 
//             }
//             renderMovies(newMovieArray, elMovieWrapper);
//         }) 
//     }
//     else {
//         newArray.forEach((item, index) => {
//             if(InputValueRating <= newArray[index].rating && item.categories.includes(selectCategories) && selectYear <= newArray[index].movieYear) {
//                 console.log(item.categories.includes(selectCategories))
//                 newMovieArray.push(newArray[index])
//             }
//             renderMovies(newMovieArray, elMovieWrapper);
//         }) 
// } 
// }

// elFormfilter.addEventListener('submit', filteredCategories)






// Select element HTMl
const elMovieList = document.querySelector('.movie__wrapper')
const elMovieForm = document.querySelector('.form')
const elMovieYear = document.querySelector('.movie-input__year')
const elMovieRating = document.querySelector('.movie-input__rating')
const elMovieSelect = document.querySelector('.select__categories')
const elMovieTemplate = document.querySelector('#movie_card').content
const elFormSelect = document.querySelector('.select__categories')
const elMovieCount = document.querySelector('.count__span')
const elMovieSort = document.querySelector('.movie__sorting')
const elModalTitle = document.querySelector('.modal__title')
const elModalBody = document.querySelector('.modal__body')
const elMoreInfo = document.querySelector('.more__info')


const moviesArray = movies.splice(0, 10)


// Normalized Array
const normalizedMovie = moviesArray.map(function(item) {
    return {
        id: item.imdb_id,
        title: item.Title,
        year:  item.movie_year,
        rating: item.imdb_rating,
        categories: item.Categories.split("|"),
        img: item.ImageURL,
        summary: item.summary,
        videoURL: `https://www.youtube.com/watch?v=${item.ytid}`
    }
})


// renderMovies
function renderMovies(array, wrapper) {

    elMovieList.innerHTML = ""

    const movieFragment = document.createDocumentFragment();
    
    elMovieCount.textContent = array.length

    array.forEach(item => {
        const movieTemplate = elMovieTemplate.cloneNode(true)

        movieTemplate.querySelector('.movie__img').src = item.img
        movieTemplate.querySelector('.movie__title').textContent = item.title
        movieTemplate.querySelector('.movie__year').textContent = item.year
        movieTemplate.querySelector('.movie__rating').textContent = item.rating
        movieTemplate.querySelector('.movie__url').href = item.videoURL
        movieTemplate.querySelector('.more__info').dataset.movieId = item.id
        movieFragment.appendChild(movieTemplate)
    });

    wrapper.appendChild(movieFragment)
}

renderMovies(normalizedMovie, elMovieList)


// get Categories
function getCategories(array, wrapper) {
    const categoriesArray = []

    array.forEach(item => {

        const categories = item.categories

        categories.forEach(category => {

            const movieCategory = categoriesArray.includes(category)

            if(!movieCategory) {
                categoriesArray.push(category) 
            }
        })
    })
    const selectFragment = document.createDocumentFragment();

    categoriesArray.sort().forEach(item => {

        const selectOption = document.createElement('option')

        selectOption.textContent = item
        selectOption.value = item
        selectFragment.appendChild(selectOption)
    })

    wrapper.appendChild(selectFragment)
}

getCategories(normalizedMovie, elFormSelect)


// form filter 
elMovieForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputYear = elMovieYear.value.trim()
    const inputrating = elMovieRating.value.trim()
    const inputCategories = elMovieSelect.value.trim()
    const inputSort = elMovieSort.value.trim()

    const filteredArray = normalizedMovie.filter(function(item) {

        let isTrue = "";

        if(inputCategories == 'All') {
            isTrue = true;
        } else {
            isTrue = item.categories.includes(inputCategories)
            // console.log(item.categories.includes(inputCategories));
        }

        
        const validation = item.year >= inputYear && item.rating >= inputrating && isTrue;
        return validation
    })

    if(inputSort == 'rating__high-low') {
        filteredArray.sort(function(a, b) {
            return a.rating - b.rating
        })
    }
    if(inputSort == 'rating__low-high') {
        filteredArray.sort(function(a, b) {
            return b.rating - a.rating
        })
    }

    if(inputSort == 'year__high-low') {
        filteredArray.sort(function(a, b) {
            return a.year - b.year
        })
    }
    if(inputSort == 'year__low-high') {
        filteredArray.sort(function(a, b) {
            return b.year - a.year
        })
    }
    
    renderMovies(filteredArray, elMovieList)
})

elMovieList.addEventListener('click', function(e) {
    let currentId = e.target.dataset.movieId

    if(currentId) {
        let foundMovie = normalizedMovie.find(function(item) {
            return item.id == currentId
        })
        elModalTitle.textContent = foundMovie.title
        elModalBody.textContent = foundMovie.summary
    }
    
    
})













