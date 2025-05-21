<template>
    <div class="custom-input-wrapper" :class="{ 'has-error': !!error }">
        <label v-if="label" :for="inputId" class="custom-input-label">{{
            label
        }}</label>
        <div class="input-field-container">
            <input
                :id="inputId"
                ref="inputRef"
                class="custom-input"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxlength"
                :minlength="minlength"
                :autocomplete="autocomplete"
                :name="name"
                v-bind="$attrs"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            />
        </div>
        <p v-if="error" class="custom-input-error">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, onMounted } from "vue";

// 1. 定义 Props
interface Props {
    modelValue: string | number; // 用于 v-model
    label?: string;
    type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search"; // 可根据需要扩展
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string; // 错误信息
    name?: string; // input 原生 name 属性
    autocomplete?: string;
    maxlength?: number;
    minlength?: number;
    // 可以根据需要添加更多原生 input 支持的属性
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    disabled: false,
    readonly: false,
});

// 2. 定义 Emits
interface Emits {
    (e: "update:modelValue", value: string | number): void;
    (e: "input", event: Event): void;
    (e: "change", event: Event): void;
    (e: "focus", event: FocusEvent): void;
    (e: "blur", event: FocusEvent): void;
    // 可以根据需要添加更多自定义事件
}

const emit = defineEmits<Emits>();

// 3. 生成唯一的 ID 用于 label 和 input 关联，增强可访问性
const inputId = computed(
    () => `custom-input-${Math.random().toString(36).substring(2, 9)}`
);

// 4. 处理输入事件，更新 v-model
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
    emit("input", event); // 也触发原生的 input 事件
};

// 5. 处理 change 事件
const handleChange = (event: Event) => {
    emit("change", event);
};

// 6. 处理 focus 事件
const handleFocus = (event: FocusEvent) => {
    emit("focus", event);
};

// 7. 处理 blur 事件
const handleBlur = (event: FocusEvent) => {
    emit("blur", event);
};

// 8. $attrs 的使用
// v-bind="$attrs" 会将父组件传递的但没有在 props 中显式声明的属性应用到 <input> 元素上。
// 例如，如果父组件传递了 `aria-label`，它会被应用到 <input> 上。
// 注意：class 和 style 属性会被特殊处理，默认会合并而不是覆盖。
const attrs = useAttrs(); // 如果需要在 <script> 块中访问 $attrs，可以使用 useAttrs()

// 9. 暴露 input 元素的引用 (可选，用于父组件直接操作 DOM)
const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select(),
    inputElement: inputRef, // 直接暴露元素引用
});

// 示例：在组件挂载后自动聚焦 (如果需要)
// onMounted(() => {
//   if (props.autofocus) { // 假设你添加了一个 autofocus prop
//     inputRef.value?.focus();
//   }
// });
</script>

<style scoped>
.custom-input-wrapper {
    display: inline-flex; /* 或者 block，根据布局需求 */
    flex-direction: column;
    margin-bottom: 1rem; /* 示例间距 */
    width: 100%; /* 默认宽度，可由父组件覆盖 */
}

.custom-input-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
    font-size: 0.9em;
}

.input-field-container {
    position: relative;
    display: flex;
    align-items: center;
}

.custom-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box; /* 确保 padding 和 border 不会增加总宽度 */
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.custom-input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-input:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
}

.custom-input-wrapper.has-error .custom-input {
    border-color: #dc3545;
}

.custom-input-wrapper.has-error .custom-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.custom-input-error {
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
}
</style>
