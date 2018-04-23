import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import category from '../components/category'
import shoppingCart from '../components/shoppingCart'
import information from '../components/information'
import my from '../components/my'
import list from '../components/list';
import topic from '../components/topic';
import productGroup from '../components/productGroup';
import details from '../components/details'
import search from '../components/search'
import searchList from '../components/searchList'
import register from '../components/register'
import login from '../components/login'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:home
    },
    {
    	path:"/category",
    	component:category
    },
    {
        path:"/category/:id",
        component:list
    },
    {
    	path:"/shopping",
    	component:shoppingCart
    },
    {
    	path:"/information",
    	component:information
    },
    {
    	path:"/my",
    	component:my
    },
    {
        path:"/topic/:id",
        component:topic
    },
    {
        path:"/productGroup/:id",
        component:productGroup
    },
    {
        path:"/details/:id",
        component:details
    },
    {
        path:"/search",
        component:search
    },
    {
        path:"/searchList/:id",
        component:searchList
    },
    {
        path:"/register",
        component:register
    },
    {
        path:"/login",
        component:login
    }
  ]
})
