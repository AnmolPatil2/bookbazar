  <template>
      

  <md-card class="long-show">
      <div class="md-title" id="multi-title">best sell</div>
      <!--hover 
      <div class="card">
        <div class="image"></div>
        <div class="details">
          <div class="center">
            <h1>
              Someone famous
              <br />
              <span>team leader</span>
            </h1>
            <p>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
          </div>
        </div>
      </div>
      -->
      <swiper :options="swiperOption">
        <div v-for="(product,index) in products" :key="index">
          <div class="cardh">
            <div class="imageh">
              <img :src="product.images" class="card-img-top bbb" alt="...." />
            </div>
            <div class="detailsh">
              <div class="centerh">
                <h1>
                  Someone famous
                  <br />
                  <span>team leader</span>
                </h1>
                <p>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
        </div>
      </swiper>

      <md-card-actions></md-card-actions>

      <!-- swiper  -->
      <swiper :options="swiperOption" class="swipers">
        <swiper-slide v-for="(product,index) in products" :key="index">
          <v-responsive class>
            <v-container hide-delimiters class>
              <v-card>
                <div class="cardh">
                  <div class="imageh">
                    <img :src="product.images" class="card-img-top bbb" alt="...." />
                  </div>
                  <div class="detailsh">
                    <div class="centerh">
                      <h1>
                        Someone famous
                        <br />
                        <span>team leader</span>
                      </h1>
                      <p>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-container>
          </v-responsive>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </md-card>
    </md-card>    
      <template>