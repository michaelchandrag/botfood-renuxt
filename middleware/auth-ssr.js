export default function ({redirect, app}) {
    var _tk = app.$cookies.get('hbGciOiJIUzI1NiJ9')

    if(!_tk) {
        redirect('/login')  
    } 
  }