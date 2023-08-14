<template>
    <!-- #ifdef MP | H5 | APP-PLUS -->
    <!-- #endif -->
    <template v-if="isUseConfirmButton">
        <u-modal
            class="dialog-box"
            :show="show"
            :width="width"
            :confirm-color="confirmColor"
            :cancel-color="cancelColor"
            :confirm-text="confirmText"
            :show-confirm-button="showConfirmButton"
            :show-cancel-button="showCancelButton"
            :close-on-click-overlay="true"
            @confirm="__confirm"
            @cancel="__cancel"
            @close="__cancel"
        >
            <template #default>
                <slot></slot>
            </template>
            <template #confirmButton>
                <slot name="confirmButton"></slot>
            </template>
        </u-modal>
    </template>
    <template v-else>
        <u-modal
            class="dialog-box"
            :show="show"
            :width="width"
            :confirm-color="confirmColor"
            :cancel-color="cancelColor"
            :confirm-text="confirmText"
            :show-confirm-button="showConfirmButton"
            :show-cancel-button="showCancelButton"
            :close-on-click-overlay="true"
            @confirm="__confirm"
            @cancel="__cancel"
            @close="__cancel"
        >
            <template #default>
                <slot></slot>
            </template>
        </u-modal>
    </template>
</template>

<script lang="ts" setup>
type DialogType = {
    width?: string | number
    confirmColor?: string
    cancelColor?: string
    confirmText?: string
    cancelText?: string
    showConfirmButton?: boolean
    showCancelButton?: boolean
}

withDefaults(defineProps<DialogType>(), {
    width: '650rpx',
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false
})

const attrs: any = useAttrs()
const slots: any = useSlots()

const show = ref<boolean>(false)

const __confirm = () => {
    if (attrs.confirm) {
        attrs.confirm()
    }
    show.value = false
}

const __cancel = () => {
    if (attrs.onCancel) {
        attrs.onCancel()
    }
    show.value = false
}

const isUseConfirmButton = computed(() => {
    return slots?.confirmButton !== undefined
})

defineExpose({
    show
})
</script>
