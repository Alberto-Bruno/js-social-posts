// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// id del post, numero progressivo da 1 a n
// nome autore,
// foto autore,
// data in formato americano (mm-gg-yyyy),
// testo del post,
// immagine (non tutti i post devono avere una immagine),
// numero di likes.

// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

// Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo

// BONUS
// 1 - Formattare le date in formato italiano (gg/mm/aaaa)
// 2 - Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3 - Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

// Creo gli oggetti per i post 
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2022-04-30"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=175",
        "author": {
            "name": "Luca Formicola",
            "image": "https://unsplash.it/300/300?image=16"
        },
        "likes": 120,
        "created": "2022-07-07"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=160",
        "author": {
            "name": "Chiara Passero",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 78,
        "created": "2022-05-05"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=180",
        "author": {
            "name": "Alessandro Sainato",
            "image": null
        },
        "likes": 56,
        "created": "2022-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=190",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=17"
        },
        "likes": 95,
        "created": "2022-04-30"
    }
];


// Identifico il container
const containerPost = document.getElementById('container');

posts.forEach((element, index, array) => {
    
    // Formatto le date in italiano 
    const date = element.created.split('-');
    let italianDate = `${date[1]}/${date[2]}/${date[0]}`;

    // Immagine utente che contiene le iniziali
    let imageProfile;

    if (element.author.image == undefined) {
        let authorName = element.author.name;
        const arrayName = authorName.split(' ');
        let firstName = arrayName[0];
        let lastName = arrayName[1];
        let nameFirstLetter = firstName.charAt(0);
        let lastNameLetter = lastName.charAt(0);
        
        imageProfile = `<h1 class="profile-pic color-black">${nameFirstLetter}${lastNameLetter}</h1>`;
    } else {
        imageProfile = `<img class="profile-pic" src="${element.author.image}" alt="${element.author.name}"></img>`;
    }

    // Creare img 

    containerPost.innerHTML += `<div class="post">
                                    <div class="post__header">
                                        <div class="post-meta">                    
                                            <div class="post-meta__icon">
                                                ${imageProfile}                    
                                            </div>
                                            <div class="post-meta__data">
                                                <div class="post-meta__author">${element.author.name}</div>
                                                <div class="post-meta__time">${italianDate}</div>
                                            </div>                    
                                        </div>
                                    </div>
                                    <div class="post__text">${element.content}</div>
                                    <div class="post__image">
                                        <img src="${element.media}" alt="">
                                    </div>
                                    <div class="post__footer">
                                        <div class="likes js-likes">
                                            <div class="likes__cta">
                                                <button class="like-button  js-like-button" href="#" data-postid="${element.id}">
                                                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                                    <span class="like-button__label">Mi Piace</span>
                                                </button>
                                            </div>
                                            <div class="likes__counter">
                                                Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                                            </div>
                                        </div> 
                                    </div>
                                </div>`
})


const likeButton = document.getElementsByClassName('js-like-button');

// Creo un array array di like 
const arrayLike = [];

for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', function() {
        
        // indentifico l'id clickato
        const postId = this.dataset.postId;
        console.log(postId);

        // Identifico l'elemento con i likes e con id corrispondente al click
        const likes = document.getElementById(`like-counter-${postId}`);

        const likesNumber = parseInt(likes.innerText);

        // Stabilisco la condizione quando il like deve essere dato o no
        if (arrayLike.includes(postId)) {
            likes.innerText = likesNumber - 1;
            const index = arrayLike.indexOf(postId);
            arrayLike.splice(index, 1);
            likeButton[i].classList.remove("like-button--liked");
            console.log(arrayLike);
        } else {
            likes.innerText = likesNumber + 1;
            arrayLike.push(postId);
            console.log(arrayLike);
            likeButton[i].classList.add("like-button--liked");
        }
    });
}




