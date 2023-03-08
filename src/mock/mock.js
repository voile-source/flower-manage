var Mock = require('mockjs')
var data = Mock.mock('http://localhost/api/user/list',{
  "data|7": [
    {
      'id|+1':1,
      'avatar': "@image('45x45')",
      'name': "@ctitle(3,8)",
      'phone': "@integer(13500000000,18699999999)",
      'desc': "@csentence(5,100)",
      'role': "@integer(1,2)",
      'state': "@boolean",
      'editor': "@cname",
      'price': "@float(20,200,2,2)",
      'create': "2021-@datetime(MM-dd HH:mm:ss)"
    }
  ]
})

Mock.mock("http://localhost/api/content/list", {
  "data|7": [
    {
      'id|+1':1,
      'name': "@ctitle(3,8)",
      'desc': "@csentence(5,100)",
      'state': "@boolean",
      'editor': "@cname",
      'price': "@float(20,200,2,2)",
      'create': "2021-@datetime(MM-dd HH:mm:ss)"
    }
  ]
})
// console.log(JSON.stringify(data,null,4));