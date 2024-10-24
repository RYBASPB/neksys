<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { EntitySchema } from '@/services/validation/entity'
import { onMounted, onUpdated, ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { allEntities, maxKey } from '@/state/entities'
import FormInputElement from '@/components/FormInputElement.vue'

// for getting entity id and redirect to home_view after edit
const route = useRoute()
const router = useRouter()
const entityId = ref<number>()

onBeforeRouteLeave(() => {
  resetForm()
  entityId.value = NaN
})

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

onUpdated(() => {
  if (isCreate() && !entityId.value) {
    entityId.value = maxKey.value + 1
    setFieldValue('id', entityId.value)
  }
})

// create form, validate by zod schema
const { defineField, errors, setFieldValue, setValues, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(EntitySchema),
  validateOnMount: true,
  initialValues: {
    title: '',
    description: '',
    published: false,
    published_from: null,
  },
})

const onSubmit = handleSubmit(async (values, actions) => {
  if (isEdit()) {
    // TODO await Api Edit
    allEntities.value.set(values.id, values)
  }

  if (isCreate() && entityId.value) {
    // TODO await Api Add
    allEntities.value.set(entityId.value, values)
    maxKey.value = entityId.value
  }
  entityId.value = NaN
  actions.resetForm()
  await router.push('/')
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
</script>

<template>
  <div class="w-full mx-auto lg:max-w-screen-xl relative flex flex-col justify-center">
    <h2 class="text-center text-xl">{{ isEdit() ? 'Изменить' : 'Создать' }} запись</h2>
    <form class="flex flex-col gap-2 w-full" @submit.prevent="onSubmit">
      <FormInputElement v-if="entityId" label="Id" >
        <template #input>
          <input
            class="field animation"
            :placeholder="entityId.toString()"
            disabled
          />
        </template>
      </FormInputElement>
      <FormInputElement label="Title" :errors="errors.title" >
        <template #input>
          <input
            v-model="title"
            v-bind="titleProps"
            class="field animation"
            placeholder="Title ..."
          />
        </template>
      </FormInputElement>
      <FormInputElement label="Description" :errors="errors.description" >
        <template #input>
          <textarea
            v-model="description"
            v-bind="descriptionProps"
            class="field animation"
            rows="10"
            placeholder="Description ..."/>
        </template>
      </FormInputElement>
      <FormInputElement label="Published" :errors="errors.published">
        <template #input>
          <input
            type="checkbox"
            v-model="published"
            v-bind="publishedProps"
            class=""
          >
        </template>
      </FormInputElement>
      <FormInputElement label="Published from" :errors="errors.published_from" >
        <template #input>
          <input
            :value="publishedFrom"
            v-bind="publishedFromProps"
            class="field animation"
            @input="handlePublishedFrom"
            type="date"
            placeholder="Published from ..."
          />
        </template>
      </FormInputElement>
      <button type="submit">Подтвердить изменения</button>
    </form>
  </div>
</template>

<style scoped>
.field {
  @apply
  w-full
  bg-transparent
  placeholder:text-slate-400
  text-slate-700
  text-sm border
  border-slate-200
  rounded-md
  px-3
  py-2
}
.animation {
  @apply
  transition
  duration-300
  ease-in-out
  focus:outline-none
  focus:border-slate-400
  hover:border-slate-300
  shadow-sm
  focus:shadow
}
</style>
