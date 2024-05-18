/**
 * @categoryDescription Types
 * Types
 */

import { z } from "zod"
import { VehicleSchemas } from "./lib/schemas/index.js"
import { DealershipSchemas } from "./lib/schemas/dealership.js"

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getAllVehicles} or {@link ToyotaClient#getVehicle}.
 * Infered from Zod schema {@link VehicleSchemas.ResponseBodySchema}.
 * 
 * @category Types
 */
export type VehicleResponseBody = z.infer<typeof VehicleSchemas.ResponseBodySchema>

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getVehicleGrade}.
 * Infered from Zod schema {@link VehicleSchemas.GradeResponseBodySchema}.
 * 
 * @category Types
 */
export type VehicleGradeResponseBody = z.infer<typeof VehicleSchemas.GradeResponseBodySchema>

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getDealerships}.
 * Infered from Zod schema {@link DealershipSchemas.ResponseBodySchema}.
 * 
 * @category Types
 */
export type DealershipResponseBody = z.infer<typeof DealershipSchemas.ResponseBodySchema>

/**
 * @see {@link VehicleSchemas.Language}
 * 
 * @category Types
 */
export type Language = z.infer<typeof VehicleSchemas.Language>

/** 
 * @see {@link VehicleSchemas.Region}
 * 
 * @category Types
 */
export type Region = z.infer<typeof VehicleSchemas.Region>
