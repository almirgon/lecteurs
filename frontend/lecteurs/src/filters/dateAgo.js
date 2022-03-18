const dateAgo = value => {
  if (value) {
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    if (seconds < 29) return "Agora á pouco";
    const intervals = {
      ano: 31536000,
      mês: 2592000,
      semana: 604800,
      dia: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
    };
    let counter;
    for (const i in intervals) {
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0)
        if (counter === 1) {
          return counter + " " + i + " atrás";
        } else {
          return counter + " " + i + "s atrás";
        }
    }
  }
  return value;
};

export default dateAgo;
