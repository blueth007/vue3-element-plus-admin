<template>
    <div class="components-container">
        <aside><strong>SplitPane</strong> If you've used
            <a href="https://codepen.io/" target="_blank"> codepen</a>,
            <a href="https://jsfiddle.net/" target="_blank"> jsfiddle </a>will not be unfamiliar.
            <a href="https://github.com/PanJiaChen/vue-split-pane" target="_blank"> Github repository</a> not work on Vue2.
            <a href="https://antoniandre.github.io/splitpanes/" target="_blank">this project base on Splitpanes on Vue3.</a>
        </aside>
        <splitpanes class="default-theme">
            <pane min-size="20" class="item1">1<br /><em class="specs">I have a min width of 20%</em></pane>
            <pane class="item2">
                <splitpanes class="default-theme" horizontal="horizontal">
                    <pane min-size="15">2<br /><em class="specs">I have a min height of 15%</em></pane>
                    <pane class="item3">3</pane>
                    <pane>4</pane>
                </splitpanes>
            </pane>
            <pane class="item3">5</pane>
        </splitpanes>
    </div>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
 
</script>

<style  scoped lang="scss">
.components-container {
    position: relative;
    height: calc(100vh - 144px); // 在 index中有一个 margin：30px 50px
    // fixed 超出边界
    display: flex;
    flex-direction: column;

    .splitpanes.default-theme .item1 {
        background-color: #F38181;
    }

    .splitpanes.default-theme .item2 {
        background-color: #FCE38A;
    }

    .splitpanes.default-theme .item3 {
        background-color: #95E1D3;
    }

    .splitpanes.default-theme .item5 {
        background-color: #14d114;
    }
}

.splitpanes__pane {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica, Arial, sans-serif;
    /* color: rgba(255, 255, 255, 0.6); */
    color: red;
    font-size: 2em;
}



.splitpanes__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
}

em.specs {
    font-size: 0.2em;
    line-height: 1;
    position: absolute;
    color: #bbb;
    bottom: 0.5em;
    left: 0;
    right: 0;
    text-align: center;
}
</style>
