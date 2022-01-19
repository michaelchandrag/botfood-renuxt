export default function ({
  redirect,
  app
}) {
  const _ac = app.$cookies.get('hbGciOiJIUzI1NiJ9')
  const _tk = app.$cookies.get('_tk')

  if (_ac == 'RwOlwvXC9hcGkuYm90Zm9vZC54eXoiLCJkYXRhIjp7ImJyYW5kIjp7Im') {
    // app.$axios.defaults.headers.common['Authorization'] = 'Bearer '+_tk
  } else {
    redirect('/login')
  }
}
