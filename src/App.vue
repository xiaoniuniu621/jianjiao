<template>
  <div id="app">
    <headSearch></headSearch>
    <headHome></headHome>
    <router-view></router-view>
    <footAll></footAll>
  </div>
</template>

<script>
	document.documentElement.style.fontSize=window.innerWidth/750*100+'px'
	import headSearch from "./components/headAndfoot/headSearch";
	import headHome from "./components/headAndfoot/headHome";
	import footAll from "./components/headAndfoot/footer";
	
export default {
	data(){
		return {
			
		}
	},
	components:{
		headSearch,
		footAll,
		headHome
	}
}
</script>

<style>
html{
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	font-size:50px;
}
body,p,ul,li,dl,dt,input{
	margin: 0;
	padding: 0;
}
img{
	border: 0;
}
a{
	text-decoration: none;
}
ul{
	list-style:none;
}
</style>
