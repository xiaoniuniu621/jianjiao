<template>
	<div>
		<div class="content" v-if='info'>
			<div v-for="item in info" class='list' @click='handlClick(item.productId)' :key="item.productId">
				<a>
					<img :src="item.productImg" >
					<div class='titleDiv'>
						<p class='title'>{{item.productTitle}}</p>
					</div>
					<span class='sale_price'>￥{{item.originalPrice}}</span>
					<p class='prizeOrSlogn'>{{item.prizeOrSlogan}}</p>
				</a>
			</div>
			<div class="dropload-down">
				<div class="dropload-noData">没有更多了</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import router from "../../router"
export default {
	data(){
		return{
			
		}
	},
	props:['info'],
	methods:{
		handlClick(id){
			this.$router.push(`/details/${id}`)
		}
	}
}

</script>

<style scoped lang="scss">
.content{
	display:flex;
    flex-flow: wrap;
    padding-bottom: 0.88rem;
	.list{
		float:left;
		width: 49.8%;
		height: 5.6rem;
		padding-bottom: 0.1rem;
		border-bottom: 1px solid #f5f5f5;
		&:nth-child(2n-1){
			border-right: 1px solid #f5f5f5;
		}
		a{
			display: block;
			width: 100%;
			font-size: 0;
			padding-bottom: 0.1rem;
			img{
				display: block;
				height: 3.71rem;
				margin: 0 auto 0;
			}
			.titleDiv{
				box-sizing: border-box;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    position: relative;
			    margin-bottom: 0.05rem;
			    margin-left: 0.3rem;
			    width: 88%;
			    margin-top: 0.5rem;
			    .title{
		    	    color: #808080;
				    font-size: 0.25rem;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 100%;
			    }
			}
			.sale_price{
			    font-size: 0.26rem;
			    color: #000;
			    margin-right: 0.1rem;
			    margin-left: 0.3rem;
			}
			.prizeOrSlogn{
			    color: #808080;
			    font-size: 0.22rem;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    width: 80%;
			    margin-left: 0.3rem;
			}
		}
	}
	.dropload-down{
		height: 50px;
		width: 100%;
		position: relative;
		overflow: hidden;
		font-size: 12px;
		border-bottom: 1px solid #f5f5f5;
		.dropload-noData{
			height: 50px;
			line-height: 50px;
			text-align: center;
		}
	}
}

	
</style>