export default {
    addCart(context,payload){
        return new Promise((resolve,reject) =>{
            let oldproduct = context.state.cartlist.find(item => item.iid === payload.iid)
            if(oldproduct){
                // oldproduct.count += 1
                context.commit('addcount',oldproduct)
                resolve('当前加一')
            }else{
                // payload.count = 1
                // context.state.cartlist.push(payload)
                context.commit('addproduct',payload)
                resolve('添加新商品')
            }
            
        }
        )
}}