import Vue from 'vue';
import Router from 'vue-router';

// 首页
import Home from '../views/home.vue';
import SearchProductList from '../views/product/searchProductList.vue';
import SearchNoResult from '../views/product/searchNoResult.vue';
import FeatureYn from '../views/feature/featureYn.vue';
import OriginProducts from '../views/origin-products.vue';
import SeckillProducts from '../views/seckill-products.vue';

// 商品分类
import ProductCategory from '../views/product/productCategory.vue';
import FirstProductList from '../views/product/firstProductList.vue';
import ThirdProductList from '../views/product/thirdProductList.vue';

// 公益
import PublicWelfare from '../views/publicwelfare/index.vue';
import PublicWelfareHome from '../views/publicwelfare/home.vue';
import PublicWelfareType from '../views/publicwelfare/list.vue';
import PublicWelfareDetail from '../views/publicwelfare/detail.vue';

// 一县一馆
import MuseumList from '../views/museums/museum-list.vue';
import MuseumsDetail from '../views/museums/detail.vue';

// 购物车
import Cart from '../views/cart/cart.vue';
import PaymentCheckout from '../views/payment/checkout.vue';
import AddOrder from '../views/checkout/add-order.vue';
import PaymentSuccess from '../views/payment/success.vue';

// 个人中心
import PersonalCenter from '../views/user/personal-center.vue';
import SignUp from '../views/authorization/sign-up.vue';
import SignIn from '../views/authorization/sign-in.vue';
import FindPassword from '../views/authorization/find-password.vue';
import ModifyPassword from '../views/authorization/modify-password.vue';
import ModifyPhone from '../views/authorization/modify-phone.vue';
import SetNewPhone from '../views/authorization/set-newPhone.vue';

import SmartPay from '../views/payment/smartpay.vue';

import ProductInfo from '../views/product/product-info.vue';
import AddressList from '../views/address/address-list.vue';
import Address from '../views/address/address.vue';
import ReceiptChoose from '../views/receipt/receipt.vue';
import OrderList from '../views/order/order-list.vue';
import OrderDetail from '../views/order/order-detail.vue';
import PersonalInfo from '../views/user/personal-info.vue';
import UserSetting from '../views/user/user-setting.vue';
import collectProductList from '../views/product/collectProductList.vue';
import HelpCenter from '../views/help-center.vue';
import OpinionFeedback from '../views/user/opinion-feedback.vue';
import AboutUs from '../views/aboutUs.vue';
import Agreement from '../views/user/agreement.vue';

// 要删掉的
import Picker from '../views/test-base-component/picker.vue';
import Loadmore from '../views/test-base-component/test-loadmore.vue';
import TestLazyload from '../views/test-base-component/test-lazyload.vue';
import TestBeanScrollerTest from '../views/test/bean/scroller.vue';
import TestTopButton from '../views/test.vue';

import PageStart from '../views/pagestart.vue';

// 专题
import TopicPage from '../views/topic-page.vue';
import Topic from '../views/topic/detail.vue';


Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home',
    }, {
        path: '/pagestart',
        component: PageStart,
    }, {
        path: '/home',
        component: Home,
    }, {
        path: '/museums',
        component: MuseumList,
    }, /*{
        path: '/signUp',
        component: SignUp,
    }, {
        path: '/signIn',
        component: SignIn,
    }, {
        path: '/testLoadmore',
        component: Loadmore,
    }, {
        path: '/firstProductList',
        component: FirstProductList,
    }, {
        path: '/searchProductList',
        component: SearchProductList,
    }, {
        path: '/SearchNoResult',
        component: SearchNoResult,
    }, {
        path: '/testPicker',
        component: Picker,
    }, {
        path: '/receipt',
        component: ReceiptChoose,
    }, {
        path: '/findPassword',
        component: FindPassword,
    }, {
        path: '/modifyPassword',
        component: ModifyPassword,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/modifyPhone',
        component: ModifyPhone,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/setNewPhone',
        component: SetNewPhone,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/orderList',
        component: OrderList,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/personalInfo',
        component: PersonalInfo,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/helpCenter',
        component: HelpCenter,
    }, {
        path: '/category',
        component: ProductCategory,
    }, {
        path: '/thirdProductList',
        component: ThirdProductList,
    }, {
        path: '/orderDetail/:id',
        component: OrderDetail,
        meta: {
            requiresAuth: true,
            scrollToTop: true,
        },
    }, {
        path: '/publicWelfare',
        component: PublicWelfare,
        redirect: '/publicWelfare/home',
        children: [{
            path: 'home',
            component: PublicWelfareHome,
        }, {
            path: 'type',
            component: PublicWelfareType,
        }, {
            path: 'detail',
            component: PublicWelfareDetail,
            meta: {
                scrollToTop: true,
            },
        }],
    }, {
        path: '/testLazyload',
        component: TestLazyload,
    }, {
        path: '/museums/:id',
        component: MuseumsDetail,
    }, {
        path: '/testLazyload',
        component: TestLazyload,
    }, {
        path: '/opinionFeedback',
        component: OpinionFeedback,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/helpCenter',
        component: HelpCenter,
    }, {
        path: '/cart',
        component: Cart,
    }, {
        path: '/addOrder',
        component: AddOrder,
    }, {
        path: '/collectProductList',
        component: collectProductList,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/test/bean/scroller',
        component: TestBeanScrollerTest,
    }, {
        path: '/payment/checkout',
        component: PaymentCheckout,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/payment/success',
        component: PaymentSuccess,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/home',
        component: Home,
    }, {
        path: '/origin-products',
        component: OriginProducts,
    }, {
        path: '/seckill-products',
        component: SeckillProducts,
    }, {
        path: '/featureYn',
        component: FeatureYn,
    }, {
        path: '/aboutUs',
        component: AboutUs,
    }, {
        path: '/testTopButton',
        component: TestTopButton,
    }, {
        path: '/personalCenter',
        component: PersonalCenter,
    }, {
        path: '/userSetting',
        component: UserSetting,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/productInfo/:id',
        component: ProductInfo,
    }, {
        path: '/addressList',
        component: AddressList,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/address',
        component: Address,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/address/:id',
        component: Address,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/agreement',
        component: Agreement,
    }, {
        path: '/payment/smartpay',
        component: SmartPay,
    }, {
        path: '/topic',
        component: TopicPage,
    }, {
        path: '/topic/:name',
        component: Topic,
    }*/],
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return {
                x: 0,
                y: 0,
            };
        }
    },
});
