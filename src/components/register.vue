<template>
		<div id="register">
		<header>
			<h3>注册</h3>
			<router-link to="/login"><a href="#" class="header-right">登录</a></router-link>
		</header>
		<div class="tabbox">
			<div class="frombox">
			<form action="/register" method="post">
				<input type="text" placeholder="请输入手机号" class="phone" v-model="phone" name="phone" maxlength="11" />
				<input type="password" placeholder="请输入密码" class="password"  v-model="password"/>
				<div id="Verificationcode">
					<input type="text" placeholder="请输入图形验证码" class="codeImg" name="codeImg" v-model="code"/>
					<input type="text" class="forget" value="换一张"  @click="refreshCode()"/>
					<p id="code">{{num}}</p>

				</div>
			</form>
			</div>
		</div>
		
		<input type="button" value="注册" @click="enter()"/>
		<div class="errorTip">
		<transition name="slide-fade">
	            <p v-if="show">请输入正确的手机号码</p>
	    </transition>
	    <transition name="slide-fade3">
	            <p v-if="passworderr">请输入密码</p>
	    </transition>
	    <transition name="slide-fade1">
	            <p v-if="codeErr">验证码错误</p>
	    </transition>
	    <transition name="slide-fade2">
	            <p v-if="err">该手机号已注册，请直接登录</p>
	    </transition>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import router from '../router';
	export default{
		data(){
			return{
				phone:'',
				num:'1211',
				password:'',
				code:'',
				show:false,
				err:false,
				passworderr:false,
				codeErr:false		
			}
		},
		methods:{
		refreshCode:function(){
				var num = '';
				for(var i=0; i<4; i++){
					num += Math.floor(Math.random()*10);
				}
				this.num = num;
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
                	this.passworderr = true;
                	setTimeout(() => {  
                		this.passworderr = false; 
           			}, 2000);
           			return;
                }else{
                if(this.code !== this.num){
					this.codeErr = true;
					setTimeout(() => {  
                		this.codeErr = false; 
           			}, 2000);
           			return;
				}else{
					axios.post('/users/register', {
						phone:this.phone,
			          	password:this.password
					}).then( (response)=> {
						console.log(response.data);
						if(response.data == true){
							this.err = false;
							router.push('/login');
						}else{
							this.err = true;
							setTimeout(() => {  
	                		this.err = false; 
	           				}, 2000);	
	           				return;				
						}
					}).catch(function (error) {
						console.log(error);
					});				
				}                	

                }


		}

		}
	}

</script>

<style scoped lang="scss">
#register{
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
		//height: 3.5rem;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 0.3rem;
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
			.password{				
				border-bottom: 1px solid #EAEAEA;				
			}
			#Verificationcode{
			   position: relative;
			   height: 1rem;
				.codeImg{
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
				P{
					position: absolute;
					top:0.2rem;
					left: 3.5rem;
					font-size: 0.6rem;
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
		top:5.9rem;
		left:50%;
		-webkit-transform:translateX(-50%);
		border:none;
		outline:none;
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
			bottom:4rem;
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