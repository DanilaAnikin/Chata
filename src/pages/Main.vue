<script setup lang="ts">
import AddPayment from '../components/AddPayment.vue';
import PaymentFooter from '../components/PaymentFooter.vue';
import Payment from '../components/Payment.vue';
import DeleteForm from '../components/DeleteForm.vue';
import AddPaymentForm from '../components/AddPaymentForm.vue';
import { supabase } from '../supabase.js';
import { PaymentTypeFull } from '../types';
import { ref, onMounted } from 'vue';

const payments = ref<PaymentTypeFull[]| null>();

async function getPayments() {
  const { data } = await supabase.from('payments').select();
  payments.value = data;
}

async function addPayment(payment: PaymentTypeFull) {
  payments.value!.push({...payment})
  const { error } = await supabase.from('payments').insert({...payment});

  openAddPayment.value = false;
}

async function deletePayment() {
  // @ts-ignore
  payments.value!.splice(payments.value!.indexOf(payments.value!.find((payment) => payment.id == paymentToDelete.value!.id)), 1);
  const { error } = await supabase.from('payments').delete().eq('id', paymentToDelete.value!.id);

  paymentToDelete.value = null;
  openDeleteForm.value = false;
}

const openDeleteForm = ref<boolean>(false);
const paymentToDelete = ref<PaymentTypeFull | null>();

const openAddPayment = ref<boolean>(false);

onMounted(() => getPayments());
</script>

<template>
  <div
    :class="paymentToDelete || openAddPayment ? 'opacity-10' : ''"
    class="w-full h-full flex flex-col items-center p-20 gap-20"
  >
    <span class="text-5xl text-slate-200 font-bold">List :)</span>
    <div class="flex flex-col gap-5 w-full h-full items-center">
      <AddPayment @open-add-payment="openAddPayment=!openAddPayment" />
      <PaymentFooter v-if="payments" />
      <Payment
        class="h-full"
        v-for="payment in payments"
        @change-delete-form="openDeleteForm=!openDeleteForm; paymentToDelete=$event"
        :payment="payment"
        :openDeleteForm="openDeleteForm"
      />
    </div>

  </div>
  <div class="w-full flex justify-center absolute top-40">
    <DeleteForm
      v-if="openDeleteForm"
      @close-delete-form="openDeleteForm=false; paymentToDelete=null"
      @delete-payment="deletePayment()"
    />
  </div>

  <div class="w-full flex justify-center absolute top-40">
    <AddPaymentForm
      v-if="openAddPayment"
      @close-add-payment="openAddPayment=false"
      @add-payment="addPayment($event)"
    />
  </div>
</template>