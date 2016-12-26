/**
 * Created by Lianpanpan on 2016/12/1.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');
var mime=require('mime');
//新建一个文件，将图书放到文件中(替代数据库)
//浏览器发送ajax请求，服务器读取这个文件，将文件内容返回给浏览器端
function getBooks(callback) {
    fs.readFile('./book.json','utf8',function (err,data) {
        if(err||data==""){
            data="[]";
        }
        callback(JSON.parse(data));
    })
}
function setBooks(data,callback) {
    fs.writeFile('./book.json',JSON.stringify(data),callback);
}
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);//true：让查询的字符串转换成对象
    var pathname=urlObj.pathname;
    if(pathname=='/'){//默认访问首页
        res.setHeader('Content-type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);//pipe:一点一点的读响应回来的数据
    }else if(/^\/books(\/\d+)?$/.test(pathname)){
        var id=/\/books(\/\d+)?/.exec(pathname)[1];
        switch (req.method){
            case 'GET':
                if(id){
                    var id=id.slice(1);//通过id查询到对应的项进行返回
                    getBooks(function (data) {
                        //find：查数据
                        var book = data.find(function (item) {
                            return item.id==id;//通过id找到对应的那一本书
                        });
                        res.end(JSON.stringify(book));
                    })
                }else{
                    //查询所有数据
                    getBooks(function (data) {
                       res.end(JSON.stringify(data));
                    });
                }
                break;
            case 'POST'://增加图书
                var str='';
                req.on('data',function (data) {
                   str+=data;
                });
                req.on('end',function () {
                   var book = JSON.parse(str);//获取客户端传来的请求体
                    getBooks(function (data) {
                        data.sort(function (a,b) {
                            return a.id-b.id;
                        });
                        //增加一个不重复的ID
                        book.id=data.length?parseInt(data[data.length-1].id)+1:1;
                        data.push(book);
                        setBooks(data,function () {
                            res.end(JSON.stringify(book));//增加后返回增加的那一项
                        })
                    })
                });
                break;
            case 'PUT':
                if(id){
                    id=id.slice(1);
                    var str='';
                    req.on('data',function (data) {
                        str+=data;
                    });
                    req.on('end',function () {
                        var book=JSON.parse(str);
                        getBooks(function (data) {
                            data=data.map(function (item) {
                                if(item.id==id){
                                    return book;
                                }
                                return item;
                            });
                            setBooks(data,function () {
                                res.end(JSON.stringify(book));
                            })
                        })
                    })
                }else{

                }
                break;
            case 'DELETE':
                if(id){
                    id=id.slice(1);
                    getBooks(function (data) {
                        data=data.filter(function (item) {
                            return item.id != id;
                        });
                        setBooks(data,function () {
                            res.end(JSON.stringify({}));
                        });
                    });
                }
                break;
        }
    }else{
        fs.exists('.'+pathname,function (exists) {
            if(exists){
                res.setHeader('Content-type',mime.lookup(pathname)+';charset=utf8');
                fs.createReadStream('.'+pathname).pipe(res);
            }else{
                res.statusCode = 404;
                res.end('Not found');
            }
        })
    }
}).listen(80,function () {
    console.log('ok')
});