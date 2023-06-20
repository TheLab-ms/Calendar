import { z } from "zod"
import { CompleteEvent, RelatedEventModel } from "./index"

export const CategoryModel = z.object({
  id: z.string(),
  title: z.string(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  Event: CompleteEvent[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  Event: RelatedEventModel.array(),
}))
