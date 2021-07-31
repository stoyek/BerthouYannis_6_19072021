function vote(userId, userChoice, sauce) {
  let usersLiked = sauce.usersLiked;
  let usersDisliked = sauce.usersDisliked;

  switch (userChoice) {
    case 1:
      usersLiked.push(userId);
      break;
    case -1:
      usersDisliked.push(userId);
      break;
    case 0:
      if (usersLiked.find((u) => u === userId)) {
        const index = usersLiked.indexOf(userId);
        usersLiked.splice(index, 1);
      } else {
        const index = usersDisliked.indexOf(userId);
        usersDisliked.splice(index, 1);
      }
      break;
  }
  return sauce;
}

module.exports = vote;