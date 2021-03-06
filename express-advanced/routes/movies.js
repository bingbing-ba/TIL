const express = require('express');
const router = express.Router();
const Joi = require('joi');

const data = [
    { id: 1, title: 'no' },
    { id: 2, title: 'nono' },
    { id: 3, title: 'nonono' },
]


router.get('/',(req,res)=>{
    res.send(data);
});

router.get('/:id',(req,res)=>{
    const movie = data.find((element)=>{
        return element.id==req.params.id;
    });
    if(!movie) res.status(404).send('없'); //약간 개발자 밈
    res.send(movie);
});

router.post('/',(req,res)=>{
    const schema = { //받을 입력이 ~~할 것이다
        title: Joi.string().min(2).required(),
    }

    const result = Joi.validate(req.body, schema);

    if (result.error){
        return res.status(400).send(result.error.message);
    }

    const movie = {
        id: data.length +1,
        title: req.body.title
    };
    data.push(movie);
    res.send(movie);
});

router.put('/:id',(req,res)=>{
    
    const schema = { //받을 입력이 ~~할 것이다
        title: Joi.string().min(2).required(),
    }

    const result = Joi.validate(req.body, schema);

    if (result.error){
        return res.status(400).send(result.error.message);
    }
    let updated = null;
    data.forEach((element)=>{
        if(element.id==req.params.id){
            element.title = req.body.title;
            updated = element;
        }
    })
    
    if(!updated){
        return res.status(404).send('없는 애를 수정 요청하셨어여')
    }
    res.send(updated);
    

});

router.delete('/:id',(req,res)=>{
    let deleted = null;
    data.forEach((element,index)=>{
        if(element.id==req.params.id){
            deleted = element;
            data.splice(index,1);
        }
    })
    if(!deleted){
        return res.status(404).send('없는 애를 삭제 요청하셨어여');
    }
    res.send(deleted);
});

module.exports = router;