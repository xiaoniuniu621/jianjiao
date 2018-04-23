<template>
	<div id="furniture"  v-if="getActivityList.length>0">

		<components is='carousel' :name="carouselList"></components>
		<components is='fixedList' :name="key" hiddName="hiddName" v-for="key,index in brand" :key="index"></components>
		<components is='fixedList' :name="classList" :flag="true"  :flaga="false"></components>
		<components is='columnComponent' :name="columList"></components>
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
			if(this.$store.state.activityList.length==0){
				this.$store.dispatch("getActivityList")			
			}
			
		},
		computed:{
			getActivityList(){
				if(this.$store.state.activityList.length>0){
					return this.$store.state.activityList
				}else{
					return []
				}
			},
			carouselList(){				
					return this.$store.state.activityList[0].moduleContent.banners
			},
			slideList(){
					return this.$store.state.activityList[1]
			},
			brand(){
					return this.$store.state.activityList.slice(1,4)
			},
			classList(){
					return this.$store.state.activityList[4]
			},
			columList(){
					return this.$store.state.activityList[5]
			},
			fixedList(){
					return this.$store.state.activityList.slice(3)
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