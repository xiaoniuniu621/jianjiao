<template>
	<div id="head" v-if="headHomeShow">
		<a href="#/" title="" @click="headIshow">
			<img src="/static/img/home.png" alt="">
		</a>
		<h3>{{setcontent}}</h3>
		<a href="javaScript:;" title=""  v-if='!isText' @click="toPath">
			<img :src="isImg" alt="">
		</a>
		
		<div v-if="isText">
			<p v-if='editOrFinish' @click="changeFlag">编辑</p>
			<p v-if='!editOrFinish'  @click="changeFlag">完成</p>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			headHomeShow(){
				return this.$store.state.headHomeShow
			},
			setcontent(){
				 return this.$store.state.setName
			},
			isText(){
				 return this.$store.state.isText;				
			},
			isImg(){
				return this.$store.state.isImg;
			},
			editOrFinish(){
				return this.$store.state.editOrFinish
			},
		},
		methods:{
			changeFlag(){	
				var flag = this.$store.state.editOrFinish			
				this.$store.commit("editOrFinish",!flag)
			},
			headIshow(){
				this.$store.commit("isShow",true)
				this.$store.commit("headIshow",true)
				this.$store.commit("headHomeShow",false)
				this.$store.commit("footIshow",true)
			},
			toPath(){
				var imgPath = this.$store.state.isImg
				if(imgPath=='/static/img/me.png'){
					this.$router.push("/my")
				}else if(imgPath=='/static/img/searchIcon.png'){
					this.$router.push("/search")
				}else if(imgPath=='/static/img/category.png'){
					this.$router.push("/category")
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	#head{
		background: #fff;
	    height: 0.88rem;
	    line-height: 0.88rem;
	    padding: 0rem 0.2rem 0rem 0.2rem;
	    border-bottom: 1px solid #f5f5f5;
	    justify-content: space-between;
	    display: flex;
	    a{
	    	display:inline-block;
	    	img{
	    		display: block;
	    		width: 0.52rem;
	    		height:0.53rem;
	    		margin-top: 0.15rem;
	    		vertical-align: middle;
	    	}
	    }
	    h3{
	    		display: inline-block;
	    	    font-size: 0.34rem;
	    	    margin:0;
	    }
	    div{
	    	display: inline-block;
	    }
	    p{
		    height: 0.64rem;
		    font-size: 0.3rem;
	    }
	}
</style>