import axiosSsr from "~/lib/axios-ssr"
import menu from '~/data/menu'
import _ from 'lodash'

export default function ({
  redirect,
  app,
  route
}) {
  var _ac = app.$cookies.get('hbGciOiJIUzI1NiJ9')
  var _tk = app.$cookies.get('_tk')
  const user = app.store.state.user.user

  //save data to store
  // if (!user.is_master) {
  //   axiosSsr.get('/me').then(r => {
  //     if (r.data.success) {
  //       app.store.commit('user/setUser', r.data.data)
  //     }
  //   })
  // }
  // console.log(route.name);

  const userLevel = app.store.state.user.user.is_master ? 1 : 2

  // create all menu to one level
  const allMenu = []
  menu.forEach(m => {
    allMenu.push(m)
    if (m.child.length) {
      m.child.forEach(sub => {
        allMenu.push(sub)
      })
    }
  });

  const nowPage = _.filter(allMenu, [
    'route', route.name
  ])

  if (!nowPage[0].level.includes(userLevel)) {
    redirect('/error/403')
  }


  if (_ac == "RwOlwvXC9hcGkuYm90Zm9vZC54eXoiLCJkYXRhIjp7ImJyYW5kIjp7Im") {
    // app.$axios.defaults.headers.common['Authorization'] = 'Bearer '+_tk
  } else {
    redirect('/login')
  }





}
