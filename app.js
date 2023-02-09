const form = document.querySelector("#form");
const imgWrapper = document.querySelector("#img-wrapper");
const loaderEl = document.querySelector("#loader");

const accessKey = "MAG6ovfk7IvFVd8rHKAOY2m9C0X3YGVUFPQW8LubeN0";
const count = 10;
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}&orientation=landscape`;

let query = "";
let isReady = false;
let imageLoadedCount = 0;
let totalImages = 0;

form.addEventListener("submit", handleSubmit);
window.addEventListener("scroll", handleScroll);

async function handleSubmit(e) {
  e.preventDefault();
  imgWrapper.innerHTML = null;

  query = form["query"].value;

  if (!query.trim()) {
    alert("Please enter a search term!");
    return;
  }

  fetchPhotos(endpoint, query);
  form.reset();
}

function handleScroll(_e) {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && isReady) {
    isReady = false;
    fetchPhotos(endpoint, query);
  }
}

async function fetchPhotos(endpoint, query) {
  try {
    const res = await fetch(`${endpoint}&query=${query}`);
    const data = await res.json();

    if (data.errors) {
      throw new Error("Invalid search... please try again");
    }

    displayPhotos(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayPhotos(photos) {
  imageLoadedCount = 0;
  totalImages = photos.length;

  photos.forEach((photo) => {
    const aTag = document.createElement("a");
    setAttrs(aTag, { href: photo.links.html, target: "_blank" });

    const imgTag = document.createElement("img");
    setAttrs(imgTag, { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description });

    imgTag.addEventListener("load", imageLoaded);

    aTag.append(imgTag);
    imgWrapper.append(aTag);
  });
}

function imageLoaded() {
  imageLoadedCount += 1;

  if (imageLoadedCount === totalImages) {
    isReady = true;
  }
}

function setAttrs(el, attrs) {
  for (const prop in attrs) {
    el.setAttribute(prop, attrs[prop]);
  }
}
