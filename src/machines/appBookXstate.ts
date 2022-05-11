import {assign, createMachine} from "xstate"
import { Api, ApiConfig, Pet, AvailableTime, VetService, Veterinarian} from "../apiClient/eVetApi";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { SilentRequest } from "@azure/msal-browser";
//import FetchPets from "./FetchPets";

const apiClient = new Api();
export const appointmentBookingMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALATAOgAcBLDAawAV0BiCAewDsw8j6A3W0p1TXQki9AhbsMAQzREGAbQAMAXUSgCtWEQkNFIAB6IAbLrwBWAOwyAzAEZDugJw2ZOE2YA0IAJ6ILFnAA48AFjsbf0czfxkZfwBfKNdubHxiMko0KjAAJ3TadMIAG3FkbIBbPHjeJIE0ITZaMXV6WQUkEGVVes0dBF0-GVNLHxtjKzMbQxxXDwQLSIsAoJszMwGcYxtdGLj0BL5k6gA5AFEADQAVTVa1SXoOxBxAvB9DBZ87nDNDfzMZQwnPHAsbHM7FZjMYliMNiAyol+CkqABlA4AGQOAGEzs0Lu1mp0FkYPrZ-IYLGZusZdP5fghRv4gTYXmsQqsLJDoTtKlRzipLhocbd7o9nq93p9vlSSWZjHTdJZ7LpDO9WVtyvx4RlWCQwDQGExhBwuMqYWQ1ekNRgwNUROIro0uW0rjcECZaT5pjYcKNbDhdBZxXcZNKcBFdOY3kqeEbSCazVqMlkcgR8mhCukSmyKtHNZbatbpPI7TzrnyneS8JYZAtfP4LKD-D5xcMjBEZN4fD6vsYfOHthn1ZqqIdTgXsaBOrYzAEyWM1hY628-T6Hos3jW68SzN2Vca++aqAAhACCqIA0sOHcW7oDBUthR8vj93J4a7NAvT6evO2FN5HM7vESj0TPXlRz0SI8BrV1enlSIBkpR8phkfQm2bO5SQ7DdYihQ12QANXQDIWFEdIiFEehtUYZgak4UpsIqPC0AI+giJI+hszqG180xbkR20TwwnwCwKQiD03WMQx63g7wVjweZoIiNtyW-XD8OIpjiNIgdjgxJRuPPECEEvB4nhvEIRXvKkbBJPBmwiBZunMLtMPTfh6MY5iNMPE8gKLfTx0nHwxI9H05xcSTJSvZdmXlMwVmiJzaJclTCPUsj4WPABJchvMdHAPWshYxJlGVzFsKk21peZ3WmVYXnWeKI3ZAARcQmAqZqGL3NxXNU9yyLoCi9Wo5yyHa1r+FGzruuSli2NzBpOJ0+1gN4gyfD8fRwmrEIATueUqTCQFX3pT863eOrNgatqWqalrJqStSWLSTJsjyApihoy7xuuq6Oq6+7etm+pbS4pafJW3RjHwHxPkhl4lmCT4qX8e5KtdWcXjuJSfrGkbbr+hiepSzShxBwtHQhqGYd8N5YMR+DFlmSr9HE-5DCxr6GJu36poejyj1PUmeLHSGHipuHadCyZAh6GyIg+HwZFg9ncc57HOt-LV+t1KiDU+lWcdICa3A1wGOKaRayeLDs8ApGKgxMJ4fSsKlrBfeYQnKldlcN76ObAdWdy1QdtJaXTlrHF5Rclan4eRyW9HpGSgjBEYSQBRyLp7P2uf943A-3fnsuLCmo9hmmEfjhBXQMeZjDrfxVhWHAlNyMBRFYMA9loBiC68wW9JWsYLIDeZobCKx5U7Fu247rue73AB5BeBYtoWnx8CddEvQwW0GElrCpSHZjruwwTeEJ-jqzD6FoCA4E0YbKiL-SG79IM6WnJ4IiJb2Neflb-BbzwOfJYs5Qyzl9GFGKdJIafGmDFDOWE9akB5r1f+uJvR4BPnYD0ddEIBXFLKJOp8PiODbIgx+o0c53QJtNUi6Dbi2HypKawaESo2CRtWOk9gnj0hbOdJBWd9bULzqaTUDDVo9EhvYOs5IFgKgfJMaK3DTDrgGCyeqQifYMQkXcQwzDCpsNJBw+CKwDBHTWjWGK8k2aaN4K3dundu5gAkdMO4AQFQVl8F4SyvRD5WCwa+OukpFiDDipnXgyAWBEFgFgVxvgAxjzEp4oMnZFGICGPo7BwSU5hO-LoyuNZiFrHkfSLeDgYgxCAA */
createMachine({
  context: {

    token: "",
    step: "",
    note: "",

    veterinarianList: [],
    veterinarianSelected: {} as Veterinarian,

    dateList: [],
    dateSelected: {} as AvailableTime,

    petList: [],
    petSelected: {} as Pet,

    serviceList: [],
    serviceSelected: {} as VetService,

   


    error: "",
    success: "",
  },
  id: "fetch2",
  initial: "pickPet",
  states: {
    pickPet: {
      invoke: {
        src: "loadPets",
        onDone: [
          {
            actions: "setPetList",
          },
        ],
        onError: [
          {
            actions: "setError",
          },
        ],
      },
      always: {
        cond: "hasSinglePet",
        target: "pickService",
      },
      on: {
        NEXT: {
          cond: "petSelected",
          target: "pickService",
          actions: ["getToken", "clearService", "setStep1"]
        },
        SELECT: {
          actions: "setPet",
        },
      },
    },
    pickService: {
      invoke: {
        src: "loadServices",
        onDone: [
          {
            actions: "setServiceList",
          },
        ],
        onError: [
          {
            actions: "setError",
          },
        ],
      },
      on: {
        NEXT: {
          cond: {
            type: "selectedService"
          },
          target: "pickVeterinarian",
          actions: ["clearVeterinarian", "setStep2"],
        },
        BACK: {
          target: "pickPet",
          actions: ["clearService", "setStep0"]
        },
        SELECT: {
          actions: "setService",
        },
      },
    },
    pickVeterinarian: {
      invoke: {
        src: "loadVeterinarians",
        onDone: [
          {
            actions: "setVeterinarianList",
          },
        ],
      },
      on: {
        NEXT: {
          cond: "selectedVeterinarian",
          target: "#fetch2.pickDate.pickDateByVeterinarian",
          actions: ["clearPickedDate", "setStep3"],
        },
        BACK: {
          target: "pickService",
          actions: ["clearVeterinarian", "setStep1"]
        },
        SKIP: {
          target: "#fetch2.pickDate.pickDateByService",
          cond: "veterinarianIsEmpty",
          actions: "clearPickedDate",
        },
        SELECT: {
          actions: "setVeterinarian",
        },
      },
    },
    pickDate: {
      initial: "pickDateByVeterinarian",
      states: {
        pickDateByVeterinarian: {
          invoke: {
            src: "loadAvailableTimesByVeterinarian",
            onDone: [
              {
                actions: "setAvailableTimesList",
              },
            ],
            onError: [
              {
                target: "#fetch2.pickVeterinarian",
              },
            ],
          },
          on: {
            NEXT: {
              cond: "dateSelected",
              target: "#fetch2.leaveNote",
              actions:  "setStep4",
            },
            BACK: {
              target: "#fetch2.pickVeterinarian",
              actions: ["clearPickedDate", "setStep2"]
            },
            SELECT: {
              actions: "setDate",
            },
          },
        },
        pickDateByService: {
          invoke: {
            src: "loadAvailableTimesByService",
            onDone: [
              {
                actions: "setAvailableTimesList",
                
              },
            ],
          },
          on: {
            NEXT: {
              cond: "dateSelected",
              target: "#fetch2.leaveNote",
              actions:  "setStep4",
            },
            BACK: {
              target: "#fetch2.pickVeterinarian",
              actions: ["clearPickedDate", "setStep2"]
            },
            SELECT: {
              actions: "setDate",
            },
          },
        },
      },
    },
    leaveNote: {
      on: {
        BACK: [
          {
            cond: "selectedVeterinarian",
            target: "#fetch2.pickDate.pickDateByVeterinarian",
          },
          {
            target: "#fetch2.pickDate.pickDateByService",
          },
        ],
        BOOK: {
          target: "finish",
        },
        TAKENOTE: {
         actions: "saveNote",
        },
      },
    },
    finish: {
      on: {

      }
    },
  },
}, {
    actions: { 
      getToken: assign((ctx: any, event: any) => {

        ctx.token = event.data;

        return ctx;
      }),

      setPetList: assign((ctx : any, event: any) => { ctx.petList = event.data; return ctx; }),
      setServiceList: assign((ctx : any, event: any) => { 
        
        ctx.serviceList = event.data; return ctx; 
      }),
      setError: assign((ctx : any, event: any) => { ctx.error = event.data; return ctx; }),
      setPet: assign((ctx : any, event: any) => { 
       
        ctx.petSelected = event.data; 
        return ctx; 
      }),
      setService: assign((ctx : any, event: any) => { 
        
        ctx.serviceSelected = event.data;
         return ctx; }),

      setVeterinarianList: assign((ctx : any, event: any) => { 

        ctx.veterinarianList = event.data; 
        return ctx; 
      }),

      setVeterinarian: assign((ctx : any, event: any) => {
       
        ctx.veterinarianSelected = event.data; 
        return ctx; 
      }),

      setAvailableTimesList: assign((ctx : any, event: any) => { 

        ctx.dateList = event.data; 
        return ctx; 
      }),

      setDate: assign((ctx : any, event: any) => {
       
        ctx.dateSelected = event.data; 
        return ctx; 
      }),

      clearPickedDate: assign((ctx : any, event: any) => {
       
        ctx.dateSelected = undefined; 
        return ctx; 
      }),

      clearVeterinarian:  assign((ctx : any, event: any) => {
       
        ctx.veterinarianSelected = undefined; 
        return ctx; 
      }),
    
      clearService:  assign((ctx : any, event: any) => {
       
        ctx.serviceSelected = undefined; 
        return ctx; 
      }),

      saveNote:  assign((ctx : any, event: any) => {
     
        ctx.note = event.data; 
        return ctx; 
      }),

      setStep0: assign((ctx : any, event: any) => {
     
        ctx.step = 0; 
        return ctx; 
      }),

      setStep1: assign((ctx : any, event: any) => {
     
        ctx.step = 1; 
        return ctx; 
      }),

      setStep2: assign((ctx : any, event: any) => {
     
        ctx.step = 2; 
        return ctx; 
      }),

      setStep3: assign((ctx : any, event: any) => {
     
        ctx.step = 3; 
        return ctx; 
      }),

      setStep4: assign((ctx : any, event: any) => {
     
        ctx.step = 4; 
        return ctx; 
      }),

    },
    services: {
      loadPets: (ctx : any) => {
        return Promise.resolve([
            {
                id: 1,
                name: "Barky",
                birthDay: "2018",
                breed: "Canine",
                color: "Brown",
                genderType: "Male",
                sterilized: false,
                hidden: false
            },
            {
                id: 2,
                name: "Kitty",
                birthDay: "2017",
                breed: "Feline",
                color: "Black",
                genderType: "Female",
                sterilized: false,
                hidden: false
            }
        ]);
      },
      loadServices: (ctx : any) => {
        const services = apiClient.vetServices.getVetServicesUsingGet().then(r=>r.json());
        return services;
      },
      loadVeterinarians: (ctx: any) =>{
    const requestParams = {headers: { Authorization: `Bearer ${ctx.token}` }};
    const veterinarians = apiClient.veterinarians.getVeterinariansUsingGet1(ctx.serviceSelected.id, requestParams).then(r=>r.json());
    
    return veterinarians;
      },
      loadAvailableTimesByService: (ctx: any) =>{

        const requestParams = {headers: { Authorization: `Bearer ${ctx.token}` }};
        const times = apiClient.availableTimes.getTimesByServiceUsingGet(ctx.serviceSelected.id, requestParams).then(r=>r.json());
        
        return times;
      },
      loadAvailableTimesByVeterinarian: (ctx: any) =>{
        
        const requestParams = {headers: { Authorization: `Bearer ${ctx.token}` }};
        const times = apiClient.availableTimes.getTimesByVeterinarianUsingGet(ctx.veterinarianSelected.id, requestParams).then(r=>r.json());
        
        return times;
      },
    },
    guards: { // turi true grazinti, kad praleistu
      hasSinglePet: (ctx : any) => {
        return ctx.petList.length === 1;
      },
      petSelected: (ctx : any) => {
        return ctx.petSelected.name != null;
        
      },
      selectedService: (ctx : any) => { 
        
        return ctx.serviceSelected != null && ctx.serviceSelected != undefined && ctx.serviceSelected != "";
      },
      selectedVeterinarian: (ctx : any) => {
        return ctx.veterinarianSelected != null && ctx.veterinarianSelected != undefined && ctx.veterinarianSelected != "";
      },
      dateSelected: (ctx : any) => {
        return ctx.dateSelected != null && ctx.dateSelected != undefined && ctx.dateSelected != "";
      },
      veterinarianIsEmpty: (ctx: any) => {
        return ctx.veterinarianSelected == undefined;
      
      }

     }
  });
  