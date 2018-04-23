<template>
	<div id="search">
		<header class="header">
			<div id="searchInfor">	
				<img src="../assets/img-w/searchIcon.png" id="searchIcon">
				<input type="search" name="searchInput" id="searchInput" @keyup="onInputKeyup" v-model="val" placeholder="搜索我的尖叫好物">
			</div>
			<a href="#/" class="header-right">
        		<img src="../assets/img-w/login-home.png">
    		</a>
		</header>
	<div class="searchCon">
    <div class="hot">
        <p class="hotTitle">热门搜索</p>
        <div class="keyword">
            <span @click="searchHotkeyword">尖叫设计</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">暖手宝</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">沙发</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">杯子</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">餐具</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">茶具</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">吊灯</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">厨房</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">儿童</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">HAY</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">Arabia</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">家饰</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">收纳</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">床上用品</span>
        </div>
        <div class="keyword">
            <span @click="searchHotkeyword">旅行</span>
        </div>
    </div>

    <div class="history">
        <div class="historyTop">
            <p class="historyTitle">历史搜索</p>
    
            <div class="cleanSearchDiv">
                <img src="/static/img/cleanSearchIcon.png" class="cleanSearchIcon" id="cleanSearchIcon">
            </div>

        </div>

        <div id="searchHistory"></div>
    </div>

</div>

	</div>
	
</template>

<script>
export default{
	data(){
		return{
			val:''
		}
	},
	methods:{
		searchHotkeyword(e){
			this.$router.push(`/searchList/${e.target.innerText}`)
		},
		onInputKeyup(e){		
			if(e.keyCode === 13){
				this.$router.push(`/searchList/${this.val}`)
			}
		}
	},
	mounted(){
		this.$store.commit("footpath","我")
		this.$store.commit("headIshow",false)
		this.$store.commit("headHomeShow",{flag:false,setName:"消息"})
		this.$store.commit("footIshow",false)
	}
}
</script>

<style scoped lang="scss">
	#search{
	     width: 100%;
		 background: #fff;
		.header{
			background: #fff;
			height: 0.88rem;
			line-height: 0.88rem;
			-webkit-box-sizing: border-box;
			position: relative;
			padding: 0rem 0.2rem 0rem 0.2rem;
			border-bottom: 1px solid #f5f5f5;
			img{
				display:inline-block;
				width:0.52rem;
				margin-top: 0.06rem;
				margin-bottom: 0.06rem;
				vertical-align:middle;
			}
			  #searchInfor{
				display: inline-block;
				position:relative;
				width:5.4rem;
				height:0.56rem;
				line-height: 0.56rem;
				vertical-align: middle;
				background-color:#F5F5F5;
				border-radius:0.3rem;
				margin-left:0.15rem;
				margin-bottom: 0.1rem;
				#searchIcon{
					display:inline-block;
					width:0.4rem;
					vertical-align:middle;
					margin:0 0.1rem;
					position:absolute;
					left:0.1rem;
					top:0.1rem;
					z-index: 1;
				}
				#searchInput{
					background-color:#F5F5F5;
					display: inline-block;
					width:80%;
					height:0.54rem;
					border:none;
					outline: none;
					position:absolute;
					left:0.7rem;
					font-size: 0.2rem;
				}
			}
			.header-right{
				display:inline-block;
				width:0.64rem;
				height:0.64rem;
				line-height: 0.5rem;
				position:absolute;
				right:0.2rem;
				top:50%;
				-webkit-transform:translateY(-50%);
				border-radius:50%;
			}
		}
		.searchCon{
			margin-top:0.1rem;
			font-size:0.24rem;
			.hot{
				padding:0.36rem  0.32rem  0rem;
				.hotTitle{
					color:#808080;
					margin-bottom:0.3rem;
				}
				.keyword{
					display:inline-block;
					margin-bottom:0.6rem;
					margin-right:0.2rem;
					span{
						font-size:0.24rem;
						color:#000;
						text-align:center;
						padding:0.2rem  0.3rem;
						background-color:#F5F5F5;
						margin-right:0.2rem;
						margin-bottom:0.2rem;
					}
				}
			}
			.history{
				padding:0.36rem  0.32rem  0rem;
				.historyTop{
					.historyTitle{
						width:85%;
						display:inline-block;
						color:#808080;
						margin-bottom:0.3rem;
					}
					.cleanSearchDiv{
						width:13.5%;
						display:inline-block;
						.cleanSearchIcon{
							margin-left:0.6rem;
							width:0.28rem;
							height:0.28rem;
							border:none;
						}
					}
				}
			}
		}
	}
</style>