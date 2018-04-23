<template>
	<div v-if='flag'>
		<div  id="backTop" class="backTop" >
			<img  @click='handleClick()' src="https://img.wowdsgn.com/icons/backTop.png">


		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			flag:false
		}
	},
	methods:{
		handleClick(){
			var timer=setInterval(()=>{
	          if(document.documentElement.scrollTop>0){
		        	document.documentElement.scrollTop-=100;
			    }else {
			        clearInterval(timer)
			    }
	        },30)
		}
	},
	mounted(){
		var _this=this
		window.onscroll=function(){
			var scrollT=document.documentElement.scrollTop?
			document.documentElement.scrollTop:document.body.scrollTop;
			if(scrollT<300){
				_this.flag=false;
			}else{
				_this.flag=true;
			}
		}
	}

}

</script>

<style scoped lang="scss">
	.backTop{
		position: fixed;
		right:0.5rem;
		bottom: 1.5rem;
		width: 0.7rem;
		height:0.7rem;
		img{
			width: 0.7rem;
			height: 0.7rem;
		}
	}
</style>
