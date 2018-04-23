<template>
	<div id="foot" v-if="footIshow">
		<ul>
<!-- 			<router-link to="/" tag="li" activeClass="active">首页</router-link>
			<router-link to="/category" tag="li" activeClass="active">分类</router-link>
			<router-link to="/shopping" tag="li" activeClass="active">购物车</router-link>
			<router-link to="/information" tag="li" activeClass="active">消息</router-link>
			<router-link to="/my" tag="li" activeClass="active">我</router-link> -->
			<!-- <li><a href="" title="" @clcik="active">首页</a></li>
			<li><a href="#/category" title="" @clcik="active">分类</a></li>
			<li><a href="#/shopping" title="" @clcik="active">购物车</a></li>
			<li><a href="#/information" title="" @clcik="active">消息</a></li>
			<li><a href="#/information" title="" @clcik="active">我</a></li> -->
			<li v-for="key,index in name" :key="key">
				<img :src="imgsrc[index]" alt="">
				<a :href="path[index]" title="" @click="active(key)" :class="footpath==key?'active':''" :key="path[index]">{{key}}</a>
				<span v-if="key=='购物车'?true:false" v-show="shopnumShow">{{shopnum}}</span>
			</li>

		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				path:["#/","#/category","#/shopping","#/information","#/my"],
				name:["首页","分类","购物车","消息","我"],
				imgsrc:["/static/img/home.png","/static/img/category.png","/static/img/buy.png","/static/img/message.png","/static/img/me.png"],
				num:0,
				shopnumShow:false,
				shopnum:0,
			}
		},
		computed:{
			footIshow(){
				return this.$store.state.footIshow
			},
			footpath(){
				return this.$store.state.footpath
			}
		},
		methods:{
			active(name){
				this.$store.commit("footpath",name)
				if(localStorage.cart){
					
					var arr = JSON.parse(localStorage.cart);
					if(arr.length!=0){
						this.shopnumShow = true;
						var num = 0;
						for(var i=0;i<arr.length;i++){
							num += Number(arr[i].num)
						}
						this.shopnum = num;
					}else{
						this.shopnumShow = false;
					}
					
				}else{
					this.shopnumShow = false;
				}
			}
		},
		mounted(){
			if(localStorage.cart){
				
				var arr = JSON.parse(localStorage.cart);
				if(arr.length!=0){
					this.shopnumShow = true;
					var num = 0;
					for(var i=0;i<arr.length;i++){
						num += Number(arr[i].num)
					}
					this.shopnum = num;
				}else{
					this.shopnumShow = false;
				}
				
			}else{
				this.shopnumShow = false;
			}
		},
		updated(){
			if(localStorage.cart){
				
				var arr = JSON.parse(localStorage.cart);
				if(arr.length!=0){
					this.shopnumShow = true;
					var num = 0;
					for(var i=0;i<arr.length;i++){
						num += Number(arr[i].num)
					}
					this.shopnum = num;
				}else{
					this.shopnumShow = false;
				}
				
			}else{
				this.shopnumShow = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	#foot{
			width: 100%;
		    height: 0.88rem;
		    position: fixed;
		    margin: 0 auto;
		    bottom: 0;
		    background: #fff;
		    border-top: 1px solid #f5f5f5;
		    z-index: 999;
		ul{
			display: flex;
			justify-content: space-around;
			li{
				position:relative;
				float: left;
				width: 20%;
				height: 100%;
				font-size: 0rem;
				color: #000;
				text-align: center;
				cursor: pointer;
				a{
					display:block;
					font-size: 0.24rem;
					color: #808080;
				}
				.active{
					color:#000;
				}
				img{
					display: block;
					width: 0.46rem;
					margin-right: auto;
					margin-left: auto;
				}
				span{
					display:block;
					width: 0.35rem;
					height: 0.35rem;
					line-height: 0.36rem;
					background-color: #FFD444;
					font-size: 0.2rem;
					color: #000;
					border-radius: 50%;
					-webkit-border-radius: 100%;
					-moz-border-radius: 50%;
					-ms-border-radius: 50%;
					-o-border-radius: 50%;
					position: absolute;
					top: 0.02rem;
					right: 0.35rem;
				}
			}
		}
	}
</style>