<template>
<div class="productColorSwiper" v-if='data.length'>
    <div class="swiper-container" style="height:auto;">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="value in data">
          <a href="javascript:;">
            <div class="a-top">
              <img class="lazy"  :src="value.productImg" >
            </div>
            <div class="a-bottom">
              <span>{{value.specDesc}}</span>
            </div>
          </a>
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
		props:['data'],
    mounted(){
      var mySwiper = new Swiper('.swiper-container',{
        slidesPerView : 4.5,
        slidesPerGroup : 1
      })
    }
	}
</script>

<style  scoped lang="scss">
.productColorSwiper{
    background-color: #fff;
    padding: 0.3rem 0rem 0.2rem;
    margin-bottom: 0.3rem;
    box-sizing: border-box;
    .swiper-container{
      width:100%;
      height: 2.06rem;
      overflow:hidden;
      box-sizing:border-box;
      .swiper-slide{
        width: 1.72rem;
        background: #fff;
        font-size: 0;
        text-align: center;
        display: flex;
        justify-content:center;
        align-items: center;
        a{
          display: block;
          width: 1.72rem;
          font-size: 0;
          color:#000;
          background-color: transparent;
          box-sizing: border-box;
          img{
            width: 1.4rem;
            height: 1.4rem;
            margin:0 auto;
          }
          .a-bottom{
            font-size: 0;
            margin-top:0.1rem;
            border-right:1px solid #eaeaea;
            span{
              font-size: 0.22rem;
              color: #C1C0C6;
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
}
</style>
