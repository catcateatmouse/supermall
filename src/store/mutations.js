export default {
    addcount(state,oldproduct){
     oldproduct.count += 1
    },
    addproduct(state,payload){
        payload.check = true
        payload.count = 1
    state.cartlist.push(payload)
 }
         // 添加商品查询是否重复
         
         // let oldproduct = null;
       
         // for(let item of state.cartlist){
            
         //     if (item.iid === payload.iid){
         //         oldproduct = item;
         //     }
         //     if(oldproduct){
         //         oldproduct.count +=1
         //     }
         //     else{
         //         payload.count = 1 ;
         //         state.cartlist.push(payload)
                 
         //     }
         // }
         // if(state.cartlist.length == 0)
         // {   payload.count = 1
         //     state.cartlist.push(payload)}
         
         
         // console.log(state.cartlist);
         // console.log(state.cartlist.length==0);
     // }
 }