<template lang="html">
	<div id="load" :data="datalist" :disable="dkmaosj">
		<!--存放百度地图容器-->
		<div id="container"></div>
	</div>
</template>

<script>
import router from '../router';
export default {
	name: 'thermalmap',
	data() {
		return {
			urlyuny: require('../assets/img/map_yun_y.png'),
			urlyunn: require('../assets/img/map_yun_n.png'),
			urlxiy: require('../assets/img/map_xiyou_y.png'),
            urlxin: require('../assets/img/map_xiyou_n.png'),
            urlyunq: require('../assets/img/map_yun_q.png'),
			urlyunj: require('../assets/img/map_yun_j.png'),
			urlxiq: require('../assets/img/map_xiyou_q.png'),
			urlxij: require('../assets/img/map_xiyou_j.png'),
			dkmaosj: true,
			// 热力图的点数据，lng：点的经度 点的lat纬度 count：点的热力程度
			points: [
				// { lng: 114.322545, lat: 30.559567, count: 100 },
				// { lng: 116.423332, lat: 39.916532, count: 51 },
				// { lng: 116.419787, lat: 39.930658, count: 15 },
				// { lng: 116.418455, lat: 39.920921, count: 40 },
				// { lng: 116.418843, lat: 39.915516, count: 100 },
				// { lng: 116.42546, lat: 39.918503, count: 6 },
				// { lng: 116.423289, lat: 39.919989, count: 18 },
				// { lng: 116.418162, lat: 39.915051, count: 80 },
				// { lng: 116.422039, lat: 39.91782, count: 11 },
				// { lng: 116.41387, lat: 39.917253, count: 7 },
				// { lng: 116.41773, lat: 39.919426, count: 42 },
				// { lng: 116.421107, lat: 39.916445, count: 4 },
				// { lng: 116.417521, lat: 39.917943, count: 27 },
				// { lng: 116.419812, lat: 39.920836, count: 23 },
				// { lng: 116.420682, lat: 39.91463, count: 60 },
				// { lng: 116.415424, lat: 39.924675, count: 8 },
				// { lng: 116.419242, lat: 39.914509, count: 15 },
				// { lng: 116.422766, lat: 39.921408, count: 25 },
				// { lng: 116.421674, lat: 39.924396, count: 21 },
				// { lng: 116.427268, lat: 39.92267, count: 1 },
				// { lng: 116.417721, lat: 39.920034, count: 51 },
				// { lng: 116.412456, lat: 39.92667, count: 7 },
				// { lng: 116.420432, lat: 39.919114, count: 11 },
				// { lng: 116.425013, lat: 39.921611, count: 35 },
				// { lng: 116.418733, lat: 39.931037, count: 22 },
				// { lng: 116.419336, lat: 39.931134, count: 4 },
				// { lng: 116.413557, lat: 39.923254, count: 5 },
				// { lng: 116.418367, lat: 39.92943, count: 3 },
				// { lng: 116.424312, lat: 39.919621, count: 100 },
				// { lng: 116.423874, lat: 39.919447, count: 87 },
				// { lng: 116.424225, lat: 39.923091, count: 32 },
				// { lng: 116.417801, lat: 39.921854, count: 44 },
				// { lng: 116.417129, lat: 39.928227, count: 21 },
				// { lng: 116.426426, lat: 39.922286, count: 80 },
				// { lng: 116.421597, lat: 39.91948, count: 32 },
				// { lng: 116.423895, lat: 39.920787, count: 26 },
				// { lng: 116.423563, lat: 39.921197, count: 17 },
				// { lng: 116.417982, lat: 39.922547, count: 17 },
				// { lng: 116.426126, lat: 39.921938, count: 25 },
				// { lng: 116.42326, lat: 39.915782, count: 100 },
				// { lng: 116.419239, lat: 39.916759, count: 39 },
				// { lng: 116.417185, lat: 39.929123, count: 11 },
				// { lng: 116.417237, lat: 39.927518, count: 9 },
				// { lng: 116.417784, lat: 39.915754, count: 47 },
				// { lng: 116.420193, lat: 39.917061, count: 52 },
				// { lng: 116.422735, lat: 39.915619, count: 100 },
				// { lng: 116.418495, lat: 39.915958, count: 46 },
				// { lng: 116.416292, lat: 39.931166, count: 9 },
				// { lng: 116.419916, lat: 39.924055, count: 8 },
				// { lng: 116.42189, lat: 39.921308, count: 11 },
				// { lng: 116.413765, lat: 39.929376, count: 3 },
				// { lng: 116.418232, lat: 39.920348, count: 50 },
				// { lng: 116.417554, lat: 39.930511, count: 15 },
				// { lng: 116.418568, lat: 39.918161, count: 23 },
				// { lng: 116.413461, lat: 39.926306, count: 3 },
				// { lng: 116.42232, lat: 39.92161, count: 13 },
				// { lng: 116.4174, lat: 39.928616, count: 6 },
				// { lng: 116.424679, lat: 39.915499, count: 21 },
				// { lng: 116.42171, lat: 39.915738, count: 29 },
				// { lng: 116.417836, lat: 39.916998, count: 99 },
				// { lng: 116.420755, lat: 39.928001, count: 10 },
				// { lng: 116.414077, lat: 39.930655, count: 14 },
				// { lng: 116.426092, lat: 39.922995, count: 16 },
				// { lng: 116.41535, lat: 39.931054, count: 15 },
				// { lng: 116.413022, lat: 39.921895, count: 13 },
				// { lng: 116.415551, lat: 39.913373, count: 17 },
				// { lng: 116.421191, lat: 39.926572, count: 1 },
				// { lng: 116.419612, lat: 39.917119, count: 9 },
				// { lng: 116.418237, lat: 39.921337, count: 54 },
				// { lng: 116.423776, lat: 39.921919, count: 26 },
				// { lng: 116.417694, lat: 39.92536, count: 17 },
				// { lng: 116.415377, lat: 39.914137, count: 19 },
				// { lng: 116.417434, lat: 39.914394, count: 43 },
				// { lng: 116.42588, lat: 39.922622, count: 27 },
				// { lng: 116.418345, lat: 39.919467, count: 8 },
				// { lng: 116.426883, lat: 39.917171, count: 3 },
				// { lng: 116.423877, lat: 39.916659, count: 34 },
				// { lng: 116.415712, lat: 39.915613, count: 14 },
				// { lng: 116.419869, lat: 39.931416, count: 12 },
				// { lng: 116.416956, lat: 39.925377, count: 11 },
				// { lng: 116.42066, lat: 39.925017, count: 38 },
				// { lng: 116.416244, lat: 39.920215, count: 91 },
				// { lng: 116.41929, lat: 39.915908, count: 54 },
				// { lng: 116.422116, lat: 39.919658, count: 21 },
				// { lng: 116.4183, lat: 39.925015, count: 15 },
				// { lng: 116.421969, lat: 39.913527, count: 3 },
				// { lng: 116.422936, lat: 39.921854, count: 24 },
				// { lng: 116.41905, lat: 39.929217, count: 12 },
				// { lng: 116.424579, lat: 39.914987, count: 57 },
				// { lng: 116.42076, lat: 39.915251, count: 70 },
				// { lng: 116.425867, lat: 39.918989, count: 8 },
			],
			city: {
				// 山东: ["117.000923", "36.675807"],
				// 河北: ["115.48333", "38.03333"],
				// 吉林: ["125.35", "43.88333"],
				// 黑龙江: ["127.63333", "47.75"],
				// 辽宁: ["123.38333", "41.8"],
				// 内蒙古: ["111.670801", "41.818311"],
				// 新疆: ["87.68333", "43.76667"],
				// 甘肃: ["103.73333", "36.03333"],
				// 宁夏: ["106.26667", "37.46667"],
				// 山西: ["112.53333", "37.86667"],
				// 陕西: ["108.95", "34.26667"],
				// 河南: ["113.65", "34.76667"],
				// 安徽: ["117.283042", "31.86119"],
				// 江苏: ["119.78333", "32.05"],
				// 浙江: ["120.2", "30.26667"],
				// 福建: ["118.3", "26.08333"],
				// 广东: ["113.23333", "23.16667"],
				// 江西: ["115.9", "28.68333"],
				// 海南: ["110.35", "20.01667"],
				// 广西: ["108.320004", "22.82402"],
				// 贵州: ["106.71667", "26.56667"],
				// 湖南: ["113.0", "28.21667"],
				// 湖北: ["114.298572", "30.584355"],
				// 四川: ["104.06667", "30.66667"],
				// 云南: ["102.73333", "25.05"],
				// 西藏: ["91.0", "30.6"],
				// 青海: ["96.75", "36.56667"],
				// 天津: ["117.2", "39.13333"],
				// 上海: ["121.55333", "31.2"],
				// 重庆: ["106.45", "29.56667"],
				// 北京: ["116.41667", "39.91667"],
				// 台湾: ["121.3", "25.03"],
				// 香港: ["114.1", "22.2"],
				// 澳门: ["113.5", "22.2"],
				辽宁: ['123.429092', '41.796768'],
				吉林: ['125.324501', '43.886841'],
				黑龙江: ['126.642464', '45.756966'],
				北京: ['116.405289', '39.904987'],
				天津: ['117.190186', '39.125595'],
				内蒙古: ['111.751990', '40.841490'],
				宁夏: ['106.232480', '38.486440'],
				山西: ['112.549248', '37.857014'],
				河北: ['114.502464', '38.045475'],
				山东: ['117.000923', '36.675808'],
				河南: ['113.665413', '34.757977'],
				陕西: ['108.948021', '34.263161'],
				湖北: ['114.298569', '30.584354'],
				江苏: ['118.76741', '32.041546'],
				安徽: ['117.283043', '31.861191'],
				上海: ['121.472641', '31.231707'],
				湖南: ['112.982277', '28.19409'],
				江西: ['115.892151', '28.676493'],
				浙江: ['120.15358', '30.287458'],
				福建: ['119.306236', '26.075302'],
				广东: ['113.28064', '23.125177'],
				台湾: ['121.5200760', '25.0307240'],
				海南: ['110.199890', '20.044220'],
				广西: ['108.320007', '22.82402'],
				重庆: ['106.504959', '29.533155'],
				云南: ['102.71225', '25.040609'],
				贵州: ['106.713478', '26.578342'],
				四川: ['104.065735', '30.659462'],
				甘肃: ['103.834170', '36.061380'],
				青海: ['101.777820', '36.617290'],
				西藏: ['91.11450', '29.644150'],
				新疆: ['87.616880', '43.826630'],
				香港: ['114.165460', '22.275340'],
				澳门: ['113.549130', '22.198750'],
			},
			map: '', // 保存地图实例
			centerLng: '', // 经度
			centerLat: '', // 纬度
			heatmapOverlay: {}, // 热力图覆盖物
			citylatlan: '',
		};
	},
	props: {
		datalist: {
			type: Array,
			default: () => {},
		},
		citys: {
			type: String,
			default: () => {},
		},
	},
	watch: {
		datalist: {
			deep: true,
			handler(nv, ov) {
				this.datalist = nv;
				this.points = this.datalist;
				this.initMap();
			},
		},
		citys: {
			deep: true,
			handler(nv, ov) {
				this.citys = nv;
				if (this.citys) {
					this.centerLng = this.city[this.citys][0]; // 经度
					this.centerLat = this.city[this.citys][1]; // 纬度
				} else {
					this.centerLng = '116.418261';
					this.centerLat = '39.921984';
				}
				this.initMap();
			},
		},
	},
	methods: {
		// 创建和初始化地图函数
		initMap() {
			this.createMap(); // 创建地图
			//this.initHeatMap(); // 添加热力图覆盖物
		},
		// 方法 - 创建地图
		createMap() {
            var _this=this;
			// 在百度地图容器中创建地图实例
			let map = new BMap.Map('container',{enableMapClick:false});
			// 将map变量存储在全局
			this.map = map;
			// 设定地图的中心点和坐标
			let point = new BMap.Point(this.centerLng, this.centerLat);
			// 设置中心点坐标和地图级别
			this.map.centerAndZoom(point, 15);

			// 允许滚轮缩放
			this.map.enableScrollWheelZoom(point, 15);
			// 添加左上角缩放比例尺(offset: new BMap.Size(0, 0)为比例尺的坐标位置)
			var opts = { offset: new BMap.Size(50, 50) };
			this.map.addControl(new BMap.NavigationControl(opts));
			// 设置地图默认缩放比例
			this.map.setZoom(8);
			var pointArray = new Array();
			for (var i = 0; i < this.points.length; i++) {
				// console.log(this.points[i]);
				// var marker = new BMap.Marker(
				// 	new BMap.Point(this.points[i].lng, this.points[i].lat)
				// ); // 创建点
				// this.map.addOverlay(marker); //增加点
				// pointArray[i] = new BMap.Point(
				// 	this.points[i].lng,
				// 	this.points[i].lat
				// );
				// marker.addEventListener('click', attribute);
				var pt = new BMap.Point(this.points[i].lng, this.points[i].lat);
				var myIcon = new BMap.Icon(
					this.urlyunq,
					new BMap.Size(56, 56)
				);
				var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
				this.map.addOverlay(marker2);
				marker2.addEventListener('click', attribute);
			}
			//让所有点在视野范围内
			this.map.setViewport(pointArray);
			//获取覆盖物位置
			function attribute(e) {
                var p = e.target;
            //     _this.$router.push({
			// 	path: '/ipfs_location_details', 
			// 	// query: {
			// 	// 	node_city: this.citys,
			// 	// 	node_num: this.rotate,
			// 	// 	address: '/ipfs_central_location',
			// 	// },
			// });
				console.log(
					'marker的位置是' +
						p.getPosition().lng +
						',' +
						p.getPosition().lat
				);
            };
            //  this.map.setMapStyle({
            //         styleJson:[
            //           {
            //                     "featureType": "road",
            //                     "elementType": "all",
            //                     "stylers": {
            //                               "color": "#ffffff",
            //                               "visibility": "off"
            //                     }
            //           },
            //           {
            //                   "featureType": "building",
            //                   "elementType": "all",
            //                   "stylers": {
            //                             "visibility": "off"
            //                   }
            //           },
            //           {
            //                   "featureType": "poilabel",
            //                   "elementType": "all",
            //                   "stylers": {
            //                             "visibility": "off"
            //                   }
            //           },
            //           {
            //             //   建筑物名称
            //                   "featureType": "manmade",
            //                   "elementType": "all",
            //                   "stylers": {
            //                             "visibility": "off"
            //                   }
            //           },
            //     ]
            // });
		},
		// 方法 - 添加热力图覆盖物
		initHeatMap() {
			// var pt = new BMap.Point(116.417, 39.909);
			// var myIcon = new BMap.Icon(this.urlyuny, new BMap.Size(300, 157));
			// var marker2 = new BMap.Marker(pt, { icon: myIcon });
			// this.map.addOverlay(marker2);

			this.heatmapOverlay = new BMapLib.HeatmapOverlay({
				// 热力图的每个点的半径大小
				radius: BMAP_POINT_SIZE_SMALL * 4,
				// 热力的透明度0~1
				opacity: 0.8,
				// 其中 key 表示插值的位置0~1，value 为颜色值
				gradient: {
					0: 'rgb(102, 255, 0)',
					0.5: 'rgb(255, 170, 0)',
					1: 'rgb(255, 0, 0)',
				},
			});
			// 清除图层(每次重新调用需要清除上一个覆盖物图层)
			this.map.clearOverlays();
			// 添加热力覆盖物
			this.map.addOverlay(this.heatmapOverlay);
			this.heatmapOverlay.setDataSet({ data: this.points, max: 100 });
			// 显示热力图，隐藏为this.heatmapOverlay.hide();
			this.heatmapOverlay.show();
			//this.map.disableDragging(); //禁止拖拽
			this.map.disableScrollWheelZoom(); //禁止缩放
		},
	},
	mounted() {
		if (this.citys) {
			this.centerLng = this.city[this.citys][0]; // 经度
			this.centerLat = this.city[this.citys][1]; // 纬度
		} else {
			this.centerLng = '116.418261';
			this.centerLat = '39.921984';
		}
		this.points = this.datalist;
		// console.log(this.points);
		// console.log(this.citys);
		// 创建和初始化地图函数
		this.initMap();
	},
};
</script>

<style lang="scss">
#load {
	width: 100%;
	height: 800px;
}
#container {
	width: 100%;
	height: 100%;
	border: #ccc solid 1px;
}
.BMap_cpyCtrl,.anchorBL{
    display: none;
}
</style>
