import axiosSsr from "~/lib/axios-ssr"
import menu from '~/data/menu'
import _, {
  now
} from 'lodash'
export default function ({
  redirect,
  app,
  route
}) {
  var _ac = app.$cookies.get('hbGciOiJIUzI1NiJ9')
  var _tk = app.$cookies.get('_tk')
  const user = app.store.state.user.user

  //save data to store
  if (!user.is_master) {
    axiosSsr.get('/me').then(r => {
      if (r.data.success) {
        app.store.commit('user/setUser', r.data.data)
      }
    })
  }
  // console.log(route.name);

  const userLevel = app.store.state.user.user.is_master ? 1 : 2
  const nowPage = _.filter(menu, [
    'route', route.name
  ])
  if (!nowPage[0]) {
    redirect('/error/404')
  } else {
    if (!nowPage[0].level.includes(userLevel)) {
      redirect('/error/403')
    }
  }

  if (_ac == "RwOlwvXC9hcGkuYm90Zm9vZC54eXoiLCJkYXRhIjp7ImJyYW5kIjp7Im") {
    // app.$axios.defaults.headers.common['Authorization'] = 'Bearer '+_tk
  } else {
    redirect('/login')
  }





}
