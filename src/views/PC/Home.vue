<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.common-layout {
    width: 100vw;
    // background-color: #c12f2f;
}
</style>
