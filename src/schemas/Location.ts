import { z } from "zod"
import { CompleteEvent, RelatedEventModel } from "./index"

export const LocationModel = z.object({
  id: z.string(),
  title: z.string(),
  roomId: z.string().nullish(),
  maxSeating: z.number().int().nullish(),
})

export interface CompleteLocation extends z.infer<typeof LocationModel> {
  Event: CompleteEvent[]
}

/**
 * RelatedLocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLocationModel: z.ZodSchema<CompleteLocation> = z.lazy(() => LocationModel.extend({
  Event: RelatedEventModel.array(),
}))
