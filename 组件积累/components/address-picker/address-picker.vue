<template lang="html">
  <div class="gz-address-picker">
    <gz-mask class="publish-mask" :show="true" @click="cancle"></gz-mask>
    <div class="gz-area-panel">
      <gz-picker :slots="areaSlots" @change="changeArea"　:showToolbar="showToolbar" ref="addressPicker">
        <div class="gz-area-btn">
          <span @click="cancle" v-text="cancelText"></span>
          <span @click="confirm" v-text="confirmText"></span>
        </div>
      </gz-picker>
    </div>
  </div>
</template>

<script>
import { map, findIndex } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'gz-address-select',
    components: {
    },
    computed: {
        ...mapGetters([
            'region'
        ])
    },
    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        getAreaInfo: {
            type: Function,
            default: () => {}
        },
        isShow: {
            type: Function,
            default: () => {}
        },
        currentSelect: {},
        showToolbar: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        const regionStorage = localStorage.getItem('regionList');
        if (!regionStorage) {
            this.getRegion({
                id: 0,
                level: 0
            }).then((data) => {
                if (data.length !== 0) {
                    this.provinceId = data[0].id;
                    this.getRegion({
                        id: data[0].id,
                        level: 1,
                        provinceIndex: 0
                    }).then((sData) => {
                        if (sData.length !== 0) {
                            this.regionId = sData[0].id;
                            this.getRegion({
                                id: sData[0].id,
                                level: 2,
                                provinceIndex: 0,
                                cityIndex: 0,
                                provinceId: this.provinceId
                            }).then(() => {
                                localStorage.setItem('regionList', JSON.stringify(this.region));
                                this.initArea();
                            });
                        }
                    });
                }
            });
        } else {
            this.initArea();
            this.$store.commit('SET_REGION_ADDRESS_FROMCOOKIE', JSON.parse(regionStorage));
        }
    },
    data() {
        return {
            loadFlag: false,
            provinceId: '',
            regionId: '',
            areaSlots: [{
                flex: 1,
                values: [],
                textAlign: 'center'
            }, {
                divider: true,
                content: '-'
            }, {
                flex: 1,
                values: [],
                textAlign: 'center'
            }, {
                divider: true,
                content: '-'
            }, {
                flex: 1,
                values: [],
                textAlign: 'center'
            }]
        };
    },
    methods: {
        ...mapActions(['getRegion']),
        changeArea(picker, values) {
            if (!values[0]) return;
            const provinceInfoIndex = findIndex(this.region.provinceList,
                obj => obj.name === values[0]);
            const provinceInfo = this.region.provinceList[provinceInfoIndex];

            if (!this.loadFlag && provinceInfo.cityList.length === 0) {
                this.loadFlag = true;
                this.getRegion({
                    id: provinceInfo.id,
                    level: 1,
                    provinceIndex: provinceInfoIndex
                }).then((data) => {
                    if (data.length !== 0) {
                        this.getRegion({
                            id: data[0].id,
                            level: 2,
                            provinceId: provinceInfo.id,
                            provinceIndex: provinceInfoIndex,
                            cityIndex: 0
                        }).then(() => {
                            this.loadFlag = false;
                            localStorage.setItem('regionList', JSON.stringify(this.region));
                            picker.setSlotValues(1, map(provinceInfo.cityList, 'name'));
                            if (!values[1]) return;
                            const cityInfo = find(provinceInfo.cityList,
                                obj => obj.name === values[1]);
                            picker.setSlotValues(2, map(cityInfo ? cityInfo.regionList : [], 'name'));
                        });
                    } else {
                        this.loadFlag = false;
                    }
                });
            }
            picker.setSlotValues(1, map(provinceInfo.cityList, 'name'));
            if (!values[1]) return;
            const cityInfoIndex = findIndex(provinceInfo.cityList, obj => obj.name === values[1]);

            const cityInfo = this.region.provinceList[provinceInfoIndex].cityList[cityInfoIndex];

            if (!this.loadFlag && cityInfo && cityInfo.regionList.length === 0) {
                this.loadFlag = true;
                this.getRegion({
                    id: cityInfo.id,
                    level: 2,
                    provinceId: provinceInfo.id,
                    provinceIndex: provinceInfoIndex,
                    cityIndex: cityInfoIndex
                }).then(() => {
                    this.loadFlag = false;
                    localStorage.setItem('regionList', JSON.stringify(this.region));
                    picker.setSlotValues(2, map(cityInfo ? cityInfo.regionList : [], 'name'));
                });
            }
            picker.setSlotValues(2, map(cityInfo ? cityInfo.regionList : [], 'name'));


            if (!values[2]) return;
            const regionInfo = find(cityInfo ? cityInfo.regionList :
                [], obj => obj.name === values[2]);
            this.selectInfo = {
                province: provinceInfo.name,
                provinceId: provinceInfo.id,
                city: cityInfo ? cityInfo.name : '',
                cityId: cityInfo ? cityInfo.id : '',
                region: regionInfo ? regionInfo.name : '',
                regionId: regionInfo ? regionInfo.id : ''
            };
        },
        initArea() {
            if (this.currentSelect) {
                const setSlotValue = this.$refs.picker.setSlotValue;
                setSlotValue(0, this.currentSelect.province);
                setSlotValue(1, this.currentSelect.city);
                setSlotValue(2, this.currentSelect.region);
            }
            this.$set(this.areaSlots[0], 'values', map(JSON.parse(localStorage.getItem('regionList')).provinceList, 'name'));
        },
        confirm() {
            this.getAreaInfo(this.selectInfo);
            this.isShow(false);
        },
        cancle() {
            this.isShow(false);
        }
    }
};
</script>
