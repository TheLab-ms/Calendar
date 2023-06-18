import { z } from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteCategory, RelatedCategoryModel, CompleteLocation, RelatedLocationModel } from "./index"

export const EventModel = z.object({
  id: z.number().int(),
  creatorId: z.string(),
  title: z.string(),
  categoryId: z.number().int(),
  locationId: z.number().int(),
  startTime: z.date(),
  endTime: z.date(),
  allDay: z.boolean(),
  exclusivity: z.number().int(),
  minAttendence: z.number().int(),
  maxAttendence: z.number().int(),
  minAge: z.number().int().nullish(),
  description: z.string(),
  specialNotes: z.string().nullish(),
  reqMaterials: z.string().nullish(),
  pending: z.boolean(),
  approved: z.boolean(),
})

export interface CompleteEvent extends z.infer<typeof EventModel> {
  creator: CompleteAccount
  category: CompleteCategory
  location: CompleteLocation
}

/**
 * RelatedEventModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEventModel: z.ZodSchema<CompleteEvent> = z.lazy(() => EventModel.extend({
  creator: RelatedAccountModel,
  category: RelatedCategoryModel,
  location: RelatedLocationModel,
}))
