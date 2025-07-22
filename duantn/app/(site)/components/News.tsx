'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import { INews } from '../cautrucdata';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


const mockNews = [
  { _id: 'n1', title: 'Tin demo 1', content: 'Nội dung tin demo 1', image: 'sport_watch_1.jpg', news_status: 1, views: 100, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z', category: { name: 'Khuyến mãi' } },
  { _id: 'n2', title: 'Tin demo 2', content: 'Nội dung tin demo 2', image: 'smartwatch_10.jpg', news_status: 1, views: 50, created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z', category: { name: 'Sự kiện' } },
  { _id: 'n3', title: 'Tin demo 3', content: 'Nội dung tin demo 3', image: 'dress_watch_10.jpg', news_status: 1, views: 70, created_at: '2024-01-03T00:00:00Z', updated_at: '2024-01-03T00:00:00Z', category: { name: 'Khuyến mãi' } },
  { _id: 'n4', title: 'Tin demo 4', content: 'Nội dung tin demo 4', image: 'dive_watch_10.jpg', news_status: 1, views: 30, created_at: '2024-01-04T00:00:00Z', updated_at: '2024-01-04T00:00:00Z', category: { name: 'Sự kiện' } },
  { _id: 'n5', title: 'Tin demo 5', content: 'Nội dung tin demo 5', image: 'luxury_watch_10.jpg', news_status: 1, views: 90, created_at: '2024-01-05T00:00:00Z', updated_at: '2024-01-05T00:00:00Z', category: { name: 'Khuyến mãi' } },
  { _id: 'n6', title: 'Tin demo 6', content: 'Nội dung tin demo 6', image: 'sport_watch_9.jpg', news_status: 1, views: 60, created_at: '2024-01-06T00:00:00Z', updated_at: '2024-01-06T00:00:00Z', category: { name: 'Sự kiện' } }
];

export default function News() {
  const [newsList] = useState(mockNews);
  const [loading, setLoading] = useState(true);

  // const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // fetchNews(); // Bỏ fetchNews
  }, []);

  // const fetchNews = async () => { // Bỏ fetchNews
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/news');
  //     setNewsList(response.data.news);
  //   } catch (error) {
  //     console.error('Error fetching news:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="w-full bg-white py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-8">
      <h3 className="text-center font-bold text-2xl mb-3">TIN TỨC SỰ KIỆN</h3>
      <div className="mx-auto mb-8 w-30 h-1 bg-red-700 rounded"></div>
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-10"
        >
          {newsList.slice(0, 6).map((news) => (
            <SwiperSlide key={news._id}>
              <div className="relative group rounded overflow-hidden shadow hover:shadow-lg transition h-100 flex flex-col justify-end">
                <img
                  src={`/upload/new/${news.image}`}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/5 transition"></div>
                <div className="relative z-10 p-6 bg-black bg-black/10 backdrop-blur-sm flex flex-col justify-end min-h-[140px]">
                  <h4 className="font-semibold text-lg mb-2 text-white drop-shadow">{news.title}</h4>
                  <p className="text-gray-200 text-sm mb-2 drop-shadow">{news.content}</p>
                  <Link
                    href={`/news/${news._id}`}
                    className="inline-flex items-center text-white font-regular hover:underline mt-2"
                  >
                    Đọc thêm <i className="fa-solid fa-caret-right ml-1 text-red-500"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}