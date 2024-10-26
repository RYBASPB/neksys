import { describe, test, expect, vi } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import AllEntitiesGrid from '@/components/EntitiesList/AllEntitiesGrid.vue'
import router from '@/router'
import type { Entity } from '@/models/entity'
import { faker } from '@faker-js/faker/locale/ru'

describe('AllEntitiesGrid', () => {
  const entities: Entity[] = [
    {
      id: 1,
      title: faker.lorem.sentence(5),
      description: faker.lorem.paragraph(5),
      published: true,
      published_from: '2022-02-02',
    },
  ]
  test('should return Нет доступных элементов', async () => {
    const { getByText } = render(AllEntitiesGrid, {
      props: {
        filteredEntities: [],
      },
      global: {
        plugins: [router],
      },
    })
    expect(getByText('Нет доступных элементов')).toBeTruthy()
    cleanup()
  })

  test('should return elements list', async () => {
    const { queryByText, getByText } = render(AllEntitiesGrid, {
      props: {
        filteredEntities: entities,
      },
      global: {
        plugins: [router],
      },
    })
    const didntFind = queryByText('Нет доступных элементов')
    expect(didntFind).toBeNull()
    getByText(entities[0]['id'])
    getByText(`${entities[0]['title']}`)
    getByText(`Дата публикации: ${entities[0]['published_from']}`)
    getByText(`${entities[0]['description']}`, { exact: false })
    cleanup()
  })
  test('should go to create page', async () => {
    const { getByRole } = render(AllEntitiesGrid, {
      props: {
        filteredEntities: entities,
      },
      global: {
        plugins: [router],
      },
    })
    const button = getByRole('link', { name: 'Изменить' })
    const push = vi.spyOn(router, 'push')
    button.click()
    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith(`edit/${entities[0]['id']}`)
    cleanup()
  })
})
