const api_url = 'https://api.artic.edu/api/v1/';
const img_api_url = 'https://www.artic.edu/iiif/2/';

/////////////////////////////

let artSection = document.getElementById("art");
let artList = artSection.querySelector("ul");

let artButton = document.createElement("button");
artButton.innerText = "Art";
artButton.type = "button";

artSection.appendChild(artButton);

artButton.addEventListener("click", async function (event) {
  event.preventDefault();

  artList.innerHTML = "";

  let page = Math.floor(Math.random() * 9398) + 1;
  // console.log(page);

  await getMuseumArtwork(page);
});

async function getMuseumArtwork(page) {
  try {
    const artworks_response = await fetch(`${api_url}artworks?limit=5&page=${page}`);
    // console.log(artworks_response);
    
    if (!artworks_response.ok) {
      throw new Error('Request failed');
    }

    const artworks = await artworks_response.json();
    // console.log(artworks);

    artworks.data.forEach(artwork => {
      console.log(artwork);
      if (!artwork.image_id) return;

      let artInfo = document.createElement("li");

      let artworkPhoto = document.createElement("img");
      artworkPhoto.src = `${img_api_url}${artwork.image_id}/full/843,/0/default.jpg`;
      artInfo.appendChild(artworkPhoto);
      
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
  }
}

let clearArtButton = document.createElement("button");
clearArtButton.innerText = "Clear";
clearArtButton.type = "button";

clearArtButton.addEventListener("click", function (event) {
  artList.innerHTML = "";
})

artSection.appendChild(clearArtButton);

/////////////////////////////

let exhibitionsSection = document.getElementById("exhibitions");
let exhibitionsList = exhibitionsSection.querySelector("ul");

let exhibitionsButton = document.createElement("button");
exhibitionsButton.innerText = "Exhibitions";
exhibitionsButton.type = "button";

exhibitionsSection.appendChild(exhibitionsButton);

exhibitionsButton.addEventListener("click", async function (event) {
  event.preventDefault();

  exhibitionsList.innerHTML = "";

  let page = Math.floor(Math.random() * 3255) + 1;
  // console.log(page);

  await getMuseumExhibitions(page);
});

async function getMuseumExhibitions(page) {
  try {
    const exhibitions_response = await fetch(`${api_url}exhibitions?limit=5&page=${page}`);
    // console.log(exhibitions_response);
    
    if (!exhibitions_response.ok) {
      throw new Error('Request failed');
    }

    const exhibitions = await exhibitions_response.json();
    // console.log(exhibitions);

    exhibitions.data.forEach(exhibition => {
      console.log(exhibition);

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
  }
}

let clearexhibitionsButton = document.createElement("button");
clearexhibitionsButton.innerText = "Clear";
clearexhibitionsButton.type = "button";

clearexhibitionsButton.addEventListener("click", function (event) {
  exhibitionsList.innerHTML = "";
})

exhibitionsSection.appendChild(clearexhibitionsButton);

// getMuseumExhibitions();
// getMuseumExhibitions();

/////////////////////////////

let today = new Date();
let thisYear = today.getFullYear();

let footer = document.createElement("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Gianni Perkins`;
document.body.appendChild(footer).appendChild(copyright);
