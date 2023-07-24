import { z } from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteCategory, RelatedCategoryModel, CompleteLocation, RelatedLocationModel, CompleteRSVP, RelatedRSVPModel } from "./index"

export const EventModel = z.object({
  id: z.string(),
  creatorId: z.string(),
  title: z.string(),
  categoryId: z.string(),
  locationId: z.string(),
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
  discordEventId: z.string().nullish(),
  googleCalendarEventId: z.string().nullish(),
})

export interface CompleteEvent extends z.infer<typeof EventModel> {
  creator: CompleteAccount
  category: CompleteCategory
  location: CompleteLocation
  RSVP: CompleteRSVP[]
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
  RSVP: RelatedRSVPModel.array(),
}))
