class Car {
  _brand;
  _model;
  speed = 0;
  isTrunkOpen;

  constructor(brand, model){
    this._brand = brand;
    this._model = model;
  }

  displayInfo(){
    console.log(`${this._brand} ${this._model}, Speed: ${this.speed}, Trunk is open: ${this.isTrunkOpen} `);
  }

  go(){
    if(this.isTrunkOpen !== true && this.speed + 5 <= 200) this.speed += 5;
    else this.speed = 0;
  }

  brake(){
    if (this.speed - 5 >= 0) this.speed -= 5;
  }

  openTrunk(){
    this.isTrunkOpen = this.speed === 0 ? true : false;
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}


class RaceCar extends Car {
  accerleration;

  go(accerleration){
    this.accerleration = accerleration;
    if(this.speed + this.accerleration <= 300) this.speed += this.accerleration;
    else if(this.speed + this.accerleration > 300) this.speed = 300;
    if(this.accerleration < 0){
      console.log('not a valid input');
      this.speed = 0;
    } 
  }

  openTrunk(){
    this.isTrunkOpen = null;
  }

  closeTrunk(){
    this.isTrunkOpen = null;
  }

  constructor(brand, model, accerleration){
    super(brand, model)
    this.accerleration = accerleration;
  }

  displayInfo(){
    console.log(`${this._brand} ${this._model}, Speed: ${this.speed}`);
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

const raceCar1 = new RaceCar('McLaren', 'F1', 20);

raceCar1.go(20);
raceCar1.go(20);
raceCar1.go(20);
raceCar1.brake();
raceCar1.displayInfo();

car1.brake();
car1.go();
car1.brake();
car1.openTrunk();
car1.go();
car1.displayInfo();
car2.openTrunk();
car2.go();
car2.displayInfo();