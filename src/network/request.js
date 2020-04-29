import axios from 'axios'

export function request(config){
  return new Promise((resolve,reject) => {
        
const intance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/h8',
    timeout:5000
})
intance(config)
.then(res=>{resolve(res)})
.catch(err=>{reject(err)})
})
    }