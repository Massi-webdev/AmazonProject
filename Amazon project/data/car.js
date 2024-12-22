////////////////////// Creating Parent Class/////////////////////////////////////////////////////
class Car{

  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  };

  displayInfo(){
    console.log(` Brand:${this.#brand}, Model: ${this.#model}, Speed: ${this.speed} Km/h`);
  };

  go(){
    this.speed += 5;
  };

  brake(){
    if (this.speed>=5){
      this.speed -= 5;
    } 
    else if (this.speed === 0){
     console.log("Car is now stopped");
    }
    else{
      console.log('The car is already stopped')
    }
  };

  openTrunk(){
    if (this.speed!=0){
      return "Cannot close the trunk while the car is moving";
    } 
    else {
      this.openTrunk = true;
      return "Trunk is open";
    }
  };

  closeTrunk(){
    this.openTrunk = false;
      return "Trunk is closed";
    }
}
//////////--------------------------------------------------------------------------------------------


/////////////// Testings /////////////////////////////////////////////////////////////////////////////
const brand1 = {
  brand: 'Hyundai',
  model: 'Elantra'
};

const brand2 = {
  brand: 'Lexus',
  model: 'LX'
};

/// Generating objects using Car class
const object1 = new Car(brand1);
const object2 = new Car(brand2);

/// Cehcking if the code works
object2.go();
object2.go();
object2.brake();

console.log(object2.displayInfo());

console.log(object2.openTrunk());
console.log(object2.speed);
object2.brake();
///////////-------------------------------------------------------------------------------------------


/////////// Creating a child class /////////////////////////////////////////////////////////////////////
class RaceCar extends Car {

  acceleration = 300;

  constructor(carDetails){
    super(carDetails);
    this.isTrunkOpen = 'Race cars do not have a trunk';
    this.acceleration = (carDetails.acceleration)? carDetails.acceleration: this.acceleration
  };

  go(){
    this.speed = this.speed + this.acceleration;
    console.log(this.speed);
  }

  openTrunk(){
    console.log('Race cars do not have a trunk')
  };
  
  closeTrunk(){
    console.log('Race cars do not have a trunk')
  };
}

const RaceCarObject1 = new RaceCar(brand1);
console.log(RaceCarObject1);
console.log(RaceCarObject1.go())
console.log(RaceCarObject1.displayInfo())

const brand3 =  {
  brand: 'McLaren',
  model: 'F1',
  acceleration:20
};

const brand4 =  {
  brand: 'McLaren',
  model: 'F1',
};

const RaceCarObject2 = new RaceCar(brand3);
console.log(RaceCarObject2);


const RaceCarObject3 = new RaceCar(brand4);
console.log(RaceCarObject3);


// Testings after making brand and model private : like in real life we should be able to change them.
// console.log(object1.#brand)   => error

// If we change speed to #speed (private), child won't be able to access it 
// This is why OOP is less popular in JS due to the missing of the protected properties features