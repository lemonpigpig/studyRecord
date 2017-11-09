# verticalscroller 实现四路
## 页面布局
外面盒子采用relative
里面包裹itemlist的盒子采用absolute定位，避免了了要计算第几个元素需要translateY的距离，每一个只要判断是进入translateY(0)，还是离开translateY(100%),利用animation。
## 利用vue控制轮播，通过class
因为里面内容的盒子采用的absolute定位，所以比其他方案容易太多了，到了最后一张时，不需要让最后一张移动到第一张。只需要重置currentIndex的值为0就ok了



