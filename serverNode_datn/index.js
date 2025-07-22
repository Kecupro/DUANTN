const exp = require('express');
const app = exp();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(exp.json());
app.use(cors());

// Route mock API
app.get('/api/brand', (req, res) => {
  res.json([
    { _id: 'b1', name: 'Brand A', productCount: 2, image: 'luxury-shoping1-1.png.webp' },
    { _id: 'b2', name: 'Brand B', productCount: 1, image: 'luxshopping77-1.png.webp' },
    { _id: 'b3', name: 'Brand C', productCount: 1, image: 'vesus-luxury-shopping1-1.png.webp' },
    { _id: 'b4', name: 'Brand D', productCount: 1, image: 'luxshoppingvn2-1.png.webp' }
  ]);
});

app.get('/api/news', (req, res) => {
  res.json({
    news: [
      { _id: 'n1', title: 'Tin demo 1', content: 'Nội dung tin demo 1', image: 'sport_watch_1.jpg', news_status: 1, views: 100, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z', category: { name: 'Khuyến mãi' } },
      { _id: 'n2', title: 'Tin demo 2', content: 'Nội dung tin demo 2', image: 'smartwatch_10.jpg', news_status: 1, views: 50, created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z', category: { name: 'Sự kiện' } },
      { _id: 'n3', title: 'Tin demo 3', content: 'Nội dung tin demo 3', image: 'dress_watch_10.jpg', news_status: 1, views: 70, created_at: '2024-01-03T00:00:00Z', updated_at: '2024-01-03T00:00:00Z', category: { name: 'Khuyến mãi' } },
      { _id: 'n4', title: 'Tin demo 4', content: 'Nội dung tin demo 4', image: 'dive_watch_10.jpg', news_status: 1, views: 30, created_at: '2024-01-04T00:00:00Z', updated_at: '2024-01-04T00:00:00Z', category: { name: 'Sự kiện' } },
      { _id: 'n5', title: 'Tin demo 5', content: 'Nội dung tin demo 5', image: 'luxury_watch_10.jpg', news_status: 1, views: 90, created_at: '2024-01-05T00:00:00Z', updated_at: '2024-01-05T00:00:00Z', category: { name: 'Khuyến mãi' } },
      { _id: 'n6', title: 'Tin demo 6', content: 'Nội dung tin demo 6', image: 'sport_watch_9.jpg', news_status: 1, views: 60, created_at: '2024-01-06T00:00:00Z', updated_at: '2024-01-06T00:00:00Z', category: { name: 'Sự kiện' } }
    ],
    currentPage: 1,
    totalPages: 1,
    totalNews: 6
  });
});

app.get('/api/sp_moi', (req, res) => {
  res.json([
    { _id: '1', name: 'Đồng hồ demo 1', price: 1000000, sale_price: 900000, main_image: { image: 'breguet-classique-quantieme-perpetuel-7327bb-11-9vu-39mm.jpg.webp', alt: 'sp1' }, brand: { _id: 'b1', name: 'Brand A' }, quantity: 10, views: 100 },
    { _id: '2', name: 'Đồng hồ demo 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { _id: 'b2', name: 'Brand B' }, quantity: 5, views: 50 },
    { _id: '3', name: 'Đồng hồ demo 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { _id: 'b3', name: 'Brand C' }, quantity: 8, views: 80 },
    { _id: '4', name: 'Đồng hồ demo 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { _id: 'b4', name: 'Brand D' }, quantity: 3, views: 30 }
  ]);
});

app.get('/api/products/top-rated', (req, res) => {
  res.json([
    { _id: '1', name: 'Đồng hồ nổi bật 1', price: 1000000, sale_price: 900000, main_image: { image: 'bulova-accu-swiss-a-15-mechanical-watch-40mm1.jpg_980_980.webp', alt: 'sp1' }, brand: { _id: 'b1', name: 'Brand A' }, averageRating: 4.5, reviewCount: 10 },
    { _id: '2', name: 'Đồng hồ nổi bật 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { _id: 'b2', name: 'Brand B' }, averageRating: 4.0, reviewCount: 5 },
    { _id: '3', name: 'Đồng hồ nổi bật 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { _id: 'b3', name: 'Brand C' }, averageRating: 4.2, reviewCount: 7 },
    { _id: '4', name: 'Đồng hồ nổi bật 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { _id: 'b4', name: 'Brand D' }, averageRating: 4.8, reviewCount: 12 },
    { _id: '5', name: 'Đồng hồ nổi bật 5', price: 1800000, sale_price: 1500000, main_image: { image: 'bulova-accu-swiss-watch-31mm.jpg_980_980.webp', alt: 'sp5' }, brand: { _id: 'b1', name: 'Brand A' }, averageRating: 4.6, reviewCount: 8 },
    { _id: '6', name: 'Đồng hồ nổi bật 6', price: 3000000, sale_price: 2700000, main_image: { image: 'bulova-accutron-masella-chronograph-black-watch-40mm.jpg_980_980.webp', alt: 'sp6' }, brand: { _id: 'b2', name: 'Brand B' }, averageRating: 4.7, reviewCount: 9 }
  ]);
});

app.get('/', (req, res) => {
  res.send('<h2>API MOCK DEMO - Không có backend thật!</h2>');
});

app.listen(port, () => {
  console.log(`Mock API server is running on port ${port}`);
});