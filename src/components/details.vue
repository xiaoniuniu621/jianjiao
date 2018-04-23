<template>
	<div v-if="info" class="container">
		<!-- 顶部图片 -->
		<div class="topImg">
			<img :src="info.productImg" >
		</div>
		<!--  -->
		<div class="titleCon">
			<div class="clearfix  titleConUl">
				<div class="titleConLeft">
					<p>{{info.productTitle}}</p>
					<b>￥{{info.sellPrice}}</b>
				</div>
			</div>
		</div>
		<div class="specificationSelection">
            <div class="selected">
            	<span class='selectedText'>已选</span>
            	<div class="selected-right">
            		<span class='selectedTitle'>{{liInfo.join(" ")}}</span>1件<span></span>
            		<br>
            		<span class='selectedInstruction'>尺寸：{{liInfo[0]}}cm  重量：{{netWeight}}kg</span>
            	</div>
            	<div class="clear"></div>
            </div>
            <!-- 选择color -->
            <div v-if="selection">
            	<div v-for="(selection,key) in selection.attributes" class="selectedColor" style="
    box-sizing:border-box;
">
	            	<span class='selectedText'>{{selection.attributeName}}</span>
	            	<ul class="selectedColor-right">
	            		<li v-for='(listInfo,i) in selection.attributeValues' :class="listInfo==liInfo[key]?'sele':'tag'" :data-attrId=selection.attributeId  @click="handlclickSelected($event,key)">{{listInfo}}</li>
	            	</ul>
	            	<div class="clear"></div>
	            </div>
            </div>
            <!-- 数量 -->
            <div class="amount" >
                <span class="selectedText">数量</span>
                <ul class="amount-right clearfix selectedUl">
                    <li @click='num<=1?1:num--'>-</li>
                    <li>{{num}}</li>
                    <li @click='num++'>+</li>
                </ul>
            </div>
        </div>

        <!-- 介绍 -->
        <div class="designer">
        	<div class="designerCountry">
        		<span id="designerCountryName">{{info.brandAndDesigner[0].country}}</span>
        	</div>
        	<img src="../assets/img/icon-designer.png" class="lazy">
        	<p class="designerName">{{info.brandAndDesigner[0].name}}</p>
        	<p class="designerIntroduction">{{info.brandAndDesigner[0].desc}}</p>
        	<a id="readMore" href="javascript:;">
                <span>阅读全文</span>
                <i class='iconfont icon-youjiantou'></i>
            </a>
        </div>


         <!-- 详情描述 -->
        <div id="productIntroduction">
        	<h1 id='slogen'>设计巧妙多用圆几</h1>
        	<div class="content" v-for='data in infomation'>
        		<p v-if='data.type==0' class="productIntroductionSubTitle">{{data.content}}</p>
        		<p v-if='data.type==1' class="productIntroductionDec">{{data.content}}</p>
        		<img v-if='data.type==2' class="productIntroductionImg1" :src="data.content">
        	</div>
        </div>

        <!-- 底部 -->
        <div class="app-down">
        <ul>
            <li>
                <i class='iconfont icon-shoucang'></i>
                <i class='iconfont icon-gouwuche2' @click="topShop"></i>
                <span class='totle'>{{count}}</span>
            </li>
            <li id="addcart" @click="toCart">
                <a href="javascript:;" style="color: rgb(0, 0, 0);">加入购物车</a>
            </li>
            <li id="buynow-bottom"  @click="topShop">
                <a href="javascript:;" style="color: rgb(0, 0, 0);">立即购买</a>
            </li>
        </ul>
    </div>

       

	</div>
</template>

<script>
import axios from "axios";
import backTop from './common/backTop';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import slidesPerGroup from './common/slidesPerGroup';
/*import 'vue-swipe/dist/vue-swipe.css';
import { Swipe, SwipeItem } from 'vue-swipe';*/

export default {
	data(){
		return {
			netWeight:0,
			num:1,
			info:null,
			selection:null,
			imgs:null,
			infomation:null,
			liInfo:[],
			id:0,

			//购物车显示的数量
			count:0,
			//从localStorage取回的数据存储
			obj:[]

		}
	},
	mounted(){
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:true,setName:"商品详情"})
		this.$store.commit("footIshow",false)
		this.$store.commit("isImg",'/static/img/searchIcon.png')
		this.$store.commit("isText",false)
		if(localStorage.cart){
			var arr = JSON.parse(localStorage.cart) ;
			for(var i = 0; i < arr.length; i++){
				this.count+= Number(arr[i].num)
			}
		}

		this.id=this.$route.params.id
		axios.get("/product/info?skuId="+this.id).then(res=>{
			this.info=res.data.data;
		})
		axios.get("/product/selection?skuId="+this.id).then(res=>{
			this.selection=res.data.data;
			var infomation=this.selection.products[0]
			if(infomation.attributes){
				for(var i=0;i<infomation.attributes.length;i++){
				this.liInfo.push(infomation.attributes[i].attributeValue)
				}
			}
			this.info.sellPrice=infomation.sellPrice?infomation.sellPrice:"";
			this.netWeight=infomation.netWeight;
			
			this.info.productTitle=infomation.productTitle;
			this.id=infomation.productId;
		})
		
		axios.get("/product/imgs?skuId="+this.id).then(res=>{
			this.imgs=res.data.data;
		})
		axios.get("/product/infomations?skuId="+this.id).then(res=>{
			this.infomation=res.data.data.introductions;
		})
	},
	methods:{
		toCart(){
			if(localStorage.cart){
				var arr = JSON.parse(localStorage.cart) ;
				
				var obj = {};
				var flag = true;
				for(var i=0; i<arr.length;i++){
					if(arr[i].productId==this.id){
						var num1 = Number(arr[i].num)
						num1 +=this.num;
						arr[i].num = num1;
						this.count+=this.num						
						flag = false;
					}
				}
				if(flag){
					obj.productId=this.id;
					obj.num = this.num;
					obj.img = this.info.productImg;
					obj.title = this.info.productTitle;
					obj.price = this.info.sellPrice;
					arr.push(obj);
					localStorage.cart = JSON.stringify(arr)
					this.count += this.num
				}else{
					localStorage.cart = JSON.stringify(arr)
				}
			}else{
				this.count = this.num;
				var arr1 = [];
				var obj1 = {};
				obj1.productId=this.id;
				obj1.num = this.num;
				obj1.img = this.info.productImg;
				obj1.title = this.info.productTitle;
				obj1.price = this.info.sellPrice;
				arr1.push(obj1);
				localStorage.cart = JSON.stringify(arr1)
			}
		},
		handlclickSelected(e,key){
			this.liInfo.splice(key,1,e.path[0].innerText);
			var data=this.selection.products;
			var str=this.liInfo.join(" ")
			for(var i=0;i<data.length;i++){
				if(data[i].productTitle.indexOf(str)>-1){
					this.info.sellPrice=data[i].sellPrice;
					this.netWeight=data[i].netWeight;
					this.info.productTitle=data[i].productTitle;
					this.id=data[i].productId;
				}
			}				
		},
		topShop(){
			this.$router.push("/shopping")
		}
	}
}
</script>
<style scoped lang="scss">
.clear{
	clear:both;
}
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
.selectedColor-right, .selectedPackage-right, .selectedSize-right, .amount-right {
    display: inline-block;
    width: 5.8rem;
    float: left;
    margin-left: 0.3rem;

}
.selected, .selectedColor, .selectedPackage, .selectedSize, .amount {
    position: relative;
    margin-bottom: 0.3rem;
}
.specificationSelection .selectedColor-right li, .selectedPackage-right li, .selectedSize-right li {
    text-align: left;
    font-size: 0.28rem;
    float: left;
}
.specificationSelection .selected .selectedText, .selectedColor .selectedText, .selectedPackage .selectedText, .selectedSize .selectedText, .amount .selectedText {
    display: inline-block;
    float: left;
    margin-left: 0.08rem;
    margin-top: 0.1rem;

}


.container{
	background-color: #f5f5f5;
	.topImg{
		width: 100%;
		height: 6rem;
		font-size: 0;
		margin-bottom:0.3rem;
		img{
			width: 100%;
			height: 100%
		}
	}
	.titleCon{
		padding: 0.3rem 0.5rem 0rem;
	    background: #fff;
	    margin-bottom: 0.3rem;
	    font-size: 0.36rem;
	    .titleConLeft{
    	    width: 5rem;
		    margin-right: 0.2rem;
		    padding-bottom: 0.28rem;
	    }
	    p{
	    	margin-bottom: 0.2rem;
	    	font-size: 0.3rem;
	    }
	}
	.specificationSelection{
	    padding: 0.427rem 0.4rem;
   	 	background: #fff;
   	 	.selectedText{
   	 		color: #707070;
			font-size: 0.26rem;
   	 	}
   	 	.selected{
   	 		
   	 		margin-bottom: 0.3rem;
   	 		position: relative;
   	 		.selected-right{
 			    display: inline-block;
			    width: 5.8rem;
			    float:left;
				margin-left: 0.3rem;
			    line-height: 1.5em;
			    font-size: 0.26rem;
			    .selectedInstruction{
			    	font-size: 0.2rem;
    				color: #707070;
			    }
   	 		}
   	 	}
   	 	.tag{
   	 		color: gray;
   	 	}
   	 	.selectedColor{
   	 		.gray{
   	 			background-color: gray
   	 		}
   	 	}
   	 	.selectedColor-right{

   	 	}
   	 	.amount{
   	 		height: 0.8rem;
   	 		margin-bottom: 0
   	 	}
   	 	.amount-right{
   	 		li{
   	 			text-align: center;
   	 			font-size: 0.28rem;

   	 			float:left;
   	 			&:nth-child(1){
   	 				color: #ccc;
   	 			}
   	 			&:nth-child(2){
   	 				width: 1.28rem;
   	 				background-color: #fff;
   	 				box-sizing: border-box
   	 			}
   	 		}
   	 	}
   	 	li{
   	 		padding: 0.15rem 0.22rem;
		    background-color: #F5F5F5;
		    margin-bottom: 0.2rem;
		    margin-right: 0.2rem;
		    height: 20px;
		    &.sele{
		    	background-color: #FFD444;
		    }
   	 	}
	}

	.designer{
		background: url("../assets/img/designerBackground.png");
		width: 100%;
		background-size: 100%;
	    padding: 0.4rem 0.5rem 0.5rem;
	    font-size: 0;
	    height: 6.14rem;
	    position: relative; 
	    box-sizing: border-box;
	    .designerCountry{
	    	text-align: right;
	    	
	    }
	    #designerCountryName{
    		font-size: 0.26rem;
		    color: #fff;
		    vertical-align: middle;
    	}
	    .lazy{
	    	width: 1.2rem;
	    	height: 1.2rem;
	    	border-radius: 100%;
	    	margin: 0.5rem auto 0.3rem;
	    	display: block;
	    }
	    .designerName{
    	    font-family: PingFangSC-Medium;
		    font-size: 0.32rem;
		    color: #FFFFFF;
		    letter-spacing: 0.01rem;
		    text-align: center;
		    margin-bottom: 0.2rem;
	    }
	    .designerIntroduction{
    	    font-family: PingFangSC-Light;
		    font-size: 0.26rem;
		    color: #FFFFFF;
		    line-height: 0.4rem;
		    margin-bottom: 0.3rem;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    height: 1.6rem;
	    }
	    #readMore{
	    	display: block;
		    font-family: PingFangSC-Regular;
		    font-size: 0.22rem;
		    color: #FFFFFF;
		    line-height: 0.4rem;
		    text-align: right;
		    position: absolute;
		    right: 0.5rem;
		    bottom: 0.4rem;
	    }
	}

	#productIntroduction{
		box-sizing: border-box;
	    width: 100%;
	    text-align: center;
	    padding: 0.6rem 0rem 0rem;
	    box-sizing: border-box;
	    font-size: 0;
	    margin-bottom: 0.9rem;
	    #slogen{
    	    text-align: center;
		    font-family: PingFangSC-Regular;
		    font-size: 0.43rem;
		    color: #000000;
		    letter-spacing: 0.055rem;
		    line-height: 0.6rem;
		    margin: 0;
		    margin-bottom: 0.1rem;
		    padding: 0 0.5rem;
		    word-break: break-word;
		    overflow: hidden;
		    text-overflow: ellipsis;
	    }
	    .content{
	    	overflow: hidden;
	    }
	    img{
	    	width: 100%
	    }
	    .productIntroductionImg1{
    	    margin: 0.3rem auto;
    	    box-sizing: border-box;
	    }
	    .productIntroductionSubTitle{
    	    font-family: PingFangSC-Regular;
		    font-size: 0.32rem;
		    color: #000;
		    letter-spacing: 0.01rem;
		    text-align: center;
		    margin-bottom: 0.1rem;
		    padding: 0 0.5rem;
		    box-sizing: border-box;
	    }
	    .productIntroductionDec{
	    	box-sizing: border-box;
    	    font-family: PingFangSC-Regular;
		    font-size: 0.26rem;
		    color: #707070;
		    margin-bottom: 0.3rem;
		    padding: 0 0.5rem;
		    text-align: left;
	    }
	}

	.app-down{
		width: 7.5rem;
	    height: 0.88rem;
	    position: fixed;
	    margin: 0 auto;
	    bottom: 0;
	    background: #fff;
	    border-top: 1px solid #eaeaea;
	    z-index: 3;
	    ul{
	        display: table;
			width: 100%;
			height: 0.88rem;
			vertical-align: middle;
		    li{
		    	display: table-cell;
			    vertical-align: middle;
			    font-size: 0.3rem;
			    text-align: center;
			    width: 33.3%;
			    &:nth-child(1){
				    background-color: #fff;
				    position: relative;
				    
			    }
			    &:nth-child(2){
			        background-color: #f5f5f5;
			    }
			    &:nth-child(3){
			    	background-color: #FFD444;
			    }
			    i{
			    	font-size: 0.37rem;
		    	    color: rgb(0, 0, 0);
    	            position:absolute;
    	           top: 30%;
    	            &:nth-child(1){
    	            	
    	            	left: 30%;
    	            }
    	            &:nth-child(2){
    	            	left: 60%;
    	            	
    	            }

			    }
			    .totle{
			    	background-color: #ffd444;
			    	font-size: 0.2rem;
			    	width: 0.35rem;
			    	height: 0.35rem;
			    	line-height: 0.36rem;
	    		    position: absolute;
				    top: 0.14rem;
				    left: 70%;
				    display: block;
				    text-align: center;
				    border-radius: 50%;
			    }
		    }
	    }
	}
}

</style>