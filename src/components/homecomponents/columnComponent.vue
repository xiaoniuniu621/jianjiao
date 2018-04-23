<template>
	<div class="ortherlist" :key="name.moduleId">
				<h1>{{name.moduleName}}</h1>
				<h3 v-if="name.moduleDescription">{{name.moduleDescription}}</h3>
				<div class="columList">
					<div v-for="key in name.moduleContent.products" >
						<a @click="detail(key.productId)"><img :src="key.productImg" alt=""></a>
						<div>
							<p>{{key.productTitle}}</p>
							<p>￥{{key.sellPrice}}</p>
						</div>
					</div>
				</div>
				<div class="lookAll"  @click="toProduct(name.moduleContent.id)">
					<router-link to="" tag="a">查看全部</router-link>
				</div>
		</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:["name"]
		,
		mounted(){
			
			if(this.name.moduleContent.products){
				if(this.name.moduleContent.products.length>6){
					this.name.moduleContent.products.splice(6,)
				}
				
			}
		},
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
	.columList{
		    display: flex;
		    flex-flow: wrap;
		    border-top: 1px solid #F5F5F5;
		    &>div{
		    		float: left;
		    		box-sizing: border-box;
		    	    width: 50%;
		    	    border-bottom: 1px solid #F5F5F5;
		    	    border-right: 1px solid #F5F5F5;
		    	    img{
		    	    	    width:100%;
		    	    	    display:block;
		    	    }
		    	    div{
		    	    	padding: 0rem 0.32rem;
					    position: relative;
					    margin-top: 0.2rem;
					    p:nth-of-type(1){
					    	padding-top: 0.1rem;
					    	color: #808080;
					    	font-size: 0.28rem;
					    	text-overflow: ellipsis;
					    	white-space: nowrap;
					    	overflow:hidden;
					    }
					    p:nth-of-type(2){
					    	font-size: 0.32rem;
					    	margin-right: 0.1rem;
					    	color:rgb(0, 0, 238);
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