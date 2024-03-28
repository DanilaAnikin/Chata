<script setup lang="ts">
import { ref } from 'vue';
import { PaymentTypeFull } from '../types';

const props = defineProps<{
    payment: PaymentTypeFull,
}>();

const emit = defineEmits<{
    (e: 'change-payment', payment): void,
    (e: 'close-add-payment'): void
}>();

const inputName = ref<string>(props.payment.name);
const inputAmount = ref<number>(props.payment.amount);
const inputDescription = ref<string>(props.payment.description);
const inputCurrency = ref<string>(props.payment.currency);

function editPayment() {
    console.log(inputDescription.value);
    emit('change-payment', { name: inputName.value, amount: inputAmount.value, description: inputDescription.value, currency: inputCurrency.value });
}
</script>


<template>
  <div class="w-1/5 bg-slate-900 rounded-xl p-6 text-slate-200 flex flex-col items-center gap-5">
    <span class="text-xl">Add new payment</span>
    <div class="flex flex-col gap-3 w-full">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="inputName"
        class="bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3"
      >
      <div class="flex justify-between w-full">
        <div class="w-1/2 flex flex-col gap-3">
          <label for="amount">Amount</label>
          <input
            type="text"
            id="amount"
            v-model="inputAmount"
            class="bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3"
          >
        </div>

        <div class="w-1/3 flex flex-col gap-3">
            <label for="currency">Currency</label>
            <input type="text" id="currency" v-model="inputCurrency" placeholder="USD/CZK/EUR" class="placeholder:text-slate-800 bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3">
        </div>
      </div>
      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        v-model="inputDescription"
        class="bg-slate-950 text-slate-200 rounded-lg outline-none focus:ring-slate-700 block w-full p-3"
      />
    </div>
    <div class="flex justify-between w-full items-center">
      <span
        @click="emit('close-add-payment')"
        class="cursor-pointer px-2 py-1 rounded-lg text-red-700 border border-red-700 hover:bg-red-800 hover:text-slate-200 transition-all duration-300"
      > Cancel </span>
      <span
        @click="editPayment()"
        class="cursor-pointer px-2 py-1 rounded-lg text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-slate-200 transition-all duration-300"
      > Confirm </span>
    </div>
  </div>
</template>