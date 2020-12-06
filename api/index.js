import request from './request.js';
import request_token from './request_token.js';
// const url = 'http://192.168.1.22:10010/api';
// const url = 'http://zpf.free.idcfengye.com/api';
const url = 'http://42.192.137.173:10010/api';


//图书相关
/* 获取所有分类 */
export const CategoryList = () => request(`${url}/book/category/list`);

/* 根据分类id查询图书信息 */
export const BookList = (cid,page = 1,rows =6) => request(`${url}/book/books/pageByCid`,{cid,page,rows});

//根据分类id查找4本图书
export const CidAndHot = ({cid,rows}) => request(`${url}/book/books/pageByCidAndHot`,{cid,rows});

/* 根据图书id查找图书 */
export const Book = (bid) => request(`${url}/book/books/bid/`+bid) 

/*根据作者id获取作者信息*/
export const GetAuthor = ({aId}) => request(`${url}/book/author`, {aId});

/*根据图书id获取用户收藏*/
export const UserStar = ({token,bid,page,rows}) => request_token(`${url}/star/userStar/page`,{bid,page,rows},token);

/* 根据图书id获取章节主要信息 */
export const Chapters = ({bid,page,rows}) => request(`${url}/book/chapter/page`,{bid,page,rows});

/* 根据章节id查询章节信息 */
export const Chapter = ({cid}) => request(`${url}/book/chapter/cid/`+cid); 
/*查询上一章或下一章*/
export const LastOrNextChapter = ({cid,type}) => request(`${url}/book/chapter/lastOrNext/`,{cid,type}); 

/*书评相关的*/
/*查询评论*/
export const FindReview = ({bid,page,rows}) => request_token(`${url}/user/review/page`,{bid,page,rows},"GET");

//添加评论
export const AddReview = ({bId,text,token}) => request_token(`${url}/user/review`,{bId,text},token,"POST");

//删除评论
export const DeleteReview = ({id,token}) => request_token(`${url}/user/review`,{id},token,"DELETE");



/*收藏图书相关*/
/*收藏本书*/
export const AddUserStar = ({token,bId,cId}) => request_token(`${url}/star/userStar`,{bId,cId},token,"POST");

/*修改收藏中的这本书*/
export const UpdateUserStar = ({token,bId,cId}) => request_token(`${url}/star/userStar`,{bId,cId},token,"PUT");

/*取消收藏*/
export const DeleteUserStar = ({token,bId}) => request_token(`${url}/star/userStar`,{bId},token,"DELETE");



/* 搜索 */
export const Search = ({key}) => request(`${url}/search/page`,{key},'POST');

//用户相关
//发短信验证码
export const Code = ({phone})=> request(`${url}/user/code`,{phone},"POST")
//登录接口
export const Login1 = ({phone,code,type})=> request(`${url}/auth/accredit`,{phone,code,type},"POST")
export const Login2 = ({username,password,type})=> request(`${url}/auth/accredit`,{username,password,type},"POST")

//获取用户信息
export const GetUser = ({token})=> request_token(`${url}/user/info`,null,token,"POST")
//修改用户昵称
export const UpdateNickname = ({nickname,token})=> request_token(`${url}/user/info/nickname`,{nickname},token,"POST")

//修改用户密码
export const UpdatePassword = ({password,token})=> request_token(`${url}/user/info/password`,{password},token,"POST")
//修改用户手机号
export const UpdatePhone = ({phone,code,token})=> request_token(`${url}/user/info/phone`,{phone,code},token,"POST")

//用户头像
//在detailmine.vue页面中

//修改用户头像
export const UpdatePicture = ({uPhoto,token})=> request_token(`${url}/user/info/uphoto`,{uPhoto},token,"POST")