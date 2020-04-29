import toast from './toast.vue'

const obj = {}

obj.install = function (vue) {
    const toastconstrustor = vue.extend(toast)
    const Toast = new toastconstrustor()
  
    Toast.$mount(document.createElement('div'))
    
    document.body.appendChild(Toast.$el)
    vue.prototype.$Toast = Toast;
    
    // console.log(toast.$el);
    
  }
export default obj