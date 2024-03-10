var objPlace;
let nearbyes = [];
let map;
let divs = [
  "place1",
  "place2",
  "place3",
  "place4",
  "place5",
  "place6",
  "place7",
  "place8",
  "place9",
];

let nameDivs = [
  "name-place1",
  "name-place2",
  "name-place3",
  "name-place4",
  "name-place5",
  "name-place6",
  "name-place7",
  "name-place8",
  "name-place9",
];
let itinerary = {};



window.onload = function initMap() {
  console.log("init map runs");
  map = new google.maps.Map(document.getElementById("maps"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });

  renderMap();
};
renderMap = () => {
  loadScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44&loading=async&&libraries=places&callback=initMap"
  );
  window.initMap = this.initMap;
};

function searchPlaces() {
  let p = document.forms["searchBox"]["searchMain"];
  let placeName = p.value;
  var service = new google.maps.places.PlacesService(
    document.getElementById("lol")
  );
  var request = {
    query: placeName,
    fields: ["name", "geometry", "formatted_address", "photos"],
  };
  console.log("runs");

  service.findPlaceFromQuery(request, (place) => {
    objPlace = place;
    let title = place[0]["name"];
    let address = place[0]["formatted_address"];
    let photo = place[0]["photos"][0].getUrl({
      maxWidth: 1000,
      maxHeight: 1000,
    });

    let division = document.createElement("div");
    lat = Number(place[0]["geometry"]["location"].lat());
    lng = Number(place[0]["geometry"]["location"].lng());
    console.log("searched " + title);

    // division.innerHTML = `<h3>${title}</h3> ${address} ${lat} ${lng}`;
    // let div2 = document.createElement("div")
    // div2.innerHTML= `<img src=${photo} height='200'/>`

    // document.getElementById("ngentotLU").appendChild(division);
    // document.getElementById("ngentotLU").appendChild(div2);

    updateMap(place[0], 14);
    addMarker(place[0]);
    nearbyPlaces();
  });
}

function nearbyPlaces() {
  let place = objPlace;
  let lat = place[0]["geometry"]["location"].lat();
  let lng = place[0]["geometry"]["location"].lng();

  var loc = new google.maps.LatLng(lat, lng);
  var request = {
    location: loc,
    radius: "10000", //in meters
    types: ["restaurant", "museum", "cafe", "night_club", "clothing_store"],
  };
  var service = new google.maps.places.PlacesService(
    document.getElementById("lol")
  );
  service.nearbySearch(request, (results) => {
    p = 0;
    nearbyes = [];
    console.log(results.length)
    for (let i in results) {
      let places = results[i];
      nearbyes.push(places);

      let title = places["name"];
      let address = places["vicinity"];
      let photo = places["photos"][0].getUrl({
        maxWidth: 1000,
        maxHeight: 1000,
      });

      console.log(title);
      back = `url(${photo})`;
      document.getElementById(divs[p]).style.backgroundImage = back;
      document.getElementById(nameDivs[p]).innerHTML = `<p>${title}</p>`;
      p += 1;
      addMarker(places);
    }
  });
}

function addedLoc(index) {
  console.log(nearbyes[index]["name"]);
  addBox(nearbyes[index]);
}
let itemsindex = 0
function addBox(places) {
  // Create a new item container
  var newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.id = "selected" + itemsindex

  console.log(newItem)

  // Create the first flex-item for time
  var newTime = document.createElement("div");
  newTime.classList.add("time-item");
  newTime.textContent = "Time 1"; // You can increment or adjust this value as needed

  // Create the second flex-item for box
  var newBox = document.createElement("div");
  newBox.classList.add("place-item");

  var newPlaceBox = document.createElement("div");
  newPlaceBox.classList.add("place-content");

  newBox.appendChild(newPlaceBox);

  var name1 = document.createElement("p");
  var button1 = document.createElement("button");

  name1.innerHTML = `No more places found`;
  // button1.innerHTML =  `<button style="font-size:20px;color:black;" onclick="dustbin()"><i class="fa fa-trash-o"></i></button></div>`

  button1.style.cssText = "font-size:20px;color:black;";
  button1.onclick = () => {
    console.log("dustbin" + newItem.id)
    document.getElementById(newItem.id).remove()
  };

  var icon = document.createElement("i");
  icon.className = "fa fa-trash-o";

  button1.appendChild(icon);

  newPlaceBox.appendChild(name1);
  newPlaceBox.appendChild(button1);

  // Append the flex-items to the item container
  //newItem.appendChild(newTime);
  newItem.appendChild(newBox);

  // Append the item container to the flex-container
  document.querySelector(".placeAdd").appendChild(newItem);


  // itinerary[places.place_id] = { // Assuming 'place_id' is a unique identifier for each place
  //   name: places.name,
  //   location: { lat: places.geometry.location.lat(), lng: places.geometry.location.lng() },
  //   photo: places.photos[0].getUrl({ maxWidth: 1000, maxHeight: 1000 })
  // };
  // updateItineraryFile();

  //Scroll to the new box when adding
  newBox.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });

  //setting
  let title = places["name"];
  let photo = places["photos"][0].getUrl({
    maxWidth: 1000,
    maxHeight: 1000,
  });

  newBox.style.backgroundImage = `url(${photo})`;
  newBox.style.backgroundSize = "cover";
  name1.innerHTML = `${title}`;

  itemsindex += 1
}

function addMarker(obj) {
  let lat = obj["geometry"]["location"].lat();
  let lng = obj["geometry"]["location"].lng();
  var loc = new google.maps.LatLng(lat, lng);
  let photo = obj["photos"][0].getUrl({
    maxWidth: 50,
    maxHeight: 50,
  })

  let myImage = new Image(50, 50);
  myImage.src = photo

  let marker = new google.maps.Marker({
    position: loc,
    map,
    title: "Hello World!",
    icon: photo
  });

  marker.setMap(map)
}

function updateMap(place, zooms) {
  let lat = place["geometry"]["location"].lat();
  let lng = place["geometry"]["location"].lng();
  var loc = new google.maps.LatLng(lat, lng);

  var mapOptions = {
    zoom: zooms,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: loc,
  };
  map = new google.maps.Map(document.getElementById("maps"), mapOptions);
}



document.addEventListener("DOMContentLoaded", function () {
  const p = document.querySelector('.place-content p');
  let textLength = p.textContent.length;

  if (textLength < 50) {
    p.style.fontSize = "16px"; // Larger text for shorter content
  } else if (textLength < 100) {
    p.style.fontSize = "14px"; // Medium text for medium content
  } else {
    p.style.fontSize = "12px"; // Smaller text for longer content
  }
});


