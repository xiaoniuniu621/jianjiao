<template>
	<div class="BestSellers">
			<h1>{{name.moduleContent.name}}</h1>
			<h3 v-if="name.moduleDescription">{{name.moduleDescription?name.moduleDescription:""}}</h3>
			<div class="swiper-container" style="height:auto;">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="key in name.moduleContent.products">
						<a><img :src="key.productImg" alt=""@click="detail(key.productId)"></a>
						<div>
							<p>{{key.productTitle}}</p>
							<p>￥{{key.sellPrice}}</p>
						</div>
					</div>
					<div class="swiper-slide" style="border:0" v-for="i in 3" :key="i">
					</div>
				</div>
			</div>
			<div class="lookAll" @click="toProduct(name.moduleContent.id)">
				<router-link to="" tag="a" >查看全部</router-link>
			</div>
		</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:["name"],
		methods:{
			toProduct(id){
				this.$router.push(`/productGroup/${id}`)
			},
			detail(id){
				this.$router.push(`/details/${id}`)
			}
		}
	}
</script>

<style  scoped lang="scss">
.BestSellers{
	background:#fff;
	overflow: hidden;
    margin-top: 0.3rem;
	h1{
		font-weight: bold;
		font-size: 0.36rem;
		color: #333;
		margin: 0.3rem 0;
		text-align:center;
	}
	h3{
		font-size: 0.24rem;
	    color: #808080;
	    margin-bottom: 0.2rem;
	    text-align:center;
	}
	&>a{
		display:none;
	}
	.swiper-container{
			width:100%;
			overflow:hidden;
			height: 100px;
		.swiper-slide{
			margin-right: 0.15rem;
    		margin-left: 0.2rem;
    		width: 1.8rem;
    		background: #fff;
    		 		img{
    		 			width:100%;
    		 		}
    		 		div{
    		 			margin-top: 0.1rem;
    						margin-right: 0.1rem;
    						font-size: 0.24rem;
    						color: #000;
    						p:nth-of-type(1){   					
    							color: #808080;
    							width: 1.8rem;
    							overflow: hidden;
    							text-overflow: ellipsis;
    							white-space: nowrap;
    						}
    		 		}
				}
			
    				
	}
	.lookAll{
		text-align: center;
		padding: 0 0.4rem;
		a{
			font-size: 0.24rem;
			display:inline-block;
			color: #4A4A4A;
			padding: 0.3rem;
			background: url(/static/img/zqg1.png) no-repeat right center;
    		background-size: 10%;
		}
	}

}
</style>