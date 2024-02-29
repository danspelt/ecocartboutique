export const round2 = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export function convertDocToObj(doc) {
  doc._id = doc._id.toString()
  return doc
}

export const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatId = (x) => {
  return `..${x.substring(20, 24)}`
}
