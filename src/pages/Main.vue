<script setup lang="ts">
import TopFooter from '../components/TopFooter.vue';
import PaymentFooter from '../components/PaymentFooter.vue';
import Payment from '../components/Payment.vue';
import DeleteForm from '../components/DeleteForm.vue';
import AddPaymentForm from '../components/AddPaymentForm.vue';
import EditForm from '../components/EditForm.vue';
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

async function changePayment(payment: PaymentTypeFull) {
  const paymentIndex = payments.value!.findIndex((pmnt) => pmnt.id == openEditPayment.value!.id);
  // @ts-ignore
  payments.value![paymentIndex] = { id: openEditPayment.value!.id , ...payment };
  
  const { error } = await supabase.from('payments').update({ name: payment.name, amount: payment.amount, description: payment.description, currency: payment.currency }).eq('id', openEditPayment.value!.id);

  openEditForm.value = false;
  openEditPayment.value = null;
}

const calculatedData = ref({});

async function calculatePayments(paymentList: PaymentTypeFull[]) {
  for (let i=0; i<paymentList.length; i++) {
    const name = payments.value![i].name;
    const { data, error } = await supabase.from('payments').select().eq('name', name);
    console.log(data);
    for (let j=0; j<data!.length; j++) {
      calculatedData.value = Object.assign({ name: data![j].value_of_money }, calculatedData.value);
    }
  }
  console.log(calculatedData.value);
}

const openDeleteForm = ref<boolean>(false);
const paymentToDelete = ref<PaymentTypeFull | null>();

const openAddPayment = ref<boolean>(false);

const openEditForm = ref<boolean>(false);
const openEditPayment = ref<PaymentTypeFull | null>();

const openCalculateForm = ref<boolean>(false);

onMounted(() => getPayments());
</script>

<template>
  <div
    :class="paymentToDelete || openAddPayment || openEditForm || openCalculateForm ? 'opacity-10' : ''"
    class="w-full h-full flex flex-col items-center xl:p-20 p-4 xl:gap-20 gap-8"
  >
    <span class="text-5xl text-slate-200 font-bold">List :)</span>
    <div class="flex flex-col gap-5 w-full h-full items-center">
      <TopFooter
        @open-add-payment="openAddPayment=!openAddPayment"
        @open-calculate-form="openCalculateForm!=openCalculateForm"
        @click="calculatePayments(payments!)"
        />
      <PaymentFooter v-if="payments" />
      <Payment
        class="h-full"
        v-for="payment in payments"
        @change-delete-form="openDeleteForm=!openDeleteForm; paymentToDelete=$event"
        @show-payment="openEditForm=!openEditForm, openEditPayment=$event"
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
  <div class="w-full flex justify-center absolute top-40">
    <CalculatePaymentForm
      v-if="openCalculateForm"
      @close-calculate-form="openCalculateForm=false"
      @calculate="calculatePayments(payments!)"
    />
  </div>
  <div class="w-full flex justify-center absolute top-40">
    <EditForm
      v-if="openEditForm"
      @close-edit-form="openEditForm=false"
      @change-payment="changePayment($event)"
      :payment="openEditPayment!"
    />
  </div>
</template>