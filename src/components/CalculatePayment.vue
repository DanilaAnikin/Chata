<script setup lang="ts">
const emit = defineEmits<{
    (e: 'open-add-payment'): void,
}>();
</script>

<template>
    <div @click="emit('open-add-payment')" class="w-fit cursor-pointer flex text-slate-200 border border-slate-200 rounded-lg items-center justify-center px-4 py-1 hover:bg-slate-200 hover:text-slate-800 transition-all duration-500">
        <span>Calculate</span>
    </div>
</template>
