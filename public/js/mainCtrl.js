angular.module('humaneApp').controller('mainCtrl', function($scope, $location, $anchorScroll, mainService) {

    // Sign up for newsletter
    $scope.twoMethods = (name, email) => {
        console.log(name, email)
        $scope.addUser(name, email);
        $scope.toggleAlert();
    };

    $scope.addUser = (name, email) => {
        mainService.addUser(name, email);
    };

    $scope.toggle = false;
    $scope.toggleAlert = () => {
        $scope.toggle = !$scope.toggle;
        if ($scope.toggle === false) {
            console.log(`It's false`);
        } else if ($scope.toggle === true) {
            console.log(`It's true`);
        }
    };

    // Hover on prices for Clinic

    $scope.hoverPrices = () => {
        $('.clinic1').hover(() => {
            $('#clinicHours').addClass("show");
        }, () => {
            $('#clinicHours').removeClass('show');
        });

        $('.spay1').hover(() => {
            $('#spayNeuter').addClass("show");
        }, () => {
            $('#spayNeuter').removeClass('show');
        });

        $('.vac1').hover(() => {
            $('#vaccinations').addClass("show");
        }, () => {
            $('#vaccinations').removeClass('show');
        });

        $('.micro1').hover(() => {
            $('#microchips').addClass("show");
        }, () => {
            $('#microchips').removeClass('show');
        });

        $('.other1').hover(() => {
            $('#otherServices').addClass("show");
        }, () => {
            $('#otherServices').removeClass('show');
        });
    };

    // Scrolling for pages

    $scope.scrollTo = (id) => {
        $location.hash(id);
        $anchorScroll();
    };

    // STRIPE

    $scope.checkOut = () => {
        console.log('Ctrl so far...')
        return mainService.checkOut();
    };

    // Pet Finder API
    $scope.count = -1;
    $scope.petFinder = (animal, age, location, offset, count) => {
        let takeTime = () => {
            $('#rightArrow').css("display", "block")
        };
        setTimeout(takeTime, 2000);
        $('#rightArrow').css("float", "right");
        $scope.count += 1;
        console.log($scope.count);
        mainService.petFinder(animal, age, location, offset, $scope.count).then((response) => {
            console.log(response);
            $scope.pets = response.data.petfinder.pets.pet;
        });
    };




});
