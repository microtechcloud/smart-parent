const articles = require("../../../../lib/articles")

let _request = {
    _fetch,
    _modify,
    _delete,
    _create
};


module.exports = _request;



function _fetch(req,res,next){

    let {id,start,offset} = req.query;

    return articles.get(id,{start,offset},(err,_articles)=>{

        return res.json({success:true, _articles});
        
    })
    
};

function _modify(req,res,next){

    let _articles = req.body

    return articles.update(_articles,(err,docs)=>{

        return res.json({err,docs})

    })

};

function _delete(req,res,next){

    let {id} = req.body

    return articles.delete(id,(err)=>{

        return res.json({success:true,err});
    })
};


function _create(req,res,next){
 
    return articles.save(req,(err,article)=>{
     
        if(err){

            return res.json({success:false,err})
        };
     
        return res.json({success:true, article})
    })
}