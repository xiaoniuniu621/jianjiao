<template>
	<div id="head" v-if="headIshow">
		<img src="/static/img/titleView.png" alt="" v-if="isShow">
		<div>
			<img src="/static/img/searchIcon.png" alt="">
			<input type="input" name="" value="" placeholder="搜索我的尖叫好物" @focus="toSearch">
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		computed:{
			isShow(){
				return this.$store.state.isShow;
			},
			headIshow(){
				return this.$store.state.headIshow;
			}
		},
		methods:{
			toSearch(){
				this.$router.push("/search")
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
	    &>img{
	    	display: inline-block;
	    	width: 1.3rem;
	    	vertical-align: middle;
	    	margin-top: 0.06rem;
	    	margin-bottom: 0.06rem;
	    }
	    div{
	    		display: inline-block;
	    	    width: 5.3rem;
	    	    height: 0.56rem;
	    	    line-height: 0.56rem;
	    	    vertical-align: middle;
	    	    background-color: #F5F5F5;
	    	    border-radius: 0.3rem;
	    	    margin-left: 0.15rem;
	    	    margin-bottom: 0.05rem;
	    	    img{
	    	    	float:left;
	    	    	display: inline-block;
	    	    	width: 0.4rem;
	    	    	vertical-align: middle;
	    	    	margin: 0.1rem 0.1rem;
	    	    }
	    	    input{
	    	    	float: left;
	    	    	display:block;
	    	    	border:0;
	    	    	background-color: #F5F5F5;
	    	    	display: inline-block;
	    	    	width: 80%;
	    	    	height: 0.54rem;
	    	    	outline: none;
	    	    }
	    }
	}
</style>