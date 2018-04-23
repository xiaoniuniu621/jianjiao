<template>
  <div class="box" id='box'>
      <div class="swiper-container" >
        <div class="swiper-wrapper">
          <div v-for='(data,key) in infomation' :class="categoryId==data?'on swiper-slide':'swiper-slide'"  @click="handlclick(data)">
              <a href="javascript:;">
                    <img v-if="key=='All'" class="icon-image" :src='img'>
                    <p>{{key}}</p>
              </a>
          </div>
          <div class="swiper-slide" style="border:0">
          </div>
           <div class="swiper-slide" style="border:0">
          </div>
           <div class="swiper-slide" style="border:0">
          </div>
          <div class="swiper-slide" style="border:0">
          </div>
          <div class="swiper-slide" style="border:0">
          </div>
         
        </div>
      </div>
  </div>
</template>

<script>
	export default {
		data(){
			return {
        infomation:null,
        img:null,
        imgbac:null,
        categoryId:null
			}
		},
    mounted(){
      this.categoryId=this.$route.params.id.split('=')[1]
      this.infomation=require("../../assets/json/infomation")
      var data=this.infomation.result
      for(var key in data){
        if(data[key].category==this.categoryId){
          this.infomation=data[key].text;
          this.img=data[key].img;
          this.imgbac=data[key].imgbac;
        }
      }

      var box=document.getElementById('box')
      box.style.background="url('"+this.imgbac+"') no-repeat left center";
      box.style.backgroundSize="7.5rem"

      var mySwiper = new Swiper('.swiper-container',{
        slidesPerView :4,
        slidesPerGroup : 1/*,
        spaceBetween :15,
        slidesOffsetBefore :15,*/
      })
    },
    methods:{
      handlclick(categoryId){
        this.categoryId=categoryId;
          this.$emit('event',categoryId)
      }
    },
    updata(){
      var mySwiper = new Swiper('.swiper-container',{
        slidesPerView :4,
        slidesPerGroup : 1/*,
        spaceBetween :15,
        slidesOffsetBefore :15,*/
      })
    }
	}
</script>

<style  scoped lang="scss">
body,div{
  margin: 0;
  padding: 0
}
.box{
    //background: url("../../assets/img/beijing.jpg") no-repeat left center;
    
    //background-size: 7.5rem;
    position: relative;
    height: 1.6rem;
    padding: 0.3rem 0rem;
    .swiper-container{
      position: relative;
      height: 100%;
      .swiper-wrapper{
        height:100%;
        position: relative;
          .swiper-slide{
            margin-left: 0.3rem;
            width: 1.6rem;
            height: 1.6rem;
            box-sizing: border-box;
            text-align: center;
            font-size: 0.26rem;
            font-weight: 700;
            color: #fff;
            display: flex;
            justify-content:center;
            align-items:center;
            border:1px solid rgba(255, 255, 255, 0.2);
            a{
              color: #fff;
              display: block;
              padding: 0 0.25rem;
            }
          }
          .icon-image{
            width: 0.8rem;
            margin: 0 auto;
          }
          .on{
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 1);

          }

      }
    }
}

</style>
