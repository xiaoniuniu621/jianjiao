<template>
	<div class="category">
		<div v-for="(item,index) in categoryJson" :class="index">
			<div class="content">
				<a class="tab" >
					<img :src="item['img']">
				</a>
				
				<ul>
					<li v-for="(val,key) in item.result" @click='handleClick(val)'  >
						<a href="javascript:;" class="cleafix" >
							<span>{{key}}</span>
							<i class='iconfont icon-youjiantou'></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
	data(){
		return{
			categoryJson:{}
		}
	},
	methods:{
		handleClick(val){
			router.push(`/category/categoryId=${val.category}`)
		},
		loadMore(){
			this.current++;

			if(this.current>this.total){
				this.loading = true;
				this.text= "没有数据了"
				return ;
			}

			axios.get(`/v4/api/film/now-playing?page=${this.current}&count=7`).then(res=>{
				console.log(res.data);
				this.datalist= [...this.datalist,...res.data.data.films]; //合并两个数组
			})
		}	
	},
	mounted(){
		this.$store.commit("footpath","分类")
		this.$store.commit("headIshow",true)
		this.$store.commit("isShow",false)
		this.$store.commit("footIshow",true)
		this.$store.commit("headHomeShow",{setName:"sds",flag:false})
		this.categoryJson=require("../assets/json/category")
	}

}

</script>

<style scoped lang="scss">
a{
    color:#000;
    font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
}
.cleafix{
	zoom:1;
	&:before,&:after{
		display:table;
		content:" ";
	}
	&:after{
		clear: both;
		visibility: hidden;
		height: 0;
	}
}
img{
	display: block;
}

.cleafix{
	zoom:1;
}
.category{
	margin-bottom: 1rem;
	position: relative;
	background: #fff;
	padding: 0 0.3rem 1rem;
	.furniture,.livingGoods{
		padding-top:0.2rem;

	}
	.tab{
		display:block;
		width: 100%;
		img{
			width: 100%
		}
	}
	ul{
		li{
			font-size: 0.3rem;
			text-indent: 0.3rem;
			line-height: 0.98rem;
			height:0.98rem;
    		border-bottom: 1px solid #eaeaea;
    		span{
			    float: left;
			    color: #202020;
			    overflow: hidden;
			    width: 80%;
    		}
    		.icon-youjiantou{
    			float: right
    		}
		}
	}
	
} 

</style>