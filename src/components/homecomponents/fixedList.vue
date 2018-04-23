<template>
	<div class="ortherlist" :key="name.moduleId">
				<h1 v-if="flag">{{name.moduleName}}</h1>
				<h1 v-if="name.moduleContent.products">{{name.moduleContent.products?name.moduleName:""}}</h1>
				<h3 v-if="flaga">{{name.moduleDescription?name.moduleDescription:""}}</h3>
				<div :class="hiddName?hiddName:''"><img :src="name.moduleContent.banners?name.moduleContent.banners[0].bannerImgSrc:name.moduleContent.bannerImgSrc" alt="" @click="topic(name)"></div>	
				<ul :class="hiddName?hiddName:''">
					<li v-for="data in name.moduleContent.products" >
						<a><img :src="data.productImg" alt="" @click="detail(data.productId)"></a>
						<div>
							<p>{{data.productTitle}}</p>
							<p>￥{{data.sellPrice}}</p>
						</div>
					</li>
				</ul>
		</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:["name","hiddName","flag","flaga"]
		,
		mounted(){
			if(this.name.moduleContent.products){
				if(this.name.moduleContent.products.length>3){
					this.name.moduleContent.products.splice(3,)
				}
				
			}
		},
		methods:{
			topic(name){				
				if(name.moduleContent.banners){
					var id = name.moduleContent.banners[0].bannerLinkTargetId
					this.$store.commit("topicObj",name.moduleContent.banners[0]);
				}else{
					var arr = name.moduleContent.bannerLinkUrl?name.moduleContent.bannerLinkUrl.split("/"):[];
					var id = arr[arr.length-1]
					var obj = {bannerImgSrc:name.moduleContent.bannerImgSrc}
					this.$store.commit("topicObj",obj);
				}
				this.$router.push(`/topic/${id}`)
			},
			detail(id){
				this.$router.push(`/details/${id}`)
			}
		}
	}
</script>

<style  scoped lang="scss">
.ortherlist{
	background:#fff;
	overflow: hidden;
    margin-top: 0.3rem;
	h1{
		font-weight: bold;
		font-size: 0.36rem;
		color: #333;
		margin: 0.3rem 0;
		text-align: center;
		padding: 0.26rem 0rem 0rem;
	}
	h3{
		font-size: 0.24rem;
	    color: #808080;
	    margin-bottom: 0.2rem;
	    text-align:center;
	}
	&>div{
		display:block;
		padding: 0.3rem 0.3rem 0rem;
		img{
			width:100%;
			display:block;
		}
	}
	&>.hiddName{
		display:block;
		padding:0;
		img{
			width:100%;
			display:block;
		}
	}
	ul{
			display:flex;
			overflow:hidden;
		   	padding: 0 0.3rem 0.3rem;
		   li{
		   		float: left;
		   	    width: 30%;
		   	    margin-right: 0.2rem;
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

}
</style>