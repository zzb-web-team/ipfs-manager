<template>
	<div class="myownStyle">
		<el-row class="container">
			<el-col :span="24" class="header">
				<el-col
					:span="10"
					class="logo"
					:class="isCollapse ? 'logo-collapse-width' : 'logo-width'"
				>
					<div
						@click="show_menu"
						style="display: flex;justify-content: space-between;align-items: center;"
					>
						<span
							v-show="!isCollapse"
							style="fontSize:16px;color:#ffffff;font-weight: 400;display: inline-block;width: 100%;"
							>IPFS节点后台</span
						>
						<i
							class="el-icon-s-unfold"
							v-show="!isCollapse"
							style="font-size:18px;"
						></i>
						<i
							class="el-icon-s-fold"
							v-show="isCollapse"
							style="font-size:18px;line-height: 64px;"
						></i>
					</div>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="click" size="medium">
						<span class="el-dropdown-link userinfo-inner">
							<img src="../assets/download.jpg" />
							{{ sysUserName }}
						</span>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item
								divided
								@click.native="go_personal_center"
								>个人中心</el-dropdown-item
							> -->
							<!-- <el-dropdown-item>设置</el-dropdown-item> -->
							<el-dropdown-item divided @click.native="logout"
								>退出登录</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="main">
				<el-row
					:class="isCollapse ? 'menu-collapsed' : 'menu-expanded'"
				>
					<el-menu
						:default-active="activeIndex"
						class="el-menu-vertical-demo"
						@open="handleopen"
						@close="handleclose"
						@select="handleselect"
						unique-opened
						router
						:collapse="isCollapse"
						:show-timeout="50"
						:hide-timeout="50"
						:collapse-transition="false"
					>
						<!-- 一级菜单 -->
						<template v-for="item in menlist">
							<!-- 分组名称 -->
							<!-- <el-menu-item-group>
								<span slot="title"
									>分组名称</span
								></el-menu-item-group
							> -->
							<el-submenu
								v-if="
									item.children && item.children.length != 0
								"
								:index="item.path"
								:key="item.id"
								style="text-align: left;"
								v-show="item.hidden != 1"
							>
								<template slot="title">
									<i
										:class="item.icon"
										style="font-size: 18px;"
									></i>
									<span style="margin-left:10px;">{{
										item.name
									}}</span>
								</template>

								<!-- 二级菜单 -->
								<template v-for="itemChild in item.children">
									<el-submenu
										v-if="
											itemChild.children &&
												itemChild.children.length > 0
										"
										:index="itemChild.path"
										:key="itemChild.path"
										class="two_menu_tit"
									>
										<template slot="title">
											<i
												:class="itemChild.icon"
												style="font-size: 18px;padding-left: 18%;"
											></i>
											<span>{{ itemChild.name }}</span>
										</template>
										<!-- 三级菜单 -->
										<el-menu-item
											v-for="itemChild_Child in itemChild.children"
											:index="itemChild_Child.path"
											:key="itemChild_Child.path"
											v-show="itemChild_Child.hidden != 1"
											class="there_menu"
										>
											<i
												:class="itemChild_Child.icon"
												style="font-size: 18px;"
											></i>
											<span slot="title">{{
												itemChild_Child.name
											}}</span>
										</el-menu-item>
									</el-submenu>
									<el-menu-item
										v-else
										:index="itemChild.path"
										:key="itemChild.path"
										v-show="
											itemChild.name != '节点详情' &&
												itemChild.name != '调整收益参数'
										"
										class="two_menu"
									>
										<i
											:class="itemChild.icon"
											style="font-size: 18px;padding-left: 19%;"
										></i>
										<span>{{ itemChild.name }}</span>
									</el-menu-item>
								</template>
							</el-submenu>
							<el-menu-item
								v-else
								:index="item.path"
								:key="item.path"
								class="one_menu"
							>
								<i
									:class="item.icon"
									style="font-size: 18px;"
								></i>
								<span slot="title" style="margin-left:10px;">{{
									item.name
								}}</span>
							</el-menu-item>
						</template>
					</el-menu>
				</el-row>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view :style="con_h"></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sysName: 'IPFS后台管理',
			collapsed: false,
			sysUserName: '',
			sysUserAvatar: '',
			isCollapse: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
			},
			menlist: [],
			con_h: {
				minHeight: '',
			},
		};
	},
	computed: {
		activeIndex () {
			if(this.$route.path){
				if(this.$route.path === '/ipfs_location_details'){
					return this.$route.query.address;
				}else{
					return this.$route.path;
				}
			}
			
		}
	},
	methods: {
		onSubmit() {},
		handleopen() {},
		handleclose() {},
		handleselect: function(a, b) {},
		show_menu() {
			this.isCollapse = !this.isCollapse;
		},
		//退出登录
		logout: function() {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning',
			})
				.then(() => {
					sessionStorage.removeItem('ipfs_user');
					sessionStorage.removeItem('ipfs_id');
					// sessionStorage.removeItem('menus');
					localStorage.removeItem('menus');
					localStorage.removeItem('user_information');
					_this.$cookies.remove('ipfs_user');
					_this.$cookies.remove('ipfs_id');
					_this.$cookies.remove('ipfs_path');
					_this.$router.push('/');
				})
				.catch(() => {});
		},
		go_personal_center() {
			this.$router.push({ path: '/personal_center' });
		},
		//折叠导航栏
		collapse: function() {
			this.collapsed = !this.collapsed;
		},
		// showMenu(i, status) {
		//   this.$refs.menuCollapsed.getElementsByClassName(
		//     "submenu-hook-" + i
		//   )[0].style.display = status ? "block" : "none";
		// }
	},
	// created() {
	// 	console.log(JSON.parse(sessionStorage.getItem('menus')));
	// 	this.menlist = JSON.parse(sessionStorage.getItem('menus'));
	// 	console.log(this.menlist);
	// },
	mounted() {
		let con_h =
			document.getElementsByClassName('el-menu')[0].offsetHeight -
			20 +
			'px' +
			' ' +
			'!important';
		this.con_h.minHeight = con_h;
		this.$nextTick(function() {
			this.menlist = JSON.parse(localStorage.getItem('menus'));
		});
		var user = this.$cookies.get('ipfs_user');
		if (user) {
			// user = JSON.parse(user);
			this.sysUserName = user || '';
		}
		if (!this.$cookies.get('ipfs_id')) {
			this.$router.push({
				path: '/',
			});
		}
	},
};
</script>

<style scoped lang="scss">
// @import "../assets/css/style/newstyle";
.myownStyle {
	width: 100%;
	height: 100%;
}
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0;
	right: 0;
	width: 100%;
	margin: 0 auto;
	.header {
		box-shadow: 0px 4px 10px 0px #3333331a;
		height: 54px;
		line-height: 54px;
		color: #000;
		background: #4285f4;
		.userinfo {
			text-align: right;
			padding-right: 75px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 36px;
					height: 36px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 54px;
			font-size: 18px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: #eef1924d;
			border-right-width: 1px;
			border-right-style: solid;
			// background: #ffffff;
			background: #4285f4;
			color: #ffffff;
			img {
				width: auto;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			min-width: 200px;
			max-width: 324px;
			width: 17%;
		}
		.logo-collapse-width {
			width: 63px;
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex;
		// background: #324057;
		position: absolute;
		top: 54px;
		bottom: 0px;
		// overflow: hidden;
		aside {
			flex: 0 0 324px;
			width: 324px;
			// position: absolute;
			// top: 0px;
			// bottom: 0px;
			.el-menu {
				height: 100%;
				text-align: center;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}
		
		.menu-expanded {
			background-color: #fff;
			border: none;
			// flex: 0 0 324px;
			min-width: 200px;
			max-width: 324px;
			width: 17%;
			.el-submenu__title {
				i {
					padding-left: 16%;
				}
			}
			// .el-menu .two_menu {
			// 	padding-left: 70px !important;
			// }
			// .el-menu .there_menu {
			// 	padding-left: 100px !important;
			// }
		}
		.content-container {
			// background: #f1f2f7;
			flex: 1;
			// position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			// margin-top: 10px;
			margin-left: 0px;
			overflow-y: scroll;
			overflow-x: scroll;
			padding: 0px;
			overflow: hidden;
			.breadcrumb-container {
				//margin-bottom: 15px;
				float: none !important;
				.title {
					width: 200px;
					float: left;
					color: #ffffff;
					text-align: left;
					font-size: 22px;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.grid-content {
				height: 100%;
			}
			.content-wrapper {
				// background-color: #272731;
				// box-sizing: border-box;
				// color: #ffffff;
				height: 100%;
				margin: auto;
			}
		}
	}
}

/deep/el-submenu {
	text-align: center;
}
.el-menu-item.is-active {
	box-shadow: 0px 6px 10px 6px transparentize(#4285f4, 0.7);
	color: #ffffff;
	background-color: #4285f4;
	border-radius: 12px;
	margin-left: 20px;
	margin-right: 20px;
	margin-bottom: 10px;
	margin-top: 10px;
}
.el-menu-item.one_menu{
	padding-left: 65px !important;
	text-align: left;
}

.el-menu-item.one_menu.is-active{
	padding-left: 45px !important;
	text-align: left;
}
// .el-menu-item.two_menu_tit{
// 	text-align: left;
// 	padding-left: 105px !important;
// }

// .el-menu-item.two_menu_tit.is-active{
// 	text-align: left;
// 	padding-left: 85px !important;
// }
.el-menu-item.two_menu{
	padding-left: 44px !important;
	text-align: left;
}
.el-menu-item.two_menu.is-active{
	padding-left: 24px !important;
	text-align: left;
}
.el-menu-item.there_menu{
	padding-left: 107px !important;
}

.el-menu-item.there_menu.is-active{
	padding-left: 87px !important;
}

.el-submenu__title:hover {
	border-radius: 12px;
	margin: 0 10px;
}
.el-icon-arrow-down:before {
	content: '\25B2';
}
.el-submenu__title {
	box-sizing: border-box;
	padding: 0 12px;
}
.el-aside {
	box-shadow: 2px 0 6px 0 #00000024;
}
</style>
