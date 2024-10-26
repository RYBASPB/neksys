<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { EntitySchema } from '@/services/validation/entity'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { allEntities, maxKey } from '@/state/entities'
import FormInputElement from '@/components/FormInputElement.vue'
import { NO_ENTITY_FOUND } from '@/shared/constants'

// for getting entity id and redirect to home_view after edit
const route = useRoute()
const router = useRouter()
const entityId = ref<number>()

const errorMessage = ref<string>('')

const resetAll = () => {
  resetForm()
  entityId.value = NaN
  errorMessage.value = ''
}

onBeforeRouteLeave(() => {
  resetAll()
})

onBeforeRouteUpdate(() => {
  resetAll()
})

watch(() => route.params.id, () => {
  if (isEdit()) {
    getEntityFromStateById()
  }
  if (isCreate()) {
    console.log('Watch')
    entityId.value = maxKey.value + 1
    setFieldValue('id', entityId.value)
  }
})

const isEdit = () => {
  return !!(route.name === 'edit' && route.params.id)
}
const isCreate = () => {
  return route.name === 'create'
}

function getEntityFromStateById() {
  entityId.value = typeof route.params.id === 'string' ? parseInt(route.params.id) : NaN
  const entity = allEntities.value.get(entityId.value)
  if (entity) {
    setValues(entity)
    return
  }
  errorMessage.value = NO_ENTITY_FOUND
}

onMounted(() => {
  if (isEdit()) {
    getEntityFromStateById()
  }
  if (isCreate()) {
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

const onSubmit = handleSubmit(async (values) => {
  if (isEdit()) {
    // TODO await Api Edit
    allEntities.value.set(values.id, values)
  }

  if (isCreate() && entityId.value) {
    // TODO await Api Add
    allEntities.value.set(entityId.value, values)
    maxKey.value = entityId.value
  }
  resetAll()
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
    <div v-if="errorMessage === NO_ENTITY_FOUND" class="text-center text-xl w-full">Такого элемента не существует</div>
    <template v-else>
      <h2 class="text-center text-xl">{{ isEdit() ? 'Изменить' : 'Создать' }} запись</h2>
      <form class="flex flex-col gap-3 w-full items-center" @submit.prevent="onSubmit">
        <FormInputElement v-if="entityId" label="Id">
          <template #input>
            <input
              class="field animation"
              :placeholder="entityId.toString()"
              disabled
            />
          </template>
        </FormInputElement>
        <FormInputElement label="Title" :errors="errors.title">
          <template #input>
            <input
              v-model="title"
              v-bind="titleProps"
              class="field animation"
              placeholder="Title ..."
            />
          </template>
        </FormInputElement>
        <FormInputElement label="Description" :errors="errors.description">
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
        <FormInputElement label="Published from" :errors="errors.published_from">
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
        <button class="w-fit py-3 px-4 bg-emerald-200 hover:bg-emerald-400 rounded-2xl" type="submit">Подтвердить изменения</button>
      </form>
    </template>
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
