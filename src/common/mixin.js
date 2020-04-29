
import {debounce} from './utils'

export const itemListenerMixin = {
    data(){
        return{
            itemimglistener:null,
            refresh:null,

        }
    },
    mounted(){
         this.refresh = debounce(this.$refs.scroll.refresh,500)
        this.itemimglistener = ()=>{ this.refresh()}
        this.$bus.$on('itemimgload',this.itemimglistener)
    }
}