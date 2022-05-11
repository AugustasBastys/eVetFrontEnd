let pets = [
    {
        name: "Katinas",
        id: 1
      },
      {
        name: "Suo",
        id: 2
      },
      {
        name: "Dog",
        id: 3
      }
]


export function getPets() {
    return pets;
  }

  export function getPet(id: number) {

    return pets.find(
        (pet) => pet.id === id
    );
}