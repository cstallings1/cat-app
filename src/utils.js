module.exports = {
  isFavorite(favorites, cardId) {
    const index = favorites.findIndex((o) => {
      return o.id === cardId;
    });

    return index > -1;
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
}