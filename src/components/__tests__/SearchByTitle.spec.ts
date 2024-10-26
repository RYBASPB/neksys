import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import SearchByTitle from '@/components/SearchByTitle.vue'
import { faker } from '@faker-js/faker/locale/ru'

describe('SearchByTitle', () => {
  test('should emit test text', async () => {
    const { emitted } = render(SearchByTitle)
    const testText = faker.lorem.sentence()
    const input = screen.getByRole('textbox')
    await fireEvent.update(input, testText)
    expect(emitted().searchValue[0][0]).toEqual(testText)
  })
})
