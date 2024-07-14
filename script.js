// Step 1: Create the Car constructor function
function Car(make, model, year, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isAvailable = isAvailable;
  }
  
  // Step 2: Create the Customer constructor function
  function Customer(name) {
    this.name = name;
    this.rentedCars = [];
  }
  
  // Step 3: Add a method to the Customer prototype to rent a car
  Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
      car.isAvailable = false;
      this.rentedCars.push(car);
      console.log(`${this.name} has rented a ${car.make} ${car.model}.`);
    } else {
      console.log(`Sorry, the ${car.make} ${car.model} is already rented.`);
    }
  };
  
  // Step 4: Create the PremiumCustomer constructor function
  function PremiumCustomer(name, discountRate) {
    Customer.call(this, name);
    this.discountRate = discountRate;
  }
  
  // Ensure PremiumCustomer inherits from Customer
  PremiumCustomer.prototype = Object.create(Customer.prototype);
  PremiumCustomer.prototype.constructor = PremiumCustomer;
  
  // Step 5: Create a function to calculate rental prices
  function calculateRentalPrice(car, days, customer) {
    const basePricePerDay = 50;
    let carTypeRate = 1;
    
    switch (car.model) {
      case 'SUV':
        carTypeRate = 1.5;
        break;
      case 'Sedan':
        carTypeRate = 1.2;
        break;
      default:
        carTypeRate = 1;
    }
  
    let totalPrice = basePricePerDay * carTypeRate * days;
  
    if (customer instanceof PremiumCustomer) {
      totalPrice = totalPrice * (1 - customer.discountRate);
    }
  
    return totalPrice;
  }
  
  // Step 6: Handle car returns
  Customer.prototype.returnCar = function(car) {
    const index = this.rentedCars.indexOf(car);
    if (index > -1) {
      this.rentedCars.splice(index, 1);
      console.log(`${this.name} has returned a ${car.make} ${car.model}.`);
      setTimeout(() => {
        car.isAvailable = true;
        console.log(`The ${car.make} ${car.model} is now available for rent.`);
      }, 2000); // Simulate a 2-second delay for processing the return
    }
  };
  
  // Step 7: Extend the system to handle maintenance
  function Maintenance(car, delay) {
    console.log(`The ${car.make} ${car.model} is under maintenance.`);
    setTimeout(() => {
      car.isAvailable = true;
      console.log(`The ${car.make} ${car.model} is now available after maintenance.`);
    }, delay);
  }
  
  // Step 8: Demonstrate the functionality
  
  // Create several car objects of different types
  const car1 = new Car('Toyota', 'Corolla', 2020);
  const car2 = new Car('Ford', 'SUV', 2019);
  const car3 = new Car('Honda', 'Sedan', 2021);
  
  // Create regular and premium customers
  const customer1 = new Customer('Alice');
  const customer2 = new PremiumCustomer('Bob', 0.1); // 10% discount
  
  // Show renting and returning cars
  customer1.rentCar(car1); // Alice rents a Toyota Corolla
  customer2.rentCar(car2); // Bob rents a Ford SUV
  
  console.log(`Rental price for Alice: $${calculateRentalPrice(car1, 5, customer1)}`);
  console.log(`Rental price for Bob: $${calculateRentalPrice(car2, 5, customer2)}`);
  
  customer1.returnCar(car1); // Alice returns the Toyota Corolla
  customer2.returnCar(car2); // Bob returns the Ford SUV
  
  // Handle maintenance
  Maintenance(car3, 3000); // Maintenance for 3 seconds
  
  // Show the system processing delays and maintenance
  setTimeout(() => {
    customer1.rentCar(car3); // Alice rents the Honda Sedan after maintenance
  }, 4000); // Wait for maintenance to complete
  