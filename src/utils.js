module.exports = {
  isFavorite(cardId) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      const index = favorites.findIndex((o) => {
        return o.id === cardId;
      });
  
      return index > -1;
    }
  },

  getFavoriteIndex(favorites, cardId) {
    const index = favorites.findIndex((o) => {
      return o.id === cardId;
    });

    return index;
  },

  getLastWord(fact) {
    const factWords = fact.split(' ');
    const lastWord = factWords[factWords.length - 1].toLowerCase();
    return lastWord;
  },

  compare(sortParam) {
    return (a, b) => {
      if (a[sortParam] < b[sortParam]) {
        return -1;
      } else if (a[sortParam] > b[sortParam]) {
        return 1;
      } else {
        return 0;
      }
    };
  },
}