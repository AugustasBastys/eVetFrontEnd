import {assign, createMachine} from "xstate"
  
export const aptBookingMachine = createMachine({
    id: 'fetch',
    initial: 'pickPet',
    context: {

      petList:[],
      petSelected: "",
      
      serviceList: [],
      serviceSelected:"",
      
      veterinarianList:[],
      veterinarianSelected:"",
      
      dateList:[],
      dateSelected: "",
      
      timeList:[],
      timeSelected:"",
      
      error: "",
      success: "",
    },
    states: {
      pickPet: {
        invoke: {
          src: "loadPets",
          onDone: { actions: "setPetList" },
          onError: { actions: "setError" }
        },
        always: [
          { target: "pickService",
            cond: "hasSinglePet" }
        ], 
        on: {
          NEXT: {
            target: "pickService",
            cond: "petSelected"
          },
          SELECT: {actions:"setPet"}
        }
      },
      pickService: {
        invoke: {
          src: "loadServices",
          onDone: { actions: "setServiceList" },
          onError: { actions: "setError" }
        },
        on: {
          NEXT: {
            target: "end",
            cond: "serviceSelected"
            
          },
          BACK: "pickPet",
          SELECT: {actions:"setService"}
        }
      },
      end: {
        type: "final"
      }
      /*
      pickVeterinarian:{
        onEntry: "loadVeterinarian",
        on: {
          NEXT: {
            target: "pickDate",
            cond: "veterinarianSelected"
          },
          SKIP: {
            target: "pickDate"
          },
          BACK: "pickService",
          SELECT:{ actions: "setVeterinarian"}
        }
      },
      pickDate:{
        onEntry: "loadAvailableDates",
        on: {
          NEXT: {
            target: "pickTime",
            cond: "timeSelected"
          },
          BACK: "pickVeterinarian",
          SELECT:{actions:"setDate"}
        }
      },
      pickTime:{
        onEntry: "loadAvailableTimes",
        on: {
          SUBMIT: {
            actions: ["validate"],
            target: "submitting"
          },
          SELECT:{actions:"setTime"}
        }
      },
      submitting: {
        invoke: {
          src: "someSource",
          id: "someID",
          autoForward: true, // currently for machines only!
          onDone: "success",
          onError: "failure"
        }
      },
      success: { type: 'final' },
      failure: { type: 'final' }
      */
    }
  }, {
    actions: { 
      setPetList: assign((ctx : any, event: any) => { ctx.petList = event.data; return ctx; }),
      setServiceList: assign((ctx : any, event: any) => { ctx.serviceList = event.data; return ctx; }),
      setError: assign((ctx : any, event: any) => { ctx.error = event.data; return ctx; }),
      setPet: assign((ctx : any, event: any) => { 
        // debugger;
        ctx.petSelected = event.data; 
        return ctx; 
      }),
      setService: assign((ctx : any, event: any) => { ctx.serviceSelected = event.data; return ctx; }),
    },
    services: { 
      loadPets: (ctx : any) => {
        return Promise.resolve([{id:1, name:"Bobby"}, {id:2, name:"Bobby2"}]);
      },
      loadServices: (ctx : any) => {
        return Promise.resolve([{id:1, name:"Service1"}, {id:2, name:"Service2"}]);
      }
    },
    guards: {
      hasSinglePet: (ctx : any) => {
        return ctx.petList.length === 1;
      },
      petSelected: (ctx : any) => {
        return ctx.petSelected !== "";
      },
      serviceSelected: (ctx : any) => { 
        return ctx.serviceSelected !== "";
      },
      veterinarianSelected: (ctx : any) => {
        return ctx.veterinarianSelected !== "";
      },
      dateSelected: (ctx : any) => {
        return ctx.dateSelected !== "";
      },
      timeSelected: (ctx : any) => {
        return ctx.timeSelected !== "";
      },
      

     }
  });
  