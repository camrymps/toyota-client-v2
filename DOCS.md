# Toyota API Client

## Installation

```sh
$ npm install @camrymps/toyota-client-v2
```

## Usage

Setting up a client instance is simple:

```ts
import { ToyotaClient } from "@camrymps/toyota-client-v2";

// Initialize the client
const client: ToyotaClient = new ToyotaClient();

// Use the client...
```

## Client methods

### Get all vehicles

**Refer to**: {@link ToyotaClient#getAllVehicles}

_Also see_: {@link VehicleResponseBody}

This method returns a list of all Toyota vehicles and their associated properties.

```ts
import { ToyotaClient, VehicleResponseBody } from "@camrymps/toyota-client-v2";

// Initialize the client
const client: ToyotaClient = new ToyotaClient();

// Get all vehicles
client
  .getAllVehicles()
  .then((vehicles: VehicleResponseBody) => {
    // handle response
  })
  .catch((error: any) => {
    // handle error
  });

// or ...
(async () => {
  try {
    const vehicles: VehicleResponseBody = await client.getAllVehicles();

    // do something with the returned data
  } catch (error: any) {
    // handle error
  }
})();
```

### Get a specific vehicle

**Refer to**: {@link ToyotaClient#getVehicle}

_Also see_: {@link VehicleResponseBody}

This method returns a specific Toyota vehicle and its associated properties.

```ts
import { ToyotaClient, VehicleResponseBody } from "@camrymps/toyota-client-v2";

// Initialize the client
const client: ToyotaClient = new ToyotaClient();

// Get a specific vehicle
client
  .getVehicle("tacoma", 2024)
  .then((vehicle: VehicleResponseBody) => {
    // handle response
  })
  .catch((error: any) => {
    // handle error
  });

// or ...
(async () => {
  try {
    const vehicle: VehicleResponseBody = await client.getVehicle(
      "tacoma", // vehicle
      2024 // year
    );

    // do something with the returned data
  } catch (error: any) {
    // handle error
  }
})();
```

### Get a specific vehicle's grade

**Refer to**: {@link ToyotaClient#getVehicleGrade}

_Also see_: {@link VehicleGradeResponseBody}

This method returns a specific Toyota vehicle's grade and its associated properties.

```ts
import { ToyotaClient, VehicleGradeResponseBody } from "@camrymps/toyota-client-v2";

// Initialize the client
const client: ToyotaClient = new ToyotaClient();

// Get a specific vehicle's grade
client
  .getVehicleGrade("prius", 2024, "LE")
  .then((vehicleGrade: VehicleGradeResponseBody) => {
    // handle response
  })
  .catch((error: any) => {
    // handle error
  });

// or ...
(async () => {
  try {
    const vehicleGrade: VehicleGradeResponseBody = await client.getVehicleGrade(
      "prius", // vehicle
      2024, // year
      "XLE" // grade
    );

    // do something with the returned data
  } catch (error: any) {
    // handle error
  }
})();
```

### Get dealerships

**Refer to**: {@link ToyotaClient#getDealerships}

_Also see_: {@link DealershipResponseBody}

This method returns Toyota dealerships within a certain region (region name or zip code, see {@link Region} type alias).

```ts
import { ToyotaClient, DealershipResponseBody } from "@camrymps/toyota-client-v2";

// Initialize the client
const client: ToyotaClient = new ToyotaClient();

// Get dealerships
client
  .getDealerships(
    "53075" // region
  )
  .then((dealerships: DealershipResponseBody) => {
    // handle response
  })
  .catch((error: any) => {
    // handle error
  });

// or ...
(async () => {
  try {
    const dealerships: DealershipResponseBody = await client.getDealerships(
      "EAST" // region
    );

    // do something with the returned data
  } catch (error: any) {
    // handle error
  }
})();
```

## Transformations

Data retrieved from Toyota's API can be transformed upon receipt by passing a transformation function to any of {@link ToyotaClient | ToyotaClient}'s methods. Both synchronous or asynchronous transformation functions are supported, thanks to [Zod's transform method](https://zod.dev/?id=transform).

Below is an example of a simple _synchronous_ transformation:

```ts
...

(async () => {
    try {
        const vehicleGrade: VehicleGradeResponseBody["data"]["getConfigByGrade"] =
            await client.getVehicleGrade<VehicleGradeResponseBody["data"]["getConfigByGrade"]>(
                "camry", // vehicle
                2024, // year
                "LE", // grade
                "NATIONAL", // region
                "EN", // language
                (data: VehicleGradeResponseBody) => data.data.getConfigByGrade //  transformation function
            )

       // do something with the returned data
    } catch (error: any) {
        // handle error
    }
})();
```

The example below makes a request for a specific vehicle, uses an _asynchronous_ transformation to also retrieve nearby dealerships and finally, combines the returned data:

```ts
...

(async () => {
    try {
        const vehicleAndDealerships: VehicleResponseBody & { dealerships: DealershipResponseBody } =
            await client.getVehicle<VehicleResponseBody & { dealerships: DealershipResponseBody }>(
                "camry", // vehicle
                2024, // year
                "53075", // region
                "EN", // language
                async (data: VehicleResponseBody) => {
                    const dealerships = await client.getDealerships(53075);

                    return {
                        ...data,
                        dealerships,
                    };
                } // transformation function
            )

        // do something with the returned data
    } catch (error: any) {
        // handle error
    }
})();
```

## Error handling

Most errors that occur will be an instance of [Zod's ZodError](https://zod.dev/?id=error-handling), which is a subclass of Error. The *ZodError* class is exported in this package for convenience. The example below checks the instance of the error before determining how to handle it:

```ts
import { ToyotaClient, ZodError } from "@camrymps/toyota-client-v2";

...

(async () => {
  try {
    await client.getVehicle("sienn", 2024);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errors = error.errors;

      // handle Zod error
    }

    // handle other error
  }
})();
```

## Testing

To run the tests, simply issue the following command:

```sh
$ npm test
```

## Disclaimer

While this client retrieves data directly from Toyota's website, it is **not an official Toyota client**. **This client is meant to be used for learning purposes only**. **Use it at your own risk** and, as always, be respectful of Toyota's servers.
