<template>
	<div v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-immediate-check	="false"
  infinite-scroll-distance="500">
		<swiper :infomation="[]" @event='swiperId'></swiper>
		<div  class="main">

			<ul class="tab">
	            <li :class="val=='onShelfTime'?'on':''" >
	            	<a @click="handlclick('onShelfTime')">上新</a>
	            </li>
	            <li :class="val=='sales'?'on':''" >
	            	<a  @click="handlclick('sales')">销量</a>
	            </li>
	            <li :class="val=='price'?'on':''" >
		            <a @click="handlclick('price')">
		            	<span>价格</span>
		            	<span class="iconRotate">
		            		<img src="/static/img/rectangleUp.png" class="rectangleUp">
		            		<img src="/static/img/rectangleDown.png" class="rectangleDown">
		            	</span>
		            </a>
	            </li>

            </ul>

            <listPage :info="info"></listPage>
		</div>
		<backTop></backTop>
	</div>
</template>

<script>
import axios from "axios";
import swiper from './common/swiper';
import 'swiper/dist/css/swiper.min.css';
import listPage from './categoryComponent/listPage';
import backTop from './common/backTop';
import { InfiniteScroll } from 'mint-ui';
import Vue from "vue";
Vue.use(InfiniteScroll);
export default {
	data(){
		return{
			headerTitle:null,
			categoryId:20,
			pageNumber:1,
			info:null,
			val:"onShelfTime",
			//当前获取的是第几页数据
			current:1,
			loading:false,
		}
	},
	mounted(){
		this.categoryId=this.$route.params.id.split('=')[1]
		//引进infomation.json
		var infomation=require("../assets/json/infomation").result;
		//遍历得到此时头部的信息
		for(var key in infomation){
			if(this.categoryId==infomation[key].category){
				this.headerTitle=key;
			}
		}
		
		
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:true,setName:this.headerTitle})
		this.$store.commit("footIshow",true)
		this.$store.commit("isText",false)
		this.$store.commit("isImg","/static/img/category.png")
		this.categoryId=this.$route.params.id.split('=')[1]
		axios.get("pages/category/"+this.categoryId+"?pageNumber=1&orderBy="+this.val).then(res=>{
			this.info=res.data.data.products;

		})
	},
	methods:{
		handlclick(val){
			this.val=val
			axios.get("pages/category/"+this.categoryId+"?pageNumber=1&orderBy="+this.val).then(res=>{
			this.info=res.data.data.products;
			this.current=1;


			})
		},
		loadMore(){
			this.current++;
			this.loading = true;
			axios.get("pages/category/"+this.categoryId+"?pageNumber="+this.current+"&orderBy="+this.val).then(res=>{
				if(res.data.data.products.length>0){
					var a=[...this.info,...res.data.data.products]
					this.info=a
					this.loading = false;
				}else{
					this.loading = true;
					this.current = 1
				}
				
			})
		},
		swiperId(id){
			this.categoryId=id;
			//子组件传过来的id，改变后重新请求列表页数据
			axios.get("pages/category/"+this.categoryId+"?pageNumber=1&orderBy="+this.val).then(res=>{
				this.info=res.data.data.products;
				this.current=1
				this.loading = false

			})
		}
	},
	components:{
		listPage,
		backTop,
		swiper
	},
	computed:{
		datalist:function(){
			//listpage的数据依赖this.info
			return this.info
		}
	}

}

</script>

<style scoped lang="scss">
	.category-swiper{
		//background: url('../assets/c39323a4_1125x330.jpg');
		background-color: pink;
		height: 1.6rem;
		padding: 0.3rem 0;
	}
	.main{
		.tab{
			height:0.8rem;
			line-height: 0.8rem;
			background: #fff;
			border-bottom: 1px solid #f5f5f5;
			overflow: hidden;
			display: flex;
			li{
				float: left;
				color:#808080;
				margin: 0rem 0.75rem;
				font-size: 0.26rem;
				width: 1rem;
				text-align: center;
				flex:1;
				position: relative;
				a{
					color:#808080;
				}
			}
			.on{
				border-bottom: 0.06rem solid #202020;
				color: #000;
				height: 0.8rem;
				box-sizing: border-box;
				a{
					display: block;
					color:#000;
					position: relative;
				}
			}
		}
	}
	.iconRotate{
		font-size: 0;
	    text-align: center;
	    width: 0.16rem;
	    height: 0.4rem;
	    right: -0.26rem;
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    .rectangleDown,.rectangleUp{
	    	width: 0.16rem;
		    height: 0.1rem;
		    display: block;
		    opacity: 0.6;
	    }
	    .rectangleUp{
    	    margin-top: 0.09rem;
    		margin-bottom: 0.02rem;
	    }
	}
	.backTop{
		position: fixed;
		right:0.5rem;
		bottom: 1.5rem;
		width: 0.7rem;
		height:0.7rem;
		img{
			width: 0.7rem;
			height: 0.7rem;
		}
	}
</style>
