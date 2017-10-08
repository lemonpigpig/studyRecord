1. 利用原声上传接口的时候
安卓中返回的base64字符串里面带了换行符，故做此替换
use result.imageDatas[i] = 'data:image/jpeg;base64,' + result.imageDatas[i];
instead of result.imageDatas[i] = 'data:image/jpg;base64,' + result.imageDatas[i].replace(/\n/g, "");

