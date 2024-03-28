<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { PaymentTypeFull } from '../types';

withDefaults(defineProps<{
  payment?: PaymentTypeFull,
  openDeleteForm?: boolean
}>(), {
    openDeleteForm: true
});

const emit = defineEmits<{
  (e: 'change-delete-form', payment: PaymentTypeFull): void,
  (e: 'show-payment', payment: PaymentTypeFull): void,
}>();
</script>

<template>
  <div class="xl:w-3/5 w-full border border-slate-200 text-slate-200 rounded-lg xl:py-4 py-2 xl:px-8 px-4 flex justify-between items-center">
    <span class="w-1/4">{{ payment?.name }}</span>
    <span class="w-1/4">{{ payment?.amount }} {{ payment?.currency }}</span>
    <span class="w-1/3 overflow-hidden text-ellipsis">{{ payment?.description }}</span>

    <div class="flex xl:gap-2 gap-1 sm:w-[15%] xl:w-[5%]">
      <PencilSquareIcon
        @click="emit('show-payment', payment!)"
        class="w-5 h-5 cursor-pointer hover:text-blue-800 transition-all duration-300"
      />
      <TrashIcon
        @click="emit('change-delete-form', payment!)"
        class="w-5 h-5 text-red-600 cursor-pointer hover:text-red-900 transition-all duration-300"
      />
    </div>
  </div>
</template>
