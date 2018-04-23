<template>
	<div class="productGroup" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="500" infinite-scroll-immediate-check="false">
		<div class="productGroupImg">
			<img :src="imgId" alt="">
		</div>
		<ul>
			<li v-for="key in arr">
				<a href="javaScript:;" title="">
					<img :src="key.productImg" alt="" @click="detail(key.productId)">
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
		<div class="footer">没有更多了</div>

		<backTop></backTop>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import Vue from "vue"
Vue.use(InfiniteScroll);
import axios from "axios"
import backTop from './common/backTop';

	export default {
		data(){
			return {
				imgId:"",
				arr:[],
				count:1,
				id:"",
				loading:false,
			}
		},
		mounted(){
			this.$store.commit("headIshow",false);//改变头部显示或隐藏变量
			var _this = this;
			_this.id = this.$route.params.id;
			this.imgId = "/static/img/"+this.$route.params.id+".jpg";
			var id = this.$route.params.id;
			axios.get(`pages/productGroup/${id}/products?pageNumber=1`)
			.then(function(res){
				_this.arr = res.data.data.products
			})
		},
		methods:{
			loadMore(){		
				 	this.count++;
				 	this.loading=true;
				 var _this = this;
				 				axios.get(`pages/productGroup/${this.id}/products?pageNumber=${this.count}`)
				 .then(function(res){
				 	if(res.data.data.products.length){
				 		var newarr = res.data.data.products;
				 		 _this.arr = [..._this.arr,...newarr]
				 		 _this.loading=false;
				 	}else{
				 		_this.count = 1
				 		_this.loading=true;
				 	}					
				 })
			},
			detail(id){
				this.$router.push(`/details/${id}`)
			}
		},
		components:{
			backTop
		}
	}
</script>

<style scoped lang="scss">
.productGroup{
	margin-bottom:0.9rem;
	.productGroupImg{
		img{
			width:100%;
		}
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
.footer{
	height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
}
</style>