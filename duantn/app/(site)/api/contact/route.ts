import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { message: data.message || 'Có lỗi xảy ra khi gửi tin nhắn.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi kết nối đến server.' },
      { status: 500 }
    );
  }
} 