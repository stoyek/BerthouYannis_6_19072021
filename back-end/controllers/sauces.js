const Sauce = require("../models/Sauce");
const vote = require("./vote");
const fs = require("fs");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.postSauces = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifié !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.deleteSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "objet modifié ! " }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const sauceObj = vote(req.body.userId, req.body.like, sauce);
      sauceObj.likes = sauceObj.usersLiked.length;
      sauceObj.dislikes = sauceObj.usersDisliked.length;

      Sauce.updateOne({ _id: req.params.id }, sauceObj)
        .then(() => res.status(200).json({ message: "Like modifié !" }))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
