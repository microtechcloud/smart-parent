const {Users,Article} = require("../database").DB
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const _articles = [];

const articles = {};

articles.save = function(req,cb){

    Users.findOne({
        "email.id":req.user.email[0].id
            }).then(user=>{
                
                if(!user){
                   
                    return cb({success:false,message:"could not find writer"})
                };
            
                let {tags,descrption,body,title,cover} = req.body
                
                return Article.create({
                        writer:user._id,
                        tags:!tags.length ? undefined : tags,
                        descrption,
                        body,
                        title,
                        cover
                    }).then(article=>{
                        
                        if(!article){
                            
                            return cb({success:false, message:"article not created"})
                        };
                        
                        user.postedArticles.push(article._id)
                        user.save(function(err){
                            // console.log("err")
                            if(!err){
                                return cb(err);   
                            };
                    
                            return cb(null,article);
                        })

                    }).catch(err=>err);

            }).catch(err=>cb(err));     

};


articles.get = function(id,params,cb){

        let _list;
       
        if(Array.isArray(id) && id.length){
           
            _list = [];

            id.map((_id,i)=>{

                return utils.getArticle(_id,!params.start ? null : params.start ,!params.offset ? null : params.offset ,(err,__article)=>{

                    _list(__article);
                });
            });

            return cb(null,_list);
            
        };
        _list = [];
       
        return utils.getArticle(id,null,null,(err,__article)=>{

            if(err){
                console.log(err)
                return cb(err);
            };

            !__article ? cb(err,_list) : cb(err,_list.push(__article)); //this function is sexy

        })


};


articles.delete = function(id,cb){
         let _list;

        if(Array.isArray(id) && id.length){

            _list = [];

           id.map((_id,i)=>{

                return utils.deleteArticle(_id,(err)=>{

                    _list.push(err);
                });
            });

            return cb(!_list.length ? null : _list);
            
            
        };

        return utils.deleteArticle(id,(err,__article)=>{

            if(err){
                return cb(err);
            };

            _list.push(__article);

            return cb(err,_list);
        })
};




articles.update = function(articles,cb){
            let _list;

                console.log("updating ")
            if(Array.isArray(articles) && articles.length){

                _list = {};
                _list.errors = [];
                _list.success = [];

                articles.map((article,i)=>{

                    return utils.modifyArticle(article,(err,doc)=>{

                        if(err){
                            _list.errors.push(err);
                        };

                        _list.success.push(err);

                    });
                });

                return cb(!_list.errors.length ? null : _list.errors, _list.success);
                
                
            };
                _list = {};
                _list.errors = [];
                _list.success = [];
            return utils.modifyArticle(articles,(err,doc)=>{

                    if(err){
                        _list.errors.push(err);
                    };

                    _list.success.push(err);

                return cb(!_list.errors.length ? null : _list.errors, _list.success);
                
            })
};








module.exports = articles;