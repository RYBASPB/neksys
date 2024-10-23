import { fakerRU as faker } from '@faker-js/faker'

import type { EntityApi, UpdateEntityDto } from '@/api/entity'
import type { Entity } from '@/models/entity'
import { ENTITY_EXISTS, NO_ENTITY_FOUND } from '@/shared/constants'

function createEntityList(): Entity[] {
  const list: Entity[] = []
  for (let i = 0; i < 100; i++) {
    const entity: Entity = {
      description: faker.lorem.paragraphs(10),
      id: i + 1,
      published: faker.datatype.boolean(0.7),
      published_from: faker.date.between({
        from: '2010-01-01', to: Date.now(),
      }),
      title: faker.lorem.sentence({ min: 1, max: 6 }),
    }
    list.push(entity)
  }
  return list
}

export class MockEntityApi implements EntityApi {
  private readonly entityList: Map<number, Entity>
  constructor() {
    const entities = createEntityList()
    this.entityList = new Map(entities.map(e => [e.id, e]))
  }

  // Тип entity - Entity, а не CreateEntityDto, так как если в нашем backend
  // не реализована автоматическая выдача id, то мы будем делать это на frontend
  public create(entity: Entity): Promise<Entity> {
    if (this.entityList.has(entity.id)) {
      return Promise.reject(new Error(ENTITY_EXISTS))
    }
    this.entityList.set(entity.id, entity)
    return Promise.resolve(entity)
  }

  public delete(entityId: number): Promise<void> {
    this.entityList.delete(entityId)
    return Promise.resolve()
  }

  public getAll(): Promise<Entity[]> {
    if (this.entityList.size === 0) {
      return Promise.reject(new Error(NO_ENTITY_FOUND))
    }
    return Promise.resolve([...this.entityList.values()])
  }

  public update(entity: UpdateEntityDto): Promise<Entity> {
    const prevEntity = this.entityList.get(entity.id)
    // TODO объединить объекты
    const newEntity = { ...prevEntity, ...entity }
    this.entityList.set(entity.id, <Entity>newEntity)
    return Promise.resolve(<Entity>newEntity)
  }
}

export const mockEntityApi = new MockEntityApi()
