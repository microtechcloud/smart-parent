const {Users,Article} = require("../../database").DB


const utils = {};




utils.getArticle = getArticle;
utils.deleteArticle = deleteArticle;
utils.modifyArticle = modifyArticle;

module.exports = utils;

function getArticle(id,start,offest,cb){

      return Article.findOne({_id:id}).then(articles=>{
          cb(null,articles);
      }).catch(err=>cb(err));
};


function deleteArticle(id,cb){
    return Article.deleteOne({
        _id:id
    },cb);
};


function modifyArticle(article,cb){
    return Article.updateOne({
        _id:article.id
    },
    article
    ).then(_doc=>{
        cb(_doc);
    }).catch(err=>cb(err));
};