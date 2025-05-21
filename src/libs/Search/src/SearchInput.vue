<template>
    <div class="search-input-wrapper" :style="wrapperStyle">
        <input
            type="text"
            :placeholder="props.placeholder"
            v-model="inputValue"
            @input="handleInput"
            @keyup.enter="handleSearch"
            :style="inputStyle"
            class="search-input"
        />
        <button
            @click="handleSearch"
            :style="buttonStyle"
            class="search-button"
        >
            {{ props.buttonText }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, CSSProperties } from "vue";

interface Props {
    placeholder?: string;
    buttonText?: string;
    inputBorderRadius?: string;
    inputBorderColor?: string;
    buttonBorderRadius?: string;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    width?: string;
    searchOnInput?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    placeholder: "请输入搜索内容...",
    buttonText: "搜索",
    inputBorderRadius: "4px",
    inputBorderColor: "#ccc",
    buttonBorderRadius: "4px",
    buttonBackgroundColor: "#007bff",
    buttonTextColor: "#fff",
    width: "300px",
    searchOnInput: false,
});
// 2. 定义 Emits (使用编译器宏 defineEmits)
const emit = defineEmits<{
    (e: "search", value: string): void;
    (e: "input", value: string): void;
}>(); // 定义组件可能触发的事件

// setup(props, { emit }) {
const inputValue = ref(""); // 用于双向绑定输入框的值

// 计算输入框的动态样式
const inputStyle = computed((): CSSProperties => {
    return {
        borderRadius: props.inputBorderRadius,
        borderColor: props.inputBorderColor,
        // 你可以在这里添加更多可配置的输入框样式
    };
});

// 计算按钮的动态样式
const buttonStyle = computed((): CSSProperties => {
    return {
        borderRadius: props.buttonBorderRadius,
        backgroundColor: props.buttonBackgroundColor,
        color: props.buttonTextColor,
        // 你可以在这里添加更多可配置的按钮样式
    };
});

// 计算整个组件容器的样式
const wrapperStyle = computed((): CSSProperties => {
    return {
        width: props.width,
    };
});

// 处理输入事件
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    inputValue.value = target.value; // 更新 inputValue
    emit("input", inputValue.value); // 触发 input 事件，传递当前输入值

    if (props.searchOnInput) {
        emit("search", inputValue.value); // 如果配置了输入即搜索，则触发 search 事件
    }
};

// 处理点击搜索按钮或回车事件
const handleSearch = () => {
    emit("search", inputValue.value); // 触发 search 事件，传递当前输入值
};
</script>

<style scoped>
.search-input-wrapper {
    display: flex; /* 使用 flex 布局使输入框和按钮在一行显示 */
    align-items: center; /* 垂直居中对齐 */
}

.search-input {
    flex-grow: 1; /* 输入框占据剩余空间 */
    padding: 8px 12px;
    border: 1px solid; /* 边框颜色会由 props 控制 */
    font-size: 16px;
    /* 默认情况下，移除右侧按钮可能带来的边框影响 */
    /* border-right: none; */
    /* 圆角会由 props 控制，但可以设置一个基础值以防 props 未传递 */
    border-top-left-radius: var(--input-border-radius, 4px);
    border-bottom-left-radius: var(--input-border-radius, 4px);
    border-top-right-radius: 0; /* 通常输入框右边连接按钮，所以右边圆角为0 */
    border-bottom-right-radius: 0;
    outline: none; /* 移除默认的焦点轮廓 */
    transition: border-color 0.3s ease; /* 添加过渡效果 */
    margin-right: 0.5rem; /* 输入框和按钮之间的间距 */
}

.search-input:focus {
    border-color: #007bff; /* 焦点状态下的边框颜色，可以考虑也作为 prop */
}

.search-button {
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    /* 圆角会由 props 控制 */
    border-top-right-radius: var(--button-border-radius, 4px);
    border-bottom-right-radius: var(--button-border-radius, 4px);
    border-top-left-radius: 0; /* 通常按钮左边连接输入框，所以左边圆角为0 */
    border-bottom-left-radius: 0;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.search-button:hover {
    opacity: 0.9; /* 鼠标悬停时降低透明度 */
}
</style>
