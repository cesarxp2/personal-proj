angular.module('humaneApp').service('mainService', function($http) {
    this.addUser = (name, email) => {
        return $http({
            method: 'POST',
            data: {
                name,
                email,
            },
            url: '/api/user'
        })
    };

    this.checkOut = () => {
        console.log('Service so far..')
        return $http({
            method: 'GET',
            url: '/checkout'
        })
    };

    this.petFinder = (animal, age, location, offset, count) => {
        console.log(animal, age, location, offset, count)
        if (offset === undefined) {
            offset = 42 * count;
        };
        console.log(animal, age, location, offset)
        return $http({
            method: 'GET',
            url: `http://api.petfinder.com/pet.find?format=json&key=3288d254927542f9e2b4d78ac47dc5ba&animal=${animal}&location=${location}&age=${age}&offset=${offset}&count=42`
        })
    };

    this.postCharge = (token) => {
        return $http({
            method: 'POST',
            data: token,
            url: '/charge'
        })
    };
});
