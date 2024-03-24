<script setup lang="ts">
import { ref } from 'vue';
import { PaymentTypeFull } from '../types';

const emit = defineEmits<{
    (e: 'add-payment', payment): void,
    (e: 'close-add-payment'): void
}>();

const inputName = ref<string>('');
const inputAmount = ref<number>();
const inputDescription = ref<string>('');
const inputCurrency = ref<'USD' | 'EUR' | 'CZK'>('USD');

function addPayment() {
  if(inputName.value && inputAmount.value && !isNaN(inputAmount.value)) {
    emit('add-payment', { name: inputName.value, amount: inputAmount.value, description: inputDescription.value, currency: inputCurrency.value });
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
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="inputName"
        v-on:keyup.enter="addPayment()"
        class="bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3"
      >
      <label for="Amount"></label>
      <label for="Description">Name</label>
    </div>
    <div class="flex justify-between w-full items-center">
      <span
        @click="emit('close-add-payment')"
        class="cursor-pointer px-2 py-1 rounded-lg text-red-700 border border-red-700 hover:bg-red-800 hover:text-slate-200 transition-all duration-300"
      > Cancel </span>
      <span
        @click="addPayment()"
        class="cursor-pointer px-2 py-1 rounded-lg text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-slate-200 transition-all duration-300"
      > Confirm </span>
    </div>
  </div>
</template>
