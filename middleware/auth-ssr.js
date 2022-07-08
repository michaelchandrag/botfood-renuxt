import axiosSsr from "~/lib/axios-ssr"
export default function ({redirect, app}) {
    var _ac = app.$cookies.get('hbGciOiJIUzI1NiJ9')
    var _tk = app.$cookies.get('_tk')
    const user = app.store.state.user.user

    //save data to store
    if(!user.is_master) {
      axiosSsr.get('/me').then(r=>{
        if(r.data.success) {
          app.store.commit('user/setUser', r.data.data)
        }
      })
    }

    if(_ac=="RwOlwvXC9hcGkuYm90Zm9vZC54eXoiLCJkYXRhIjp7ImJyYW5kIjp7Im") {
        // app.$axios.defaults.headers.common['Authorization'] = 'Bearer '+_tk
    } else {
        redirect('/login')
    }
  }
