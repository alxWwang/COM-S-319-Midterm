// function addBox() {
//     // Create a new item container
//     var newItem = document.createElement('div');
//     newItem.classList.add('item');

//     // Create the first flex-item for time
//     var newTime = document.createElement('div');
//     newTime.classList.add('time-item');
//     newTime.textContent = 'Time 1'; // You can increment or adjust this value as needed

//     // Create the second flex-item for box
//     var newBox = document.createElement('div');
//     newBox.classList.add('place-item');
//     newBox.innerHTML += `<div class="place-content"> <p>sakjdbkabs</p>
//     <button style="font-size:20px;color:black;" onclick="dustbin()"><i class="fa fa-trash-o"></i></button></div>`;

//     // Append the flex-items to the item container
//     newItem.appendChild(newTime);
//     newItem.appendChild(newBox);

//     // Append the item container to the flex-container
//     document.querySelector('.placeAdd').appendChild(newItem);

//     //Scroll to the new box when adding
//     newBox.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
// };

function getScrollAmount() {
    // Adjust scroll amount based on viewport width
    return window.innerWidth <= 768 ? 100 : 200;
}

function scrollLeft() {
    const container = document.querySelector('.flex-container');
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
}

function scrollRight() {
    const container = document.querySelector('.flex-container');
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
}
