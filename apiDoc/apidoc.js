/**
 * @api {post} /register 注册
 * @apiName Register
 * @apiPermission none
 * @apiDescription 注册新用户
 * @apiGroup User
 * @apiParam {String} name 用户名
 * @apiParam {String} pwd 密码
 * @apiParam {String} geohash 用户地理位置信息
 * @apiExample {curl} 接口示例：
 *   curl -d "name=lihongen&pass=ffff&geohash=ww0y51rcstxn" http://http://ubuntu-redred.myalauda.cn/register
 * @apiSuccess {Boolean} success 注册成功与否
 * @apiSuccess {Number} uid 返回用户注册id
 * @apiSuccess {String} msg 返回接口请求信息
 * @apiSuccessExample {json} 出参json示例：
 *   {
 *      "success": true,
 *      "uid": 7,
 *      "msg": "注册用户成功!"
 *   }
 */

/**
 * @api {post} /token 获取token值
 * @apiName GetToken
 * @apiPermission none
 * @apiGroup User
 * @apiDescription 获取校验token，用来接口请求，有效期五天
 * @apiExample {curl} 接口示例：
 *   curl -d "uid=7&pwd=ffff" http://http://ubuntu-redred.myalauda.cn/token
 * @apiSuccess {Boolean} success 请求成功与否
 * @apiSuccess {String} token token值
 * @apiSuccess {String} msg 返回接口请求信息
 * @apiSuccessExample {json} 出参json示例：
 *   {
 *      "success": true,
 *      "token": "eyJhbGciOiJIUzI1NiJ9.Nw.sFhj5iLCv0sJeaeAYJnJfveYrV_T0hQyxTZva-JBBHI"
 *   }
 */
