<template>
    <div class="gz-uploader"
         @click="uploaderClicked">
        <input ref="fileInput"
               v-if="inputType===0"
               type="file"
               :multiple="multiple"
               @change="fileInputChanged">
        <div class="bottom-area">
            <span>上传图片</span>
        </div>
    </div>
</template>

<script>
    import { readAsDataURL } from '../../utilities/file-reader-promise';

    export default {
        name: 'gz-uploader',
        author: '邓斌-Bean',
        title: '上传组件',
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            inputType: {
                type: Number,
                default: 0
            }
        },
        methods: {
            uploaderClicked() {
                if (this.inputType === 0) {
                    this.$refs.fileInput.click();
                } else if (this.multiple) {
                    global.gzNative.selectMultiplePhotos().then((_result) => {
                        const result = _result;
                        for (let i = 0; i < result.imageDatas.length; i += 1) {
                            result.imageDatas[i] = `data:image/jpeg;base64,${result.imageDatas[i]}`;
                        }
                        this.$emit('select', result.imageDatas);
                    });
                } else {
                    global.gzNative.selectPhoto().then((_result) => {
                        const result = _result;
                        result.imageData = `data:image/jpeg;base64,${result.imageData}`;
                        this.$emit('select', result.imageData);
                    });
                }
            },
            fileInputChanged(event) {
                const selectedFiles = event.target.files;
                const results = [];
                const readers = [];
                for (let i = 0; i < selectedFiles.length; i += 1) {
                    readers.push(readAsDataURL(selectedFiles[i]).then((result) => {
                        results.push(result);
                    }));
                }
                Promise.all(readers).then(() => {
                    this.$emit('select', results);
                });
            }
        }
    };
</script>
