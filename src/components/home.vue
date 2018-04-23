<template>
	<div id="home">
		<!-- 导航栏 -->
		<ul class="Navigation">
			<li @click="homeComponent(index)" v-for="key,index in name" :class="num==index?'active':''">{{key}}</li>
		</ul>
		<components :is="homeName"></components>
		<backTop></backTop>
	</div>
</template>

<script>
	import recommend from "./recommend"
	import furniture from "./furniture"
	import furnishing from "./furnishing"
	import activity from "./activity"
	import Vue from "vue"
	import axios from "axios"
	import { Indicator } from 'mint-ui';
	import backTop from './common/backTop';
	Indicator.open();
	Indicator.open('加载中...');
	setTimeout(function(){
		Indicator.close();
	},2000)
	

	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);


	export default{
		data(){
			return {
				homeName:"recommend",
				name:['推荐','家具','家居','活动'],
				num:0,
			}
		},
		components:{
			recommend,
			furniture,
			furnishing,
			activity,
			backTop
		},
		methods:{
			homeComponent(index){
				var name = ['recommend','furniture','furnishing','activity']
				this.homeName = name[index]
				this.num = index
			}
		},
		mounted(){
			this.$store.commit("footpath","首页")
			this.$store.commit("isShow",true)
			this.$store.commit("headIshow",true)
			this.$store.commit("headHomeShow",false)
			this.$store.commit("footIshow",true)
			this.$store.commit("headIshow",true);//改变头部显示或隐藏变量
		}
	}
</script>

<style scoped lang="scss">
	#home{
		.Navigation{
			width: 100%;
			display: flex;
			justify-content: space-around;
			font-size: 0.28rem;
			color: #808080;
			cursor: pointer;
			li{
				padding:10px 12px;
			}
			.active{
				color: #000;
				border-bottom:3px solid #202020;
			}
		}
		
	}
</style>