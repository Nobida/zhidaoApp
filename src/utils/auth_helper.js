import store from '../store'
const question_auth_ids = ['8958','6476','6521','6211','11134','6466','143','6']
/*
* 检测是否可以发布思考题，这段代码应该没用了
* */
export function checkQustionAuth(){
  const state = store.getState();
  const userId = state.auth.user_info && state.auth.user_info.id ? state.auth.user_info.id:''
  return !(question_auth_ids.indexOf(userId)==-1)
}
/*
*生成一个token，用于二维码扫描
* **/
export function createToken(){
  const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let nums="";
  for(let i=0;i<32;i++){
    let id = parseInt(Math.random()*61);
    nums+=chars[id];
  }
  return nums

}