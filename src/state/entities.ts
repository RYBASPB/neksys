import { ref } from 'vue'
import type { EntityApi } from '@/api/entity'
import type { Entity } from '@/models/entity'

export const allEntities = ref<Map<number, Entity>>(new Map())
export const maxKey = ref<number>(0)

export async function loadEntities(
  apiLoader: EntityApi,
  errorHandler: (error: Error) => void,
) {
  const entities = await apiLoader
    .getAll()
    .catch(errorHandler)
  if (entities) {
    allEntities.value = new Map(
      entities.map((entity) => {
        maxKey.value = maxKey.value < entity.id
          ? entity.id
          : maxKey.value
        return [entity.id, entity]
      }),
    )
  }
}
