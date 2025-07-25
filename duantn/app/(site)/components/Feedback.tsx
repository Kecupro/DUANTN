"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AddToCart from "./AddToCart";
import { IProduct } from "../cautrucdata";

interface TopRatedProduct {
  _id: string;
  name: string;
  price: number;
  sale_price: number;
  averageRating: number;
  reviewCount: number;
  main_image: {
    image: string;
    alt: string;
  };
  brand: {
    _id: string;
    name: string;
  };
}

const mockTopRatedProducts = [
  { _id: '1', name: 'Đồng hồ nổi bật 1', price: 1000000, sale_price: 900000, main_image: { image: 'bulova-accu-swiss-a-15-mechanical-watch-40mm1.jpg_980_980.webp', alt: 'sp1' }, brand: { _id: 'b1', name: 'Brand A' }, averageRating: 4.5, reviewCount: 10 },
  { _id: '2', name: 'Đồng hồ nổi bật 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { _id: 'b2', name: 'Brand B' }, averageRating: 4.0, reviewCount: 5 },
  { _id: '3', name: 'Đồng hồ nổi bật 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { _id: 'b3', name: 'Brand C' }, averageRating: 4.2, reviewCount: 7 },
  { _id: '4', name: 'Đồng hồ nổi bật 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { _id: 'b4', name: 'Brand D' }, averageRating: 4.8, reviewCount: 12 },
  { _id: '5', name: 'Đồng hồ nổi bật 5', price: 1800000, sale_price: 1500000, main_image: { image: 'bulova-accu-swiss-watch-31mm.jpg_980_980.webp', alt: 'sp5' }, brand: { _id: 'b1', name: 'Brand A' }, averageRating: 4.6, reviewCount: 8 },
  { _id: '6', name: 'Đồng hồ nổi bật 6', price: 3000000, sale_price: 2700000, main_image: { image: 'bulova-accutron-masella-chronograph-black-watch-40mm.jpg_980_980.webp', alt: 'sp6' }, brand: { _id: 'b2', name: 'Brand B' }, averageRating: 4.7, reviewCount: 9 }
];

export default function Feedback() {
  const [products] = useState(mockTopRatedProducts);
  const [loading, setLoading] = useState(true);

  // const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/top-rated?limit=6');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm được đánh giá cao:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedProducts();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const createProductForCart = (product: TopRatedProduct): IProduct => {
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      brand: product.brand,
      main_image: product.main_image,
      quantity: 1,
      status: 0,
      views: 0,
      sex: "",
      case_diameter: 0,
      style: "",
      features: "",
      water_resistance: "",
      thickness: 0,
      color: "",
      machine_type: "",
      strap_material: "",
      case_material: "",
      sold: 0,
      categories: [],
      images: [],
      description: "",
      created_at: "",
      updated_at: ""
    };
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-8">
        <h3 className="text-center font-bold text-2xl mb-3">SẢN PHẨM NỔI BẬT</h3>
        <div className="mx-auto mb-8 w-30 h-1 bg-red-700 rounded"></div>
        <div className="max-w-6xl mx-auto text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-6">
      <h3 className="text-center font-bold text-2xl mb-3">SẢN PHẨM NỔI BẬT</h3>
      <div className="mx-auto mb-6 w-24 h-1 bg-red-700 rounded"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="top-rated-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Product Image - Left Side */}
                  <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                    <Link href={`/product/${product._id}`}>
                      <img
                        src={`/upload/product/${product.main_image?.image}`}
                        alt={product.main_image?.alt || product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <i className="fa-solid fa-star"></i>
                      {product.averageRating}
                    </div>

                    {/* Sale Badge */}
                    {product.sale_price > 0 && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Product Info - Right Side */}
                  <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">{product.brand.name}</p>
                      <Link href={`/product/${product._id}`}>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-red-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                            className={`fa-star text-lg ${i < product.averageRating ? "fa-solid text-red-500" : "fa-regular text-gray-300"}`}
                ></i>
              ))}
            </div>
                      <span className="text-sm text-gray-500">({product.reviewCount} đánh giá)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      {product.sale_price > 0 ? (
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold text-2xl">
                            {formatPrice(product.sale_price)}
                          </span>
                          <span className="text-gray-400 line-through text-lg">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-red-600 font-bold text-2xl">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Features/Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Điểm nổi bật:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-green-500"></i>
                          Sản phẩm chính hãng 100%
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-green-500"></i>
                          Bảo hành chính hãng
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-green-500"></i>
                          Giao hàng toàn quốc
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-green-500"></i>
                          Đánh giá cao từ khách hàng
                        </li>
                      </ul>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="w-full mb-3">
                      <AddToCart sp={createProductForCart(product)} />
                    </div>

                    {/* View Details Link */}
                    <div className="text-center">
                      <Link 
                        href={`/product/${product._id}`}
                        className="text-red-600 hover:text-red-700 font-medium text-sm underline"
                      >
                        Xem chi tiết sản phẩm →
                      </Link>
                    </div>
                  </div>
                </div>
          </div>
            </SwiperSlide>
        ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .top-rated-swiper {
          width: 100%;
          max-width: 100%;
        }
        
        .top-rated-swiper .swiper-slide {
          width: 100% !important;
          max-width: 100% !important;
        }
        
        .top-rated-swiper .swiper-button-next,
        .top-rated-swiper .swiper-button-prev {
          color: #dc2626 !important;
          background: rgba(255, 255, 255, 0.9);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .top-rated-swiper .swiper-button-next:hover,
        .top-rated-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .top-rated-swiper .swiper-button-next {
          right: -1px;
        }
        
        .top-rated-swiper .swiper-button-prev {
          left: -1px;
        }
        
        .top-rated-swiper .swiper-pagination-bullet {
          background: #dc2626;
          width: 12px;
          height: 12px;
          margin: 0 4px;
        }
        
        .top-rated-swiper .swiper-pagination-bullet-active {
          background: #dc2626;
          transform: scale(1.2);
        }
        
        .top-rated-swiper .swiper-pagination {
          bottom: 20px;
        }
        
        @media (max-width: 1024px) {
          .top-rated-swiper .swiper-button-next,
          .top-rated-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}