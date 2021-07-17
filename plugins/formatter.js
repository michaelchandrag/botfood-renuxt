export default (context, inject) => {
  const toIDR = (value) => (value == null) ? '-' : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value)
  inject('toIDR', toIDR)
}