<template>
	<div id="userCenterPage">
		<header class="header">
			<h3>我</h3>
		</header>
		<div class="userinfo">
			<img src="../assets/img-w/default_portrait.png"/>
			<div class="user">
				<p class="user-name">wow_{{phone}}</p>
				<p class="show-signature"></p>
			</div>
			<i class="iconfont icon-gengduo"></i>
		</div>

		<div class="order-all">
			<div class="title">全部订单</div>
			<ul>
				<li><a href="javascript:;">
                        <img src="../assets/img-w/waite-pay.png">
                        <div>
                            <span>待付款</span>
                            <i class="iconfont icon-gengduo"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="../assets/img-w/waite-delivery.png">
                        <div>
                            <span>待发货</span>
                            <i class="iconfont icon-gengduo"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="../assets/img-w/waite-goods.png">
                        <div>
                            <span>待收货</span>
                            <i class="iconfont icon-gengduo"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="../assets/img-w/finished.png">
                        <div>
                            <span>待评论</span>
                            <i class="iconfont icon-gengduo"></i>
                        </div>
                    </a>
                </li>
			</ul>
		</div>

		<div class="gift">
            <span>我的收藏</span>
            <i class="iconfont icon-gengduo"></i>
        </div>
        <div class="gift">
            <span>我的礼券</span>
            <i class="iconfont icon-gengduo"></i>
    	</div>
    	<div class="gift">
            <a href="javaScript:;">
                <span>客服电话</span>
                <span class="telephone-time">周一至周五  9:00 - 18:30 </span>
                <i class="iconfont icon-gengduo"></i>
            </a>
        </div>
        <button class="signout" @click="logout">退出登录</button>
	</div>

</template>

<script>
export default {
	data(){
		return {
			phone:''//假定的用户命
		}
	},
	mounted(){
		this.$store.commit("footpath","我")
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:false,setName:"消息"})
		this.$store.commit("footIshow",true)
		//判断用户是否登陆
		var cookieAll = document.cookie.split(";")
		var flag = true
		for(var i =0; i <cookieAll.length; i++){
			if(cookieAll[i].indexOf("userId")!=-1){				
				var name = cookieAll[i].split("=")
				if(name[1]==""){
					flag = true;
				
				}else{
					this.phone = name[1]
					flag = false
				}
				
			}else{
				flag = true
			}
		}
		if(flag){
			this.$router.push("/login")
		}
	},
	methods:{
		logout(){
			document.cookie = "userId=;value=bb;expires=1;"
			this.$router.push("/")
		}
	}
}
</script>

<style scoped lang="scss">
	#userCenterPage{
	     width: 100%;
	     height: 100%;  
		 background: #f5f5f5;
		 padding-bottom: 2rem;
		   .header{
			background: #fff;
			height: 0.88rem;
			line-height: 0.88rem;
			-webkit-box-sizing: border-box;
			position: relative;
			padding: 0rem 0.2rem 0rem 0.2rem;
			border-bottom: 1px solid #f5f5f5;
			h3{
				position: absolute;
				left: 50%;
				top: 50%;
				-webkit-transform:translate(-50%,-50%);
				font-size: 0.34rem;
				margin: 0;
				padding: 0;
				border: 0;
		    }
		}
		.userinfo{
			width:100%;
			height:1.4rem;
			background-color:#fff;
			margin:0.3rem 0rem;
			position:relative;
			img{
				display: inline-block;
				vertical-align: middle;
				width:1rem;
				height:1rem;
				margin:0.2rem 0.3rem;
			}
			.user{
				width:5rem;
				display: inline-block;
				vertical-align: middle;
				.user-name{
					height:0.48rem;
					line-height: 0.48rem;
					color:#000;
					font-size: 0.34rem;
					white-space:nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
				}
				.show-signature{
					width:5rem;
					height:0.34rem;
					line-height: 0.34rem;
					color:#808080;
					font-size: 0.24rem;
					overflow:hidden;
				}
			}
			i{
				color:#ccc;
				font-size: 0.36rem;
				position:absolute;
				right: 0.3rem;
				top:50%;
				-webkit-transform:translateY(-50%);
			}
		}
		.order-all{
			width:100%;
			background-color:#fff;
			padding-left:0.3rem;
			-webkit-box-sizing:border-box;
			margin-bottom:0.3rem;
			.title{
				width:100%;
				height:1rem;
				line-height: 1rem;
				font-size: 0.3rem;
				color:#000;
				border-bottom:1px solid #EAEAEA;
				-webkit-box-sizing:border-box;
			}
			ul{
				li{
					height:1rem;
					line-height: 1rem;
					a{
						display:block;
						width:100%;
						height:100%;
						color:#2C3030;
						img{
							width:0.48rem;
							height:0.48rem;
							margin-right: 0.1rem;
							float:left;
							display:inline-block;
							vertical-align:middle;
							margin-top: 0.25rem;
						}
						div{
							width:6.51rem;
							height:1rem;
							line-height: 1rem;
							display:inline-block;
							vertical-align:middle;
							font-size: 0.26rem;
							color:#4A4A4A;
							border-bottom:1px solid #EAEAEA;
							-webkit-box-sizing:border-box;
							position:relative;
							float: left;
							span{		
							display:inline-block;
							vertical-align:middle;
							}
							i{
								color:#ccc;
								font-size: 0.36rem;
								position:absolute;
								right: 0.3rem;
								top:50%;
								-webkit-transform:translateY(-50%);
								display:inline-block;
								vertical-align:middle;
							}
						}
					}
				}
			}
		}
		.gift{
			width:100%;
			height:1rem;
			line-height: 1rem;
			position:relative;
			background-color:#fff;
			border-top:1px solid #eaeaea;
			span{
				font-size: 0.3rem;
				color:#000;
				margin-left: 0.3rem;
				display:inline-block;
				vertical-align:middle;
				margin-top: -0.3rem;
			}
			i{
				color:#ccc;
			    font-size: 0.36rem;
				position:absolute;
				right: 0.3rem;
				top:50%;
				-webkit-transform:translateY(-50%);
				display:inline-block;
				vertical-align:middle;
			}
			a{
				color:#2C3030;
				.telephone-time{
					margin-left: 2.4rem;
					color:#ccc;
					font-size: 0.2rem;

				}
			}
		}
		.signout{
			outline: none;
			width:100%;
			height:1rem;
			font-size:0.3rem;
			color:#FF7070;
			text-align: center;
			background-color:#fff;
			border:0;
		}
	}
</style>