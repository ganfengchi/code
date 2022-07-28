<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
     <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1"   @click="()=>{this.$router.push({path: '/'})}">
          <a-icon type="tool"  />
          <span>demo1</span>
        </a-menu-item>
        <!-- <a-menu-item key="2"  @click="()=>{this.$router.push({path: '/Transaction'})}">
          <a-icon type="credit-card" />
          <span>交易</span>
        </a-menu-item>
         <a-menu-item key="3"  @click="()=>{this.$router.push({path: '/First'})}"> 
          <a-icon type="book" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="4"  @click="()=>{this.$router.push({path: '/Money'})}"> 
          <a-icon type="wallet" />
          <span>理财</span>
        </a-menu-item>
         <a-menu-item key="5"  @click="()=>{this.$router.push({path: '/optional'})}"> 
          <a-icon type="wallet" />
          <span>自选</span>
        </a-menu-item>
         <a-menu-item key="6"  @click="()=>{this.$router.push({path: '/information'})}"> 
          <a-icon type="mail" />
          <span>资讯</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        头部占位
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
   
  },
};
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  height: 100%;
  min-height: 1200px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
