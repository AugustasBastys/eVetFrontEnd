/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Appointment {
  availableTime?: AvailableTime;
  canceled?: boolean;
  /** @format int32 */
  id?: number;
  ownersComment?: string;
  pet?: Pet;
  vetService: VetService;
}

export interface AvailableTime {
  booked?: boolean;

  /** @format date-time */
  date?: string;

  /** @format int32 */
  id?: number;
  veterinarian?: Veterinarian;
}

export interface CancelAppointmentCommand {
  cancel?: boolean;

  /** @format int32 */
  id?: number;
}

export interface Condition {
  conditionName?: string;

  /** @format int32 */
  id?: number;
  note?: string;
}

export interface CreateAppointmentCommand {
  /** @format int32 */
  availableTimeId?: number;
  ownersComment?: string;

  /** @format int32 */
  petId?: number;

  /** @format int32 */
  vetServiceId?: number;
}

export interface CreatePetCommand {
  /** @format date-time */
  birthDay?: string;
  breed?: "Canine" | "Cricetinae" | "Feline" | "Rabbit";
  color?: string;
  genderType?: "Female" | "Male";
  name?: string;
  sterilized?: boolean;
}

export interface ModelAndView {
  empty?: boolean;
  model?: object;
  modelMap?: Record<string, object>;
  reference?: boolean;
  status?:
    | "ACCEPTED"
    | "ALREADY_REPORTED"
    | "BAD_GATEWAY"
    | "BAD_REQUEST"
    | "BANDWIDTH_LIMIT_EXCEEDED"
    | "CHECKPOINT"
    | "CONFLICT"
    | "CONTINUE"
    | "CREATED"
    | "DESTINATION_LOCKED"
    | "EXPECTATION_FAILED"
    | "FAILED_DEPENDENCY"
    | "FORBIDDEN"
    | "FOUND"
    | "GATEWAY_TIMEOUT"
    | "GONE"
    | "HTTP_VERSION_NOT_SUPPORTED"
    | "IM_USED"
    | "INSUFFICIENT_SPACE_ON_RESOURCE"
    | "INSUFFICIENT_STORAGE"
    | "INTERNAL_SERVER_ERROR"
    | "I_AM_A_TEAPOT"
    | "LENGTH_REQUIRED"
    | "LOCKED"
    | "LOOP_DETECTED"
    | "METHOD_FAILURE"
    | "METHOD_NOT_ALLOWED"
    | "MOVED_PERMANENTLY"
    | "MOVED_TEMPORARILY"
    | "MULTIPLE_CHOICES"
    | "MULTI_STATUS"
    | "NETWORK_AUTHENTICATION_REQUIRED"
    | "NON_AUTHORITATIVE_INFORMATION"
    | "NOT_ACCEPTABLE"
    | "NOT_EXTENDED"
    | "NOT_FOUND"
    | "NOT_IMPLEMENTED"
    | "NOT_MODIFIED"
    | "NO_CONTENT"
    | "OK"
    | "PARTIAL_CONTENT"
    | "PAYLOAD_TOO_LARGE"
    | "PAYMENT_REQUIRED"
    | "PERMANENT_REDIRECT"
    | "PRECONDITION_FAILED"
    | "PRECONDITION_REQUIRED"
    | "PROCESSING"
    | "PROXY_AUTHENTICATION_REQUIRED"
    | "REQUESTED_RANGE_NOT_SATISFIABLE"
    | "REQUEST_ENTITY_TOO_LARGE"
    | "REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "REQUEST_TIMEOUT"
    | "REQUEST_URI_TOO_LONG"
    | "RESET_CONTENT"
    | "SEE_OTHER"
    | "SERVICE_UNAVAILABLE"
    | "SWITCHING_PROTOCOLS"
    | "TEMPORARY_REDIRECT"
    | "TOO_EARLY"
    | "TOO_MANY_REQUESTS"
    | "UNAUTHORIZED"
    | "UNAVAILABLE_FOR_LEGAL_REASONS"
    | "UNPROCESSABLE_ENTITY"
    | "UNSUPPORTED_MEDIA_TYPE"
    | "UPGRADE_REQUIRED"
    | "URI_TOO_LONG"
    | "USE_PROXY"
    | "VARIANT_ALSO_NEGOTIATES";
  view?: View;
  viewName?: string;
}

export interface Pet {
  /** @format date-time */
  birthday?: string;
  breed?: "Canine" | "Cricetinae" | "Feline" | "Rabbit";
  color?: string;
  gender?: "Female" | "Male";
  hidden?: boolean;

  /** @format int32 */
  id?: number;
  name?: string;
  sterilized?: boolean;
}

export interface PetRecord {
  conditions?: Condition[];

  /** @format int32 */
  id?: number;
  pet?: Pet;
  surgeries?: Surgery[];
  vaccinations?: Vaccination[];
  visits?: Visit[];
}

export interface RescheduleAppointmentCommand {
  /** @format int32 */
  availableTimeId?: number;

  /** @format int32 */
  id?: number;
}

export interface Surgery {
  /** @format int32 */
  id?: number;
  note?: string;
  visit?: Visit;
}

export interface UpdatePetCommand {
  /** @format date-time */
  birthday?: string;
  color?: string;
  hidden?: boolean;

  /** @format int32 */
  id?: number;
  name?: string;
  sterilized?: boolean;
}

export interface Vaccination {
  /** @format int32 */
  id?: number;

  /** @format date-time */
  nextDue?: string;
  vaccineType?: "Hepatitis" | "Rabies" | "TickBorneMeningoencephalitis";
  visit?: Visit;
}

export interface VetService {
  /** @format int32 */
  id: number;
  name?: string;

  /** @format double */
  price?: number;
  vetServiceCode?: string;
}

export interface Veterinarian {
  /** @format int32 */
  id?: number;
  name?: string;
  specialty?: "Dentist" | "General" | "Surgeon";
  vetService?: VetService;
}

export interface View {
  contentType?: string;
}

export interface Visit {
  appointment?: Appointment;
  bloodPressure?: string;

  /** @format date-time */
  date?: string;
  diagnosis?: string;

  /** @format int32 */
  id?: number;

  /** @format int32 */
  pulse?: number;

  /** @format double */
  temp?: number;

  /** @format double */
  weight?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Api Documentation
 * @version 1.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * @termsOfService urn:tos
 * @baseUrl //localhost:8080
 * @contact
 *
 * Api Documentation
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  appointments = {
    /**
     * No description
     *
     * @tags appointment-controller
     * @name GetAppointmentsUsingGet
     * @summary getAppointments
     * @request GET:/appointments
     */
    getAppointmentsUsingGet: (params: RequestParams = {}) =>
      this.request<Appointment[], void>({
        path: `/appointments`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appointment-controller
     * @name CreateAppointmentUsingPost
     * @summary createAppointment
     * @request POST:/appointments/book
     */
    createAppointmentUsingPost: (appointmentCommand: CreateAppointmentCommand, params: RequestParams = {}) =>
      this.request<Appointment, void>({
        path: `/appointments/book`,
        method: "POST",
        body: appointmentCommand,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags appointment-controller
     * @name CancelAppointmentUsingPut
     * @summary cancelAppointment
     * @request PUT:/appointments/cancel
     */
    cancelAppointmentUsingPut: (appointmentCommand: CancelAppointmentCommand, params: RequestParams = {}) =>
      this.request<Appointment, void>({
        path: `/appointments/cancel`,
        method: "PUT",
        body: appointmentCommand,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags appointment-controller
     * @name RescheduleAppointmentUsingPut
     * @summary rescheduleAppointment
     * @request PUT:/appointments/reschedule
     */
    rescheduleAppointmentUsingPut: (appointmentCommand: RescheduleAppointmentCommand, params: RequestParams = {}) =>
      this.request<Appointment, void>({
        path: `/appointments/reschedule`,
        method: "PUT",
        body: appointmentCommand,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags appointment-controller
     * @name GetAppointmentUsingGet
     * @summary getAppointment
     * @request GET:/appointments/{id}
     */
    getAppointmentUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<Appointment, void>({
        path: `/appointments/${id}`,
        method: "GET",
        ...params,
      }),
  };
  availableTimes = {
    /**
     * No description
     *
     * @tags available-time-controller
     * @name GetTimesByServiceUsingGet
     * @summary getTimesByService
     * @request GET:/availableTimes/service/{id}
     */
    getTimesByServiceUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<AvailableTime[], void>({
        path: `/availableTimes/service/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags available-time-controller
     * @name GetTimesByVeterinarianUsingGet
     * @summary getTimesByVeterinarian
     * @request GET:/availableTimes/veterinarian/{id}
     */
    getTimesByVeterinarianUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<AvailableTime[], void>({
        path: `/availableTimes/veterinarian/${id}`,
        method: "GET",
        ...params,
      }),
  };
  error = {
    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingGet
     * @summary error
     * @request GET:/error
     */
    errorUsingGet: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingHead
     * @summary error
     * @request HEAD:/error
     */
    errorUsingHead: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "HEAD",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingPost
     * @summary error
     * @request POST:/error
     */
    errorUsingPost: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingPut
     * @summary error
     * @request PUT:/error
     */
    errorUsingPut: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "PUT",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingDelete
     * @summary error
     * @request DELETE:/error
     */
    errorUsingDelete: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingOptions
     * @summary error
     * @request OPTIONS:/error
     */
    errorUsingOptions: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags basic-error-controller
     * @name ErrorUsingPatch
     * @summary error
     * @request PATCH:/error
     */
    errorUsingPatch: (params: RequestParams = {}) =>
      this.request<Record<string, object>, void>({
        path: `/error`,
        method: "PATCH",
        type: ContentType.Json,
        ...params,
      }),
  };
  pets = {
    /**
     * No description
     *
     * @tags pet-controller
     * @name GetPetsUsingGet
     * @summary getPets
     * @request GET:/pets
     */
    getPetsUsingGet: (params: RequestParams = {}) =>
      this.request<Pet[], void>({
        path: `/pets`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet-controller
     * @name CreatePetUsingPost
     * @summary createPet
     * @request POST:/pets/create
     */
    createPetUsingPost: (petCommand: CreatePetCommand, params: RequestParams = {}) =>
      this.request<Pet, void>({
        path: `/pets/create`,
        method: "POST",
        body: petCommand,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet-controller
     * @name UpdatePetUsingPut
     * @summary updatePet
     * @request PUT:/pets/update
     */
    updatePetUsingPut: (petCommand: UpdatePetCommand, params: RequestParams = {}) =>
      this.request<Pet, void>({
        path: `/pets/update`,
        method: "PUT",
        body: petCommand,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet-controller
     * @name GetPetUsingGet
     * @summary getPet
     * @request GET:/pets/{id}
     */
    getPetUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<Pet, void>({
        path: `/pets/${id}`,
        method: "GET",
        ...params,
      }),
  };
  record = {
    /**
     * No description
     *
     * @tags pet-record-controller
     * @name GetPetRecordByPetIdUsingGet
     * @summary getPetRecordByPetId
     * @request GET:/record/pet/{id}
     */
    getPetRecordByPetIdUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<PetRecord, void>({
        path: `/record/pet/${id}`,
        method: "GET",
        ...params,
      }),
  };
  vetServices = {
    /**
     * No description
     *
     * @tags vet-services-controller
     * @name GetVetServicesUsingGet
     * @summary getVetServices
     * @request GET:/vetServices
     */
    getVetServicesUsingGet: (params: RequestParams = {}) =>
      this.request<VetService[], void>({
        path: `/vetServices`,
        method: "GET",
        ...params,
      }),
  };
  veterinarians = {
    /**
     * No description
     *
     * @tags veterinarian-controller
     * @name GetVeterinariansUsingGet
     * @summary getVeterinarians
     * @request GET:/veterinarians
     */
    getVeterinariansUsingGet: (params: RequestParams = {}) =>
      this.request<Veterinarian[], void>({
        path: `/veterinarians`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags veterinarian-controller
     * @name GetVeterinariansUsingGet1
     * @summary getVeterinarians
     * @request GET:/veterinarians/service/{id}
     */
    getVeterinariansUsingGet1: (id: number, params: RequestParams = {}) =>
      this.request<Veterinarian[], void>({
        path: `/veterinarians/service/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags veterinarian-controller
     * @name GetVeterinarianUsingGet
     * @summary getVeterinarian
     * @request GET:/veterinarians/{id}
     */
    getVeterinarianUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<Veterinarian, void>({
        path: `/veterinarians/${id}`,
        method: "GET",
        ...params,
      }),
  };
}
