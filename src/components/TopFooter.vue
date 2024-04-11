<script setup lang="ts">
import AddPayment from './AddPayment.vue';
import CalculatePayment from './CalculatePayment.vue';

const emit = defineEmits<{
    (e: 'open-add-payment'): void,
    (e: 'open-calculate-form'): void,
}>();
</script>

<template>
    <div class="flex justify-between gap-4 xl:w-3/5 w-full">
        <AddPayment @open-add-payment="emit('open-add-payment')" />
        <CalculatePayment @open-calculate-form="emit('open-calculate-form')" />
    </div>
</template>