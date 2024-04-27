const assert = require('chai').assert;

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const experimentalPlane = require('../Planes/experimentalPlane');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const ClassificationLevel = require('../models/classificationLevel');
const MilitaryType = require('../models/militaryType');

describe('Airport Tests', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.TYPE_FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.TYPE_FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TYPE_TRANSPORT),
        new experimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new experimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];

    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military planes with transport type', () => {
        const airport = new Airport(planes);
        const transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        const hasTransportPlanes = transportMilitaryPlanes.some((plane) => plane.getMilitaryType() === MilitaryType.TYPE_TRANSPORT);
        assert.isTrue(hasTransportPlanes, 'No transport military planes found');
    });

    it('should find the passenger plane with the max capacity', () => {
        const airport = new Airport(planes);
        const expectedPlaneWithMaxPassengerCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.deepEqual(expectedPlaneWithMaxPassengerCapacity, planeWithMaxPassengerCapacity);
    });

    it('should sort planes by max load capacity', () => {
        const airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        const planesSortedByMaxLoadCapacity = airport.getPlanes();
        const isSorted = isSortedByMinLoadCapacity(planesSortedByMaxLoadCapacity);
        assert.isTrue(isSorted, 'Planes are not sorted by max load capacity');
    });

    it('should have at least one bomber in military planes', () => {
        const airport = new Airport(planes);
        const bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        const hasBombers = bomberMilitaryPlanes.some((plane) => plane.getMilitaryType() === MilitaryType.TYPE_BOMBER);
        assert.isTrue(hasBombers, 'No bomber military planes found');
    });

    it('should have experimental planes with classification level higher than unclassified', () => {
        const airport = new Airport(planes);
        const experimentalPlanes = airport.getExperimentalPlanes();
        const hasUnclassifiedPlanes = experimentalPlanes.some((plane) => plane.classificationLevel === ClassificationLevel.UNCLASSIFIED);
        assert.isFalse(hasUnclassifiedPlanes, 'Unclassified experimental planes found');
    });

    function isSortedByMinLoadCapacity(planes) {
        for (let i = 0; i < planes.length - 1; i++) {
            if (planes[i].getMinLoadCapacity() > planes[i + 1].getMinLoadCapacity()) {
                return false;
            }
        }
        return true;
    }

});



