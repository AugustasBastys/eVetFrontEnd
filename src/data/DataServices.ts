let services: Service[] = [
    {
        code: "1",
        name: "General checkup",
        rating: 4,
        shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 20
    },
    {
        code: "2",
        name: "General dental cleaning",
        rating: 4,
        shortDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 30
    },
    {
        code: "3",
        name: "General something else",
        rating: 5,
        shortDesc: "Lrrrrrore incididunt ut labore et dolore magna aliqua.",
        fullDesc: "OOOOOft enim ad minim viam, quis nostrud exercitatconsequat. Duis aute irure dolor in reprehenrit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 25
    }
]

type Service = {
    code: string,
    name: string,
    rating: number,
    shortDesc: string,
    fullDesc: string,
    price: number
}

export function getServices() {
    return services;
}

export function getService(code: string) {

    return services.find(
        (service) => service.code === code
    );
}