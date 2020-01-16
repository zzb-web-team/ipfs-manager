<template>
  <div class="box">
    <div id="boxMap"></div>
  </div>
</template>


<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this._getMapData();
  },
  methods: {
    _getMapData() {
      let map = new BMap.Map("boxMap"); // 创建Map实例
      let point = new BMap.Point(114.311586, 30.598467);
      map.centerAndZoom(point, 12);
      map.setCurrentCity("武汉"); // 地图显示的城市
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      window.map = map; //将map变量储存在全局
      //****将map变量存储在全局，只有将地图储存在全局，别的方法才能取到
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 800px;
}
#boxMap {
  width: 100%;
  min-height: 800px;
}
</style>