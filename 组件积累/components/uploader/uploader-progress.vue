<template>
    <div class="gz-uploader__progress"
         :style="{backgroundImage:`url('${backgroundDataUrl}')`}">
        <div class="progress-mask"
             :style="{height:(100-progress)+'%'}">
            <div class="upload-error"
                 v-if="error">上传失败</div>
        </div>
        <div class="bottom-area"
             v-if="success"
             @click="bottomClicked">
            <div v-if="isPrimary">主图</div>
            <div v-if="!isPrimary">设为主图</div>
        </div>
        <div class="delete-button"
             @click="deleteClicked"></div>
    </div>
</template>

<script>
import base64toBlob from '../../utilities/base64-to-blob';

export default {
    name: 'gz-uploader-progress',
    author: '邓斌-Bean',
    title: '上传进度组件',
    props: {
        index: Number,
        dataURL: String,
        serverUrl: String,
        isPrimary: Boolean
    },
    data() {
        return {
            progress: 0,
            error: false,
            success: false
        };
    },
    computed: {
        backgroundDataUrl() {
            if (this.dataURL.indexOf(',') < 0) {
                return `data:image/jpeg;base64,${this.dataURL}`;
            }
            return this.dataURL;
        }
    },
    methods: {
        timeTick() {
            if (this.progress < 100) {
                setTimeout(() => {
                    this.$set(this, 'progress', this.progress + 10);
                    this.timeTick();
                }, 1000);
            } else {
                this.$emit('done', {
                    index: this.index,
                    url: 'url'
                });
            }
        },
        bottomClicked() {
            this.$emit('setPrimary', this.index);
        },
        deleteClicked() {
            this.$emit('delete', this.index);
        },
        uploadProgress(e) {
            if (e.lengthComputable) {
                const progress = parseInt((100 * e.loaded) / e.total, 10);
                this.$set(this, 'progress', progress);
            }
        },
        uploadComplete(e) {
            if (e.target.status === 200) {
                const response = JSON.parse(e.target.response);
                this.$set(this, 'success', true);
                this.$emit('done', {
                    index: this.index,
                    url: response[0].file
                });
            } else {
                this.$set(this, 'progress', 0);
                this.$set(this, 'error', true);
                this.$emit('error', {
                    index: this.index,
                    status: e.target.status
                });
            }
        },
        uploadError() {
            this.$set(this, 'progress', 0);
            this.$set(this, 'error', true);
            this.$emit('error', {
                index: this.index
            });
        },
        uploadAbort() {
            this.$set(this, 'progress', 0);
            this.$set(this, 'error', true);
            this.$emit('abort', {
                index: this.index
            });
        }
    },
    mounted() {
        let base64String = this.dataURL;
        if (base64String.indexOf(',') > 0) {
            base64String = base64String.split(',')[1];
        }
        const blob = base64toBlob(base64String, 'image/jpg');
        const data = new FormData();
        data.append('files', blob, 'image.jpg');
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', this.uploadProgress);
        xhr.upload.addEventListener('error', this.uploadError);
        xhr.upload.addEventListener('abort', this.uploadAbort);
        xhr.addEventListener('load', this.uploadComplete);
        xhr.open('POST', this.serverUrl);
        xhr.send(data);
    }
};
</script>
