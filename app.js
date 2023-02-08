const form = document.querySelector("#form");
const imgWrapper = document.querySelector("#img-wrapper");
const loaderEl = document.querySelector("#loader");

const accessKey = "mpl3SQiZ8Vi_aU1wcCnF93dkbF3FknJUUe_KvnJHcLA";
const count = 5;
const query = "architecture";
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}&orientation=landscape`;

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const query = form["query"].value;

  if (!query.trim()) {
    alert("Please enter a search term!");
    return;
  }

  try {
    const photos = await fetcher(`${endpoint}&query=${query}`);

    if (photos.errors) throw new Error("Invalid search... please try again");

    displayPhotos(photos);
  } catch (error) {
    alert(error.message);
  }

  form.reset();
}

function displayPhotos(photos) {
  imgWrapper.innerHTML = null;

  photos.forEach((photo) => {
    const aTag = document.createElement("a");
    aTag.setAttribute("href", photo.url);
    aTag.setAttribute("target", "_blank");

    const imgTag = document.createElement("img");
    imgTag.src = photo.urls.regular;
    imgTag.alt = photo.alt_description;
    imgTag.title = photo.alt_description;

    aTag.append(imgTag);
    imgWrapper.append(aTag);
  });
}

async function fetcher(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
