<template>
	<div id="furniture"  v-if="getFurnishingList.length>0">

		<components is='carousel' :name="carouselList"></components>
		<components is='slide' :name="slideList"></components>
		<components is='fixedList' :name="brand"  :flaga="true"></components>
		<components is='classification' :name="classList"></components>
		<components is='columnComponent' :name="key" v-for="key,index in columList" :key="index"></components>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


import slide from "./homecomponents/slide"
import fixedList from "./homecomponents/fixedList"
import carousel from "./homecomponents/carousel"
import classification from "./homecomponents/classification"
import columnComponent from "./homecomponents/columnComponent"



import axios from "axios"
export default {
		data(){
			return {
				count:0,
				arr:[]
			}
		},
		components:{
			slide,
			fixedList,
			carousel,
			classification,
			columnComponent
		},
		updated(){
			new Swiper('.swiper-container',{
			 	direction: 'horizontal',
			  	slidesPerView : 4,
   			 	slidesPerGroup : 1,
			})
		},
		mounted(){
			new Swiper('.swiper-container',{
			 	direction: 'horizontal',
			  	slidesPerView : 4,
   			 	slidesPerGroup : 1,
			})
//			axios.get("v2/page?pageId=1&tabId=1&_=1523933596172")
//			.then(function(res){
//				console.log(res)
//			})
//			.catch(function(err){
//				console.log(err)
//			})
			//获取轮播数据
			if(this.$store.state.FurnishingList.length==0){
				this.$store.dispatch("getFurnishingList")			
			}
			
		},
		computed:{
			getFurnishingList(){
				if(this.$store.state.FurnishingList.length>0){
					return this.$store.state.FurnishingList
				}else{
					return []
				}
			},
			carouselList(){				
					return this.$store.state.FurnishingList[0].moduleContent.banners
			},
			slideList(){
					return this.$store.state.FurnishingList[1]
			},
			brand(){
					return this.$store.state.FurnishingList[2]
			},
			classList(){
					return this.$store.state.FurnishingList[3]
			},
			columList(){
					return this.$store.state.FurnishingList.slice(4)
			},
			fixedList(){
					return this.$store.state.FurnishingList.slice(3)
			}
			
		}
}
</script>

<style scoped lang="scss">

#furniture{
	background:#F5F5F5;
	padding-bottom: 1rem;;
}
</style>