<template>
<div v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  :infinite-scroll-distance="500" infinite-scroll-immediate-check="false">
	

	<div class="shop" v-if="shopList.length?true:false">
		<div class="shoplist" v-for="key,index in shopList">
			<div class="xuanzhong">
				<i :class="checkArr[index]?'iconfont icon-choose':'iconfont icon-weixuanzhong'" @click="checkChange(index)"></i>
				<ul>
					<li class="changenum" @click="jian(index)">-</li>
					<li class="num">{{shopnum[index]}}</li>
					<li @click="add(index)">+</li>
				</ul>
			</div>
			<div class="detailed">
				<div class="proImg">
					<img :src="key.img" @click="toDetail(key.productId)">
				</div>
				<ul>
					<li>{{key.title}}</li>
					<li></li>
					<li></li>
					<li>
						<p>￥{{key.price}}</p>
						<span>x{{shopnum[index]}}</span>
					</li>
				</ul>
			</div>
		</div>		
	</div>
	<!--无商品时显示栏-->
	<div class="shoppingCartContent" v-if="shoppingCartContent">
		<p class="shoppingCartEmpty">您的购物车还是空的</p>
		<a href="javaScript:;" class="gotoIndex">看看收藏</a>
		<a href="#/" class="gotoIndex">去逛逛</a>
	</div>
	<!-- 推荐列表-->
	<div class="tuijian" v-if="arr.length?true:false">
		<p>-为你推荐-</p>
		<ul>
			<li v-for="key in arr">
				<a href="javaScript:;" title="">
					<img :src="key.productImg" alt="" @click="toDetail(key.productId)">
				</a>
				<div>
					<p>{{key.productTitle}}</p>
					<p>
						<span>{{key.sellPrice}}</span>
						<span>{{key.originalPrice}}</span>
					</p>
					<p>{{key.prizeOrSlogan}}</p>
				</div>
			</li>
		</ul>
	</div>

	<!-- 结算栏 -->
	<div class="jiesuan" v-if="jiesuanIsShow">
		<ul>
			<li>
				<i :class="iconName?'iconfont icon-choose':'iconfont icon-weixuanzhong'" @click="checkAllChange()"></i>
				<span>全选</span>
			</li>
			<li>
                <span  v-show="editOrFinish">合计:&nbsp;</span>
                <span  v-show="editOrFinish">¥{{priceAll}}</span>
			</li>
			<li v-if="editOrFinish">
				<a href="javeScript:;" title="" >去结算</a>
			</li>
			<li v-if="!editOrFinish"  id="delete">
				<a href="javeScript:;" title="" @click="deleteShop">删除</a>
			</li>
		</ul>
	</div>

	<backTop></backTop>
</div>	
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import Vue from "vue"
Vue.use(InfiniteScroll);
import axios from "axios";
import { MessageBox } from 'mint-ui';
import backTop from './common/backTop';
export default {	
	data(){
		return {
			iconName:true,//全选判断属性
			arr:[],//存储推荐数据
			loading:false,
			count:1,
			listnum:1,
			priceAll:0,//总价格
			shopnum:[],//存储每个商品购买个数
			shopList:[],//存储购买的商品数量
			checkArr:[],//单选功能数组
			shoppingCartContent:false,//无购买商品时
			jiesuanIsShow:true,//结算栏显示隐藏
		}
	},
	computed:{
		editOrFinish(){			
			return this.$store.state.editOrFinish;
		}
	},
	methods:{
		loadMore(){
			this.count++;
			this.loading=true;
			axios.get(`recommend/cart?currentPage=${this.count}&_=1524122831818`)
			.then(res=>{
				if(this.count<=10){
					var newarr = res.data.data
					this.arr = [...this.arr,...newarr];
					this.loading=false;
				}else{
					this.count=1
					this.loading=true
				}
				
			})
		},
		checkChange(index){
			//单选改变样式
			
			 var flag = this.checkArr[index]

			 this.checkArr.splice(index,1,!flag)
			 
			 var arr = JSON.parse(localStorage.cart);
			 var pirce =0;
			 var falg1 = true;
			 for(var i =0;i<this.checkArr.length;i++){				
				if(this.checkArr[i]){					
					 pirce += Number(arr[i].num)*Number(arr[i].price);					
				}else{
					falg1 = false;
				}	
			}
			//改变总价格
			this.priceAll = pirce
			//改变全选样式
			if(falg1){
				this.iconName = true;
			}else{
				this.iconName = false;
			}


		},
		checkAllChange(){
			//全选功能
			var arr = JSON.parse(localStorage.cart);
			this.iconName = !this.iconName;
			var pirce = 0
			if(this.iconName){
				for(var i=0;i<this.checkArr.length;i++){
					this.checkArr[i] = true;
					pirce +=  Number(arr[i].num)*Number(arr[i].price);
				}
			}else{
				for(var i=0;i<this.checkArr.length;i++){
					this.checkArr[i] = false;
				}
			}
			this.priceAll = pirce
		},
		jian(index){
			var arr = JSON.parse(localStorage.cart);
			var num = this.shopnum[index];
			if(num<=1){
				num=1
			}else{
				num--
			}
			this.shopnum.splice(index,1,num)
			//改变localStorage.cart
			arr[index].num = num;
			localStorage.cart = JSON.stringify(arr)
			//改变总价格
			var pirce = 0;
			for(var i=0;i<this.checkArr.length;i++){
				if(this.checkArr[i]){
					pirce += Number(arr[i].num)*Number(arr[i].price)
				}
				
			}
			this.priceAll = pirce
		},
		add(index){
			var arr = JSON.parse(localStorage.cart);
			var num = this.shopnum[index];
			num++
			this.shopnum.splice(index,1,num)
			arr[index].num = num;
			localStorage.cart = JSON.stringify(arr)
			//改变总价格
			if(this.checkArr[index]){
				this.priceAll += Number(arr[index].price)
			}
		},
		deleteShop(){

			MessageBox.confirm('确定要删除选中的商品?').then(action => {
				//删除商品
			  this.$store.commit("editOrFinish",true)
			  var arr = JSON.parse(localStorage.cart);
				var newarr = []
				var arr1 = []
				var arr2 = []
				var pirce = 0;
				for(var i=0;i<this.checkArr.length;i++){
						if(!this.checkArr[i]){
							 newarr.push(arr[i])
						}
				}
				for(var j = 0;j < newarr.length; j++){
					arr1[j] = true;
					pirce += Number(newarr[j].num)*Number(newarr[j].price)
					arr2.push(Number(newarr[j].num))
				}
				this.shopList = newarr
				this.checkArr = arr1
				this.iconName = true;
				this.shopnum = arr2;
				this.priceAll = pirce;
				if(newarr.length==0){
					this.shoppingCartContent = true;
					this.$store.commit("headHomeShow",{setName:"购物车",flag:true})		
					this.$store.commit("isText",false)
					this.$store.commit("isImg","/static/img/searchIcon.png")
					this.jiesuanIsShow = false;
					
				}else{
					this.shoppingCartContent = false;
					this.$store.commit("isText",true)
					this.jiesuanIsShow = true;
				}
			  localStorage.cart = JSON.stringify(newarr)
			}).catch(err=>{
				this.$store.commit("editOrFinish",false)
			})
		},
		toDetail(id){
			this.$router.push(`/details/${id}`)
		}
	},
	mounted(){
		this.$store.commit("footpath","购物车")
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:true,setName:"购物车"})
		this.$store.commit("footIshow",false)
		
		//判断用户是否登陆
		var cookieAll = document.cookie.split(";")
		var flag = true
		for(var i =0; i <cookieAll.length; i++){
			if(cookieAll[i].indexOf("userId")!=-1){			
				var name = cookieAll[i].split("=")
				if(name[1]==""){
					flag = true;
				
				}else{
					
					flag = false
				}
				
			}else{
				flag = true
			}
		}
		if(flag){
			this.$router.push("/login")
		}
		
		axios.get("recommend/cart?currentPage=1&_=1524122831818")
		.then(res=>{
			this.arr = res.data.data;
		})

		//购买物品数据
		if(localStorage.cart){
		
			var arr = JSON.parse(localStorage.cart);
			if(arr.length==0){
				this.shoppingCartContent = true;				
				this.$store.commit("isText",false)
				this.$store.commit("isImg","/static/img/searchIcon.png")
				this.jiesuanIsShow = false;
			}else{
				this.shoppingCartContent = false;
				this.$store.commit("isText",true)
				this.jiesuanIsShow = true;
				// this.$store.commit("headHomeShow",{setName:"购物车",flag:false})
			}
			this.shopList = arr;
			for(var i =0;i<arr.length;i++){
				//单选为true和false
				this.checkArr.push(true)
				//总价
				this.priceAll += Number(arr[i].num)*Number(arr[i].price);
				//每个商品个数
				this.shopnum.push(Number(arr[i].num))
				//每个商品价格
			}
			
		}else{
			this.shoppingCartContent = true;
			this.$store.commit("headHomeShow",{setName:"购物车",flag:true})
			this.$store.commit("isImg","/static/img/searchIcon.png")
			this.$store.commit("setName",false)
			this.$store.commit("isText",false)
			this.jiesuanIsShow = false;
		}
	},
	components:{
		backTop
	}
}
</script>

<style scoped lang="scss">
	.shop{
		background: #f5f5f5;
		padding-bottom: 0.3rem;
		overflow:hidden;
		.shoplist{
			padding-left: 0.3rem;
		    padding-bottom: 0;
		    background-color: #fff;
		    .xuanzhong{
		    	height: 1rem;
		    	border-bottom: 1px solid #f5f5f5;
		    	border-top: 1px solid #f5f5f5;
		    	position: relative;
		    	line-height: 1rem;
		    	i{		    		
		    		float:left;
			    	font-size: 0.4rem;
			    	font-style: normal;		    	  
	    	        font-family: "iconfont" !important;
		    	}
		    	.icon-weixuanzhong{
		    		color:#ccc;
		    	}
		    	.icon-xuanzhong{
		    		  color: #202020;
		    	}
		    	ul{
		    		display: inline-block;
	    		    height: 0.5rem;
	    		    margin-top: 0.25rem;
	    		    margin-left: 4.68rem;
	    		    position: absolute;
	    		    li{
	    		    	list-style: none;
	    		    	text-align: center;
	    		    	font-size: 0.24rem;
	    		    	background-color: #F5F5F5;
	    		    	float: left;
	    		    	margin-right: 0;
	    		    	height: 0.5rem;
	    		    	line-height: 0.5rem;
	    		    	width: 0.5rem;
	    		    }
	    		     .changenum{
	    		     	    color: #ccc;
	    		     }
	    		     .num{
	    		     	width: 0.7rem;
    					background-color: #fff;
	    		     }
		    	}
		    }
		    .detailed{
		    		background:#fff;
		    		padding: 0.3rem 0.3rem 0.3rem 0rem;
		    	    overflow:hidden;
		    	    .proImg{
		    	    	width: 1.6rem;
		    	    	margin-top: 0.08rem;
		    	    	float: left;
		    	    	position: relative;
		    	    	margin-left: 0.4rem;
		    	    	img{
		    	    		    width: 1.6rem;
		    	    	}
		    	    }
		    	    ul{
		    	    	height: auto;
	    	    	    float: right;
	    	    	    width: 4.9rem;
	    	    	    li{
	    	    	    		height: 0.44rem;
	    	    	    	    line-height: 0.44rem;
	    	    	    	    font-size: 0.28rem;
	    	    	    	    margin-bottom: 0.08rem;
	    	    	    	    overflow: hidden;
	    	    	    	    white-space: nowrap;
	    	    	    	    text-overflow: ellipsis;
	    	    	    	    p{
	    	    	    	    	font-size: 0.26rem;
	    	    	    	    	float: left;
	    	    	    	    }
	    	    	    	    span{
	    	    	    	    	margin-right: 0.3rem;
	    	    	    	    	font-size: 0.26rem;
	    	    	    	    	float: right;
	    	    	    	    }
	    	    	    }
		    	    }
		    }
		}
	}
.tuijian{
	padding-bottom:2rem;
	background: #f5f5f5;
		&>p{
			font-size: 0.32rem;
			text-align: center;
			color: #000;
			padding-top: 0.4rem;
			background:#fff;
			
		}
		ul{
			display: flex;
	    	flex-flow: wrap;
	    	overflow: auto;
	    	li{
	    		float: left;
	    		width: 49.8%;
	    		border-right: 1px solid #f5f5f5;
	    		border-bottom: 1px solid #f5f5f5;
	    		box-sizing: border-box;
	    		font-size: 0;
	    		position: relative;
	    		padding-bottom: 0.1rem;
	    		height: 5.6rem;
	    		background:#fff;
	    		a{
	    			img{
	    				height: 3.71rem;
	    				margin: 0 auto 0;
	    				display: block;
	    			}
	    		}
	    		div{
	    			overflow: hidden;
	    			text-overflow: ellipsis;
	    			white-space: nowrap;
	    			position: relative;
	    			margin-bottom: 0.05rem;
	    			margin-left: 0.3rem;
	    			width: 88%;
	    			margin-top: 0.5rem;
	    			p:nth-of-type(1){
	    				color: #808080;
					    font-size: 0.25rem;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    width: 100%;
	    			}
	    			p:nth-of-type(2){
	    				    margin: 0.05rem 0;
	    				span:nth-of-type(1){
	    					font-size: 0.26rem;
						    color: #000;
						    margin-right: 0.1rem;
	    				}
	    				span:nth-of-type(2){
	    					font-size: 0.22rem;
	    					color: #AAAAAA;
	    					text-decoration: line-through;
	    				}
	    			}
	    			p:nth-of-type(3){
	    					color: #808080;
	    				    font-size: 0.22rem;
	    				    overflow: hidden;
	    				    text-overflow: ellipsis;
	    				    white-space: nowrap;
	    				    width: 80%;
	    			}
	    		}
	    	}
		}
}	
.jiesuan{
		position: fixed;
	    bottom: 0;
	    z-index: 999;
	    width: 7.5rem;
	    height: 1.04rem;
	    margin: 0 auto;
	    background: #fff;
	    color: #000;
	    border-top: 1px solid #f5f5f5;
	    ul{
	    	display: table;
	    	width: 100%;
	    	height: 1.04rem;
	    	vertical-align: middle;
	    	li{
	    		display: table-cell;
	    		vertical-align: middle;
	    		text-align: center;
	    	}
	    	li:nth-of-type(1){
	    			width: 1.2rem;
	    		    padding: 0rem;
	    		    padding-left: 0.3rem;
	    		    position: relative;
	    		    text-align: right;
    				font-size: 0.28rem;
	    		    i{
	    		    	position: absolute;
	    		    	left: 0.28rem;
	    		    	top: 0.25rem;
	    		    	font-size: 0.4rem;
	    		    	font-style: normal;
	    		    	font-family: "iconfont" !important;
	    		    	text-align: right;
	    		    }
	    		    span{
	    		    	text-align: right;
	    		    	font-size: 0.28rem;
	    		    }
	    	}
	    	li:nth-of-type(2){
	    		font-size: 0.28rem;
	    		width: 4.36rem;
	    		background-color: #fff;
	    		padding-right: 0.3rem;
	    		text-align: right;
	    	}
	    	li:nth-of-type(3){
	    			font-size: 0.3rem;
	    		    width: 1.95rem;
	    		    background-color: #FFD444;
	    		    a{
	    		    	    color: #2C3030;
	    		    }
	    	}
	    	#delete{
	    			font-size: 0.3rem;
	    		    width: 1.95rem;
	    		    background-color: #000;
	    		    a{
	    		    	    color: #fff;
	    		    }
	    	}
	    }
}
.shoppingCartContent{
	text-align: center;
	background: #f5f5f5;
		p{
			text-align: center;
	    font-size: 0.28rem;
	    padding-top: 0.2rem;
		}
		a{
			display: inline-block;
	    width: 2rem;
	    height: 0.4rem;
	    padding: 0.2rem 0.3rem;
	    background: #fff;
	    margin: 0.2rem auto;
	    background-color: #ffd444;
	    font-size: 0.28rem;
	    margin-left: 0.3rem;
	    color: #2C3030;
		}
}
</style>