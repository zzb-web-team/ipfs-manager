<template>
	<div class="myownStyle">
		<el-row class="container">
			<el-col :span="24" class="header">
				<el-col
					:span="10"
					class="logo"
					:class="collapsed ? 'logo-collapse-width' : 'logo-width'"
				>
					<div style="fontSize:20px;color:#000">IPFS节点后台管理</div>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="hover">
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
				<aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
					<el-menu
						:default-active="$route.path"
						class="el-menu-vertical-demo"
						@open="handleopen"
						@close="handleclose"
						@select="handleselect"
						unique-opened
						router
					>
						<!-- 一级菜单 -->

						<template v-for="item in menlist">
							<el-submenu
								v-if="
									item.children && item.children.length != 0
								"
								:index="item.path"
								:key="item.path"
								style="text-align: left;"
								v-show="item.name != '设备监控'&&item.name != 'IPFS程序管理'"
							>
								<template slot="title">
									<i
										:class="item.icon"
										style="margin-right: 10px;margin-left: 10px;"
									></i>
									<span>{{ item.name }}</span>
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
									>
										<template slot="title">
											<i :class="itemChild.icon"></i>
											<span>{{ itemChild.name }}</span>
										</template>

										<!-- 三级菜单 -->
										<el-menu-item
											v-for="itemChild_Child in itemChild.children"
											:index="itemChild_Child.path"
											:key="itemChild_Child.path"
											v-show="itemChild_Child.hidden != 1"
										>
											<i
												:class="itemChild_Child.icon"
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
											itemChild.name != '个人中心' &&
												itemChild.name != '节点详情'
										"
									>
										<i :class="itemChild.icon"></i>
										<span slot="title">{{
											itemChild.name
										}}</span>
									</el-menu-item>
								</template>
							</el-submenu>

							<el-menu-item
								v-else
								:index="item.path"
								:key="item.path"
							>
								<i :class="item.icon"></i>
								<span slot="title">{{ item.name }}</span>
							</el-menu-item>
						</template>
					</el-menu>
					<!--导航菜单-->
					<!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed" >
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf" v-bind:key="index">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" v-bind:key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
          </el-menu>-->
				</aside>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<!-- <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
            </el-col>-->
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
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
		};
	},
	methods: {
		onSubmit() {},
		handleopen() {},
		handleclose() {},
		handleselect: function(a, b) {},
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
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0;
	right: 0;
	width: 100%;
	margin: 0 auto;
	.header {
		height: 60px;
		line-height: 60px;
		//	background: $color-primary;
		color: #000;
		background: #64a7fc;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: #eef1924d;
			border-right-width: 1px;
			border-right-style: solid;
			background: #ffffff;
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
			width: 230px;
		}
		.logo-collapse-width {
			width: 60px;
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
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex: 0 0 230px;
			width: 230px;
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
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 230px;
			width: 230px;
			//margin-top: -60px;
		}
		.content-container {
			// background: #f1f2f7;
			flex: 1;
			// position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: scroll;
			padding: 20px;
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
			.content-wrapper {
				// background-color: #272731;
				box-sizing: border-box;
				// color: #ffffff;
			}
		}
	}
}

/deep/el-submenu {
	text-align: center;
}
</style>
