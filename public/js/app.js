angular.module('humaneApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: './views/home.html'
            })

            .state('clinic', {
                url: '/clinic',
                templateUrl: './views/clinic.html'
            })

            .state('adopt', {
                url: '/adopt',
                templateUrl: './views/adopt.html'
            })

            .state('donations', {
                url: '/donations',
                templateUrl: './views/donations.html'
            });
    })

    .directive('stripeDirective', (mainService) => {
        return {
            restrict: 'EA',
            template: "<button style='background-color: transparent; color: #fad874; border: 0px;'> Donate ${{amount}} </button>",
            link: (scope, element, attr) => {
                let handler = StripeCheckout.configure({
                    key: 'pk_test_ybmsJKzVtoxdhkx7tN6lUjRL',
                    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                    locale: 'auto',
                    token: (token) => {
                        // You can access the token ID with `token.id`.
                        // Get the token ID to your server-side code for use.
                        token.amount = scope.amount * 100;
                        mainService.postCharge(token);
                    }
                });

                document.getElementById(attr.id).addEventListener('click', (e) => {
                    // Open Checkout with further options:
                    handler.open({
                        name: 'Utah Humane Society',
                        description: 'Thank you for your donation!',
                        amount: scope.amount * 100
                    });
                    e.preventDefault();
                });

                // Close Checkout on page navigation:
                window.addEventListener('popstate', () => {
                    handler.close();
                });


            },
            scope: {
                amount: '='
            }

        }
    });
