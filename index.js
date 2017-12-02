new Vue({
    el: '#app',
    data() {
        return {
            reg:  /^([a-zA-Z0-9_-])+@qq.com$/,
            length: 20,
            flag: false
        }
    },
    components: {
      'ui-input': {
        template: `<div>
                    邮箱: <input :readonly='onlyread'
                          v-model="val"
                          :class=" temp ? 'ok': 'no'"
                          :style="val ? null : 'outline-color: transparent'"/>
                      <span :style="!val ? 'color: gold' : temp ? 'color: lime' : 'color: red'">{{ !val ? '请输入qq邮箱, 以@qq.com结尾' : !temp ? '格式错误,请按规则输入,以qq.com结尾的邮箱' : '正确' }}</span>
                      <br />
                      <span v-if="len !== Infinity" :style="countL ? 'color: lime' : 'color: red'">还可以输入{{countL}}字</span>
                   </div>`,
        props: {
          reg: {
            type: RegExp,
            default: null,
            require: false
          },
          len: {
            type: Number,
            default: Infinity,
            require: false
          },
          onlyread: {
            type: Boolean,
            default: false,
            require: false
          }
        },
        data() {
           return {
                   val: ''
                 }
        },
        methods: {
          count() {
             var len = this.val.length,
                 c = 0
             for(var l = 0; l < len; l ++) {
                if(this.val[l].charCodeAt() > 127) {
                  c += 2
                } else {
                  c ++
                }
                if(c >= this.len) {
                   this.val = this.val.slice(0, l+1)
                   return c
                }
             }
             if(this.val=='') {
               return 0
             }
             return c
          }
        },
        computed: {
              temp() {
                return this.reg.test(this.val)
              },
              countL() {
                return this.len - this.count()
              }
        },
        watch: {
          val() {
            console.log('change')
          }
        }
      }
    },
})
