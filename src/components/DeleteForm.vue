<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'delete-payment'): void,
    (e: 'close-delete-form'): void
}>();

const inputText = ref<string>('');

function deletePayment() {
  if(inputText.value == 'I want to DELETE payment') {
    emit('delete-payment');
  }
  else {
    alert('Wrong text')
  }
}
</script>

<template>
  <div class="bg-slate-900 rounded-xl p-6 text-slate-200 flex flex-col items-center gap-5">
    <span class="text-xl">Are you sure you want to delete payment?</span>
    <div class="flex flex-col gap-3">
      <span class="flex gap-1">Type "I want to <p class="text-red-600">DELETE</p> payment" to delete</span>
      <input
        type="text"
        v-model="inputText"
        v-on:keyup.enter="deletePayment()"
        class="bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3"
      >
    </div>
    <div class="flex justify-between w-full items-center">
      <span
        @click="emit('close-delete-form')"
        class="cursor-pointer px-2 py-1 rounded-lg text-red-700 border border-red-700 hover:bg-red-800 hover:text-slate-200 transition-all duration-300"
      > Cancel </span>
      <span
        @click="deletePayment()"
        class="cursor-pointer px-2 py-1 rounded-lg text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-slate-200 transition-all duration-300"
      > Confirm </span>
    </div>
  </div>
</template>
