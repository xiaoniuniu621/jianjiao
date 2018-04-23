<template>
	<div v-if="getAllList.length>0" id="recomend">
		<components is='carousel' :name="carouselList"></components>
		<components is="slide" :name="BestSellersList"></components>
		<components v-for="key,index in ortherlist" :is="key.moduleStyle.marginBottom?'slide':'fixedList'" :name="key" :key="index"></components>
		
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

import slide from "./homecomponents/slide"
import fixedList from "./homecomponents/fixedList"
import carousel from "./homecomponents/carousel"

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
			carousel
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
			//获取轮播数据
			
			if(this.$store.state.allList.length==0){
				this.$store.dispatch("getAllList")	
				
			}
			
		},
		computed:{
			getAllList(){
				if(this.$store.state.allList.length>0){
					
					return this.$store.state.allList
				}else{
					return []
				}
			},
			carouselList(){				
					return this.$store.state.allList[0].moduleContent.banners
			},
			BestSellersList(){
					return this.$store.state.allList[2]
			},
			ortherlist(){
					return this.$store.state.allList.slice(3)
			}
			
		}
}
</script>

<style scoped lang="scss">

#recomend{
	background:#F5F5F5;
	padding-bottom: 1rem;
}
		
</style>