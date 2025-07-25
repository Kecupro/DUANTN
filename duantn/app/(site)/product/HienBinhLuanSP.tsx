"use client";

import { useEffect, useState } from "react";
import { IReview } from "../cautrucdata";
import StarRating from "../components/StarRating";

export default function HienBinhLuanSP({
  productId,
  onRefetchReady,
}: {
  productId: string;
  onRefetchReady?: (fn: () => void) => void; // callback nhận hàm fetch
}) {
  const [bl_arr, setBlArr] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/${productId}`);
      const data = await res.json();
      setBlArr(data.reviews || []);
    } catch (err) {
      console.error("Lỗi khi fetch đánh giá:", err);
      setBlArr([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    if (onRefetchReady) onRefetchReady(fetchReviews); // truyền hàm fetch ra ngoài
  }, [productId]);

  if (loading) return <p>Đang tải bình luận...</p>;

  if (!bl_arr || bl_arr.length === 0) {
    return <p>Chưa có bình luận nào cho sản phẩm này.</p>;
  }

  return (
    <div className="w-full space-y-8" id="data">
      {bl_arr.map((bl, index) => (
        <div key={index} className="flex gap-4 items-start w-full">
          <img
            src={`/upload/product/${bl.user.avatar}`}
            alt={bl.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-1 w-full">
              <span className="font-semibold">{bl.user.username}</span>
              <StarRating rating={bl.rating} className="ml-2" />
              <span className="text-gray-400 text-xs ml-2">
                {bl.created_at ? new Date(bl.created_at).toLocaleString("vi-VN") : ""}
              </span>
            </div>
            <div className="text-gray-700 text-sm w-full">
              {bl.comment || "Chưa có bình luận nào."}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

