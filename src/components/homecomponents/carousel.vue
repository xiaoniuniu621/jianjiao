<template>
	<div class="carousel">
			<mt-swipe :auto="4000" :prevent="true" :speed="300">
			  <mt-swipe-item v-for="key in name" :key="key.bannerLinkTargetId">
			  	<a href="##" title="" >
			  		<img :src="key.bannerImgSrc" alt=""  >
			  	</a>
			  </mt-swipe-item>
			</mt-swipe>
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

		}
	}
</script>

<style scoped lang="scss">
	.carousel{
			height: 4.98rem;
			background: #F5F5F5;
			a{display:block;}
			img{
				display: block;
				width:100%;
				height:auto;
			}
		}
</style>