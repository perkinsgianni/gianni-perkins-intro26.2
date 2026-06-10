let button = document.querySelector(".menu-hamburger");
let menuContent = document.querySelector(".menu-content");

button.addEventListener("click", function (event) {
    menuContent.classList.toggle("showMenu");
    console.log(menuContent);
})

document.addEventListener("click", function (event) {
    if (!event.target.closest('.menu-hamburger')) {
        let menuContent = document.getElementsByClassName("menu-content");
        console.log(menuContent);

        for (let i = 0; i < menuContent.length; i++) {
            let menuOptions = menuContent[i];
            console.log(menuOptions);

            if (menuOptions.classList.contains("showMenu")) {
                menuOptions.classList.remove("showMenu");
            }
        }
    }
})

/////////////////////////////

const api_url = 'https://api.artic.edu/api/v1/';
const img_api_url = 'https://www.artic.edu/iiif/2/';

/////////////////////////////

let artSection = document.getElementById("art");
let artTitle = document.getElementById('art-title');
let artList = artSection.querySelector("ul");

let artButton = document.createElement("button");
artButton.innerText = "Art";
artButton.type = "button";

artTitle.appendChild(artButton);

artButton.addEventListener("click", async function (event) {
  event.preventDefault();

  artList.innerHTML = "";

  let page = Math.floor(Math.random() * 32765) + 1;
  // console.log(page);

  await getMuseumArtwork(page);
});

async function getMuseumArtwork(page) {
  let loadingIndicator = document.createElement("p");
  loadingIndicator.textContent = "Loading artworks...";
  artSection.appendChild(loadingIndicator);

  try {
    artButton.disabled = true;

    const artworks_response = await fetch(`${api_url}artworks?limit=4&page=${page}`);
    // console.log(artworks_response);
    
    if (!artworks_response.ok) {
      throw new Error('Request failed');
    }

    const artworks = await artworks_response.json();
    // console.log(artworks);

    artworks.data.forEach(artwork => {
      // console.log(artwork);

      let artInfo = document.createElement("li");

      if (artwork && artwork.image_id) {
        let artworkPhoto = document.createElement("img");
        artworkPhoto.src = `${img_api_url}${artwork.image_id}/full/843,/0/default.jpg`;
        artworkPhoto.alt = artwork.title;
        artworkPhoto.style.height = "55vh";
        artInfo.appendChild(artworkPhoto);

        artworkPhoto.onerror = function() {
          let placeholder = document.createElement("div");
          placeholder.textContent = "No image available.";
          placeholder.className = "placeholder";
          placeholder.style.height = "50.5vh"; 
          artInfo.append(placeholder);
          
          if (artworkPhoto.parentNode) {
            artworkPhoto.parentNode.replaceChild(placeholder, artworkPhoto);
          }
        };
      } else {
          let placeholder = document.createElement("div");
          placeholder.textContent = "No image available.";
          placeholder.className = "placeholder";
          placeholder.style.height = "50.5vh"; 
          artInfo.append(placeholder);
      } 
      
      let artworkTitle = document.createElement("a");
      artworkTitle.textContent = artwork.title;
      artworkTitle.href = `https://www.artic.edu/artworks/${artwork.id}`;
      artworkTitle.target = "_blank";
      artInfo.appendChild(artworkTitle);

      let artworkArtist = document.createElement("p");
      artworkArtist.textContent = artwork.artist_title;
      artInfo.appendChild(artworkArtist);

      let artworkOrigin = document.createElement("p");
      artworkOrigin.textContent = artwork.place_of_origin;
      artInfo.appendChild(artworkOrigin);

      let artworkDate = document.createElement("p");
      artworkDate.textContent = artwork.date_display;
      artInfo.appendChild(artworkDate);

      let artworkMedium = document.createElement("p");
      artworkMedium .textContent = artwork.medium_display;
      artInfo.appendChild(artworkMedium);

      artList.appendChild(artInfo);
    });

  } catch (error) {
      console.error('An error occurred:', error);

  } finally {
    artButton.disabled = false;
    loadingIndicator.remove();
  }
}

let clearArtButton = document.createElement("button");
clearArtButton.innerText = "Clear";
clearArtButton.type = "button";

clearArtButton.addEventListener("click", function (event) {
  artList.innerHTML = "";
})

artTitle.appendChild(clearArtButton);

/////////////////////////////

let exhibitionsSection = document.getElementById("exhibitions");
let exhibitionsTitle = document.getElementById('exhibitions-title');
let exhibitionsList = exhibitionsSection.querySelector("ul");

let exhibitionsButton = document.createElement("button");
exhibitionsButton.innerText = "Exhibitions";
exhibitionsButton.type = "button";

exhibitionsTitle.appendChild(exhibitionsButton);

exhibitionsButton.addEventListener("click", async function (event) {
  event.preventDefault();

  exhibitionsList.innerHTML = "";

  let page = Math.floor(Math.random() * 1625) + 1;
  // console.log(page);

  await getMuseumExhibitions(page);
});

async function getMuseumExhibitions(page) {
  let loadingIndicator = document.createElement("p");
  loadingIndicator.textContent = "Loading exhibitions...";
  exhibitionsSection.appendChild(loadingIndicator);

  try {
    exhibitionsButton.disabled = true;

    const exhibitions_response = await fetch(`${api_url}exhibitions?limit=4&page=${page}`);
    // console.log(exhibitions_response);
    
    if (!exhibitions_response.ok) {
      throw new Error('Request failed');
    }

    const exhibitions = await exhibitions_response.json();
    // console.log(exhibitions);

    exhibitions.data.forEach(exhibition => {
      // console.log(exhibition);

      let exhibitionsInfo = document.createElement("li");
      
      let exhibitionsTitle = document.createElement("a");
      exhibitionsTitle.textContent = exhibition.title;
      exhibitionsTitle.href = `https://www.artic.edu/exhibitions/${exhibition.id}`;
      exhibitionsTitle.target = "_blank";
      exhibitionsInfo.appendChild(exhibitionsTitle);

      let exhibitionsDesc = document.createElement("p");
      exhibitionsDesc.innerHTML = exhibition.short_description;
      exhibitionsInfo.appendChild(exhibitionsDesc);

      let exhibitionsGallery = document.createElement("p");
      exhibitionsGallery .textContent = exhibition.gallery_title;
      exhibitionsInfo.appendChild(exhibitionsGallery );

      let exhibitionsStatus = document.createElement("p");
      exhibitionsStatus.textContent = exhibition.status;
      exhibitionsInfo.appendChild(exhibitionsStatus);

      if (exhibition.aic_start_at && exhibition.aic_end_at) {
        let exhibitionsDate = document.createElement("p");
        exhibitionsDate.textContent = `${exhibition.aic_start_at.split('T')[0]} — ${exhibition.aic_end_at.split('T')[0]}`;
        exhibitionsInfo.appendChild(exhibitionsDate);
      } 

      exhibitionsList.appendChild(exhibitionsInfo);
    });

  } catch (error) {
    console.error('An error occurred:', error);

  } finally {
    exhibitionsButton.disabled = false;
    loadingIndicator.remove();
  }
}

let clearExhibitionsButton = document.createElement("button");
clearExhibitionsButton.innerText = "Clear";
clearExhibitionsButton.type = "button";

clearExhibitionsButton.addEventListener("click", function (event) {
  exhibitionsList.innerHTML = "";
})

exhibitionsTitle.appendChild(clearExhibitionsButton);
