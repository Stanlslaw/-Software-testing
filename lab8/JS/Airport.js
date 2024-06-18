const PassengerPlane = require("./Planes/PassengerPlane");
const MilitaryPlane = require("./Planes/MilitaryPlane");
const MilitaryType = require("./models/militaryType");
const experimentalPlane = require("./Planes/experimentalPlane");

class Airport {
  getPassengerPlane() {
    let planes = this.planes;
    var passengerPlanes = [];
    for (let plane of planes) {
      if (plane instanceof PassengerPlane) {
        passengerPlanes.push(plane);
      }
    }
    return passengerPlanes;
  }

  getMilitaryPlanes() {
    let militaryPlanes = [];
    this.planes.forEach((plane) => {
      if (plane instanceof MilitaryPlane) militaryPlanes.push(plane);
    });
    return militaryPlanes;
  }

  getPassengerPlaneWithMaxPassengersCapacity() {
    let passengerPlanes = this.getPassengerPlane();
    let planeWithMaxCapacity = passengerPlanes[0];
    passengerPlanes.forEach((plane) => {
      if (
        plane.getPassengersCapacity() >
        planeWithMaxCapacity.getPassengersCapacity()
      ) {
        planeWithMaxCapacity = plane;
      }
    });
    return planeWithMaxCapacity;
  }

  getTransportMilitaryPlanes() {
    let transportMilitaryPlanes = [];
    let militaryPlanes = this.getMilitaryPlanes();
    militaryPlanes.forEach((plane) => {
      if (plane.getMilitaryType() == MilitaryType.TYPE_TRANSPORT) {
        transportMilitaryPlanes.push(plane);
      }
    });
    return transportMilitaryPlanes;
  }

  getBomberMilitaryPlanes() {
    let bomberMilitaryPlanes = [];
    let militaryPlanes = this.getMilitaryPlanes();
    militaryPlanes.forEach((plane) => {
      if (plane.getMilitaryType() === MilitaryType.TYPE_BOMBER) {
        bomberMilitaryPlanes.push(plane);
      }
    });
    return bomberMilitaryPlanes;
  }

  constructor(planes) {
    this.planes = planes;
  }

  getExperimentalPlanes() {
    let experimentalPlanes = [];
    this.planes.forEach((plane) => {
      if (plane instanceof experimentalPlane) {
        experimentalPlanes.push(plane);
      }
    });
    return experimentalPlanes;
  }

  sortByMaxDistance() {
    this.planes.sort((a, b) =>
      a.getMaxFlightDistance() > b.getMaxFlightDistance() ? 1 : -1
    );
    return this;
  }

  sortByMaxSpeed() {
    this.planes.sort((a, b) => (a.getMaxSpeed() > b.getMaxSpeed() ? 1 : -1));
    return this;
  }

  sortByMaxLoadCapacity() {
    this.planes.sort((a, b) =>
      a.getMinLoadCapacity() > b.getMinLoadCapacity() ? 1 : -1
    );
    return this;
  }

  getPlanes() {
    return this.planes;
  }

  static print(planes) {
    return JSON.stringify(planes);
  }
}

module.exports = Airport;
