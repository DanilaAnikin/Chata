<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
    (e: 'open-add-payment'): void,
}>();
</script>

<template>
  <div class="w-fit cursor-pointer flex gap-8 text-slate-200 border border-slate-200 rounded-2xl items-center justify-center px-10 py-2 hover:bg-slate-200 hover:text-slate-800 transition-all duration-500">
    <span class="text-lg font-bold">Add Payment</span>
    <PlusIcon class="w-8 h-8" />
  </div>
</template>
