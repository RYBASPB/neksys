import type { Entity } from '@/models/entity'

export type CreateEntityDto = {
  title: string // < 50 symbols
  description: string // md
  published: boolean // required
  published_from?: Date // nullable
}

export type UpdateEntityDto = { id: number } & Partial<CreateEntityDto>

export interface EntityApi {
  getAll(): Promise<Entity[]>
  create(entity: CreateEntityDto): Promise<Entity>
  update(entity: UpdateEntityDto): Promise<Entity>
  delete(entityId: number): Promise<void>
}
