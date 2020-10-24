// You may wish to find an effective randomizer function on MDN.
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

//Durstenfeld Shuffle takes in array and returns shuffled array
function durstenfeldShuffle(array) {
  for(let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i]
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {

      //Shuffles list of countries
      const shuffled = durstenfeldShuffle(fromServer);
      //Grabs first 10 countries from shuffled list
      const tenCountries = shuffled.slice(0, 10);
      //Sorts array of 10 countries by reverse alphabetical order
      const reverseSorted = tenCountries.sort((a, b) => sortFunction(b, a, 'name'));

      $('.flex-inner').remove();
      //Creates new ordered list
      const ol = document.createElement('ol');
      //Sets ordered list to class name flex-inner
      ol.className = 'flex-inner';

      //Inserts ordered list as first child element to form
      const parentForm = document.querySelector('form');
      parentForm.prepend(ol);

      //For loop appending checkbox items to ordered list
      for(let i = 0; i < reverseSorted.length; i++) {
        //Creates list element
        const li = document.createElement('li');

        //Creates input attribute and sets its type, value, and id
        const input = document.createElement('input');
          input.type = 'checkbox';
          input.value = reverseSorted[i].code;
          input.id = reverseSorted[i].code;
        //Appends input attribute to list element
        li.appendChild(input);

        //Creates label attribute and sets what its for and text
        const label = document.createElement('label');
          label.setAttribute('for', reverseSorted[i].code);
          label.textContent = reverseSorted[i].name;
        //Appends label to list element
        li.appendChild(label);

        //Appends list element to ordered list
        ol.append(li);
      }
    })
    .catch((err) => console.log(err));
});