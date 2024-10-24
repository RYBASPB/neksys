<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { EntitySchema } from '@/services/validation/entity'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allEntities, maxKey } from '@/state/entities'

const route = useRoute()
const router = useRouter()
const entityId = ref<number>()

const isEdit = () => {
  return !!(route.name === 'edit' && route.params.id)
}

const isCreate = () => {
  return route.name === 'create'
}

onMounted(() => {
  if (isEdit()) {
    // TODO check id type
    entityId.value = typeof route.params.id === 'string' ? parseInt(route.params.id) : NaN
    const entity = allEntities.value.get(entityId.value)
    if (entity) {
      setValues(entity)
    }
  }
  if (isCreate()) {
    entityId.value = maxKey.value + 1
    setFieldValue('id', entityId.value)
  }
})

const { defineField, errors, setFieldValue, setValues, handleSubmit } = useForm({
  validationSchema: toTypedSchema(EntitySchema),
  validateOnMount: true,
  initialValues: {
    published: false,
    published_from: null,
  },
})

const onSubmit = handleSubmit((values, actions) => {
  console.log(values)
  // TODO Api ADD
  if (isEdit()) {
    allEntities.value.set(values.id, values)
  }
  console.log(isCreate(), entityId.value)
  if (isCreate() && entityId.value) {
    allEntities.value.set(entityId.value, values)
    maxKey.value = entityId.value
  }
  entityId.value = NaN
  actions.resetForm()
  router.push('/')
})

const [title, titleProps] = defineField('title')
const [description, descriptionProps] = defineField('description')
const [published, publishedProps] = defineField('published')

const [publishedFrom, publishedFromProps] = defineField('published_from')
// handle empty date input, set null on empty string
const handlePublishedFrom = (e: Event) => {
  let value: string | null = (e.target as HTMLInputElement).value
  if (value === '') {
    value = null
  }
  setFieldValue('published_from', value)
}

const inputClasses = 'w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200\n'
  + '         rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400\n'
  + '         hover:border-slate-300 shadow-sm focus:shadow'
</script>

<template>
  <div class="w-full mx-auto lg:max-w-screen-xl relative flex flex-col justify-center">
    <h2 class="text-center text-xl">{{ isEdit() ? 'Изменить' : 'Создать' }} запись</h2>
    <form class="flex flex-col gap-2 w-full" @submit.prevent="onSubmit">
      <div v-if="entityId" class="w-full max-w-screen-xl min-w-[200px]">
        <label class="block mb-2 text-sm text-slate-600">
          Id
        </label>
        <input
          :class="inputClasses"
          :placeholder="entityId.toString()"
          disabled
        />
      </div>
      <div class="w-full max-w-screen-xl min-w-[200px]">
        <label class="block mb-2 text-sm text-slate-600">
          Title
        </label>
        <input
          v-model="title"
          v-bind="titleProps"
          :class="inputClasses"
          placeholder="Title ..."
        />
        <p class="text-red-500 text-xs italic">{{ errors.title }}</p>
      </div>
      <div class="w-full max-w-screen-xl min-w-[200px]">
        <label class="block mb-2 text-sm text-slate-600">
          Description
        </label>
        <textarea
          v-model="description"
          v-bind="descriptionProps"
          :class="inputClasses"
          rows="10"
          placeholder="Description ..."/>
        <p class="text-red-500 text-xs italic">{{ errors.description }}</p>
      </div>
      <div class="w-full max-w-screen-xl min-w-[200px]">
        <label class="block mb-2 text-sm text-slate-600">
          Published from
        </label>
        <input
          type="checkbox"
          v-model="published"
          v-bind="publishedProps"
          class=""
        >
        <p class="text-red-500 text-xs italic">{{ errors.published }}</p>
      </div>
      <div class="w-full max-w-screen-xl min-w-[200px]">
        <label class="block mb-2 text-sm text-slate-600">
          Published from
        </label>
        <input
          :value="publishedFrom"
          v-bind="publishedFromProps"
          :class="inputClasses"
          @input="handlePublishedFrom"
          type="date"
          placeholder="Published from ..."
        />
        <p class="text-red-500 text-xs italic">{{ errors.published_from }}</p>
      </div>
      <button type="submit">Подтвердить изменения</button>
    </form>
  </div>
</template>
