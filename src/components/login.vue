<template>
	<div id="login">
		<header>
			<router-link to="/"><a href="#" class="header-left"><img src="../assets/img-w/login-home.png"></a></router-link>
			<h3>登录</h3>
			<router-link to="/register"><a href="" class="header-right">注册</a></router-link>
		</header>
		<div class="tabbox">
			<div class="hd">
				<ul>
					<li :class="{ on: isActive1 }"><a href="#" class="password-login" @click = "handleClick1()">密码登录</a></li>
					<li :class="{ on: isActive }"><a href="#" class="message-login" @click = "handleClick()">短信登录</a></li>
				</ul>
			</div>
			<div class="frombox" v-if="phoneNum">
				<input name="phone" type="text" placeholder="请输入手机号" class="phone" v-model="phone" maxlength="11"/>
				<div id="password">
					<input type="password" placeholder="请输入密码" class="password"  v-model="password"/>
					<input type="text" class="forget" value="忘记密码？"/>
				</div>
			</div>
			<div class="frombox" v-if="code">
				<input type="text" placeholder="请输入手机号" class="phone" />
				<div id="password">
					<input type="text" placeholder="请输入验证码" class="password"/>
					<input type="text" class="forget" value="获取验证码"/>
				</div>
			</div>
		</div>
		<input type="button" value="确认" @click="enter()"/>
		<p v-show="phoneNum">
		<i id="autologin" class="iconfont icon-duigou-weigouxuan" @click="duigou"></i>
		<i id="duigou" v-show="isShow" @click="duigou" class="iconfont icon-duigou"></i>
		<span>一个月内记住登录</span>
		<router-link to="/register"><a href="#">快速注册</a></router-link>
		</p>
		<div class="errorTip">
		<transition name="slide-fade">
            <p v-if="show">请输入正确的手机号码</p>
        </transition>
        <transition name="slide-fade1">
            <p v-if="show1">请输入密码</p>
        </transition>
        <transition name="slide-fade2">
            <p v-if="err">用户名和密码不匹配</p>
        </transition>
		</div>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios';
import router from '../router';
export default{
	data(){
		return{
			isShow:false,
			code:false,
			phoneNum:true,
			isActive1:true,
			isActive:false,
			show:false,
			show1:false,
			err:false,
			phone:'',
			password:''
		}
	},
	methods:{
		duigou:function(){
			this.isShow = !this.isShow;
		},
		
		handleClick:function(){
			this.code = true;
			this.phoneNum = false;
			this.isActive1 = false;
			this.isActive = true;
		},
		handleClick1:function(){
			this.code = false;
			this.phoneNum = true;
			this.isActive1 = true;
			this.isActive = false;
		},
		enter:function(){
			 var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			 if(!reg.test(this.phone)){
                    this.show = true;
                   setTimeout(() => {  
                		this.show = false; 
           			}, 2000); 
                   return;
                }else{
                	this.show = false;
                }
     
             if(this.password == ''){
             	 this.show1 = true;
             	 setTimeout(() => {  
                	this.show1 = false; 
           		}, 2000); 
             }
              axios.post("/users/login",{
	              	phone:this.phone,
	              	password:this.password
	              }).then((response)=>{
	              	if(response.data){
	              		this.err = false;
	              		router.push('/');
	              	}else{
	              		this.err = true;
	              		console.log("失败")
	              		setTimeout(() => {  
                		this.err = false; 
           			   }, 2000); 
	              	}
              })
		}
	}
}
	
</script>

<style scoped lang="scss">
#login{
	 position: fixed;
     width: 100%;
     height: 100%;
     top: 0px;     
	 background: #f5f5f5;
	header{
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
			img{
				display: inline-block;
				width: 0.52rem;
				margin-top: 0.06rem;
				margin-bottom: 0.06rem;
				vertical-align: middle;
			}
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
			position: absolute;
			height: 0.64rem;
			font-size: 0.3rem;
			right: 0.2rem;
			top: 50%;
			-webkit-transform: translateY(-50%);
			border-radius: 50%;
			color: #2C3030;
		}
	}
	.tabbox{
		width: 6.9rem;
		height: 3.5rem;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 0.3rem;
		.hd{
			height: 0.88rem;
			line-height: 0.88rem;
			font-size: 0.28rem;
			background: #FCFCFC;
			ul{
				.on{
					border-bottom: 0.06rem solid #202020;
					height: 0.88rem;
					a{
						color: #000;
					}
				}
				li{
					float: left;
					margin: 0 0.92rem;
					font-size: 0.28rem;
					padding: 0 0.24rem;
					a{
						color: #808080;
					}
				}
			}
		}
		.frombox{
			padding: 0 0.3rem;
			input{
				width: 100%;
				height: 1rem;
				outline: none;
				border: none;
				font-size: 0.28rem;
				color: #000;
				font-family: 'PingFangSC-Regular';
			}
			input::-webkit-input-placeholder {
         		color: #cecece;
        		font-size: 12px;
     }
			.phone{				
				border-bottom: 1px solid #EAEAEA;				
			}
			#password{
			   position: relative;
			   height: 1rem;
				.password{
					position: absolute;
				}
				.forget{
					width: 2rem;
					height: 1rem;
					position: absolute;
					right: 0;
					top: 0;
					text-align: right;
				}
			}
			
		}
	}
	input[type="button"]{
		margin:0 auto;
		vertical-align: middle;
		width:6.9rem;
		height:0.88rem;
		background:#FFD444;
		font-size: 0.28rem;
		position:absolute;
		top:4.9rem;
		left:50%;
		-webkit-transform:translateX(-50%);
		border:none;
		outline:none;
	}
	p{
		width: 6.9rem;
		margin:0 auto;
		margin-top: 1rem;
		height:1rem;
		line-height: 1rem;
		position: relative;

		#autologin{
			position:absolute;
			left:0;
			display:block;
			font-size: 0.5rem;
			float:left;
	}
	#duigou{
		position:absolute;
		left:0;
		display:block;
		font-size: 0.5rem;
	}
		span{
			margin-left: 0.5rem;
			font-size: 0.28rem;
			float:left;
		}
		a{
			font-weight: 400;
			font-size: 0.28rem;
			color:#000;
			float: right;
		}
	}
	.errorTip{
		p{
			width:4rem;
			height:0.8rem;
			line-height:0.8rem;
			background:#555;
			color:#fff;
			font-size:0.28rem;
			text-align:center;
			border-radius:0.2rem;
			position:absolute;
			bottom:2rem;
			left:25%;

		}
	}

	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to {
	  transform: translateX(10px);
	  opacity: 0;
	}

	.slide-fade1-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade1-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade1-enter, .slide-fade1-leave-to {
	  transform: translateX(10px);
	  opacity: 0;
	}

	.slide-fade2-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade2-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade2-enter, .slide-fade2-leave-to {
	  transform: translateX(10px);
	  opacity: 0;
	}
}
	

</style>