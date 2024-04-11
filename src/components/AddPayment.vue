<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
    (e: 'open-add-payment'): void,
}>();
</script>

<template>
  <div @click="emit('open-add-payment')" class="w-fit cursor-pointer flex gap-2 text-slate-200 border border-slate-200 rounded-lg items-center justify-center px-4 py-1 hover:bg-slate-200 hover:text-slate-800 transition-all duration-500">
    <span>Add Payment</span>
    <PlusIcon class="w-6 h-6" />
  </div>
</template>
