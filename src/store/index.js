import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)//注册

import axios from "axios"
const store = new Vuex.Store({
	state:{
		allList:[],
		FurnitureList:[],
		FurnishingList:[],
		activityList:[],
		isShow:true,
		topicObj:{},
		headIshow:true,
		headHomeShow:false,
		setName:"",
		footIshow:true,//判断尾部栏是否显示
		isImg:"",//判断头部显示的图片
		isText:false,//判断是头部是编辑还是图片
		editOrFinish:true,//判断购物车是编辑或完成
		footpath:"",//判断尾部是高亮显示哪个分栏

	},
	actions:{
		getAllList(store){
			axios.get("v2/page?pageId=1&tabId=1&_=1523933596172")
			.then(function(res){
				store.commit("setAllList",res.data.data.modules)
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getFurnitureList(store){
			axios.get("v2/page?pageId=1&tabId=10005&_=1524013347692")
			.then(function(res){
				store.commit("setFurnitureList",res.data.data.modules)
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getFurnishingList(store){
			axios.get("v2/page?pageId=1&tabId=10006&_=1524022238215")
			.then(function(res){
				store.commit("setFurnishingList",res.data.data.modules)
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getActivityList(store){
			axios.get("v2/page?pageId=1&tabId=10010&_=1524022528598")
			.then(function(res){
				store.commit("setActivityList",res.data.data.modules)
			})
			.catch(function(err){
				console.log(err)
			})
		}
	},
	mutations:{
			setAllList(state,data){
				state.allList = data
			},
			setFurnitureList(state,data){
				state.FurnitureList = data
			},
			setFurnishingList(state,data){
				state.FurnishingList = data
			},
			setActivityList(state,data){
				state.activityList = data
			},
			isShow(state,data){
				state.isShow = data
			},
			topicObj(state,data){
				state.topicObj = data
			},
			headIshow(state,data){
				state.headIshow = data
			},
			headHomeShow(state,data){
				state.setName = data.setName				
				state.headHomeShow = data.flag	
			},
			footIshow(state,data){
				state.footIshow = data
			},
			isImg(state,data){
				state.isImg = data				
			},
			editOrFinish(state,data){
				state.editOrFinish = data
			},
			isText(state,data){
				state.isText = data
			},
			footpath(state,data){
				state.footpath = data
			}
	}
})
export default store