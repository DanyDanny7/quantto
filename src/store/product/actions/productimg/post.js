import request, { Methods, withToken, RequestType } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_IMG_PRODUCT_RESET = 'POST_IMG_PRODUCT_RESET';
export const POST_IMG_PRODUCT_LOADING = 'POST_IMG_PRODUCT_LOADING';
export const POST_IMG_PRODUCT_SUCCESS = 'POST_IMG_PRODUCT_SUCCESS';
export const POST_IMG_PRODUCT_REJECT = 'POST_IMG_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const postImgProductReset = () => ({ type: POST_IMG_PRODUCT_RESET });
export const postImgProductLoading = () => ({ type: POST_IMG_PRODUCT_LOADING });
export const postImgProductSuccess = (payload) => ({ type: POST_IMG_PRODUCT_SUCCESS, payload });
export const postImgProductReject = (payload) => ({ type: POST_IMG_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postImgProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        headers: RequestType.Multipart,
        data,
    }, getState);
    return request(`/api/web/additemimages`, options);
};

//* REQUEST SERVICE COMPANY ---------------------------------------
// export const postUserPhotoRequest = async (data, getState) => {
//     const options = await withToken({
//         method: Methods.POST,
//         headers: RequestType.Multipart,
//         data,
//     }, getState);
//     return request(`/api/Users/UploadUserProfilePicture`, options);
// };

