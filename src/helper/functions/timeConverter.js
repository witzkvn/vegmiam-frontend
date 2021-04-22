export const timeConvert = (timeInMinutes) => {
  const hours = (timeInMinutes / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return rhours + "h" + rminutes;
}

export const getReadableDate = date => {
  if (!date) return
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }
  return new Date(date).toLocaleDateString('fr-FR', options)
}

