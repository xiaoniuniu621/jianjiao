<template>
	<div class="ortherlist" :key="name.moduleId">
				<h1>{{name.moduleName}}</h1>
				<div class="List">
					<div v-for="key in name.moduleContent.banners">
						<img :src="key.bannerImgSrc" alt="" :key="key.id">
					</div>
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
				if(this.name.moduleContent.products.length>3){
					this.name.moduleContent.products.splice(0,3)
				}
				
			}
		},
		methods:{

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
	.List{
		padding-bottom: 0.3rem;
		padding: 0.3rem 0.3rem 0rem;
		display: flex;
		justify-content: space-around;
		div{
			    margin-right: 0.3rem;
			    cursor: pointer;
			    img{
			    	width:100%;
			    	height: auto;
			    }
		}
	}

}
</style>