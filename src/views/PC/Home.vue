<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <SearchInput></SearchInput>
            </el-header>
            <el-container>
                <el-aside width="200px">左侧边栏</el-aside>
                <el-main>
                    <div id="article-list">
                        <div class="article-item">
                            <div class="article-header">
                                <h2>文章标题</h2>
                                <span>分类</span>
                            </div>
                            <p>文章内容...</p>
                            <div>
                                <span>创建日期</span>
                                <span>更新日期</span>
                            </div>
                        </div>
                        <div class="article-item">
                            <h2>Article Title 2</h2>
                            <p>Article content goes here...</p>
                        </div>
                        <div class="article-item">
                            <h2>Article Title 3</h2>
                            <p>Article content goes here...</p>
                        </div>
                    </div>
                </el-main>
                <el-aside width="200px">右侧边栏</el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Input from "@/libs/Input/src/Input.vue";
import SearchInput from "@/libs/Search/src/SearchInput.vue";
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.common-layout {
    width: 100vw;
    // background-color: #c12f2f;
}
.article-item .article-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.article-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
