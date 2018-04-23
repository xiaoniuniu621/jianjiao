<template>
	<div id="message">
		<!-- <header class="header">
			<a href="#" class="header-left"><img src="../assets/img-w/login-home.png"></a>
			<h3>消息中心</h3>
			<router-link to="/register"><a href="#" class="header-right"><img src="../assets/img-w/me.png"></a></router-link>
		</header> -->
		<div class="columnList">
			<div id="commentRoot">
				<div class="messageInfor">
					<img src="../assets/img-w/official_message.png" class="messageIcon">
					<div class="messageInforRihgt">
						<div class="messageInforRihgtTop">
							<span class="columnName">尖叫精选</span>
							<a href="#" class="columnTitleRight">
							<i class="iconfont icon-gengduo"></i>
							</a>
						</div>
						<a href="#">
							<p class="messageContent">致世间最美的微醺，至少得用这样的酒具</p>
							<p class="messageFlag">•</p>
							<p class="messageTime"> 23小时前</p>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="columnList">
			<div id="commentRoot">
				<div class="messageInfor">
					<img src="../assets/img-w/official_message.png" class="messageIcon">
					<div class="messageInforRihgt">
						<div class="messageInforRihgtTop">
							<span class="columnName">系统通知</span>
							<a href="#" class="columnTitleRight">
							<i class="iconfont icon-gengduo"></i>
							</a>
						</div>
						<a href="#">
							<p class="messageContent">欢迎加入尖叫设计，我们已将9张优惠券送入您的账户中，请查收</p>
							<p class="messageFlag">•</p>
							<p class="messageTime"> 2天前</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {

		}
	},
	mounted(){
		this.$store.commit("footpath","消息")
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:true,setName:"消息"})
		this.$store.commit("footIshow",false)
		this.$store.commit("isText",false)
		this.$store.commit("isImg",'/static/img/me.png')
		//判断用户是否登陆
		var cookieAll = document.cookie.split(";")
		var flag = true
		for(var i =0; i <cookieAll.length; i++){
			if(cookieAll[i].indexOf("userId")!=-1){				
				var name = cookieAll[i].split("=")
				if(name[1]==""){
					flag = true;
				
				}else{
					
					flag = false
				}
				
			}else{
				flag = true
			}
		}
		if(flag){
			this.$router.push("/login")
		}
		
	}
}
</script>

<style scoped lang="scss">
	#message{
	     width: 100%;    
		 background: #f5f5f5;
		.header{
			background: #fff;
			height: 0.88rem;
			line-height: 0.88rem;
			-webkit-box-sizing: border-box;
			position: relative;
			padding: 0rem 0.2rem 0rem 0.2rem;
			border-bottom: 1px solid #f5f5f5;
				.header-left{
				display: inline-block;
				width: 0.64rem;
				height: 0.64rem;
				line-height: 0.5rem;
				position:absolute;
				left: 0.2rem;
				top: 50%;
				-webkit-transform: translateY(-50%);
				border-radius: 50%;
			}
			img{
				display:inline-block;
				width:0.52rem;
				margin-top: 0.06rem;
				margin-bottom: 0.06rem;
				vertical-align: middle;
			}
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
		    .header-right{
		    	display: inline-block;
				width: 0.64rem;
				height: 0.64rem;
				line-height: 0.5rem;
				position:absolute;
				right: 0.2rem;
				top: 50%;
				-webkit-transform: translateY(-50%);
				border-radius: 50%;
		    }
		}
		.columnList{
			padding:0.4rem  0.5rem;
			background:#fff;
			margin-bottom: -0.5rem;
			.messageInfor{
				position:relative;
				margin-top: 0.2rem;
				margin-bottom: 0.6rem;
				overflow:hidden;
				.messageIcon{
					float: left;
					width:0.4rem;
					height:0.4rem;

				}
				.messageInforRihgt{
					width:5.7rem;
					float:right;
					overflow: hidden;
					.messageInforRihgtTop{
						border-bottom:1px solid #EAEAEA;
						height:0.8rem;
						font-size:0.26rem;
						position:relative;
						.columnName{
							position:absolute;
							left:0;
							top:0;
							color: #65686C;
							font-weight: bold;
						}
						.columnTitleRight{
							float:right;
							color:#65686C;
							font-size: 0.22rem;
							i{
								font-size: 0.28rem;
								margin-left: 0.1rem;
							}
						}
					}
					a{
						.messageContent{
							margin-top: 0.2rem;
							color:#65686C;
							font-size: 0.26rem;
							margin-right: 0.2rem;
						}
						.messageFlag{
							position:absolute;
							right:0;
							top:0.65rem;
							color:yellow;
							font-size: 0.5rem;
							display:inline;
						}
						.messageTime{
							margin-top: 0.2rem;
							color:#ccc;
							font-size: 0.26rem;
						}
					}
				}
			}
		}
	}
</style>