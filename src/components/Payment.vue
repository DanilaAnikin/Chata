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
  (e: 'show-payment'): void,
}>();
</script>

<template>
  <div class="w-3/5 border border-slate-200 text-slate-200 rounded-lg py-4 px-8 flex justify-between items-center">
    <span class="w-1/4">{{ payment?.name }}</span>
    <span class="w-1/4">{{ payment?.amount }} {{ payment?.currency }}</span>
    <span class="w-1/3 overflow-hidden text-ellipsis">{{ payment?.description }}</span>

    <div class="flex gap-2 w-[5%]">
      <PencilSquareIcon
        @click="emit('show-payment')"
        class="w-5 h-5 cursor-pointer hover:text-blue-800 transition-all duration-300"
      />
      <TrashIcon
        @click="emit('change-delete-form', payment!)"
        class="w-5 h-5 text-red-600 cursor-pointer hover:text-red-900 transition-all duration-300"
      />
    </div>
  </div>
</template>
