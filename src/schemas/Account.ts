import { z } from "zod"
import { CompleteEvent, RelatedEventModel, CompleteRSVP, RelatedRSVPModel } from "./index"

export const AccountModel = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

export interface CompleteAccount extends z.infer<typeof AccountModel> {
  events: CompleteEvent[]
  RSVP: CompleteRSVP[]
}

/**
 * RelatedAccountModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountModel: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountModel.extend({
  events: RelatedEventModel.array(),
  RSVP: RelatedRSVPModel.array(),
}))
