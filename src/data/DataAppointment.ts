let appointments = [
    {
        name: "Susitikimas1",
        id: 1
      },
      {
        name: "Susitikimas2",
        id: 2
      },
      {
        name: "Susitikimas3",
        id: 3
      }
]


export function getAppointments() {
    return appointments;
  }

  export function getAppointment(id: number) {

    return appointments.find(
        (appointment) => appointment.id === id
    );
}