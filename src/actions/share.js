import { postShare } from '../api/share';
import bindApiKey from '../utils/bindApiKey';

export const CREATE_SHARE_PAGE = 'CREATE_SHARE_PAGE';
export const CREATE_SHARE_PAGE_PENDING = 'CREATE_SHARE_PAGE_PENDING';
export const CREATE_SHARE_PAGE_FULFILLED = 'CREATE_SHARE_PAGE_FULFILLED';
export const CREATE_SHARE_PAGE_REJECTED = 'CREATE_SHARE_PAGE_REJECTED';

export function createSharePage(data) {
  return {
    type: CREATE_SHARE_PAGE,
    payload: bindApiKey(postShare, data)
  };
}
