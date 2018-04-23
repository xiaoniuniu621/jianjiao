<template>
	<div id="search"  class="productGroup" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="500" infinite-scroll-immediate-check="false">
		<header class="header">
			<div id="searchInfor">	
				<img src="../assets/img-w/searchIcon.png" id="searchIcon">
				<input type="search" name="searchInput" id="searchInput" placeholder="搜索我的尖叫好物" @focus="toSearch">
			</div>
			<a href="#/" class="header-right">
        		<img src="../assets/img-w/login-home.png">
    		</a>
		</header>
		<p id="prompt" v-if="promptShow">这个真没有,看看我们为您推荐的商品吧</p>
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

        <div class="content">
        	<div class='list' v-for="key in searchArr" :key="key.productId">
        		<a>
        			<img :src="key.productImg"  @click="detail(key.productId)">
        			<div class='titleDiv'>
        				<p class='title'>{{key.productTitle}}</p>
        			</div>
        			<span class='sale_price'>￥{{key.sellPrice}}</span>
        			<p class='prizeOrSlogn'>{{key.prizeOrSlogan}}</p>
        		</a>
        	</div>

        	<div class="dropload-down" v-if="searchArr.length?true:false">
        		<div class="dropload-noData">没有更多了</div>
        	</div>
        </div>

        <backTop></backTop>
	</div>
	
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import Vue from "vue"
Vue.use(InfiniteScroll);
import axios from "axios"
import backTop from './common/backTop';

export default{
	data(){
		return{
			val:'onShelfTime',
			searchArr:[],//搜索商品
			arr:[],//未搜索到物品是的推荐列表
			count:1,//滚动加载计数器
			loading:false,//是否无限滚动
			promptShow:false,//未搜索到时的提示信息
		}
	},
	methods:{
		handlclick(name){
			this.val = name
			axios.get(`product/search?keyword=${this.$route.params.id}&sort=${name}&order=desc&currentPage=1`)
			.then(res=>{
				this.searchArr = res.data.data.products;
			})
		},
		loadMore(){	
				 this.count++;
				 this.loading=true;
				 var _this = this;
				 axios.get(`product/search?keyword=${this.$route.params.id}&sort=${this.val}&order=desc&currentPage=${this.count}`)
				 .then(function(res){
				 	if(res.data.data.products.length){
				 		var newarr = res.data.data.products;
				 		 _this.searchArr = [..._this.searchArr,...newarr]
				 		 _this.loading=false;
				 	}else{
				 		_this.count = 1
				 		_this.loading=true;
				 	}
				 })
			},
		toSearch(){
				this.$router.push("/search")
			},
		detail(id){
				this.$router.push(`/details/${id}`)
			}		
	},
	mounted(){
		this.$store.commit("footpath","我")
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:false,setName:"消息"})
		this.$store.commit("footIshow",false)
		axios.get(`product/search?keyword=${this.$route.params.id}&sort=onShelfTime&order=desc&currentPage=1`)
		.then(res=>{
			var arr = res.data.data.products;
			if(arr.length){
				this.promptShow = false;
				this.searchArr = arr;
			}else{
				this.promptShow = true;
				axios.get("recommend/search")
				.then(res=>{
					this.searchArr = res.data.data
				})
			}
		})
	},
	components:{
		backTop
	}
}
</script>

<style scoped lang="scss">
	#search{
	     width: 100%;
		 background: #fff;
		.header{
			background: #fff;
			height: 0.88rem;
			line-height: 0.88rem;
			-webkit-box-sizing: border-box;
			position: relative;
			padding: 0rem 0.2rem 0rem 0.2rem;
			border-bottom: 1px solid #f5f5f5;
			img{
				display:inline-block;
				width:0.52rem;
				margin-top: 0.06rem;
				margin-bottom: 0.06rem;
				vertical-align:middle;
			}
			  #searchInfor{
				display: inline-block;
				position:relative;
				width:5.4rem;
				height:0.56rem;
				line-height: 0.56rem;
				vertical-align: middle;
				background-color:#F5F5F5;
				border-radius:0.3rem;
				margin-left:0.15rem;
				margin-bottom: 0.1rem;
				#searchIcon{
					display:inline-block;
					width:0.4rem;
					vertical-align:middle;
					margin:0 0.1rem;
					position:absolute;
					left:0.1rem;
					top:0.1rem;
					z-index: 1;
				}
				#searchInput{
					background-color:#F5F5F5;
					display: inline-block;
					width:80%;
					height:0.54rem;
					border:none;
					outline: none;
					position:absolute;
					left:0.7rem;
					font-size: 0.2rem;
				}
			}
			.header-right{
				display:inline-block;
				width:0.64rem;
				height:0.64rem;
				line-height: 0.5rem;
				position:absolute;
				right:0.2rem;
				top:50%;
				-webkit-transform:translateY(-50%);
				border-radius:50%;
			}
		}
		#prompt{
			font-size: 0.3rem;
			color: #808080;
			text-align: center;
			line-height: 1.2rem;
			width: 100%;
			background-color: #f5f5f5;
		}
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

			.content{
				display:flex;
			    flex-flow: wrap;
			    padding-bottom: 0.88rem;
				.list{
					float:left;
					width: 49.8%;
					height: 5.6rem;
					padding-bottom: 0.1rem;
					border-bottom: 1px solid #f5f5f5;
					&:nth-child(2n-1){
						border-right: 1px solid #f5f5f5;
					}
					a{
						display: block;
						width: 100%;
						font-size: 0;
						padding-bottom: 0.1rem;
						img{
							display: block;
							height: 3.71rem;
							margin: 0 auto 0;
						}
						.titleDiv{
							box-sizing: border-box;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    position: relative;
						    margin-bottom: 0.05rem;
						    margin-left: 0.3rem;
						    width: 88%;
						    margin-top: 0.5rem;
						    .title{
					    	    color: #808080;
							    font-size: 0.25rem;
							    overflow: hidden;
							    text-overflow: ellipsis;
							    white-space: nowrap;
							    width: 100%;
						    }
						}
						.sale_price{
						    font-size: 0.26rem;
						    color: #000;
						    margin-right: 0.1rem;
						    margin-left: 0.3rem;
						}
						.prizeOrSlogn{
						    color: #808080;
						    font-size: 0.22rem;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    width: 80%;
						    margin-left: 0.3rem;
						}
					}
				}
				.dropload-down{
					height: 50px;
					width: 100%;
					position: relative;
					overflow: hidden;
					font-size: 12px;
					border-bottom: 1px solid #f5f5f5;
					.dropload-noData{
						height: 50px;
						line-height: 50px;
						text-align: center;
					}
				}
			}
	}
</style>