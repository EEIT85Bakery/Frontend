import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        name: '產品頁面',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: ':id',
        name: '單一產品頁面',
        component: () => import('../views/ProductView.vue')
      },
      // {
      //   // test
      //   path: 'product',
      //   name: '單一產品頁面',
      //   component: () => import('../views/ProductView.vue')
      // },
      {
        path: 'cart',
        name: '購物車頁面',
        component: () => import('../views/CartView.vue')
      },
      {
        path: '/checkOut',
        name: '結帳頁面',
        component: () => import('../views/CheckOutView.vue')
      },
      {
        path: '/orderDetail',
        name: '訂單詳細頁面',
        component: () => import('../views/OrderDetail.vue')
      },
      {
        path: '/login',
        name: '登入頁面',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/register',
        name: '註冊頁面',
        component: () => import('../views/RegisterView.vue')
      },
      {
        path: '/customerInformation',
        name: '會員資訊頁面',
        component: () => import('../views/CustomerInformationView.vue')
      },
      {
        path: '/orderList',
        name: '訂單列表頁面',
        component: () => import('../views/OrderListView.vue')
      },
      {
        path: '/wishList',
        name: '我的收藏頁面',
        component: () => import('../views/WishListView.vue')
      },
      {
        path: '/shopInformation',
        name: '門市資訊',
        component: () => import('../views/shopInformationView.vue')
      },
      {
        path: '/aboutUs',
        name: '關於我們',
        component: () => import('../views/AboutUsView.vue')
      },
      {
        path: '/theLastestNews',
        name: '最新消息',
        component: () => import('../views/theLastestNewsView.vue')
      },
      {
        path: '/question',
        name: '常見問題',
        component: () => import('../views/QuestionView.vue')
      },
      {
        path: '/addTest',
        name: '加商品測試',
        component: () => import('../views/addProductToCartTest.vue')
      },
      {
        path: '/discount',
        name: '優惠專區頁面',
        component: () => import('../views/DiscountView.vue')
      },
      {
        path: '/anniversary',
        name: '紀念日頁面',
        component: () => import('../views/AnniversaryView.vue')
      },
      {
        path: '/registerForm',
        name: '註冊表單頁面',
        component: () => import('../views/RegisterformView.vue')
      },
      {
        path: '/game',
        name: '遊戲頁面',
        component: () => import('../components/Game.vue')
      },
      {
        path: '/gameTest',
        name: '遊戲測試頁面',
        component: () => import('../components/GameTest.vue')
      },
      {
        path: '/pay',
        name: '付款頁面',
        component: () => import('../views/CheckoutForm.vue')
      },
      {
        path: '/testPay',
        name: '測試處理付款頁面',
        component: () => import('../views/TestPay.vue')
      }
      
    ]
  },
  {

    },
    {
      path: '/admin',
      name: '後台首頁',
      component: () => import('../views/dashboard/DashboardView.vue'),
      children: [
        {
          path: '/order',
          name: '訂單頁面',
          component: () => import('../views/dashboard/OrderView.vue')
        },
        {
          path: '/backProducts',
          name: '產品管理頁面',
          component: () => import('../views/dashboard/ProductsView.vue')
        },
        {
          path: '/AdminCoupons',
          name: '優惠券管理頁面',
          component: () => import('../views/dashboard/CouponsView.vue')
        },
        {
          path: '/AdminMembers',
          name: '會員管理頁面',
          component: () => import('../views/dashboard/MemberView.vue')
        },
        {
          path: '/SalesStatistics',
          name: '銷售數據',
          component: () => import('../views/dashboard/SalesStatistics.vue')
        }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  
      {
        path: '/mail',
        name: '郵件動畫頁面',
        component: () => import('../views/Mail.vue')
      }
]

const router = createRouter({
  history: createWebHistory('/'),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router