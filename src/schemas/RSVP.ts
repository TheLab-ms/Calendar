import { z } from "zod"
import { CompleteEvent, RelatedEventModel, CompleteAccount, RelatedAccountModel } from "./index"

export const RSVPModel = z.object({
  id: z.string(),
  eventId: z.string(),
  accountId: z.string(),
  createdAt: z.date(),
})

export interface CompleteRSVP extends z.infer<typeof RSVPModel> {
  event: CompleteEvent
  account: CompleteAccount
}

/**
 * RelatedRSVPModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRSVPModel: z.ZodSchema<CompleteRSVP> = z.lazy(() => RSVPModel.extend({
  event: RelatedEventModel,
  account: RelatedAccountModel,
}))
