<template>
    <div class="NvaBar sticky-top bg-white">
    <div class="halloween-promotion">
        <header class="top-banner">
            <p class="promotion-text">
                萬聖節活動開跑，凡購買極選可可系列之商品，皆可獲得購物折價券
            </p>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/608161711078f4b74125d0a68d4e4d4d6963180176ee477a6b203e51038a6da2?placeholderIfAbsent=true&apiKey=0ac3bc741592429d9fd3d5f97b73978f"
                alt="Halloween promotion icon" class="promotion-icon" />
            
        </header>
        <nav class="main-navigation">
            <div class="logo-container"><RouterLink to="/"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/857d13293cd20766b3c3873c74b3b30955ec6f57f1e469be52733bd2a50d990e?placeholderIfAbsent=true&apiKey=0ac3bc741592429d9fd3d5f97b73978f"
                alt="Company logo" class="company-logo" ></RouterLink></div>
            <ul class="nav-links">
                <li><a href="#about" class="nav-item">關於我們</a></li>
                <li><a href="#news" class="nav-item">最新消息</a></li>
                <li><a href="#products" class="nav-item">商品列表</a></li>
                <li><a href="#stores" class="nav-item">門市資訊</a></li>
                <li><a href="#faq" class="nav-item">常見問題</a></li>
            </ul>
            <div class="social-icons">
                <a href="#" aria-label="Search">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8c06650a9849b9754d772f4bb880b0795febcdcc4539241bfd8ac1b2bdb280d?placeholderIfAbsent=true&apiKey=0ac3bc741592429d9fd3d5f97b73978f"
                        alt="" class="social-icon" />
                </a>
                <a href="#login" aria-label="Member">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cf567006ec7bebcac393a986e8890adcdf496e51978eee7947002e87dcd3776?placeholderIfAbsent=true&apiKey=0ac3bc741592429d9fd3d5f97b73978f"
                        alt="" class="social-icon" />
                </a>
                <a href="#" aria-label="Cart">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4c9c80ca8febdfbbc06f9f82594f0360836c88a8796ed5377294e4c378c5476?placeholderIfAbsent=true&apiKey=0ac3bc741592429d9fd3d5f97b73978f"
                        alt="" class="social-icon" />
                </a>
            </div>
        </nav>
    </div>
    </div>
</template>

<style scoped>

.halloween-promotion {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
}

.top-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 0.5% 1%;
    background-color: rgba(143, 134, 129, 0.8);
    color: #fff;
    text-align: center;
    font-size: small;
}

.promotion-text {
    margin: auto;
    padding-left: 8%;
}

.promotion-icon {
    width: 1.5%;
    object-fit: contain;
    cursor: pointer;
}

.main-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px 74px;
    width: 100%;
    flex-wrap: wrap;
    background-color: white;
    padding: 1% 2%;
}

/* Styling for navigation links */
.nav-links {
    display: flex;
    gap: 40px 52px;
    color: #32435f;
    /* font-size: large; */
    font-weight: bold;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    text-align: center;
}

.logo-container {
    width: 18%;
    padding-left: 5px;
}

/* Styling for company logo */
.company-logo {
    width: 100%;
    object-fit: cover;
    align-self: stretch;

}

.nav-item {
    text-decoration: none;
    color: inherit;
}

/* Styling for social icons */
.social-icons {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: auto 0;
}

/* Styling for individual social icon */
.social-icon {
    width: 60%;
    object-fit: contain;
}

/* Responsive styles for devices with a max-width of 991px */
@media (max-width: 991px) {
    .top-banner {
        padding: 0 20px;
        white-space: normal;
    }

    .promotion-text {
        max-width: 100%;
    }

    .main-navigation {
        flex-direction: column;
        align-items: center;
    }

    .nav-links {
        flex-direction: column;
        gap: 20px;
        white-space: normal;
        max-width: 100%;
    }

    .company-logo {
        width: 100%;
        max-width: 250px;
    }
}
</style>
