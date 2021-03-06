export default function ({redirect, app}) {
    var _ac = app.$cookies.get('hbGciOiJIUzI1NiJ9')
    var _tk = app.$cookies.get('auth._token.local')

    if(!_ac) {
        redirect('/login')  
    } else {
        app.$axios.defaults.headers.common['Authorization'] = _tk
    }

    
  }