import axios from 'axios'

export function request(config){
  return new Promise((resolve,reject) => {
        
const intance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
})
intance(config)
.then(res=>{resolve(res)})
.catch(err=>{reject(err)})
})
    }