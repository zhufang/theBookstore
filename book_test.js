var fs=require('fs');
//1.读取图书
function getBooks(callback) {
    fs.readFile('./book.json','utf8',function (err,data) {
        if(err||data==''){//有报错或者json为空字符串
            data="[]";
        }
        callback(JSON.parse(data));
    });
}
function setBooks(data,callback) {
    fs.writeFile('./book.json',JSON.stringify(data),callback);
}
//2.修改图书(id为2的价格为50元的改成60)
fs.readFile('./book.json','utf8',function (err,data) {
    var books=JSON.parse(data);
    books=books.map(function (item) {
        if(item.id==2){
            item.bookPrice=60;
            return item;
        }
        return item;
    });
    setBooks(books,function () {
        console.log('修改成功');
    })
});
//3.增加图书
var book={'bookName':'react',id:10,bookCover:'http://baidu.con',bookPrice:40};
getBooks(function (data) {
    data.push(book);
    setBooks(data,function () {
        console.log('success');
    })
});

//4.删除图书
