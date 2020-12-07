
// When you enter text into the input
// JS creates a new Car object consisting of values in text input
// The UI class then creates HTML based on those values 


// Car constructor
class Car {
  constructor(image, year, make, model){
    this.image = image;
    this.year= year;
    this.make = make;
    this.model = model;
  }
}

// UI Controller (controls all things related to the look of the UI)


class UI { 
  constructor(){
    this.image = document.getElementById("image");
    this.year = document.getElementById("year");
    this.make = document.getElementById("make");
    this.model = document.getElementById("model");
    this.submitBtn = document.querySelector(".submitCar");
    this.formControl = document.querySelectorAll('.form-control');
  }


  // Display the car
  showCar(car) { 
  
  // Create a div element
  const div = document.createElement('div');
  // Attach a class attribute
  div.className = "carList row mt-4";
  // Populate its contents
  div.innerHTML = 
  `
  <div class="card col-sm-12 col-md-4 mx-auto" style="width: 18rem">
    <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model} ${car.year}">
    <div class="card-body">
      <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
      <p class="card-text">Lorem Ipsum</p>
    </div>
  </div>
  `
  //Append after   
  document.querySelector('.formContainer').insertAdjacentElement('afterend', div);
  
  //Add to local storage
  // StorageCtrl.storeItem(car);
  //Clear fields
}

clearFields(){ 
  this.image.value = '';
  this.year.value = '';
  this.make.value = '';
  this.model.value = '';
  }
}


// APP 
const ui = new UI();

// Listeners
ui.submitBtn.addEventListener('click', addCar);

// Add Car to List
function addCar(e){
  // Gather Data
  let car = getData();
  // Display the data in the UI
  ui.showCar(car);

  // Add to local storage
  StorageCtrl.storeItem(car)

  // Clear fields
  ui.clearFields();

  e.preventDefault();
}


// Get the car input data
function getData(){
  // Cache variables
const image = ui.image.value;
const year = ui.year.value;
const make = ui.make.value;
const model = ui.model.value;

// Instantiate new car object
const car = new Car(image, year, make, model);

// Log car and carsArr
console.log(car);
// console.log(carsArr);
return car;
}



// Local Storage 

const StorageCtrl = (function(){
  return { 
    storeItem: function(car){
      let carsArr;
      // Check if any items in ls
      if(localStorage.getItem('cars') === null){
        carsArr = [];
        
        // Push new item into items array
        carsArr.push(car);
        // Set local storage and convert to string
        localStorage.setItem('cars', JSON.stringify(carsArr));
      } else { 

        // Get what is already in local storage
        carsArr = JSON.parse(localStorage.getItem('cars'));

        // Push new item
        carsArr.push(car);

        // Reset local storage
        localStorage.setItem('cars', JSON.stringify(carsArr));
      }
    },
    getItemsFromStorage: function(){
      let carsArr;
      if(localStorage.getItem('cars') === null){
        carsArr = [];
      } else {
        carsArr = JSON.parse(localStorage.getItem('cars'));
      }

      return carsArr;
    }
  }
})();


// APP 
App = (function(StorageCtrl){

  return {
    init: function(){
      // Get items from local storage; store in array
    
      carsArr = StorageCtrl.getItemsFromStorage();

      // Create a div to contain car posts
      const div = document.createElement('div');
      // Attach a class attribute
      div.className = "carList row mt-4";
      // Populate its contents
      
      // If carsArr has something in it
      if(carsArr.length === 0){
        alert("Cars Array: Doesn't exist or is empty")
      } else {
        carsArr.forEach(function(car){

           // Create a div to contain car posts
        const div = document.createElement('div');
        // Attach a class attribute
        div.className = "carList row mt-4";
        // Populate its contents

        // Populate the car posts container
        const carPost = document.createElement('div');
        carPost.className = 'card col-sm-12 col-md-8 mx-auto';
        carPost.setAttribute('style', 'width: 18rem');

        carPost.innerHTML = `
           <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model} ${car.year}">
           <div class="card-body">
             <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
             <p class="card-text">Lorem Ipsum</p>
           </div>
         </div>
         `;

         // Insert into carList container
          div.appendChild(carPost);
         //Append after   
         document.querySelector('.formContainer').insertAdjacentElement('afterend', div);
        });
      }
      // Fetch local JSON data
      (function getJson(){
        // Fetch JSON
        fetch('objects.json') 
        .then(function(res){
          return res.json();
        })
        .then(function(data){
          console.log(data);
          // Output data into HTML
          data.forEach(function(car){

          // Create a div to contain car posts
          const div = document.createElement('div');
          // Attach a class attribute
          div.className = "carList row mt-4";
          // Populate its contents
  
          // Populate the car posts container
          const carPost = document.createElement('div');
          carPost.className = 'card col-sm-12 col-md-8 mx-auto';
          carPost.setAttribute('style', 'width: 18rem');
  
          carPost.innerHTML = `
             <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model} ${car.year}">
             <div class="card-body">
               <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
               <p class="card-text">Lorem Ipsum</p>
             </div>
           </div>`;

            // Insert into carList container
          div.appendChild(carPost);
          //Append after   
          document.querySelector('.formContainer').insertAdjacentElement('afterend', div);
          
          });
        })
        .catch(function(err){
            console.log(err);
        });
      })();
    }
  }
})(StorageCtrl, UI);

App.init();




