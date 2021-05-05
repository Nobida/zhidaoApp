import backup_head_imgs from './mock/backup_head_imgs';
export function getBackUpHeadImg(day_num) {
  if(day_num){
    return backup_head_imgs[day_num%backup_head_imgs.length]
  }else{
    return backup_head_imgs[0]
  }
}