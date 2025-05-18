import { computed, ref } from "vue";
import { readonly } from "vue";

export const isMobileTerminal = computed(() => {
    const isMobile = ref(false);
    const screenWidth = ref(window.innerWidth);

    // 结合 UserAgent 和屏幕宽度
    const userAgent =
        navigator.userAgent
    if (
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            userAgent.toLowerCase()
        )
    ) {
        isMobile.value = true;
    } else {
        // 进一步通过屏幕宽度判断
        isMobile.value = screenWidth.value < 768; // 假设768px为断点
    }

    return {
        isMobile: readonly(isMobile), // 使用readonly防止外部修改
        screenWidth: readonly(screenWidth),
    };
})
